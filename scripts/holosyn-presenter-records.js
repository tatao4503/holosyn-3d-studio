// HOLOSYN — presenter records
//
// What the presenter writes down: scene-by-scene notes and two-point
// dimensions measured on the model. Both persist per browser (they used to
// say "saved" and live in memory), travel in share links and snapshots, and
// export as Markdown / JSON.
//
// Split out of app.js. Classic script, shared global scope.

function getPresenterNoteContext() {
    const part = state.partScanActive ? getCurrentPartScanAnnotation() : null;
    const timeLabel = state.timelineCurrentTime ? `${state.timelineCurrentTime.toFixed(1)}s` : '0.0s';
    return {
        preset: state.activePreset,
        demoPreset: state.activeDemoPreset || 'manual',
        renderMode: state.renderMode,
        cameraMode: state.cameraMode,
        timelineTime: Number(state.timelineCurrentTime || 0),
        partTitle: part?.title || part?.label || null,
        key: `${state.activePreset}|${state.activeDemoPreset || 'manual'}|${timeLabel}|${part?.title || 'scene'}`
    };
}

function normalizePresenterNotes(notes) {
    if (!Array.isArray(notes)) return [];
    return notes.slice(0, 200).map((note, index) => {
        const context = note?.context || {};
        return {
            id: limitSnapshotText(note?.id, `note-${index + 1}`, 120),
            createdAt: limitSnapshotText(note?.createdAt, '', 64),
            text: limitSnapshotText(note?.text, '', 4000),
            context: {
                preset: limitSnapshotText(context.preset, 'scene', 80),
                demoPreset: limitSnapshotText(context.demoPreset, 'manual', 80),
                renderMode: limitSnapshotText(context.renderMode, 'solid', 40),
                cameraMode: limitSnapshotText(context.cameraMode, 'orbit', 40),
                timelineTime: finiteSnapshotNumber(context.timelineTime, 0, 86_400),
                partTitle: limitSnapshotText(context.partTitle, '', 240) || null,
                key: limitSnapshotText(context.key, '', 500)
            }
        };
    }).filter(note => note.text);
}

function normalizeSavedMeasurements(measurements) {
    if (!Array.isArray(measurements)) return [];
    return measurements.slice(0, 100).filter(measurement => (
        measurement && measurement.points?.start && measurement.points?.end
    )).map((measurement, index) => {
        const distanceMm = Math.max(0, finiteSnapshotNumber(measurement.distanceMm, 0));
        return {
            id: limitSnapshotText(measurement.id, `m-${index + 1}`, 120),
            label: limitSnapshotText(measurement.label, `M${index + 1}`, 120),
            createdAt: limitSnapshotText(measurement.createdAt, '', 64),
            preset: limitSnapshotText(measurement.preset, state.activePreset, 80),
            productName: limitSnapshotText(measurement.productName, getProductName(), 160),
            mmPerUnit: Math.max(0, finiteSnapshotNumber(measurement.mmPerUnit, 0)),
            baseUnits: Math.max(0, finiteSnapshotNumber(measurement.baseUnits, 0)),
            distanceMm,
            distanceText: limitSnapshotText(measurement.distanceText, `${distanceMm} mm`, 80),
            points: {
                start: normalizeSnapshotPoint(measurement.points.start),
                end: normalizeSnapshotPoint(measurement.points.end)
            },
            localPoints: measurement.localPoints?.start && measurement.localPoints?.end
                ? {
                    start: normalizeSnapshotPoint(measurement.localPoints.start),
                    end: normalizeSnapshotPoint(measurement.localPoints.end)
                }
                : null
        };
    });
}

function getPresenterNotesStorageKey() {
    return 'holosyn_presenter_notes_v1';
}

// The notes are the presenter's own script — the one thing here that cannot be
// regenerated from the model. Saying "저장" and keeping them in memory meant a
// reload threw the talk away without a word.
function persistPresenterNotes() {
    return rememberSetting(getPresenterNotesStorageKey(), JSON.stringify(state.presenterNotes));
}

function loadPresenterNotes() {
    try {
        const storage = getBrowserStorage();
        if (!storage) return;
        const raw = storage.getItem(getPresenterNotesStorageKey());
        if (!raw) return;
        state.presenterNotes = normalizePresenterNotes(JSON.parse(raw));
    } catch (err) {
        addConsoleLog('[NOTES] Saved notes could not be read; starting empty.', 'warning');
    }
}

function updatePresenterNotesPanel() {
    const status = document.getElementById('presenter-notes-status');
    if (status) status.textContent = `${state.presenterNotes.length} NOTES`;
}

