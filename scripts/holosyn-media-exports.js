// HOLOSYN — media exports
//
// Files that leave the studio as pictures of the model: the viewport clip
// (WebM or MP4, whichever the browser can record), the binary GLB, the spec
// JSON, and the composited spec-card PNG.
//
// Split out of app.js. Classic script, shared global scope.

async function recordViewportClip(durationMs = 5000) {
    if (!renderer?.domElement || !renderer.domElement.captureStream || typeof MediaRecorder === 'undefined') {
        showNotification(state.language === 'ko' ? '녹화 미지원' : 'Recording Unsupported', state.language === 'ko' ? '이 브라우저는 캔버스 MediaRecorder를 지원하지 않습니다.' : 'This browser does not support canvas MediaRecorder.');
        return;
    }
    if (!state.engineBooted) {
        showNotification(state.language === 'ko' ? '엔진 기동 필요' : 'Boot Required', state.language === 'ko' ? '먼저 HOLOSYN 엔진을 기동하세요.' : 'Boot HOLOSYN first.');
        return;
    }
    const status = document.getElementById('clip-export-status');
    // The old code tested one webm variant and, when it failed, used another
    // webm without testing it. Safari has MediaRecorder but no webm at all, so
    // the guard above passed, the constructor threw, and the presenter got
    // silence: no toast, no status change, nothing.
    const mimeType = [
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm',
        'video/mp4;codecs=avc1',
        'video/mp4'
    ].find(candidate => {
        try { return MediaRecorder.isTypeSupported(candidate); } catch (err) { return false; }
    });
    if (!mimeType) {
        showNotification(
            state.language === 'ko' ? '녹화 미지원' : 'Recording Unsupported',
            state.language === 'ko' ? '이 브라우저가 녹화할 수 있는 영상 형식이 없습니다. 대신 스펙 카드 PNG를 저장하세요.' : 'This browser offers no video format this can record. Save a spec card PNG instead.'
        );
        return;
    }
    const stream = renderer.domElement.captureStream(30);
    let recorder;
    try {
        recorder = new MediaRecorder(stream, { mimeType });
    } catch (err) {
        stream.getTracks().forEach(track => track.stop());
        showNotification(
            state.language === 'ko' ? '녹화를 시작하지 못했습니다' : 'Recording Did Not Start',
            state.language === 'ko' ? `이 브라우저가 녹화를 거부했습니다 (${err?.name || 'error'}).` : `This browser refused to record (${err?.name || 'error'}).`
        );
        addConsoleLog(`[CLIP] Recorder could not start: ${err?.name || err}`, 'error');
        return;
    }
    const extension = mimeType.startsWith('video/mp4') ? 'mp4' : 'webm';
    const chunks = [];
    const previous = {
        rotationSpeed: state.rotationSpeed,
        explodedLevel: state.explodedLevel,
        cameraMode: state.cameraMode
    };
    recorder.ondataavailable = event => {
        if (event.data && event.data.size > 0) chunks.push(event.data);
    };
    recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        state.rotationSpeed = previous.rotationSpeed;
        animateExplodedLevel(previous.explodedLevel, 500);
        if (previous.cameraMode) applyCameraView(previous.cameraMode, false);
        const blob = new Blob(chunks, { type: mimeType });
        // An empty recording still produces a blob. Downloading a 0-byte file
        // and calling it saved is the failure the presenter finds later.
        if (blob.size === 0) {
            if (status) status.textContent = 'FAILED';
            showNotification(
                state.language === 'ko' ? '녹화된 내용이 없습니다' : 'Nothing Was Recorded',
                state.language === 'ko' ? '빈 파일이라 저장하지 않았습니다. 창을 앞으로 두고 다시 시도하세요.' : 'The clip was empty, so nothing was saved. Keep this window in front and try again.'
            );
            addConsoleLog('[CLIP] Recorder produced no data.', 'error');
            return;
        }
        triggerBlobDownload(blob, `${getExportBaseName(getProductName())}_holosyn_clip_${Math.round(durationMs / 1000)}s.${extension}`);
        if (status) status.textContent = 'SAVED';
        showNotification(state.language === 'ko' ? '클립 저장 완료' : 'Clip Saved', state.language === 'ko' ? `회전·분해 ${extension.toUpperCase()} 클립을 저장했습니다.` : `Saved the rotating/exploded ${extension.toUpperCase()} clip.`);
        addConsoleLog(`[CLIP] Recorded ${Math.round(durationMs / 1000)}s viewport clip (${extension}).`, 'success');
    };
    recorder.onerror = event => {
        if (status) status.textContent = 'FAILED';
        showNotification(
            state.language === 'ko' ? '녹화가 중단됐습니다' : 'Recording Stopped',
            state.language === 'ko' ? '브라우저가 녹화를 중단했습니다.' : 'The browser interrupted the recording.'
        );
        addConsoleLog(`[CLIP] Recorder error: ${event?.error?.name || 'unknown'}`, 'error');
    };
    if (status) status.textContent = 'REC';
    state.rotationSpeed = Math.max(state.rotationSpeed, 0.9);
    applyCameraView('orbit', false);
    animateExplodedLevel(Math.max(state.explodedLevel, 0.62), 650);
    recorder.start();
    showNotification(state.language === 'ko' ? '클립 녹화 중' : 'Recording Clip', state.language === 'ko' ? `${Math.round(durationMs / 1000)}초 ${extension.toUpperCase()} 클립을 녹화합니다.` : `Recording a ${Math.round(durationMs / 1000)} second ${extension.toUpperCase()} clip.`);
    setTimeout(() => {
        if (recorder.state !== 'inactive') recorder.stop();
    }, durationMs);
}

