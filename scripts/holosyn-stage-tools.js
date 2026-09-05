// HOLOSYN — stage tools
//
// The four things a presenter reaches for while actually talking: the QR the
// audience scans, the live pointer, the pitch timer, and spoken narration of
// the presenter notes. These stay on screen in "무대만" mode because they are
// the only controls left once the studio chrome is gone.
//
// Split out of app.js. Classic script, shared global scope.

// ---- QR share -------------------------------------------------
// State owned by this module.
let stagePointerCanvas = null;
let stagePointerCtx = null;
let stagePointerStrokes = [];
let stagePointerCursor = null;
let stagePointerDrawing = false;
let stagePointerRaf = null;
let stagePointerArrowStart = null;
let pitchTimerInterval = null;
let pitchTimerStartStamp = 0;

function openQrShareModal() {
    const modal = document.getElementById('qr-share-modal');
    if (!modal) return;
    if (typeof qrcode === 'undefined') {
        showNotification(
            state.language === 'ko' ? 'QR 모듈 미로드' : 'QR Module Missing',
            state.language === 'ko' ? 'QR 라이브러리를 불러오지 못했습니다. 인터넷 연결을 확인하세요.' : 'The QR library failed to load. Check the connection.'
        );
        return;
    }
    const built = buildShareUrl();
    let qrTarget = built.url;
    let note = state.language === 'ko'
        ? '공유 링크를 QR로 변환했습니다. 관객이 카메라로 스캔하면 같은 발표 장면이 폰에서 열립니다.'
        : 'Scan this to open the exact presentation scene on a phone.';
    const maxQrModules = 101;
    // A QR that technically encodes but is too dense to scan is not useful on stage.
    let matrix = tryBuildQr(qrTarget);
    if (!matrix || matrix.getModuleCount() > maxQrModules) {
        const baseUrl = new URL(window.location.href);
        baseUrl.search = '';
        baseUrl.searchParams.set('viewer', '1');
        baseUrl.hash = '';
        const base = baseUrl.toString();
        matrix = tryBuildQr(base);
        qrTarget = base;
        note = state.language === 'ko'
            ? '발표 장면 링크가 길어 QR에는 앱 주소만 담았습니다. 아래 복사 버튼은 정확한 장면 링크를 복사합니다.'
            : 'The scene link was too long for a reliable QR, so the code opens the app. The copy button keeps the exact scene link.';
    }
    const holder = document.getElementById('qr-canvas-holder');
    if (holder) {
        holder.innerHTML = matrix ? matrix.createImgTag(6, 8) : '';
    }
    const urlInput = document.getElementById('qr-share-url');
    if (urlInput) urlInput.value = built.url;
    const noteEl = document.getElementById('qr-share-note');
    if (noteEl) noteEl.textContent = note;
    modal.style.display = 'flex';
    markHandoffExportReady();
    addConsoleLog(`[SHARE] QR generated (${qrTarget.length} chars).`, 'success');
    verifyQrScannable(matrix, qrTarget);
}

function tryBuildQr(text) {
    try {
        const qr = qrcode(0, 'M');
        qr.addData(text);
        qr.make();
        return qr;
    } catch (error) {
        return null;
    }
}

// 생성한 QR이 실제로 디코드되는지 브라우저 BarcodeDetector로 자가검증 (지원 시)
function verifyQrScannable(matrix, expected) {
    if (!matrix || typeof window.BarcodeDetector === 'undefined') return;
    try {
        const count = matrix.getModuleCount();
        const scale = 6;
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = count * scale;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000';
        for (let r = 0; r < count; r++) {
            for (let c = 0; c < count; c++) {
                if (matrix.isDark(r, c)) ctx.fillRect(c * scale, r * scale, scale, scale);
            }
        }
        const detector = new window.BarcodeDetector({ formats: ['qr_code'] });
        detector.detect(canvas).then(codes => {
            const ok = codes.some(code => code.rawValue === expected);
            addConsoleLog(`[SHARE] QR self-check ${ok ? 'passed' : 'mismatch'}.`, ok ? 'success' : 'warning');
        }).catch(() => { /* detection unsupported */ });
    } catch (error) { /* non-fatal */ }
}