function savePresenterNote() {
    const input = document.getElementById('presenter-note-input');
    const text = input?.value.trim();
    if (!text) {
        showNotification(
            state.language === 'ko' ? '노트 없음' : 'No Note',
            state.language === 'ko' ? '저장할 발표자 노트를 먼저 입력하세요.' : 'Write a presenter note before saving.'
        );
        return;
    }
    const context = getPresenterNoteContext();
    const note = {
        id: `note-${Date.now()}`,
        createdAt: new Date().toISOString(),
        text,
        context
    };
    state.presenterNotes.push(note);
    input.value = '';
    const persisted = persistPresenterNotes();
    updatePresenterNotesPanel();
    showNotification(
        state.language === 'ko' ? '발표자 노트 저장' : 'Presenter Note Saved',
        persisted
            ? (state.language === 'ko' ? '이 브라우저에 저장했습니다. 공유 링크와 패키지에도 함께 담깁니다.' : 'Saved in this browser, and included in share links and packages.')
            : (state.language === 'ko' ? '이 브라우저가 저장을 거부해 이번 세션에서만 유지됩니다. 창을 닫기 전에 노트를 내보내세요.' : 'This browser refused to store it, so it lasts only for this session. Export your notes before closing the window.')
    );
    addConsoleLog(`[NOTES] Presenter note saved for ${context.preset}/${context.demoPreset}.`, 'success');
}

function buildPresenterNotesMarkdown() {
    const lines = [
        `# HOLOSYN Presenter Notes: ${getProductName()}`,
        '',
        `Generated: ${new Date().toLocaleString()}`,
        '',
        `Notes: ${state.presenterNotes.length}`,
        ''
    ];
    if (state.presenterNotes.length === 0) {
        lines.push('- No presenter notes saved yet.');
    } else {
        state.presenterNotes.forEach((note, index) => {
            const ctx = note.context || {};
            lines.push(`## ${index + 1}. ${ctx.preset || 'scene'} / ${ctx.demoPreset || 'manual'} / ${Number(ctx.timelineTime || 0).toFixed(1)}s`);
            lines.push(`- Camera: ${ctx.cameraMode || '-'} / Render: ${ctx.renderMode || '-'}`);
            if (ctx.partTitle) lines.push(`- Part: ${ctx.partTitle}`);
            lines.push('');
            lines.push(note.text);
            lines.push('');
        });
    }
    return lines.join('\n');
}

function exportPresenterNotesMarkdown() {
    triggerDownload(
        buildPresenterNotesMarkdown(),
        'text/markdown;charset=utf-8',
        `${getExportBaseName(getProductName())}_holosyn_presenter_notes.md`
    );
    showNotification(
        state.language === 'ko' ? '발표자 노트 내보내기' : 'Presenter Notes Exported',
        state.language === 'ko' ? '저장된 장면별 메모를 Markdown으로 저장했습니다.' : 'Saved scene-by-scene notes as Markdown.'
    );
    addConsoleLog('[NOTES] Presenter notes exported.', 'success');
}

function getSavedMeasurementsStorageKey() {
    return 'holosyn_saved_measurements_v1';
}

// Same shape as the presenter notes: the panel read "N SAVED" while the
// dimensions lived in memory only. Each one is two clicks on the model that
// the presenter will not want to place again before a talk.
function persistSavedMeasurements() {
    return rememberSetting(getSavedMeasurementsStorageKey(), JSON.stringify(state.savedMeasurements));
}

function loadSavedMeasurements() {
    try {
        const storage = getBrowserStorage();
        if (!storage) return;
        const raw = storage.getItem(getSavedMeasurementsStorageKey());
        if (!raw) return;
        state.savedMeasurements = normalizeSavedMeasurements(JSON.parse(raw));
    } catch (err) {
        addConsoleLog('[MEASURE] Saved dimensions could not be read; starting empty.', 'warning');
    }
}

function updateMeasurementsPanel() {
    const status = document.getElementById('measurements-status');
    const list = document.getElementById('measurements-list');
    if (status) status.textContent = `${state.savedMeasurements.length} SAVED`;
    if (!list) return;
    list.replaceChildren();
    if (state.savedMeasurements.length === 0) {
        const empty = document.createElement('span');
        empty.textContent = '3D 측정 도구로 A/B 지점을 찍으면 치수가 여기에 누적됩니다.';
        list.appendChild(empty);
        return;
    }
    state.savedMeasurements.forEach((measurement, index) => {
        const row = document.createElement('div');
        row.className = 'measurement-row';
        row.dataset.measurementId = String(measurement.id || `m-${index + 1}`);

        const label = document.createElement('span');
        label.textContent = `${measurement.label || `M${index + 1}`} · ${measurement.preset || state.activePreset}`;
        const value = document.createElement('strong');
        value.textContent = measurement.distanceText || `${measurement.distanceMm} mm`;
        row.append(label, value);
        list.appendChild(row);
    });
}