function exportGLTF() {
    if (!window.THREE || !THREE.GLTFExporter) {
        showNotification(
            state.language === 'ko' ? "오류: 내보내기 불가" : "Error: Export Impossible",
            state.language === 'ko' ? "GLTF 내보내기 모듈이 로드되지 않았습니다." : "GLTFExporter script is not loaded."
        );
        return;
    }
    
    playSynthClick(680, 0.08);
    playSynthSweep(200, 900, 0.6);
    
    showNotification(
        state.language === 'ko' ? "GLB 다운로드 시작" : "Exporting GLB",
        state.language === 'ko' ? "3D 입체 에셋을 단일 이진 파일(.glb)로 컴파일 중입니다..." : "Compiling standard binary .glb structures..."
    );
    
    const exporter = new THREE.GLTFExporter();
    
    // Temporarily reset float positions to default alignment during export
    const prevFloatY = activeModelGroup ? activeModelGroup.position.y : 0.15;
    if (activeModelGroup) {
        activeModelGroup.position.y = 0.15;
    }
    
    parseGltfExport(exporter, activeModelGroup, function(result) {
        // Never hand out a .glb that is not one — this used to save glTF JSON
        // under a .glb name and still report success.
        if (!(result instanceof ArrayBuffer)) {
            if (activeModelGroup) activeModelGroup.position.y = prevFloatY;
            showNotification(
                state.language === 'ko' ? 'GLB 내보내기 실패' : 'Export Failed',
                state.language === 'ko' ? '이진 GLB를 만들지 못했습니다. 다시 시도하세요.' : 'Could not produce a binary GLB. Please try again.'
            );
            addConsoleLog('[EXPORT] GLB export did not return a binary buffer.', 'error');
            return;
        }
        triggerDownload(result, 'model/gltf-binary', `${state.activePreset}_prototype.glb`);
        
        // Restore positions
        if (activeModelGroup) {
            activeModelGroup.position.y = prevFloatY;
        }
        
        showNotification(
            state.language === 'ko' ? "GLB 다운로드 완료" : "GLB Model Saved",
            state.language === 'ko' ? `${state.activePreset.toUpperCase()} 표준 이진 GLB 파일이 저장되었습니다.` : `Saved ${state.activePreset.toUpperCase()} prototype as standard binary .glb.`
        );
        setWorkflowProgress('export', ['model', 'structure', 'present', 'export']);
        markHandoffExportReady();
        
        if (state.language === 'ko') {
            addConsoleLog(`[성공] 표준 GLB 바이너리 파일 다운로드 완료: [${state.activePreset.toUpperCase()}]`, "success");
        } else {
            addConsoleLog(`[SYS] Binary GLB model exported successfully: [${state.activePreset.toUpperCase()}]`, "success");
        }
    }, function(error) {
        console.error("GLTF/GLB exporter failed:", error);
        showNotification(
            state.language === 'ko' ? "GLB 내보내기 실패" : "Export Failed",
            state.language === 'ko' ? "3D 지형 파싱 중 오류가 발생했습니다." : "Error occurred during WebGL model parse."
        );
    }, { binary: true });
}

