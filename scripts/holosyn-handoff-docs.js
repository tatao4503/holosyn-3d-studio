// HOLOSYN — handoff documents
//
// The things a presenter hands to someone else: client brief and rehearsal
// runbook as Markdown, the handoff manifest and demo pack as JSON. They read
// state and the stored snapshot; they own no state of their own.
//
// Split out of app.js. Classic script, shared global scope.

function getRecommendedHandoffFiles(productName) {
    const baseName = getExportBaseName(productName);
    return [
        `${baseName}_SpecSheet.png`,
        `${baseName}_specsheet.json`,
        `${state.activePreset}_prototype.glb`,
        `${baseName}_holosyn_client_brief.md`,
        `${baseName}_holosyn_rehearsal_runbook.md`,
        `${baseName}_holosyn_project_snapshot.json`,
        `${baseName}_holosyn_handoff_manifest.json`,
        `${baseName}_holosyn_demo_pack.json`,
        'holosyn-timeline-*.json'
    ];
}

function buildClientBriefMarkdown() {
    const specs = getProductSpecState();
    const productName = specs.name || 'Holosyn Prototype';
    const scenario = state.activeDemoPreset && demoPresetScenarios[state.activeDemoPreset]
        ? demoPresetScenarios[state.activeDemoPreset]
        : null;
    const partMap = buildPartMapSummary(8);
    const quality = state.importQuality || {};
    const finalReadiness = getFinalReadinessSummary();
    const labels = state.language === 'ko'
        ? {
            title: 'HOLOSYN 고객 브리프',
            summary: '시연 요약',
            product: '제품',
            classification: '분류',
            sample: '활성 샘플',
            demo: '데모 흐름',
            import: '임포트 품질',
            spec: '핵심 스펙',
            telemetry: '실시간 텔레메트리',
            presentation: '발표 세팅',
            parts: '부품 설명 포인트',
            currentFocus: '현재 포커스',
            readiness: '최종 준비도',
            timeline: '타임라인',
            handoff: '핸드오프 체크',
            next: '권장 전달 파일',
            ready: '준비됨',
            pending: '보강 필요',
            manual: '수동 구성',
            none: '없음'
        }
        : {
            title: 'HOLOSYN Client Brief',
            summary: 'Demo Summary',
            product: 'Product',
            classification: 'Classification',
            sample: 'Active Sample',
            demo: 'Demo Flow',
            import: 'Import Quality',
            spec: 'Core Specs',
            telemetry: 'Realtime Telemetry',
            presentation: 'Presentation Setup',
            parts: 'Component Talking Points',
            currentFocus: 'Current Focus',
            readiness: 'Final Readiness',
            timeline: 'Timeline',
            handoff: 'Handoff Checklist',
            next: 'Recommended Deliverables',
            ready: 'Ready',
            pending: 'Needs attention',
            manual: 'Manual',
            none: 'None'
        };

    const handoffLabels = {
        model: 'Model',
        demo: 'Demo',
        timeline: 'Timeline',
        export: 'Export'
    };
    const handoffChecklist = Object.entries(state.handoffReady)
        .map(([key, ready]) => `- [${ready ? 'x' : ' '}] ${handoffLabels[key] || key}: ${ready ? labels.ready : labels.pending}`)
        .join('\n');
    const partsMarkdown = partMap.parts.length > 0
        ? partMap.parts.map(item => `${item.index}. ${item.title} — ${item.description}`).join('\n')
        : `- ${labels.none}`;
    const timelineLabel = state.timelineKeyframes.length > 0
        ? `${state.timelineKeyframes.length} keyframes / ${state.timelineDuration}s`
        : labels.none;

    return `# ${labels.title}: ${productName}

Generated: ${new Date().toLocaleString()}

## ${labels.summary}
- ${labels.product}: ${productName}
- ${labels.classification}: ${specs.category || 'PROTO'}
- ${labels.sample}: ${state.activePreset}
- ${labels.demo}: ${scenario?.label || state.activeDemoPreset || labels.manual}
- ${labels.currentFocus}: ${partMap.currentFocus ? partMap.currentFocus.title : labels.none}
- Part Map: ${partMap.total} components${partMap.exported < partMap.total ? ` / ${partMap.exported} listed` : ''}
- ${labels.readiness}: ${finalReadiness.score}% · ${finalReadiness.label}

## ${labels.import}
- Status: ${quality.statusLabel || quality.status || 'READY'}
- Source: ${quality.source || '-'}
- Meshes: ${quality.meshes || '-'}
- Fit: ${quality.fit || '-'}
- Type: ${quality.reliabilityType || '-'}
- Scale: ${quality.reliabilityScale || '-'}
- Parts: ${quality.reliabilityParts || '-'}
- Risk: ${quality.reliabilityRisk || 'LOW'}
- Note: ${quality.note || '-'}

## ${labels.spec}
- Mass: ${document.getElementById('readout-weight')?.innerText || `${specs.weight} kg`}
- Power System: ${document.getElementById('readout-power')?.innerText || `${specs.power} W`}
- Scan Detail: ${document.getElementById('readout-thermal')?.innerText || `${specs.thermal}%`}

## ${labels.telemetry}
- Unit ID: ${specs.telemetry.unitId}
- Volume: ${specs.telemetry.volume}
- Stability: ${specs.telemetry.stability}
- Energy Discharge: ${specs.telemetry.discharge}
- Emission Angle: ${specs.telemetry.emission}

## ${labels.presentation}
- Render Mode: ${state.renderMode}
- Camera Mode: ${state.cameraMode}
- Environment: ${state.studioEnvironment}
- Exploded View: ${Math.round(state.explodedLevel * 100)}%
- Theme Color: ${state.themeColor}
- ${labels.timeline}: ${timelineLabel}

## ${labels.parts}
${partsMarkdown}

## ${labels.handoff}
${handoffChecklist}

## ${labels.next}
${getRecommendedHandoffFiles(productName).slice(0, 6).map(file => `- ${file}`).join('\n')}
`;
}

