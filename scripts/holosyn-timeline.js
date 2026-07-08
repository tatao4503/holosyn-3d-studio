/**
 * HOLOSYN timeline keyframe presenter engine.
 *
 * Loaded after app.js and before holosyn-pro-managers.js. It reuses the shared
 * viewport state, camera, controls, notifications, and collaboration bridge
 * while keeping timeline playback/editing out of the core renderer.
 */

// ==========================================================================
// HOLOSYN v8.0 — TIMELINE KEYFRAME PRESENTER ENGINE
// ==========================================================================

// Timeline playback tracking variables
let timelineAnimFrame = null;
let timelineLastFrameTime = 0;

/**
 * Initialize the Timeline Keyframe Editor
 * Binds all DOM events for the timeline UI panel
 */
function initTimelineEditor() {
    const panel = document.getElementById('timeline-editor');
    const toggleBtn = document.getElementById('btn-toggle-timeline');
    const closeBtn = document.getElementById('btn-tl-close');
    const addKfBtn = document.getElementById('btn-tl-add-kf');
    const playBtn = document.getElementById('btn-tl-play');
    const speedSelect = document.getElementById('tl-speed');
    const loopBtn = document.getElementById('btn-tl-loop');
    const exportBtn = document.getElementById('btn-tl-export');
    const importBtn = document.getElementById('btn-tl-import');
    const importInput = document.getElementById('tl-import-input');
    const track = document.getElementById('tl-track');

    if (!panel || !toggleBtn) return;

    // Toggle timeline panel open/close
    toggleBtn.addEventListener('click', () => {
        setTimelinePanelOpen(!state.timelineOpen);
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            setTimelinePanelOpen(false);
        });
    }

    // Add keyframe
    if (addKfBtn) {
        addKfBtn.addEventListener('click', () => {
            captureKeyframe();
        });
    }

    // Play/Pause toggle
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            if (state.timelinePlaying) {
                pauseTimeline();
            } else {
                playTimeline();
            }
        });
    }

    // Speed selector
    if (speedSelect) {
        speedSelect.addEventListener('change', (e) => {
            state.timelineSpeed = parseFloat(e.target.value) || 1.0;
        });
    }

    // Loop toggle
    if (loopBtn) {
        loopBtn.addEventListener('click', () => {
            state.timelineLoop = !state.timelineLoop;
            loopBtn.classList.toggle('tl-play-btn', state.timelineLoop);
            loopBtn.style.borderColor = state.timelineLoop ? 'var(--theme-color)' : '';
        });
    }

    // Export timeline
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportTimelineAsJSON();
        });
    }

    // Import timeline
    if (importBtn && importInput) {
        importBtn.addEventListener('click', () => importInput.click());
        importInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    const data = JSON.parse(ev.target.result);
                    importTimelineFromJSON(data);
                } catch (err) {
                    addConsoleLog('[오류] 타임라인 JSON 파싱 실패: ' + err.message, 'error');
                }
            };
            reader.readAsText(file);
            importInput.value = ''; // Reset for re-import
        });
    }

    // Click on track to seek
    if (track) {
        track.addEventListener('click', (e) => {
            if (e.target.closest('.keyframe-marker')) return; // Don't seek on KF click
            const rect = track.getBoundingClientRect();
            const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            state.timelineCurrentTime = pct * state.timelineDuration;
            updateTimelinePlayhead();
            // Apply state at this time if not playing
            if (!state.timelinePlaying) {
                applyTimelineStateAtTime(state.timelineCurrentTime);
            }
            
            if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
                CollabManager.broadcast({
                    type: 'timeline_control',
                    action: 'seek',
                    time: state.timelineCurrentTime
                });
            }
        });
    }

    // Initial render
    renderTimelineRuler();
}