function exportSpecsJSON() {
    playSynthClick(680, 0.08);
    
    const nameInput = document.getElementById('spec-name');
    const categoryInput = document.getElementById('spec-category');
    const weightInput = document.getElementById('spec-param-weight');
    const powerInput = document.getElementById('spec-param-power');
    const thermalInput = document.getElementById('spec-param-thermal');
    
    const productName = nameInput ? nameInput.value : "Hologram Prototype";
    const classification = categoryInput ? categoryInput.value : "PROTO";
    
    const unitId = document.getElementById('tbl-unit-id')?.innerText || "N/A";
    const volume = document.getElementById('tbl-volume')?.innerText || "N/A";
    const stability = document.getElementById('tbl-stability')?.innerText || "N/A";
    const discharge = document.getElementById('tbl-discharge')?.innerText || "N/A";
    const emission = document.getElementById('tbl-emission')?.innerText || "N/A";
    
    const specData = {
        holosynVersion: "3.2-1MakerWorkshop",
        exportedAt: new Date().toISOString(),
        productSpecs: {
            name: productName,
            classification: classification,
            mass: weightInput ? `${weightInput.value} kg` : "N/A",
            powerSystem: powerInput ? `${powerInput.value} W` : "N/A",
            scanDetail: thermalInput ? `${thermalInput.value}%` : "N/A"
        },
        telemetryRealtimeReadout: {
            unitId: unitId,
            unitVolume: volume,
            opticalStability: stability,
            energyDischarge: discharge,
            beamEmissionAngle: emission
        },
        renderingState: {
            renderMode: state.renderMode,
            themeColor: state.themeColor,
            glowIntensity: state.glowIntensity,
            rotationSpeed: state.rotationSpeed,
            explodedDisassemblyLevel: `${Math.round(state.explodedLevel * 100)}%`,
            spatialComputingActive: document.body.classList.contains('spatial-active')
        },
        partAnnotations: partAnnotations[state.activePreset] || []
    };
    
    const output = JSON.stringify(specData, null, 4);
    triggerDownload(output, 'application/json', `${productName.replace(/\s+/g, '_')}_specsheet.json`);
    
    showNotification(
        state.language === 'ko' ? "명세서 다운로드 완료" : "Specs Sheet Exported",
        state.language === 'ko' ? `기기 규격 명세서가 JSON 파일로 저장되었습니다.` : `Saved specifications sheet as formatted JSON.`
    );
    setWorkflowProgress('export', ['model', 'structure', 'present', 'export']);
    markHandoffExportReady();
    
    if (state.language === 'ko') {
        addConsoleLog(`[성공] 규격 명세서 JSON 내보내기 완료: [${productName}]`, "success");
    } else {
        addConsoleLog(`[SYS] Specifications JSON exported: [${productName}]`, "success");
    }
}

