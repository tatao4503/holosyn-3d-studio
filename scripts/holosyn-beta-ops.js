// HOLOSYN — beta session & ops pack
//
// For the presenter checking their own readiness: a timed five-task test
// session with friction notes and sanitised runtime errors, and the ops
// exports — test plan, benchmark, error report, example pack, deploy
// checklist, release package. Since the app went personal-use these are a
// self-check before a talk, not a deliverable for someone else.
//
// Split out of app.js. Classic script, shared global scope.

function setBetaOpsCheckState(id, isReady) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('pass', !!isReady);
    el.classList.toggle('warn', !isReady);
}

function getBetaOpsSummary() {
    const benchmark = state.betaOps.lastBenchmark;
    const runtimeErrors = getRuntimeErrorSnapshot();
    const checks = {
        test: !!state.betaOps.test,
        perf: !!benchmark && benchmark.averageFps >= 30,
        errors: !!state.betaOps.errors && runtimeErrors.length === 0,
        examples: !!state.betaOps.examples,
        package: !!state.betaOps.package,
        deploy: !!state.betaOps.deploy
    };
    const readyCount = Object.values(checks).filter(Boolean).length;
    const total = Object.keys(checks).length;
    const score = Math.round((readyCount / total) * 100);
    const missing = Object.entries(checks)
        .filter(([, ready]) => !ready)
        .map(([key]) => key);
    let label = 'OPS TODO';
    if (readyCount === total) label = 'OPS READY';
    else if (readyCount >= total - 1) label = 'ALMOST';
    else if (readyCount >= 3) label = 'IN PROGRESS';

    return {
        checks,
        readyCount,
        total,
        score,
        label,
        missing,
        benchmark,
        runtimeErrorCount: runtimeErrors.length,
        lastReportAt: state.betaOps.lastReportAt
    };
}

function getBetaOpsDetail(summary = getBetaOpsSummary()) {
    const ko = state.language === 'ko';
    if (summary.readyCount === summary.total) {
        return ko
            ? `운영 패키지 준비 완료 · ${summary.score}% · 에러 ${summary.runtimeErrorCount}건`
            : `Ops package ready · ${summary.score}% · ${summary.runtimeErrorCount} runtime errors`;
    }

    const labels = {
        test: ko ? '베타 테스트 플랜' : 'beta test plan',
        perf: ko ? `성능 벤치 ${summary.benchmark?.averageFps || '--'} FPS` : `performance benchmark ${summary.benchmark?.averageFps || '--'} FPS`,
        errors: ko ? `에러 리포트/무에러 상태` : 'error report / zero-error state',
        examples: ko ? '예제 프로젝트팩' : 'example project pack',
        package: ko ? '릴리즈 패키지' : 'release package',
        deploy: ko ? '정적 배포 체크리스트' : 'static deploy checklist'
    };
    const next = summary.missing.slice(0, 2).map(key => labels[key] || key).join(', ');
    return ko
        ? `${summary.readyCount} / ${summary.total} 준비 · 다음: ${next}`
        : `${summary.readyCount} / ${summary.total} ready · Next: ${next}`;
}

function updateBetaOpsPanel() {
    const panel = document.getElementById('beta-ops-panel');
    const statusEl = document.getElementById('beta-ops-status');
    const detailEl = document.getElementById('beta-ops-detail');
    if (!panel || !statusEl || !detailEl) return;

    const summary = getBetaOpsSummary();
    setBetaOpsCheckState('ops-check-test', summary.checks.test);
    setBetaOpsCheckState('ops-check-perf', summary.checks.perf);
    setBetaOpsCheckState('ops-check-errors', summary.checks.errors);
    setBetaOpsCheckState('ops-check-examples', summary.checks.examples);
    setBetaOpsCheckState('ops-check-package', summary.checks.package);
    setBetaOpsCheckState('ops-check-deploy', summary.checks.deploy);

    panel.classList.toggle('ready', summary.readyCount === summary.total);
    panel.classList.toggle('pending', summary.readyCount < summary.total);
    statusEl.textContent = `${summary.readyCount} / ${summary.total} ${summary.label}`;
    detailEl.textContent = getBetaOpsDetail(summary);
}