function buildRehearsalRunbookMarkdown() {
    const specs = getProductSpecState();
    const productName = specs.name || 'Holosyn Prototype';
    const finalReadiness = getFinalReadinessSummary();
    const finalPass = getFinalPassSummary();
    const quality = state.importQuality || {};
    const risks = getRehearsalRiskList();
    const partMap = buildPartMapSummary(6);
    const scenario = state.activeDemoPreset && demoPresetScenarios[state.activeDemoPreset]
        ? demoPresetScenarios[state.activeDemoPreset]
        : null;
    const riskMarkdown = risks.map(item => `- ${item}`).join('\n');
    const partsMarkdown = partMap.parts.length > 0
        ? partMap.parts.map(item => `${item.index}. ${item.title} - ${item.description}`).join('\n')
        : '- No mapped components yet.';
    const notesMarkdown = state.presenterNotes.length > 0
        ? state.presenterNotes.map((note, index) => `${index + 1}. ${note.context?.preset || state.activePreset} / ${note.context?.demoPreset || 'manual'} / ${Number(note.context?.timelineTime || 0).toFixed(1)}s - ${note.text}`).join('\n')
        : '- No presenter notes saved yet.';
    const measurementMarkdown = state.savedMeasurements.length > 0
        ? state.savedMeasurements.map(item => `- ${item.label || 'M'}: ${item.distanceText || `${item.distanceMm} mm`} (${item.preset || state.activePreset})`).join('\n')
        : '- No saved dimensions yet.';

    return `# HOLOSYN Rehearsal Runbook: ${productName}

Generated: ${new Date().toLocaleString()}

## Current Readiness
- Final Readiness: ${finalReadiness.score}% - ${finalReadiness.label}
- Final Pass: ${finalPass.label}
- Import Risk: ${quality.reliabilityRisk || 'LOW'} (${quality.reliabilityType || 'SAMPLE'} / ${quality.reliabilityParts || '-'})
- Demo Flow: ${scenario?.label || state.activeDemoPreset || 'Manual'}
- Part Map: ${partMap.total} components${partMap.exported < partMap.total ? ` / ${partMap.exported} listed` : ''}
- Presenter Notes: ${state.presenterNotes.length}
- Saved Dimensions: ${state.savedMeasurements.length}

## 30-Second Run
1. Boot HOLOSYN and confirm the product name.
2. Confirm Import Quality and follow NEXT ACTION.
3. Show one Structure or Part Scan moment.
4. Trigger Showcase or Demo Run.
5. Run Final Pass and export Demo Pack or Rehearsal Runbook.

## 3-Minute Run
1. Model - load the sample or imported prototype and explain the use case.
2. Structure - open exploded view, then Part Scan through two key components.
3. Present - apply the chosen Demo Scene Preset and replay Timeline or Showcase.
4. Final Pass - confirm HQ Boost, Project Snapshot, and Export readiness.
5. Handoff - save Demo Pack, Client Brief, Handoff Manifest, or PNG as needed.

## Risk Check
${riskMarkdown}

## Component Talking Points
${partsMarkdown}

## Presenter Notes
${notesMarkdown}

## Saved Dimensions
${measurementMarkdown}

## Recommended Files
${getRecommendedHandoffFiles(productName).slice(0, 7).map(file => `- ${file}`).join('\n')}
`;
}