function createCaliperBadge(container, id, label, distanceText) {
    if (!container) return null;
    const badge = document.createElement('div');
    badge.className = 'caliper-badge';
    badge.dataset.caliperId = String(id || 'measurement');

    const title = document.createElement('span');
    title.className = 'label-title';
    title.textContent = label || '3D DIMENSION';
    const value = document.createElement('span');
    value.className = 'label-value';
    value.textContent = `L: ${distanceText || '0 mm'}`;
    badge.append(title, value);
    container.appendChild(badge);
    return badge;
}

function saveMeasurementRecord(measurement) {
    state.savedMeasurements.push(measurement);
    persistSavedMeasurements();
    updateMeasurementsPanel();
}

function removeRenderedCalipers() {
    if (drawingsGroup) {
        [...drawingsGroup.children].forEach(child => {
            if (child.name && child.name.startsWith('caliper-')) drawingsGroup.remove(child);
        });
    }
    const container = document.getElementById('annotations-container');
    if (container) {
        container.querySelectorAll('.caliper-badge').forEach(badge => badge.remove());
    }
    calipersList = [];
}

function createCaliperVisualFromMeasurement(measurement) {
    if (!drawingsGroup || !measurement?.points?.start || !measurement?.points?.end) return;
    const start = vectorFromPlain(measurement.points.start);
    const end = vectorFromPlain(measurement.points.end);
    const id = measurement.id || `m-${Date.now()}`;

    const sphereGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({ color: themeColorObj() });
    const startSphere = new THREE.Mesh(sphereGeo, sphereMat);
    startSphere.position.copy(start);
    startSphere.name = `caliper-${id}-start`;
    drawingsGroup.add(startSphere);

    const endSphere = new THREE.Mesh(sphereGeo, sphereMat.clone());
    endSphere.position.copy(end);
    endSphere.name = `caliper-${id}-end`;
    drawingsGroup.add(endSphere);

    const lineGeo = new THREE.BufferGeometry().setFromPoints([start, end]);
    const lineMat = new THREE.LineDashedMaterial({
        color: themeColorObj(),
        dashSize: 0.08,
        gapSize: 0.04,
        linewidth: 2,
        transparent: true,
        opacity: 0.95
    });
    const line = new THREE.Line(lineGeo, lineMat);
    line.computeLineDistances();
    line.name = `caliper-${id}-line`;
    drawingsGroup.add(line);

    const container = document.getElementById('annotations-container');
    const badge = createCaliperBadge(
        container,
        id,
        measurement.label || '3D DIMENSION',
        measurement.distanceText || `${measurement.distanceMm} mm`
    );

    calipersList.push({
        id,
        start,
        end,
        distance: measurement.distanceText || `${measurement.distanceMm} mm`,
        line,
        badgeEl: badge
    });
}

function rebuildSavedMeasurementVisuals() {
    removeRenderedCalipers();
    if (!Array.isArray(state.savedMeasurements)) state.savedMeasurements = [];
    state.savedMeasurements.forEach(measurement => createCaliperVisualFromMeasurement(measurement));
    updateMeasurementsPanel();
}

function exportMeasurements() {
    triggerDownload(
        JSON.stringify({
            holosynMeasurements: 'saved-dimensions-v1',
            exportedAt: new Date().toISOString(),
            product: getProductSpecState(),
            measurements: state.savedMeasurements
        }, null, 2),
        'application/json',
        `${getExportBaseName(getProductName())}_holosyn_measurements.json`
    );
    showNotification(
        state.language === 'ko' ? '치수 JSON 저장' : 'Measurements Saved',
        state.language === 'ko' ? '저장된 모든 3D 치수를 JSON으로 내보냈습니다.' : 'Exported all saved 3D dimensions as JSON.'
    );
    addConsoleLog(`[MEASURE] Exported ${state.savedMeasurements.length} saved dimensions.`, 'success');
}

function clearAllSavedMeasurements() {
    state.savedMeasurements = [];
    persistSavedMeasurements();
    caliperStartPoint = null;
    removeRenderedCalipers();
    updateMeasurementsPanel();
    showNotification(
        state.language === 'ko' ? '치수 삭제' : 'Measurements Cleared',
        state.language === 'ko' ? '저장된 치수와 뷰포트 측정 표시를 지웠습니다.' : 'Cleared saved dimensions and viewport measurement marks.'
    );
    addConsoleLog('[MEASURE] Saved dimensions cleared.', 'info');
}