const betaSessionTaskLabels = {
    scene: '장면 준비',
    material: '제품 색상',
    part: '부품 보기',
    structure: '구조 분해',
    handoff: '장면 전달'
};

let betaSessionTimer = null;

function isBetaTestSessionRequested() {
    try {
        return new URL(window.location.href).searchParams.get('test') === '1';
    } catch (error) {
        return false;
    }
}

function getBetaSessionElapsedMs(endAt = null) {
    const startedMs = Date.parse(state.betaSession.startedAt || '');
    if (!Number.isFinite(startedMs)) return 0;
    const endedMs = Date.parse(endAt || state.betaSession.completedAt || '') || Date.now();
    return Math.max(0, endedMs - startedMs);
}

function formatBetaSessionTime(milliseconds) {
    const totalSeconds = Math.floor(Math.max(0, milliseconds) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function renderBetaTestSession() {
    const panel = document.getElementById('beta-session-panel');
    if (!panel || !state.betaSession.active) return;

    const taskEntries = Object.entries(state.betaSession.tasks);
    const completedCount = taskEntries.filter(([, completedAt]) => !!completedAt).length;
    const isComplete = completedCount === taskEntries.length;
    const status = document.getElementById('beta-session-status');
    const timer = document.getElementById('beta-session-timer');
    const progress = document.getElementById('beta-session-progress');

    panel.classList.toggle('complete', isComplete);
    if (status) status.textContent = isComplete ? '5 / 5 완료' : `${completedCount} / ${taskEntries.length} 진행`;
    if (timer) timer.textContent = formatBetaSessionTime(getBetaSessionElapsedMs());
    if (progress) progress.style.width = `${Math.round((completedCount / taskEntries.length) * 100)}%`;

    taskEntries.forEach(([taskId, completedAt]) => {
        const item = document.getElementById(`beta-task-${taskId}`);
        if (!item) return;
        item.classList.toggle('done', !!completedAt);
        const taskStatus = item.querySelector('em');
        if (taskStatus) taskStatus.textContent = completedAt ? 'DONE' : 'WAIT';
    });

    document.querySelectorAll('[data-beta-rating]').forEach(button => {
        const rating = Number(button.getAttribute('data-beta-rating'));
        const selected = state.betaSession.rating === rating;
        button.classList.toggle('active', selected);
        button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
}

function updateBetaTestSession() {
    if (!state.betaSession.active) return;
    const checks = {
        scene: !!state.engineBooted && !!activeModelGroup && activeModelGroup.children.length > 0,
        material: state.materialView === 'product',
        part: !!state.partScanActive && getPartScanList().length > 0,
        structure: state.explodedLevel >= 0.4,
        handoff: !!state.shareStateLastBuilt && state.shareStateLastBuilt !== state.betaSession.shareBaseline
    };
    const completedNow = new Date().toISOString();

    Object.entries(checks).forEach(([taskId, passed]) => {
        if (passed && !state.betaSession.tasks[taskId]) {
            state.betaSession.tasks[taskId] = completedNow;
            addConsoleLog(`[BETA SESSION] ${betaSessionTaskLabels[taskId]} completed.`, 'success');
        }
    });

    const complete = Object.values(state.betaSession.tasks).every(Boolean);
    if (complete && !state.betaSession.completedAt) {
        state.betaSession.completedAt = completedNow;
        state.betaOps.test = true;
        state.betaOps.lastReportAt = completedNow;
        if (betaSessionTimer) {
            clearInterval(betaSessionTimer);
            betaSessionTimer = null;
        }
        updateBetaOpsPanel();
        showNotification(
            state.language === 'ko' ? '사용자 테스트 완료' : 'User Test Complete',
            state.language === 'ko' ? '5가지 핵심 과제를 모두 마쳤습니다. 만족도와 메모를 남겨 리포트를 저장하세요.' : 'All five core tasks are complete. Add a rating and note, then save the report.'
        );
    }
    renderBetaTestSession();
}

function resetExplodedStateForBetaSession() {
    if (explodedAnimationTimer) {
        clearInterval(explodedAnimationTimer);
        explodedAnimationTimer = null;
    }
    state.explodedLevel = 0;
    const tunerExploded = document.getElementById('tuner-exploded');
    const readoutExploded = document.getElementById('readout-exploded');
    if (tunerExploded) tunerExploded.value = '0';
    if (readoutExploded) readoutExploded.textContent = '0%';
    if (activeModelGroup && activeModelGroup.children.length > 0) {
        updateExplodedTranslations(activeModelGroup.children[0]);
    }
}

function startBetaTestSession() {
    if (state.viewerMode) return;
    const panel = document.getElementById('beta-session-panel');
    if (!panel) return;
    if (panel.parentElement !== document.body) document.body.appendChild(panel);

    if (typeof TutorialManager !== 'undefined') {
        if (TutorialManager.isActive) TutorialManager.skip();
        TutorialManager.dismissPrompt();
    }
    if (betaSessionTimer) clearInterval(betaSessionTimer);
    const shareBaseline = state.shareStateLastBuilt;
    state.betaSession = {
        active: true,
        startedAt: new Date().toISOString(),
        completedAt: null,
        shareBaseline,
        rating: null,
        friction: '',
        tasks: {
            scene: null,
            material: null,
            part: null,
            structure: null,
            handoff: null
        }
    };

    if (state.partScanActive) setPartScanActive(false);
    if (state.materialView !== 'hologram') {
        setMaterialView('hologram', { notify: false, broadcast: false, autoFocus: false });
    }
    resetExplodedStateForBetaSession();

    const friction = document.getElementById('beta-session-friction');
    if (friction) friction.value = '';
    panel.hidden = false;
    panel.scrollTop = 0;
    panel.classList.remove('complete');
    document.body.classList.add('beta-test-session');
    renderBetaTestSession();
    const sessionStartedAt = state.betaSession.startedAt;
    setTimeout(() => {
        if (!state.betaSession.active || state.betaSession.startedAt !== sessionStartedAt) return;
        updateBetaTestSession();
        betaSessionTimer = setInterval(updateBetaTestSession, 250);
    }, 120);
    showNotification(
        state.language === 'ko' ? '사용자 테스트 시작' : 'User Test Started',
        state.language === 'ko' ? '화면의 5가지 과제를 순서와 상관없이 직접 수행해보세요.' : 'Complete the five on-screen tasks in any order.'
    );
    addConsoleLog('[BETA SESSION] Anonymous five-task session started.', 'info');
}

function closeBetaTestSession() {
    state.betaSession.active = false;
    if (betaSessionTimer) {
        clearInterval(betaSessionTimer);
        betaSessionTimer = null;
    }
    const panel = document.getElementById('beta-session-panel');
    if (panel) panel.hidden = true;
    document.body.classList.remove('beta-test-session');
}

function sanitizeBetaSessionError(error = {}) {
    const rawSource = typeof error.source === 'string' ? error.source : '';
    let sourceFile = '';
    if (rawSource) {
        try {
            sourceFile = new URL(rawSource, window.location.href).pathname.split('/').filter(Boolean).pop() || '';
        } catch (urlError) {
            sourceFile = rawSource.split(/[\\/]/).filter(Boolean).pop() || '';
        }
    }
    const message = limitSnapshotText(error.message, 'Runtime error', 240)
        .replace(/file:\/\/\/\S+/gi, '[local-file]')
        .replace(/\/Users\/[^/\s]+/g, '/Users/[redacted]');
    return {
        at: limitSnapshotText(error.at, '', 64),
        type: limitSnapshotText(error.type, 'error', 40),
        message,
        sourceFile: limitSnapshotText(sourceFile, '', 80),
        line: Number.isFinite(Number(error.line)) ? Number(error.line) : 0,
        column: Number.isFinite(Number(error.column)) ? Number(error.column) : 0
    };
}

function buildBetaSessionReport() {
    const exportedAt = new Date().toISOString();
    const startedMs = Date.parse(state.betaSession.startedAt || '');
    const tasks = Object.entries(state.betaSession.tasks).map(([id, completedAt]) => ({
        id,
        label: betaSessionTaskLabels[id],
        completed: !!completedAt,
        completedAt,
        secondsFromStart: completedAt && Number.isFinite(startedMs)
            ? Number(((Date.parse(completedAt) - startedMs) / 1000).toFixed(1))
            : null
    }));
    const completedCount = tasks.filter(task => task.completed).length;
    const finalReadiness = getFinalReadinessSummary();
    const runtimeErrors = getRuntimeErrorSnapshot(10).map(sanitizeBetaSessionError);
    const frictionInput = document.getElementById('beta-session-friction');
    const friction = limitSnapshotText(frictionInput?.value || state.betaSession.friction, '', 600);

    return {
        holosynReport: 'anonymous-beta-session-v1',
        exportedAt,
        session: {
            status: completedCount === tasks.length ? 'complete' : 'partial',
            startedAt: state.betaSession.startedAt,
            completedAt: state.betaSession.completedAt,
            durationSeconds: Number((getBetaSessionElapsedMs(state.betaSession.completedAt || exportedAt) / 1000).toFixed(1)),
            completedCount,
            totalTasks: tasks.length,
            tasks
        },
        feedback: {
            satisfaction: state.betaSession.rating,
            friction
        },
        context: {
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                devicePixelRatio: window.devicePixelRatio || 1,
                touch: navigator.maxTouchPoints > 0
            },
            sample: state.activePreset,
            uiMode: state.uiMode,
            partCount: getPartScanList().length,
            importReliability: {
                type: state.importQuality.reliabilityType,
                risk: state.importQuality.reliabilityRisk,
                warningCount: state.importQuality.reliabilityWarnings.length
            }
        },
        quality: {
            finalReadiness: {
                score: finalReadiness.score,
                label: finalReadiness.label
            },
            runtimeErrorCount: runtimeErrors.length,
            runtimeErrors
        },
        privacy: 'No model binary, contact data, full URL, or full browser user agent is included.'
    };
}

function exportBetaSessionReport() {
    if (!state.betaSession.startedAt) {
        startBetaTestSession();
        return;
    }
    const report = buildBetaSessionReport();
    state.betaSession.friction = report.feedback.friction;
    if (report.session.status === 'complete') state.betaOps.test = true;
    state.betaOps.lastReportAt = report.exportedAt;
    triggerDownload(
        JSON.stringify(report, null, 2),
        'application/json',
        `${getExportBaseName(getProductName())}_holosyn_beta_session.json`
    );
    updateBetaOpsPanel();
    showNotification(
        state.language === 'ko' ? '테스트 리포트 저장' : 'Test Report Saved',
        state.language === 'ko'
            ? `${report.session.completedCount}/${report.session.totalTasks} 과제와 익명 피드백을 JSON으로 저장했습니다.`
            : `Saved ${report.session.completedCount}/${report.session.totalTasks} tasks and anonymous feedback as JSON.`
    );
    addConsoleLog(`[BETA SESSION] ${report.session.status} report exported.`, report.session.status === 'complete' ? 'success' : 'warning');
}

function initBetaTestSession() {
    const startButton = document.getElementById('btn-start-beta-session');
    const resetButton = document.getElementById('btn-beta-session-reset');
    const exportButton = document.getElementById('btn-beta-session-export');
    const closeButton = document.getElementById('btn-beta-session-close');
    const friction = document.getElementById('beta-session-friction');

    if (startButton) startButton.addEventListener('click', startBetaTestSession);
    if (resetButton) resetButton.addEventListener('click', startBetaTestSession);
    if (exportButton) exportButton.addEventListener('click', exportBetaSessionReport);
    if (closeButton) closeButton.addEventListener('click', closeBetaTestSession);
    if (friction) {
        friction.addEventListener('input', () => {
            state.betaSession.friction = limitSnapshotText(friction.value, '', 600);
        });
    }
    document.querySelectorAll('[data-beta-rating]').forEach(button => {
        button.addEventListener('click', () => {
            state.betaSession.rating = Number(button.getAttribute('data-beta-rating'));
            renderBetaTestSession();
        });
    });

    if (isBetaTestSessionRequested() && !state.viewerMode) {
        requestAnimationFrame(startBetaTestSession);
    }
}

function getBetaOpsEnvironment() {
    return {
        url: typeof window !== 'undefined' ? window.location.href : 'local',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        language: state.language,
        uiMode: state.uiMode,
        viewport: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'unknown',
        devicePixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
        renderPixelRatioCap: getRenderPixelRatioCap(),
        visualQualityBoost: state.visualQualityBoost,
        webgl: state.betaReadiness.webgl,
        cdn: state.betaReadiness.cdn,
        storage: state.betaReadiness.storage
    };
}

function buildBetaTestPlanMarkdown() {
    const productName = getProductName();
    const finalReadiness = getFinalReadinessSummary();
    const launch = getLaunchReadinessSummary();
    return `# HOLOSYN Beta Test Plan: ${productName}

Generated: ${new Date().toLocaleString()}

## Goal
Validate that a new user can load a prototype, understand the product story, run a short presentation, and export a handoff package without help.

## Current Readiness
- Final Readiness: ${finalReadiness.score}% - ${finalReadiness.label}
- Beta Launch Pack: ${launch.readyCount}/${launch.total} - ${launch.label}
- Import Risk: ${state.importQuality.reliabilityRisk || 'LOW'}
- Active Sample: ${state.activePreset}

## 15-Minute Test Script
1. Open HOLOSYN and boot the engine.
2. Pick one sample and follow NEXT ACTION.
3. Run Part Scan through two components.
4. Apply one Demo Scene Preset.
5. Save a Project Snapshot.
6. Run Final Pass and Beta Launch Check.
7. Export Rehearsal Runbook or Demo Pack.

## Observer Notes
- Did the tester understand what HOLOSYN is within 30 seconds?
- Did any label, button, or panel feel unclear?
- Did FPS stay comfortably above 30 after boot?
- Did export/download behavior work in the tester's browser?
- What was the first moment that felt impressive?
- What was the first moment that felt confusing?

## Pass Criteria
- Tester completes the flow without direct coaching.
- No runtime errors appear in the Error Report.
- Performance Benchmark averages 30 FPS or better.
- Rehearsal Runbook, Demo Pack, or Handoff Manifest is exported.
`;
}

function exportBetaTestPlan() {
    const productName = getProductName();
    state.betaOps.test = true;
    state.betaOps.lastReportAt = new Date().toISOString();
    triggerDownload(
        buildBetaTestPlanMarkdown(),
        'text/markdown;charset=utf-8',
        `${getExportBaseName(productName)}_holosyn_beta_test_plan.md`
    );
    updateBetaOpsPanel();
    showNotification(
        state.language === 'ko' ? '베타 테스트 플랜 생성' : 'Beta Test Plan Saved',
        state.language === 'ko' ? '15분 실사용 검증 스크립트를 Markdown으로 저장했습니다.' : 'Saved the 15-minute user test script as Markdown.'
    );
    addConsoleLog(`[OPS] Beta test plan exported for ${productName}.`, 'success');
}

function runPerformanceBenchmark() {
    const start = performance.now();
    const frames = [];
    const duration = 2400;
    const statusEl = document.getElementById('beta-ops-status');
    if (statusEl) statusEl.textContent = 'BENCHMARK';
    showNotification(
        state.language === 'ko' ? '성능 벤치 시작' : 'Benchmark Started',
        state.language === 'ko' ? '약 2.4초 동안 렌더 프레임을 샘플링합니다.' : 'Sampling render frames for about 2.4 seconds.'
    );

    const sample = (now) => {
        frames.push(now);
        if (now - start < duration) {
            requestAnimationFrame(sample);
            return;
        }

        const elapsedSeconds = Math.max(0.1, (now - start) / 1000);
        const intervals = frames.slice(1).map((time, index) => time - frames[index]).filter(Boolean);
        const averageFps = Math.round(frames.length / elapsedSeconds);
        const worstFrameMs = intervals.length > 0 ? Math.round(Math.max(...intervals)) : 0;
        const result = {
            measuredAt: new Date().toISOString(),
            frames: frames.length,
            elapsedSeconds: Number(elapsedSeconds.toFixed(2)),
            averageFps,
            worstFrameMs,
            pass: averageFps >= 30,
            activePreset: state.activePreset,
            renderMode: state.renderMode,
            materialView: state.materialView,
            partScanActive: !!state.partScanActive,
            partScanIndex: state.partScanIndex,
            visualQualityBoost: state.visualQualityBoost
        };

        state.betaOps.lastBenchmark = result;
        state.betaOps.perf = result.pass;
        updateBetaOpsPanel();
        updateLaunchReadinessPanel();
        showNotification(
            result.pass
                ? (state.language === 'ko' ? '성능 벤치 통과' : 'Benchmark Passed')
                : (state.language === 'ko' ? '성능 벤치 주의' : 'Benchmark Needs Attention'),
            `AVG ${result.averageFps} FPS · Worst frame ${result.worstFrameMs}ms`
        );
        addConsoleLog(`[OPS] Performance benchmark ${result.pass ? 'passed' : 'warn'}: ${result.averageFps} FPS avg, ${result.worstFrameMs}ms worst frame.`, result.pass ? 'success' : 'warning');
    };

    requestAnimationFrame(sample);
}

function buildErrorReportData() {
    return {
        holosynPackage: 'error-report-v1',
        exportedAt: new Date().toISOString(),
        product: getProductName(),
        environment: getBetaOpsEnvironment(),
        runtimeErrors: getRuntimeErrorSnapshot(),
        diagnosticsLog: getDiagnosticsLogSnapshot(),
        readiness: {
            final: getFinalReadinessSummary(),
            launch: getLaunchReadinessSummary(),
            ops: getBetaOpsSummary()
        }
    };
}

function exportErrorReport() {
    const productName = getProductName();
    state.betaOps.errors = true;
    state.betaOps.lastReportAt = new Date().toISOString();
    const report = buildErrorReportData();
    triggerDownload(
        JSON.stringify(report, null, 2),
        'application/json',
        `${getExportBaseName(productName)}_holosyn_error_report.json`
    );
    updateBetaOpsPanel();
    showNotification(
        state.language === 'ko' ? '에러 리포트 생성' : 'Error Report Saved',
        report.runtimeErrors.length === 0
            ? (state.language === 'ko' ? '현재 런타임 에러 없이 진단 로그를 저장했습니다.' : 'Saved diagnostics with no runtime errors captured.')
            : (state.language === 'ko' ? `${report.runtimeErrors.length}개 런타임 에러를 포함해 저장했습니다.` : `Saved ${report.runtimeErrors.length} captured runtime errors.`)
    );
    addConsoleLog(`[OPS] Error report exported with ${report.runtimeErrors.length} runtime error(s).`, report.runtimeErrors.length === 0 ? 'success' : 'warning');
}

function buildExamplePackData() {
    const samples = Object.entries(samplePrototypeCatalog).map(([key, sample]) => ({
        id: key,
        label: sample.label,
        source: sample.source,
        meshes: sample.meshes,
        fit: sample.fit,
        recommendedDemoPreset: Object.entries(demoPresetScenarios).find(([, scenario]) => scenario.preset === key)?.[0] || 'manual',
        partMapCount: (partAnnotations[key] || []).length
    }));
    return {
        holosynPackage: 'example-pack-v1',
        exportedAt: new Date().toISOString(),
        samples,
        demoPresets: Object.entries(demoPresetScenarios).map(([key, scenario]) => ({
            id: key,
            label: scenario.label,
            preset: scenario.preset,
            renderMode: scenario.renderMode,
            environment: scenario.environment,
            keyframes: scenario.keyframes.length
        })),
        suggestedFirstRun: ['drone', 'exosuit'],
        notes: [
            'Use built-in examples for beta onboarding before asking testers to import custom files.',
            'For imported models, prefer multi-part GLB/OBJ files with readable mesh names.'
        ]
    };
}

function exportExamplePack() {
    const productName = getProductName();
    state.betaOps.examples = true;
    state.betaOps.lastReportAt = new Date().toISOString();
    triggerDownload(
        JSON.stringify(buildExamplePackData(), null, 2),
        'application/json',
        `${getExportBaseName(productName)}_holosyn_example_pack.json`
    );
    updateBetaOpsPanel();
    showNotification(
        state.language === 'ko' ? '예제팩 생성' : 'Example Pack Saved',
        state.language === 'ko' ? '샘플 모델과 데모 프리셋 목록을 JSON으로 저장했습니다.' : 'Saved sample models and demo preset metadata as JSON.'
    );
    addConsoleLog(`[OPS] Example pack exported for ${productName}.`, 'success');
}

function buildDeploymentChecklistMarkdown() {
    const productName = getProductName();
    return `# HOLOSYN Static Deployment Checklist: ${productName}

Generated: ${new Date().toLocaleString()}

## Required Files
- index.html
- index.css
- app.js
- scripts/holosyn-timeline.js
- scripts/holosyn-pro-managers.js
- README.md
- DEMO_SCRIPT.md
- HOLOSYN 실행.command

## Pre-Deploy Gates
- Run: node scripts/smoke-check.mjs
- Open a local server, not raw file://, for final QA.
- Boot the engine and verify WebGL/CDN/storage in Beta Preflight.
- Run Performance Benchmark and confirm 30 FPS or better.
- Export Error Report and confirm zero runtime errors.
- Export Rehearsal Runbook or Demo Pack for reviewer handoff.

## Hosting Notes
- This is a static app; any HTTPS static host can serve it.
- Keep CDN access available for Three.js, Lucide, and fonts unless vendored locally.
- Custom user files are not uploaded by HOLOSYN; imported files stay in the browser session.
- Project Snapshots store presentation state, not embedded custom 3D model binaries.
`;
}

function exportDeploymentChecklist() {
    const productName = getProductName();
    state.betaOps.deploy = true;
    state.betaOps.lastReportAt = new Date().toISOString();
    triggerDownload(
        buildDeploymentChecklistMarkdown(),
        'text/markdown;charset=utf-8',
        `${getExportBaseName(productName)}_holosyn_deploy_checklist.md`
    );
    updateBetaOpsPanel();
    showNotification(
        state.language === 'ko' ? '배포 체크리스트 생성' : 'Deploy Checklist Saved',
        state.language === 'ko' ? '정적 배포 전 확인 항목을 Markdown으로 저장했습니다.' : 'Saved the static deployment checklist as Markdown.'
    );
    addConsoleLog(`[OPS] Deployment checklist exported for ${productName}.`, 'success');
}

function buildBetaReleasePackageData() {
    const productName = getProductName();
    const snapshot = getStoredProjectSnapshot() || buildProjectSnapshot();
    return {
        holosynPackage: 'beta-release-package-v1',
        exportedAt: new Date().toISOString(),
        product: {
            name: productName,
            category: document.getElementById('spec-category')?.value || 'PROTO'
        },
        readiness: {
            final: getFinalReadinessSummary(),
            launch: getLaunchReadinessSummary(),
            ops: getBetaOpsSummary(),
            betaPreflight: state.betaReadiness,
            importQuality: state.importQuality
        },
        reports: {
            betaTestPlanMarkdown: buildBetaTestPlanMarkdown(),
            deploymentChecklistMarkdown: buildDeploymentChecklistMarkdown(),
            errorReport: buildErrorReportData(),
            examplePack: buildExamplePackData()
        },
        projectSnapshot: snapshot,
        handoffManifest: buildHandoffManifestData(snapshot),
        demoPack: buildDemoPackData(snapshot),
        recommendedFiles: getRecommendedHandoffFiles(productName)
    };
}

function exportBetaReleasePackage() {
    const productName = getProductName();
    state.betaOps.package = true;
    state.betaOps.lastReportAt = new Date().toISOString();
    const releasePackage = buildBetaReleasePackageData();
    triggerDownload(
        JSON.stringify(releasePackage, null, 2),
        'application/json',
        `${getExportBaseName(productName)}_holosyn_beta_release_package.json`
    );
    updateBetaOpsPanel();
    showNotification(
        state.language === 'ko' ? '베타 릴리즈 패키지 생성' : 'Beta Release Package Saved',
        state.language === 'ko' ? '테스트, 에러, 예제, 배포, 스냅샷 자료를 하나로 묶었습니다.' : 'Bundled test, error, example, deploy, and snapshot materials.'
    );
    addConsoleLog(`[OPS] Beta release package exported for ${productName}.`, 'success');
}

// Test-harness API. Lives here, after the declarations it names: a load-time
// reference to a function in a later script aborts the whole file.
if (typeof window !== 'undefined') {
    window.getBetaOpsSummary = getBetaOpsSummary;
    window.HolosynBetaSession = Object.freeze({
        start: startBetaTestSession,
        close: closeBetaTestSession,
        update: updateBetaTestSession,
        buildReport: buildBetaSessionReport
    });
}