function setTimelinePanelOpen(isOpen) {
    const panel = document.getElementById('timeline-editor');
    const toggleBtn = document.getElementById('btn-toggle-timeline');
    const mobileBtn = document.querySelector('.mobile-tool-btn[data-action="timeline"]');
    if (!panel) return;

    panel.style.setProperty('transition', 'none', 'important');
    panel.getBoundingClientRect();

    state.timelineOpen = Boolean(isOpen);
    panel.classList.toggle('panel-open', state.timelineOpen);
    if (state.timelineOpen) {
        panel.style.setProperty('transform', 'translateX(-50%) translateY(0)', 'important');
        panel.style.setProperty('opacity', '1', 'important');
        panel.style.setProperty('visibility', 'visible', 'important');
        panel.style.setProperty('pointer-events', 'auto', 'important');
    } else {
        panel.style.setProperty('transform', 'translateX(-50%) translateY(100%)', 'important');
        panel.style.setProperty('opacity', '0', 'important');
        panel.style.setProperty('visibility', 'hidden', 'important');
        panel.style.setProperty('pointer-events', 'none', 'important');
    }
    if (toggleBtn) toggleBtn.classList.toggle('active-dock', state.timelineOpen);
    if (mobileBtn) mobileBtn.classList.toggle('active', state.timelineOpen);

    if (state.timelineOpen) {
        renderTimelineRuler();
        renderTimelineKeyframes();
    }
}

/**
 * Capture the current viewport state as a new keyframe
 */
function captureKeyframe() {
    if (state.timelineKeyframes.length >= 20) {
        showNotification(
            state.language === 'ko' ? '키프레임 한도 초과' : 'Keyframe Limit',
            translations[state.language].timeline_kf_max
        );
        return;
    }

    // Determine time position: place after the last keyframe, or at current time
    let timePos = state.timelineCurrentTime;
    if (state.timelineKeyframes.length > 0) {
        const lastKf = state.timelineKeyframes[state.timelineKeyframes.length - 1];
        // If current time overlaps, place 3 seconds after the last one
        const autoTime = lastKf.time + 3.0;
        if (timePos <= lastKf.time && autoTime <= state.timelineDuration) {
            timePos = autoTime;
        }
    }
    // Clamp to duration
    timePos = Math.min(timePos, state.timelineDuration);

    const kf = {
        id: 'kf-' + Date.now(),
        time: parseFloat(timePos.toFixed(1)),
        camera: {
            position: camera ? { x: camera.position.x, y: camera.position.y, z: camera.position.z } : { x: 0, y: 4, z: 10 },
            target: controls ? { x: controls.target.x, y: controls.target.y, z: controls.target.z } : { x: 0, y: 0, z: 0 }
        },
        explodedLevel: state.explodedLevel,
        renderMode: state.renderMode,
        themeColor: state.themeColor,
        assemblyStep: getActiveAssemblyStep(),
        environment: state.studioEnvironment,
        rotationSpeed: state.rotationSpeed,
        cameraMode: state.cameraMode,
        label: (state.language === 'ko' ? 'KF ' : 'KF ') + (state.timelineKeyframes.length + 1)
    };

    state.timelineKeyframes.push(kf);
    // Sort by time
    state.timelineKeyframes.sort((a, b) => a.time - b.time);

    renderTimelineKeyframes();
    updateTimelineFooter();
    if (typeof updateHandoffPackStatus === 'function') {
        updateHandoffPackStatus();
    }
    playSynthSweep(600, 1200, 0.3);

    showNotification(
        state.language === 'ko' ? '키프레임 추가' : 'Keyframe Added',
        translations[state.language].timeline_kf_added
    );
    addConsoleLog('[TIMELINE] Keyframe captured at t=' + kf.time.toFixed(1) + 's', 'success');

    if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
        CollabManager.broadcast({
            type: 'timeline_keyframes',
            keyframes: state.timelineKeyframes
        });
    }
}

/**
 * Get the currently active assembly step number
 */
function getActiveAssemblyStep() {
    const activeBtn = document.querySelector('.assembly-btn.active');
    if (activeBtn) return parseInt(activeBtn.dataset.step) || 0;
    return 0;
}

/**
 * Delete a keyframe by its ID
 */