function exportClientBriefMarkdown() {
    const productName = getProductName();
    markHandoffExportReady();
    const markdown = buildClientBriefMarkdown();
    triggerDownload(
        markdown,
        'text/markdown;charset=utf-8',
        `${getExportBaseName(productName)}_holosyn_client_brief.md`
    );
    const statusEl = document.getElementById('client-brief-status');
    if (statusEl) {
        statusEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    showNotification(
        state.language === 'ko' ? '고객 브리프 생성' : 'Client Brief Saved',
        state.language === 'ko' ? '현재 시연 세팅을 Markdown 공유 문서로 저장했습니다.' : 'Saved the current demo setup as a Markdown sharing brief.'
    );
    addConsoleLog(`[BRIEF] Client-ready Markdown brief exported for ${productName}.`, 'success');
}

function exportRehearsalPack() {
    const productName = getProductName();
    markHandoffExportReady();
    const markdown = buildRehearsalRunbookMarkdown();
    triggerDownload(
        markdown,
        'text/markdown;charset=utf-8',
        `${getExportBaseName(productName)}_holosyn_rehearsal_runbook.md`
    );
    const statusEl = document.getElementById('rehearsal-pack-status');
    if (statusEl) {
        statusEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    showNotification(
        state.language === 'ko' ? '리허설 런북 생성' : 'Rehearsal Runbook Saved',
        state.language === 'ko' ? '30초/3분 발표 루틴과 리스크 체크를 Markdown으로 저장했습니다.' : 'Saved the 30-second and 3-minute rehearsal runbook as Markdown.'
    );
    addConsoleLog(`[REHEARSAL] Runbook exported for ${productName}.`, 'success');
}

function buildHandoffManifestData(savedSnapshot = getStoredProjectSnapshot()) {
    const productName = getProductName();
    const partMap = buildPartMapSummary();
    const finalReadiness = getFinalReadinessSummary();
    return {
        holosynPackage: 'handoff-manifest-v1',
        exportedAt: new Date().toISOString(),
        product: {
            name: productName,
            classification: document.getElementById('spec-category')?.value || 'PROTO',
            activeSample: state.activePreset,
            activeDemoPreset: state.activeDemoPreset || 'manual'
        },
        importQuality: state.importQuality,
        partMap,
        nextAction: getHandoffNextAction(),
        finalReadiness,
        presentation: {
            renderMode: state.renderMode,
            materialView: state.materialView,
            cameraMode: state.cameraMode,
            environment: state.studioEnvironment,
            explodedLevel: Math.round(state.explodedLevel * 100),
            timelineKeyframes: state.timelineKeyframes.length
        },
        quality: {
            visualQualityBoost: state.visualQualityBoost,
            renderPixelRatioCap: getRenderPixelRatioCap(),
            specCardExportScale: getSpecCardExportScale(),
            finalPass: getFinalPassSummary()
        },
        rehearsal: {
            runbookRecommended: true,
            risks: getRehearsalRiskList()
        },
        presenterNotes: state.presenterNotes,
        savedMeasurements: state.savedMeasurements,
        launchReadiness: getLaunchReadinessSummary(),
        betaOps: getBetaOpsSummary(),
        recommendedFiles: getRecommendedHandoffFiles(productName),
        projectSnapshot: {
            available: !!savedSnapshot,
            lastSavedAt: savedSnapshot?.savedAt || null
        },
        checklist: state.handoffReady
    };
}

function buildDemoPackData(snapshot = null) {
    const productName = getProductName();
    const projectSnapshot = snapshot || getStoredProjectSnapshot() || buildProjectSnapshot();
    const handoffManifest = buildHandoffManifestData(projectSnapshot);
    const briefMarkdown = buildClientBriefMarkdown();
    const rehearsalRunbookMarkdown = buildRehearsalRunbookMarkdown();
    const lang = state.language === 'ko' ? 'ko' : 'en';
    const quickStart = lang === 'ko'
        ? [
            'HOLOSYN을 열고 프로젝트 스냅샷을 복원합니다.',
            '브리프 Markdown을 고객/팀 공유 문서로 사용합니다.',
            'PNG 캡처와 GLB는 필요할 때 별도로 내보냅니다.',
            '핸드오프 매니페스트의 체크리스트로 시연 준비 상태를 확인합니다.'
        ]
        : [
            'Open HOLOSYN and restore the project snapshot.',
            'Use the Markdown brief as the customer/team summary.',
            'Export PNG capture and GLB separately when needed.',
            'Use the handoff manifest checklist to confirm demo readiness.'
        ];

    return {
        holosynPackage: 'demo-pack-v1',
        exportedAt: new Date().toISOString(),
        product: handoffManifest.product,
        partMap: handoffManifest.partMap,
        quickStart,
        contents: {
            clientBriefMarkdown: briefMarkdown,
            rehearsalRunbookMarkdown,
            presenterNotesMarkdown: buildPresenterNotesMarkdown(),
            handoffManifest,
            projectSnapshot,
            savedMeasurements: state.savedMeasurements
        },
        recommendedFiles: {
            includedInThisPack: [
                `${getExportBaseName(productName)}_holosyn_client_brief.md`,
                `${getExportBaseName(productName)}_holosyn_rehearsal_runbook.md`,
                `${getExportBaseName(productName)}_holosyn_presenter_notes.md`,
                `${getExportBaseName(productName)}_holosyn_measurements.json`,
                `${getExportBaseName(productName)}_holosyn_handoff_manifest.json`,
                `${getExportBaseName(productName)}_holosyn_project_snapshot.json`
            ],
            optionalBrowserExports: [
                `${getExportBaseName(productName)}_SpecSheet.png`,
                `${getExportBaseName(productName)}_specsheet.json`,
                `${state.activePreset}_prototype.glb`,
                'holosyn-timeline-*.json'
            ]
        },
        readiness: {
            final: handoffManifest.finalReadiness,
            handoff: state.handoffReady,
            beta: state.betaReadiness,
            importQuality: state.importQuality,
            finalPass: getFinalPassSummary(),
            launch: getLaunchReadinessSummary(),
            ops: getBetaOpsSummary()
        }
    };
}

function exportHandoffManifest() {
    const productName = getProductName();
    markHandoffExportReady();
    const manifest = buildHandoffManifestData();

    triggerDownload(
        JSON.stringify(manifest, null, 2),
        'application/json',
        `${getExportBaseName(productName)}_holosyn_handoff_manifest.json`
    );
    showNotification(
        state.language === 'ko' ? '핸드오프 매니페스트 생성' : 'Handoff Manifest Saved',
        state.language === 'ko' ? '시연 구성, 품질 상태, 권장 산출물 목록을 JSON으로 저장했습니다.' : 'Saved demo setup, quality status, and recommended export list as JSON.'
    );
    addConsoleLog(`[HANDOFF] Manifest package exported for ${productName}.`, 'success');
}

function exportDemoPack() {
    if (!state.engineBooted || !activeModelGroup || activeModelGroup.children.length === 0) {
        showNotification(
            state.language === 'ko' ? '엔진 기동 필요' : 'Boot Required',
            state.language === 'ko' ? '먼저 HOLOSYN 엔진을 기동하고 모델을 불러온 뒤 시연 패키지를 생성하세요.' : 'Boot HOLOSYN and load a model before generating the demo pack.'
        );
        return;
    }

    const productName = getProductName();
    markHandoffExportReady();
    const savedSnapshot = saveProjectSnapshot({ silent: true }) || buildProjectSnapshot();
    const demoPack = buildDemoPackData(savedSnapshot);
    triggerDownload(
        JSON.stringify(demoPack, null, 2),
        'application/json',
        `${getExportBaseName(productName)}_holosyn_demo_pack.json`
    );

    const statusEl = document.getElementById('demo-pack-status');
    if (statusEl) {
        statusEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    showNotification(
        state.language === 'ko' ? '시연 패키지 생성' : 'Demo Pack Saved',
        state.language === 'ko' ? '브리프, 스냅샷, 핸드오프 매니페스트를 하나의 패키지로 저장했습니다.' : 'Saved the brief, snapshot, and handoff manifest into one demo package.'
    );
    addConsoleLog(`[DEMO PACK] One-click demo pack exported for ${productName}.`, 'success');
}

if (typeof window !== 'undefined') {
    window.HolosynClientBrief = {
        build: buildClientBriefMarkdown,
        exportMarkdown: exportClientBriefMarkdown,
        buildRehearsalRunbook: buildRehearsalRunbookMarkdown,
        exportRehearsalRunbook: exportRehearsalPack
    };
}