function exportSnapshotPNG() {
    const mainCanvas = renderer.domElement;
    const exportCanvas = document.getElementById('export-canvas');
    if (!mainCanvas || !exportCanvas) return;
    
    const ctx = exportCanvas.getContext('2d');
    
    const exportScale = getSpecCardExportScale();
    const baseExportWidth = 1200;
    const baseExportHeight = 700;
    exportCanvas.width = Math.round(baseExportWidth * exportScale);
    exportCanvas.height = Math.round(baseExportHeight * exportScale);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = state.visualQualityBoost ? 'high' : 'medium';
    ctx.save();
    ctx.scale(exportScale, exportScale);
    
    playSynthClick(680, 0.08);
    playSynthSweep(400, 200, 0.35);
    
    showNotification(
        state.language === 'ko' ? "스펙 카드 가공 진행 중" : "Generating Spec Card",
        state.language === 'ko' ? "테크니컬 디자인 스펙 카드 이미지 합성 중..." : "Creating composite dashboard spec card PNG..."
    );
    
    if (state.language === 'ko') {
        addConsoleLog("[내보내기] 초고화질 스펙 카드 디자인 가공 중...", "info");
    } else {
        addConsoleLog("[EXPORT] Rendering high-definition specification card composite...", "info");
    }
    
    // 1. Draw Background (futuristic cyber gradient)
    const grad = ctx.createLinearGradient(0, 0, 1200, 700);
    grad.addColorStop(0, '#0c0e12');
    grad.addColorStop(0.5, '#12151c');
    grad.addColorStop(1, '#080a0d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 700);
    
    // 2. Draw Sci-Fi HUD grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1200; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 700);
        ctx.stroke();
    }
    for (let y = 0; y < 700; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1200, y);
        ctx.stroke();
    }
    
    // 3. Draw Neon Glowing outer frames
    const primaryNeon = state.themeColor || '#00f0ff';
    ctx.strokeStyle = primaryNeon;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    // Using standard rect drawing because roundRect might not be supported in extremely old environments, but modern Canvas has it. To be 100% safe, we can use roundRect or fallback.
    if (ctx.roundRect) {
        ctx.roundRect(24, 24, 1152, 652, 16);
    } else {
        ctx.rect(24, 24, 1152, 652);
    }
    ctx.stroke();
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (ctx.roundRect) {
        ctx.roundRect(32, 32, 1136, 636, 12);
    } else {
        ctx.rect(32, 32, 1136, 636);
    }
    ctx.stroke();
    
    // 4. Draw Corner cyber decals
    ctx.fillStyle = primaryNeon;
    const decSize = 14;
    ctx.fillRect(24, 24, decSize, 3);
    ctx.fillRect(24, 24, 3, decSize);
    
    ctx.fillRect(1176 - decSize, 24, decSize, 3);
    ctx.fillRect(1176, 24, 3, decSize);
    
    ctx.fillRect(24, 676, decSize, 3);
    ctx.fillRect(24, 676 - decSize, 3, decSize);
    
    ctx.fillRect(1176 - decSize, 676, decSize, 3);
    ctx.fillRect(1176, 676 - decSize, 3, decSize);
    
    // 5. Draw 3D Viewport Frame & Snapshot
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 80, 580, 500);
    
    // Force a full high-fidelity render frame immediately
    if (composer) {
        composer.render();
    } else {
        renderer.render(scene, camera);
    }
    
    // Capture and draw 3D WebGL Canvas
    try {
        ctx.drawImage(mainCanvas, 50, 80, 580, 500);
    } catch (e) {
        console.error("Render capture buffer read failed", e);
    }
    
    // Viewport Neon overlay accents
    ctx.strokeStyle = primaryNeon;
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 80, 40, 2);
    ctx.strokeRect(50, 80, 2, 40);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.font = 'bold 9px monospace';
    ctx.fillText("VIEWPORT_3D // REALTIME_RENDER", 65, 72);
    
    // 6. Draw Dashboard Text specs (Right panel)
    const specName = document.getElementById('spec-name') ? document.getElementById('spec-name').value : 'AeroDrone Scout-V';
    const specCategory = document.getElementById('spec-category') ? document.getElementById('spec-category').value : 'PROTOTYPE // UAV';
    
    const weightVal = document.getElementById('readout-weight') ? document.getElementById('readout-weight').innerText : '12 kg';
    const powerVal = document.getElementById('readout-power') ? document.getElementById('readout-power').innerText : '850 W';
    const thermalVal = document.getElementById('readout-thermal') ? document.getElementById('readout-thermal').innerText : '78%';
    
    const unitId = document.getElementById('tbl-unit-id') ? document.getElementById('tbl-unit-id').innerText : 'AERO-V-089A';
    const volume = document.getElementById('tbl-volume') ? document.getElementById('tbl-volume').innerText : '0.45 m³';
    const stability = document.getElementById('tbl-stability') ? document.getElementById('tbl-stability').innerText : '99.84%';
    const discharge = document.getElementById('tbl-discharge') ? document.getElementById('tbl-discharge').innerText : '2.4 kWh';
    const emission = document.getElementById('tbl-emission') ? document.getElementById('tbl-emission').innerText : '32.4°';
    
    // Product Headers
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(specName.toUpperCase(), 670, 130);
    
    ctx.fillStyle = primaryNeon;
    ctx.font = 'bold 13px monospace';
    ctx.fillText(specCategory.toUpperCase() + " // SYSTEM DIAGNOSTIC SHEET", 670, 82);
    
    // Horizontal divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.moveTo(670, 160);
    ctx.lineTo(1120, 160);
    ctx.stroke();
    
    // Data list mapping helper
    const drawSpecRow = (label, value, yPos) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(label.toUpperCase(), 670, yPos);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 15px monospace';
        ctx.fillText(value, 940, yPos);
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.beginPath();
        ctx.moveTo(670, yPos + 10);
        ctx.lineTo(1120, yPos + 10);
        ctx.stroke();
    };
    
    drawSpecRow("MASS / WEIGHT", weightVal, 200);
    drawSpecRow("POWER CONSUMPTION", powerVal, 240);
    drawSpecRow("SCAN RESOLUTION", thermalVal, 280);
    drawSpecRow("UNIT IDENTIFIER", unitId, 320);
    drawSpecRow("DISPLACEMENT VOLUME", volume, 360);
    drawSpecRow("SYSTEM STABILITY", stability, 400);
    drawSpecRow("ENERGY CONVERSION", discharge, 440);
    drawSpecRow("EMISSION BEAM ANGLE", emission, 480);
    
    // Decorative scan diagnostics box at right bottom
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.fillRect(670, 520, 450, 110);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.strokeRect(670, 520, 450, 110);
    
    ctx.fillStyle = primaryNeon;
    ctx.font = 'bold 10px monospace';
    ctx.fillText("QUANTUM HOLOSYN DIAGNOSTIC CORE v4.0", 685, 545);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.font = '9px monospace';
    ctx.fillText(`STATUS: ACTIVE_FEED // HQ: ${state.visualQualityBoost ? 'BOOST' : 'BALANCED'}`, 685, 570);
    ctx.fillText("DATE STAMP: " + new Date().toISOString().replace('T', ' ').substring(0, 19), 685, 590);
    ctx.fillText(`EXPORT RESOLUTION: ${exportCanvas.width} x ${exportCanvas.height} PX // SCALE ${exportScale.toFixed(1)}X`, 685, 610);
    
    // Footer watermark
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.font = 'bold 9px monospace';
    ctx.fillText("HOLOSYN SPECTRAL ANALYSIS WORKSTATION // ALL RIGHTS RESERVED.", 50, 645);
    
    ctx.restore();

    // 7. Trigger file download
    try {
        const link = document.createElement('a');
        link.download = `${specName.replace(/\s+/g, '_')}_SpecSheet.png`;
        link.href = exportCanvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification(
            state.language === 'ko' ? "스펙 카드 저장 성공" : "Spec Card Saved",
            state.language === 'ko' ? "디자인 가공 완료된 PNG 템플릿 파일이 성공적으로 생성되었습니다." : "Technical dashboard sheet compiled and saved."
        );
        setWorkflowProgress('export', ['model', 'structure', 'present', 'export']);
        markHandoffExportReady();
        
        if (state.language === 'ko') {
            addConsoleLog(`[스냅샷] 테크니컬 디자인 스펙 카드를 저장했습니다: ${specName}`, "success");
        } else {
            addConsoleLog(`[SNAP] HD Specification Card saved: ${specName}`, "success");
        }
    } catch (e) {
        if (state.language === 'ko') {
            addConsoleLog(`[오류] 캡처 카드 파일 변환 실패: ${e.message}`, "error");
        } else {
            addConsoleLog(`[ERROR] Card compilation export failed: ${e.message}`, "error");
        }
    }
}