function deleteKeyframe(id) {
    state.timelineKeyframes = state.timelineKeyframes.filter(kf => kf.id !== id);
    renderTimelineKeyframes();
    updateTimelineFooter();
    if (typeof updateHandoffPackStatus === 'function') {
        updateHandoffPackStatus();
    }
    playSynthSweep(400, 200, 0.2);
    showNotification(
        state.language === 'ko' ? '키프레임 삭제' : 'Keyframe Deleted',
        translations[state.language].timeline_kf_deleted
    );

    if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
        CollabManager.broadcast({
            type: 'timeline_keyframes',
            keyframes: state.timelineKeyframes
        });
    }
}

/**
 * Start timeline playback
 */
function playTimeline() {
    if (state.timelineKeyframes.length < 2) {
        showNotification(
            state.language === 'ko' ? '키프레임 부족' : 'Not Enough Keyframes',
            state.language === 'ko' ? '최소 2개의 키프레임이 필요합니다.' : 'At least 2 keyframes are required.'
        );
        return;
    }

    state.timelinePlaying = true;
    timelineLastFrameTime = performance.now();

    // Update Play button visual
    const playBtn = document.getElementById('btn-tl-play');
    if (playBtn) {
        playBtn.classList.add('playing');
        const icon = playBtn.querySelector('i');
        if (icon) icon.setAttribute('data-lucide', 'pause');
        const label = playBtn.querySelector('span');
        if (label) label.textContent = translations[state.language].pause_timeline;
        lucide.createIcons({ nodes: [playBtn] });
    }

    addConsoleLog('[TIMELINE] Playback started. Speed: ' + state.timelineSpeed + 'x', 'info');
    
    if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
        CollabManager.broadcast({
            type: 'timeline_control',
            action: 'play'
        });
    }
}

/**
 * Pause timeline playback
 */
function pauseTimeline() {
    state.timelinePlaying = false;

    // Hide subtitle card overlay (Phase E)
    const overlay = document.getElementById('timeline-subtitle-overlay');
    if (overlay) {
        overlay.classList.remove('visible');
        setTimeout(() => {
            if (!overlay.classList.contains('visible')) {
                overlay.style.display = 'none';
            }
        }, 300);
    }

    const playBtn = document.getElementById('btn-tl-play');
    if (playBtn) {
        playBtn.classList.remove('playing');
        const icon = playBtn.querySelector('i');
        if (icon) icon.setAttribute('data-lucide', 'play');
        const label = playBtn.querySelector('span');
        if (label) label.textContent = translations[state.language].play_timeline;
        lucide.createIcons({ nodes: [playBtn] });
    }

    addConsoleLog('[TIMELINE] Playback paused at t=' + state.timelineCurrentTime.toFixed(1) + 's', 'info');
    
    if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
        CollabManager.broadcast({
            type: 'timeline_control',
            action: 'pause'
        });
    }
}

/**
 * Cubic Ease-In-Out interpolation factor
 */
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Interpolate between two keyframe states
 * @param {Object} kfA - Start keyframe
 * @param {Object} kfB - End keyframe
 * @param {number} t - Normalized progress (0-1)
 */