function closeQrShareModal() {
    const modal = document.getElementById('qr-share-modal');
    if (modal) modal.style.display = 'none';
}

async function copyQrShareUrl() {
    const urlInput = document.getElementById('qr-share-url');
    if (!urlInput) return;
    const copied = await copyTextToClipboard(urlInput.value);
    showNotification(
        state.language === 'ko' ? (copied ? '링크 복사됨' : '복사 실패') : (copied ? 'Link Copied' : 'Copy Failed'),
        copied
            ? (state.language === 'ko' ? '공유 URL을 클립보드에 복사했습니다.' : 'Copied the share URL to the clipboard.')
            : (state.language === 'ko' ? '입력창의 URL을 직접 선택해 복사하세요.' : 'Select the URL in the field and copy it manually.')
    );
}

function ensureStagePointerCanvas() {
    if (stagePointerCanvas) return stagePointerCanvas;
    const host = document.getElementById('hologram-viewport');
    if (!host) return null;
    const canvas = document.createElement('canvas');
    canvas.id = 'stage-pointer-canvas';
    host.appendChild(canvas);
    stagePointerCanvas = canvas;
    stagePointerCtx = canvas.getContext('2d');
    resizeStagePointerCanvas();
    canvas.addEventListener('pointerdown', onStagePointerDown);
    canvas.addEventListener('pointermove', onStagePointerMove);
    canvas.addEventListener('pointerup', onStagePointerUp);
    canvas.addEventListener('pointerleave', () => { stagePointerCursor = null; });
    window.addEventListener('resize', resizeStagePointerCanvas);
    return canvas;
}