function interpolateKeyframeState(kfA, kfB, t) {
    const easedT = easeInOutCubic(t);

    // Camera position interpolation
    if (camera && kfA.camera && kfB.camera) {
        const posA = kfA.camera.position;
        const posB = kfB.camera.position;
        targetCameraPosition.set(
            posA.x + (posB.x - posA.x) * easedT,
            posA.y + (posB.y - posA.y) * easedT,
            posA.z + (posB.z - posA.z) * easedT
        );

        const tgtA = kfA.camera.target;
        const tgtB = kfB.camera.target;
        targetCameraTarget.set(
            tgtA.x + (tgtB.x - tgtA.x) * easedT,
            tgtA.y + (tgtB.y - tgtA.y) * easedT,
            tgtA.z + (tgtB.z - tgtA.z) * easedT
        );

        // Force camera to follow the interpolated position
        camera.position.lerp(targetCameraPosition, 0.15);
        if (controls) controls.target.lerp(targetCameraTarget, 0.15);
    }

    // Exploded level interpolation
    const explodedVal = kfA.explodedLevel + (kfB.explodedLevel - kfA.explodedLevel) * easedT;
    if (Math.abs(explodedVal - state.explodedLevel) > 0.005) {
        state.explodedLevel = explodedVal;
        const slider = document.getElementById('tuner-exploded');
        if (slider) slider.value = explodedVal;
        const readout = document.getElementById('readout-exploded');
        if (readout) readout.textContent = Math.round(explodedVal * 100) + '%';
    }

    // Rotation speed interpolation
    state.rotationSpeed = kfA.rotationSpeed + (kfB.rotationSpeed - kfA.rotationSpeed) * easedT;

    // Discrete state switches at midpoint
    if (t >= 0.5) {
        // Switch render mode
        if (state.renderMode !== kfB.renderMode) {
            state.renderMode = kfB.renderMode;
            toggleRenderVisibility();
            // Update render mode button UI
            document.querySelectorAll('.render-mode-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.mode === kfB.renderMode);
            });
        }

        // Switch theme color
        if (state.themeColor !== kfB.themeColor) {
            const colorBtn = document.querySelector('.color-select-btn[data-color]');
            // Find matching color button and simulate click
            document.querySelectorAll('.color-select-btn').forEach(btn => {
                const btnColor = getComputedStyle(btn).getPropertyValue('--c').trim();
            });
            // Direct state update
            state.themeColor = kfB.themeColor;
            updateHolographicMaterials();
        }

        // Switch environment
        if (state.studioEnvironment !== kfB.environment) {
            state.studioEnvironment = kfB.environment;
            document.querySelectorAll('.env-mode-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.env === kfB.environment);
            });
        }
    }
}

/**
 * Apply the interpolated state at a specific time position
 */
function applyTimelineStateAtTime(time) {
    const kfs = state.timelineKeyframes;
    if (kfs.length === 0) return;

    // Update subtitles overlay card (Phase E)
    updatePresenterSubtitles(time);

    // Before first keyframe
    if (time <= kfs[0].time) {
        applyKeyframeState(kfs[0]);
        return;
    }

    // After last keyframe
    if (time >= kfs[kfs.length - 1].time) {
        applyKeyframeState(kfs[kfs.length - 1]);
        return;
    }

    // Find the two surrounding keyframes
    for (let i = 0; i < kfs.length - 1; i++) {
        if (time >= kfs[i].time && time <= kfs[i + 1].time) {
            const segmentDuration = kfs[i + 1].time - kfs[i].time;
            const localT = segmentDuration > 0 ? (time - kfs[i].time) / segmentDuration : 0;
            interpolateKeyframeState(kfs[i], kfs[i + 1], localT);
            return;
        }
    }
}

/**
 * Directly apply a single keyframe's full state (no interpolation)
 */
function applyKeyframeState(kf) {
    if (camera && kf.camera) {
        targetCameraPosition.set(kf.camera.position.x, kf.camera.position.y, kf.camera.position.z);
        targetCameraTarget.set(kf.camera.target.x, kf.camera.target.y, kf.camera.target.z);
    }

    if (state.renderMode !== kf.renderMode) {
        state.renderMode = kf.renderMode;
        toggleRenderVisibility();
        document.querySelectorAll('.render-mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === kf.renderMode);
        });
    }

    state.explodedLevel = kf.explodedLevel;
    const slider = document.getElementById('tuner-exploded');
    if (slider) slider.value = kf.explodedLevel;

    state.rotationSpeed = kf.rotationSpeed;
    state.studioEnvironment = kf.environment;
}

/**
 * Timeline playback update — called from renderLoop each frame
 */
function updateTimelinePlayback() {
    if (!state.timelinePlaying || state.timelineKeyframes.length < 2) return;

    const now = performance.now();
    const elapsed = (now - timelineLastFrameTime) / 1000; // seconds
    timelineLastFrameTime = now;

    state.timelineCurrentTime += elapsed * state.timelineSpeed;

    const lastKfTime = state.timelineKeyframes[state.timelineKeyframes.length - 1].time;

    // Check if playback has reached the end
    if (state.timelineCurrentTime >= lastKfTime) {
        if (state.timelineLoop) {
            state.timelineCurrentTime = state.timelineKeyframes[0].time;
        } else {
            state.timelineCurrentTime = lastKfTime;
            pauseTimeline();
            return;
        }
    }

    // Apply interpolated state
    applyTimelineStateAtTime(state.timelineCurrentTime);

    // Update playhead position
    updateTimelinePlayhead();
}

/**
 * Update the playhead visual position on the track
 */
function updateTimelinePlayhead() {
    const playhead = document.getElementById('tl-playhead');
    const timeDisplay = document.getElementById('tl-current-time');
    if (!playhead) return;

    const pct = (state.timelineCurrentTime / state.timelineDuration) * 100;
    playhead.style.left = Math.min(pct, 100) + '%';

    if (timeDisplay) {
        timeDisplay.textContent = formatTimelineTime(state.timelineCurrentTime);
    }
}

/**
 * Format seconds into MM:SS.s display
 */
function formatTimelineTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return String(m).padStart(2, '0') + ':' + s.toFixed(1).padStart(4, '0');
}

/**
 * Render time ruler tick marks
 */
function renderTimelineRuler() {
    const ruler = document.getElementById('tl-ruler');
    if (!ruler) return;

    ruler.innerHTML = '';
    const dur = state.timelineDuration;
    const step = dur <= 30 ? 5 : (dur <= 60 ? 10 : 15);

    for (let t = 0; t <= dur; t += step) {
        const pct = (t / dur) * 100;
        const tick = document.createElement('span');
        tick.className = 'ruler-tick major';
        tick.style.left = pct + '%';
        tick.textContent = t + 's';
        ruler.appendChild(tick);
    }

    // Update total time display
    const totalTime = document.getElementById('tl-total-time');
    if (totalTime) totalTime.textContent = formatTimelineTime(dur);
}

/**
 * Render keyframe markers on the timeline track
 */
function renderTimelineKeyframes() {
    const track = document.getElementById('tl-track');
    if (!track) return;

    // Remove old markers (keep playhead)
    track.querySelectorAll('.keyframe-marker').forEach(el => el.remove());

    state.timelineKeyframes.forEach((kf, idx) => {
        const marker = document.createElement('div');
        marker.className = 'keyframe-marker';
        marker.dataset.kfId = kf.id;
        marker.dataset.label = kf.label + ' (' + kf.time.toFixed(1) + 's)';
        marker.style.left = ((kf.time / state.timelineDuration) * 100) + '%';

        // Click to seek
        marker.addEventListener('click', (e) => {
            e.stopPropagation();
            state.timelineCurrentTime = kf.time;
            updateTimelinePlayhead();
            if (!state.timelinePlaying) {
                applyKeyframeState(kf);
            }
            // Highlight active
            track.querySelectorAll('.keyframe-marker').forEach(m => m.classList.remove('active-kf'));
            marker.classList.add('active-kf');
        });

        // Double-click to edit subtitle (Phase E)
        marker.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            const oldSub = kf.subtitle || '';
            const newSub = prompt(
                state.language === 'ko' 
                    ? '이 키프레임에 표시할 프레젠테이션 자막을 입력하세요:' 
                    : 'Enter presentation subtitle for this keyframe:', 
                oldSub
            );
            if (newSub !== null) {
                kf.subtitle = newSub;
                marker.title = newSub ? `${kf.label}: "${newSub}"` : kf.label;
                addConsoleLog('[TIMELINE] Keyframe subtitle updated', 'success');
                if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
                    CollabManager.broadcast({
                        type: 'timeline_keyframes',
                        keyframes: state.timelineKeyframes
                    });
                }
            }
        });

        // Right-click to delete
        marker.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteKeyframe(kf.id);
        });

        // Drag to reposition
        let isDragging = false;
        marker.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return; // Only left click
            isDragging = true;
            e.stopPropagation();
            document.body.style.cursor = 'grabbing';

            const onMouseMove = (moveEvent) => {
                if (!isDragging) return;
                const rect = track.getBoundingClientRect();
                const pct = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / rect.width));
                const newTime = parseFloat((pct * state.timelineDuration).toFixed(1));
                kf.time = newTime;
                marker.style.left = (pct * 100) + '%';
                marker.dataset.label = kf.label + ' (' + newTime.toFixed(1) + 's)';
            };

            const onMouseUp = () => {
                isDragging = false;
                document.body.style.cursor = '';
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                // Re-sort keyframes
                state.timelineKeyframes.sort((a, b) => a.time - b.time);
                renderTimelineKeyframes();
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        track.appendChild(marker);
    });

    updateTimelineFooter();
}