function resizeStagePointerCanvas() {
    if (!stagePointerCanvas) return;
    const host = document.getElementById('hologram-viewport');
    if (!host) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    stagePointerCanvas.width = host.clientWidth * ratio;
    stagePointerCanvas.height = host.clientHeight * ratio;
    stagePointerCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function stagePointerPoint(event) {
    const rect = stagePointerCanvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function onStagePointerDown(event) {
    if (!state.stageTools.pointerActive) return;
    event.preventDefault();
    stagePointerCanvas.setPointerCapture(event.pointerId);
    const point = stagePointerPoint(event);
    stagePointerCursor = point;
    const mode = state.stageTools.pointerMode;
    if (mode === 'draw') {
        stagePointerDrawing = true;
        stagePointerStrokes.push({ type: 'draw', points: [point], born: performance.now() });
    } else if (mode === 'arrow') {
        stagePointerDrawing = true;
        stagePointerArrowStart = point;
    }
}

function onStagePointerMove(event) {
    if (!state.stageTools.pointerActive) return;
    const point = stagePointerPoint(event);
    stagePointerCursor = point;
    if (!stagePointerDrawing) return;
    const mode = state.stageTools.pointerMode;
    if (mode === 'draw') {
        const stroke = stagePointerStrokes[stagePointerStrokes.length - 1];
        if (stroke) stroke.points.push(point);
    }
}

function onStagePointerUp(event) {
    if (!state.stageTools.pointerActive) return;
    if (state.stageTools.pointerMode === 'arrow' && stagePointerArrowStart) {
        const end = stagePointerPoint(event);
        stagePointerStrokes.push({ type: 'arrow', from: stagePointerArrowStart, to: end, born: performance.now() });
        stagePointerArrowStart = null;
    }
    stagePointerDrawing = false;
}

function renderStagePointer() {
    if (!stagePointerCtx || !state.stageTools.pointerActive) return;
    const ctx = stagePointerCtx;
    const now = performance.now();
    const lifetime = 2600;
    const width = stagePointerCanvas.clientWidth;
    const height = stagePointerCanvas.clientHeight;
    ctx.clearRect(0, 0, width, height);
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-color').trim() || '#39c5ff';

    stagePointerStrokes = stagePointerStrokes.filter(stroke => now - stroke.born < lifetime || (stroke === stagePointerStrokes[stagePointerStrokes.length - 1] && stagePointerDrawing));
    stagePointerStrokes.forEach(stroke => {
        const age = now - stroke.born;
        const alpha = stagePointerDrawing && stroke === stagePointerStrokes[stagePointerStrokes.length - 1]
            ? 1 : Math.max(0, 1 - age / lifetime);
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = themeColor;
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = themeColor;
        ctx.shadowBlur = 12;
        if (stroke.type === 'draw' && stroke.points.length) {
            ctx.beginPath();
            stroke.points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
            ctx.stroke();
        } else if (stroke.type === 'arrow') {
            drawStageArrow(ctx, stroke.from, stroke.to);
        }
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    // Laser dot follows cursor
    if (stagePointerCursor) {
        const { x, y } = stagePointerCursor;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,60,60,0.28)';
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = '#ff3b3b';
        ctx.shadowColor = '#ff3b3b';
        ctx.shadowBlur = 16;
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
    stagePointerRaf = requestAnimationFrame(renderStagePointer);
}

function drawStageArrow(ctx, from, to) {
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    const head = 16;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(to.x - head * Math.cos(angle - Math.PI / 6), to.y - head * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(to.x - head * Math.cos(angle + Math.PI / 6), to.y - head * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fill();
}

function toggleStagePointer(force) {
    const next = typeof force === 'boolean' ? force : !state.stageTools.pointerActive;
    state.stageTools.pointerActive = next;
    const canvas = ensureStagePointerCanvas();
    const hud = document.getElementById('pointer-hud');
    const btn = document.getElementById('btn-stage-pointer');
    if (btn) btn.setAttribute('aria-pressed', next ? 'true' : 'false');
    if (hud) hud.hidden = !next;
    if (canvas) canvas.classList.toggle('active', next);
    if (next) {
        resizeStagePointerCanvas();
        if (!stagePointerRaf) stagePointerRaf = requestAnimationFrame(renderStagePointer);
        addConsoleLog('[STAGE] Live pointer on.', 'success');
    } else {
        if (stagePointerRaf) { cancelAnimationFrame(stagePointerRaf); stagePointerRaf = null; }
        stagePointerStrokes = [];
        stagePointerCursor = null;
        if (stagePointerCtx) stagePointerCtx.clearRect(0, 0, stagePointerCanvas.clientWidth, stagePointerCanvas.clientHeight);
    }
}

function setStagePointerMode(mode) {
    if (!['laser', 'draw', 'arrow'].includes(mode)) return;
    state.stageTools.pointerMode = mode;
    document.querySelectorAll('.pointer-mode-btn[data-pointer-mode]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.pointerMode === mode);
    });
}

function clearStagePointer() {
    stagePointerStrokes = [];
    if (stagePointerCtx) stagePointerCtx.clearRect(0, 0, stagePointerCanvas.clientWidth, stagePointerCanvas.clientHeight);
}

function formatTimerClock(totalSeconds) {
    const sign = totalSeconds < 0 ? '-' : '';
    const abs = Math.abs(Math.floor(totalSeconds));
    const m = Math.floor(abs / 60);
    const s = abs % 60;
    return `${sign}${m}:${String(s).padStart(2, '0')}`;
}

function toggleStageTimer(force) {
    const next = typeof force === 'boolean' ? force : !state.stageTools.timerActive;
    state.stageTools.timerActive = next;
    const panel = document.getElementById('pitch-timer');
    const btn = document.getElementById('btn-stage-timer');
    if (btn) btn.setAttribute('aria-pressed', next ? 'true' : 'false');
    if (panel) panel.hidden = !next;
    if (!next) pausePitchTimer();
    else updatePitchTimerDisplay();
}

function startPitchTimer() {
    if (state.stageTools.timerRunning) { pausePitchTimer(); return; }
    state.stageTools.timerRunning = true;
    pitchTimerStartStamp = performance.now() - state.stageTools.timerElapsedMs;
    const icon = document.querySelector('#btn-timer-start i');
    if (icon) { icon.setAttribute('data-lucide', 'pause'); if (window.lucide) lucide.createIcons(); }
    pitchTimerInterval = setInterval(updatePitchTimerDisplay, 200);
    updatePitchTimerDisplay();
}

function pausePitchTimer() {
    state.stageTools.timerRunning = false;
    if (pitchTimerInterval) { clearInterval(pitchTimerInterval); pitchTimerInterval = null; }
    const icon = document.querySelector('#btn-timer-start i');
    if (icon) { icon.setAttribute('data-lucide', 'play'); if (window.lucide) lucide.createIcons(); }
}

function resetPitchTimer() {
    pausePitchTimer();
    state.stageTools.timerElapsedMs = 0;
    updatePitchTimerDisplay();
}

function setPitchTimerTarget(seconds) {
    state.stageTools.timerTarget = seconds;
    document.querySelectorAll('.pitch-timer-target[data-timer-target]').forEach(btn => {
        btn.classList.toggle('active', Number(btn.dataset.timerTarget) === seconds);
    });
    updatePitchTimerDisplay();
}

function updatePitchTimerDisplay() {
    if (state.stageTools.timerRunning) {
        state.stageTools.timerElapsedMs = performance.now() - pitchTimerStartStamp;
    }
    const elapsed = state.stageTools.timerElapsedMs / 1000;
    const target = state.stageTools.timerTarget;
    const remaining = target - elapsed;
    const panel = document.getElementById('pitch-timer');
    const timeEl = document.getElementById('pitch-timer-time');
    const fill = document.getElementById('pitch-timer-fill');
    const hint = document.getElementById('pitch-timer-hint');
    if (timeEl) timeEl.textContent = formatTimerClock(remaining);
    if (fill) fill.style.width = `${Math.min(100, (elapsed / target) * 100)}%`;
    let pace = 'pace-good';
    let hintText = state.language === 'ko' ? '페이스 좋아요' : 'On pace';
    if (remaining <= 0) {
        pace = 'pace-over';
        hintText = state.language === 'ko' ? '시간 초과 — 마무리하세요' : 'Over time — wrap up';
    } else if (remaining <= target * 0.25) {
        pace = 'pace-warn';
        hintText = state.language === 'ko' ? `마무리 구간 · ${Math.ceil(remaining)}초 남음` : `Closing · ${Math.ceil(remaining)}s left`;
    } else if (!state.stageTools.timerRunning && elapsed === 0) {
        pace = 'pace-good';
        hintText = state.language === 'ko' ? `${formatTimerClock(target)} 피칭 · 시작을 누르세요` : `${formatTimerClock(target)} pitch · press start`;
    }
    if (panel) {
        panel.classList.remove('pace-good', 'pace-warn', 'pace-over');
        panel.classList.add(pace);
    }
    if (hint) hint.textContent = hintText;
}

// ---- TTS narration --------------------------------------------
function pickKoreanVoice() {
    if (typeof speechSynthesis === 'undefined') return null;
    const voices = speechSynthesis.getVoices();
    if (state.language === 'ko') {
        return voices.find(v => /ko(-|_)?/i.test(v.lang)) || voices[0] || null;
    }
    return voices.find(v => /en(-|_)?/i.test(v.lang)) || voices[0] || null;
}

function buildNarrationScript() {
    if (state.presenterNotes.length) {
        return state.presenterNotes.map((note, index) => {
            const ctx = note.context || {};
            const scene = ctx.partTitle ? `${ctx.partTitle}. ` : '';
            return `${index + 1}. ${scene}${note.text}`;
        });
    }
    // 노트가 없으면 현재 제품 기준 기본 안내
    const name = getProductName();
    return state.language === 'ko'
        ? [`${name} 발표를 시작합니다.`, '모델을 3D 홀로그램으로 띄우고, 부품을 하나씩 살펴봅니다.', '발표자 노트를 저장하면 이 자리에서 장면별 멘트를 낭독합니다.']
        : [`Starting the ${name} presentation.`, 'The model is shown as a 3D hologram, and each part is walked through.', 'Save presenter notes to narrate scene-by-scene here.'];
}

function narratePresenterNotes() {
    if (typeof speechSynthesis === 'undefined') {
        showNotification(
            state.language === 'ko' ? '음성 미지원' : 'TTS Unavailable',
            state.language === 'ko' ? '이 브라우저는 음성 합성을 지원하지 않습니다.' : 'This browser does not support speech synthesis.'
        );
        return;
    }
    if (state.stageTools.narrating) { stopNarration(); return; }
    const lines = buildNarrationScript();
    speechSynthesis.cancel();
    state.stageTools.narrating = true;
    updateNarrationButtons();
    const voice = pickKoreanVoice();
    lines.forEach((line, index) => {
        const utter = new SpeechSynthesisUtterance(line);
        if (voice) utter.voice = voice;
        utter.lang = voice?.lang || (state.language === 'ko' ? 'ko-KR' : 'en-US');
        utter.rate = 1.0;
        utter.pitch = 1.0;
        if (index === lines.length - 1) {
            utter.onend = () => { state.stageTools.narrating = false; updateNarrationButtons(); };
        }
        speechSynthesis.speak(utter);
    });
    addConsoleLog(`[STAGE] Narrating ${lines.length} note(s).`, 'success');
}

function stopNarration() {
    if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
    state.stageTools.narrating = false;
    updateNarrationButtons();
}

function updateNarrationButtons() {
    const narrateBtn = document.getElementById('btn-narrate-notes');
    const stopBtn = document.getElementById('btn-narrate-stop');
    if (narrateBtn) narrateBtn.hidden = state.stageTools.narrating;
    if (stopBtn) stopBtn.hidden = !state.stageTools.narrating;
}

function initStageTools() {
    const pointerBtn = document.getElementById('btn-stage-pointer');
    if (pointerBtn) pointerBtn.addEventListener('click', () => toggleStagePointer());
    const timerBtn = document.getElementById('btn-stage-timer');
    if (timerBtn) timerBtn.addEventListener('click', () => toggleStageTimer());
    document.querySelectorAll('.pointer-mode-btn[data-pointer-mode]').forEach(btn => {
        btn.addEventListener('click', () => setStagePointerMode(btn.dataset.pointerMode));
    });
    const pointerClear = document.getElementById('btn-pointer-clear');
    if (pointerClear) pointerClear.addEventListener('click', clearStagePointer);
    const timerStart = document.getElementById('btn-timer-start');
    if (timerStart) timerStart.addEventListener('click', startPitchTimer);
    const timerReset = document.getElementById('btn-timer-reset');
    if (timerReset) timerReset.addEventListener('click', resetPitchTimer);
    document.querySelectorAll('.pitch-timer-target[data-timer-target]').forEach(btn => {
        btn.addEventListener('click', () => setPitchTimerTarget(Number(btn.dataset.timerTarget)));
    });
    const qrBtn = document.getElementById('btn-share-qr');
    if (qrBtn) qrBtn.addEventListener('click', openQrShareModal);
    const qrClose = document.getElementById('btn-qr-close');
    if (qrClose) qrClose.addEventListener('click', closeQrShareModal);
    const qrModal = document.getElementById('qr-share-modal');
    if (qrModal) qrModal.addEventListener('click', event => { if (event.target === qrModal) closeQrShareModal(); });
    const qrCopy = document.getElementById('btn-qr-copy');
    if (qrCopy) qrCopy.addEventListener('click', copyQrShareUrl);
    const narrateBtn = document.getElementById('btn-narrate-notes');
    if (narrateBtn) narrateBtn.addEventListener('click', narratePresenterNotes);
    const narrateStop = document.getElementById('btn-narrate-stop');
    if (narrateStop) narrateStop.addEventListener('click', stopNarration);

    document.addEventListener('keydown', event => {
        if (event.target && (/^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName) || event.target.isContentEditable)) return;
        if (event.shiftKey && event.key.toLowerCase() === 'p') {
            event.preventDefault();
            toggleStagePointer();
        }
        else if (event.key === 't' || event.key === 'T') toggleStageTimer();
        else if (event.key === 'Escape') { closeQrShareModal(); if (state.stageTools.pointerActive) toggleStagePointer(false); }
    });
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged === null) {
        speechSynthesis.onvoiceschanged = () => { /* preload voices */ };
    }
    updatePitchTimerDisplay();
    updateNarrationButtons();
}