/**
 * Update timeline footer text (keyframe count)
 */
function updateTimelineFooter() {
    const countEl = document.getElementById('tl-kf-count');
    if (countEl) {
        countEl.textContent = 'KEYFRAMES: ' + state.timelineKeyframes.length + ' / 20';
    }
}

/**
 * Export the current timeline as a JSON file download
 */
function exportTimelineAsJSON() {
    const data = {
        version: 'holosyn-timeline-v8.0',
        duration: state.timelineDuration,
        keyframes: state.timelineKeyframes,
        exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'holosyn-timeline-' + Date.now() + '.json';
    a.click();
    URL.revokeObjectURL(url);

    showNotification(
        state.language === 'ko' ? '타임라인 내보내기' : 'Timeline Exported',
        translations[state.language].timeline_exported
    );
    addConsoleLog('[TIMELINE] Exported ' + state.timelineKeyframes.length + ' keyframes to JSON.', 'success');
    if (typeof markHandoffExportReady === 'function') {
        markHandoffExportReady();
    } else if (typeof updateHandoffPackStatus === 'function') {
        updateHandoffPackStatus();
    }
}

/**
 * Import a timeline from a JSON data object
 */
function importTimelineFromJSON(data) {
    if (!data || !data.keyframes || !Array.isArray(data.keyframes)) {
        addConsoleLog('[TIMELINE] Invalid timeline JSON format.', 'error');
        return;
    }

    state.timelineKeyframes = data.keyframes;
    if (data.duration) state.timelineDuration = data.duration;
    state.timelineCurrentTime = 0;
    
    if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
        CollabManager.broadcast({
            type: 'timeline_keyframes',
            keyframes: state.timelineKeyframes
        });
    }

    renderTimelineRuler();
    renderTimelineKeyframes();
    updateTimelinePlayhead();

    showNotification(
        state.language === 'ko' ? '타임라인 가져오기' : 'Timeline Imported',
        translations[state.language].timeline_imported
    );
    addConsoleLog('[TIMELINE] Imported ' + state.timelineKeyframes.length + ' keyframes.', 'success');
    if (typeof updateHandoffPackStatus === 'function') {
        updateHandoffPackStatus();
    }
}

// Remote collaboration timeline handlers.
function handleRemoteTimeline(action, time) {
    if (action === 'play') {
        state.timelinePlaying = true;
        const playBtn = document.getElementById('btn-tl-play');
        if (playBtn) {
            playBtn.classList.add('playing');
            const icon = playBtn.querySelector('i');
            if (icon) icon.setAttribute('data-lucide', 'pause');
            const label = playBtn.querySelector('span');
            if (label) label.textContent = translations[state.language].pause_timeline;
            lucide.createIcons({ nodes: [playBtn] });
        }
    } else if (action === 'pause') {
        state.timelinePlaying = false;
        const playBtn = document.getElementById('btn-tl-play');
        if (playBtn) {
            playBtn.classList.remove('playing');
            const icon = playBtn.querySelector('i');
            if (icon) icon.setAttribute('data-lucide', 'play');
            const label = playBtn.querySelector('span');
            if (label) label.textContent = translations[state.language].play_timeline;
            lucide.createIcons({ nodes: [playBtn] });
        }
    } else if (action === 'seek') {
        state.timelineCurrentTime = time;
        updateTimelinePlayhead();
        updateTimelineFooter();
        applyTimelineStateAtTime(time);
    }
}

function handleRemoteKeyframes(keyframes) {
    state.timelineKeyframes = keyframes;
    renderTimelineKeyframes();
    updateTimelineFooter();
    if (typeof updateHandoffPackStatus === 'function') {
        updateHandoffPackStatus();
    }
}

window.HolosynTimeline = {
    initTimelineEditor,
    setTimelinePanelOpen,
    captureKeyframe,
    playTimeline,
    pauseTimeline,
    updateTimelinePlayback,
    handleRemoteTimeline,
    handleRemoteKeyframes
};
