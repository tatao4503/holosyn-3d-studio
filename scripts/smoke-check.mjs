#!/usr/bin/env node
import { access, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const requiredFiles = [
  'index.html',
  'index.css',
  'app.js',
  'scripts/holosyn-timeline.js',
  'scripts/holosyn-pro-managers.js',
  'README.md',
  'DEMO_SCRIPT.md',
  'HOLOSYN 실행.command',
];

const htmlSelectors = [
  'btn-boot-system',
  'btn-demo-run',
  'btn-final-pass',
  'flow-coach',
  'timeline-editor',
  'btn-toggle-timeline',
  'btn-collab-toggle',
  'collab-module-status',
  'btn-ai-chat-toggle',
  'ai-key-status',
  'btn-use-api-key-session',
  'btn-clear-api-key',
  'mobile-toolbar',
  'btn-quality-boost',
  'quality-boost-status',
  'tutorial-prompt-modal',
  'import-quality-card',
  'import-quality-status',
  'import-quality-source',
  'import-quality-meshes',
  'import-quality-fit',
  'import-reliability-type',
  'import-reliability-scale',
  'import-reliability-parts',
  'import-reliability-risk',
  'import-quality-note',
  'import-quality-next-action',
  'import-quality-action-text',
  'btn-import-quality-action',
  'import-quality-action-button-label',
  'demo-preset-status',
  'demo-pack-panel',
  'demo-pack-status',
  'btn-export-demo-pack',
  'rehearsal-pack-panel',
  'rehearsal-pack-status',
  'btn-export-rehearsal-pack',
  'btn-export-handoff-pack',
  'client-brief-panel',
  'client-brief-status',
  'btn-export-client-brief',
  'handoff-pack-status',
  'handoff-check-model',
  'handoff-check-demo',
  'handoff-check-timeline',
  'handoff-check-export',
  'handoff-part-map-summary',
  'handoff-part-map-count',
  'handoff-next-action',
  'handoff-next-action-text',
  'final-readiness-panel',
  'final-readiness-score',
  'final-readiness-label',
  'final-readiness-detail',
  'final-pass-panel',
  'final-pass-status',
  'final-pass-detail',
  'final-pass-check-model',
  'final-pass-check-hq',
  'final-pass-check-snapshot',
  'final-pass-check-export',
  'btn-run-final-pass',
  'beta-readiness-panel',
  'beta-readiness-status',
  'beta-check-webgl',
  'beta-check-cdn',
  'beta-check-storage',
  'beta-check-model',
  'beta-check-snapshot',
  'launch-readiness-panel',
  'launch-readiness-status',
  'launch-check-guide',
  'launch-check-import',
  'launch-check-performance',
  'launch-check-snapshot',
  'launch-check-export',
  'launch-check-docs',
  'launch-readiness-fill',
  'launch-readiness-detail',
  'btn-run-launch-check',
  'beta-ops-panel',
  'beta-ops-status',
  'ops-check-test',
  'ops-check-perf',
  'ops-check-errors',
  'ops-check-examples',
  'ops-check-package',
  'ops-check-deploy',
  'beta-ops-detail',
  'btn-export-beta-test-plan',
  'btn-run-performance-benchmark',
  'btn-export-error-report',
  'btn-export-example-pack',
  'btn-export-deploy-checklist',
  'btn-export-release-package',
  'project-snapshot-panel',
  'project-snapshot-status',
  'btn-save-project-snapshot',
  'btn-restore-project-snapshot',
  'btn-export-project-snapshot',
  'btn-part-scan',
  'btn-part-scan-card',
  'btn-part-scan-prev',
  'btn-part-scan-next',
  'part-scan-panel',
  'part-scan-title',
  'part-scan-desc',
  'part-scan-counter',
  'part-scan-map',
  'part-scan-map-count',
  'part-scan-map-track',
  'gesture-pilot-panel',
  'gesture-pilot-mode',
  'gesture-pilot-fill',
  'gesture-pilot-spin',
  'gesture-pilot-explode',
  'presentation-mode-status',
];

const appNeedles = [
  'scripts/holosyn-timeline.js so the',
  'const samplePrototypeCatalog',
  'const demoPresetScenarios',
  'function initProductizationControls',
  'function applyDemoPreset',
  'function exportHandoffManifest',
  'function buildDemoPackData',
  'function exportDemoPack',
  'function buildClientBriefMarkdown',
  'function exportClientBriefMarkdown',
  'function buildRehearsalRunbookMarkdown',
  'function exportRehearsalPack',
  'rehearsalRunbookMarkdown',
  'function getRehearsalRiskList',
  'function buildPartMapSummary',
  'window.HolosynClientBrief',
  'function getImportQualityActionDefaults',
  'function getImportReliabilityReport',
  'function updateImportQualityFromModel',
  'reliabilityRisk',
  'function runImportQualityAction',
  'function updateHandoffPackStatus',
  'function updateHandoffPartMapStatus',
  'function getHandoffNextAction',
  'function updateHandoffNextAction',
  'function runHandoffChecklistAction',
  'box.dataset.handoffAction',
  'function getFinalReadinessSummary',
  'function updateFinalReadinessScore',
  'function getLaunchReadinessSummary',
  'function updateLaunchReadinessPanel',
  'function runLaunchReadinessCheck',
  'launchReadiness: getLaunchReadinessSummary()',
  'function getBetaOpsSummary',
  'function updateBetaOpsPanel',
  'function buildBetaTestPlanMarkdown',
  'function runPerformanceBenchmark',
  'function buildErrorReportData',
  'function buildExamplePackData',
  'function buildDeploymentChecklistMarkdown',
  'function buildBetaReleasePackageData',
  'betaOps: getBetaOpsSummary()',
  'window.getBetaOpsSummary = getBetaOpsSummary',
  'const finalReadiness = getFinalReadinessSummary()',
  'final: handoffManifest.finalReadiness',
  'function getFinalPassSummary',
  'function updateFinalPassPanel',
  'function runFinalPass',
  'quality: {',
  'finalPass: getFinalPassSummary()',
  'function updateBetaReadinessPanel',
  'function buildProjectSnapshot',
  'function saveProjectSnapshot',
  'function restoreProjectSnapshot',
  'function exportProjectSnapshot',
  'function applyProjectSnapshot',
  'function createForgeExoSuitGeometry',
  'function applyPartPalette',
  'function initVoiceRecognition',
  'const fanExperimentConfig',
  'function applyLocalFanExperimentCopy',
  'const partScanRoleHints',
  'const defaultCustomPartAnnotations',
  'function inferImportedPartRole',
  'function rebuildCustomPartAnnotations',
  'function setPartScanActive',
  'function cyclePartScan',
  'function renderPartScanMap',
  'function jumpToPartScanIndex',
  'partMap: buildPartMapSummary()',
  'partMap: handoffManifest.partMap',
  'nextAction: getHandoffNextAction()',
  'function applyPartScanVisuals',
  'child instanceof THREE.Group || child.isMesh',
  'function syncPartScanLayout',
  'function initGesturePilotControls',
  'function setGestureExplodedLevel',
  'function updateGesturePilotPanel',
  'presentationPartScanWasActive',
  'paletteWireOpacity',
  'visualQualityBoost: true',
  'function getRenderPixelRatioCap',
  'function getRenderPixelRatio',
  'function getSpecCardExportScale',
  'function toggleQualityBoost',
  'renderer.setPixelRatio(getRenderPixelRatio())',
  'ctx.scale(exportScale, exportScale)',
  'ctx.imageSmoothingQuality',
  'EXPORT RESOLUTION:',
  'new THREE.UnrealBloomPass',
  'Rendering high-definition specification card composite',
  'Force a full high-fidelity render frame immediately',
  'EXO BUILD-II PROTOTYPE',
  'FORGE DYNAMICS',
  'faceplate',
  'eye-r',
  'reactor-core',
  'palm-emitter-r',
  'boot-jet-r',
  "preset: 'exosuit'",
];

const timelineNeedles = [
  'function initTimelineEditor',
  'function setTimelinePanelOpen',
  'function captureKeyframe',
  'function exportTimelineAsJSON',
  'function importTimelineFromJSON',
  'function playTimeline',
  'function pauseTimeline',
  'function updateTimelinePlayback',
  'markHandoffExportReady',
  'function handleRemoteTimeline',
  'function handleRemoteKeyframes',
  'window.HolosynTimeline',
];

const managerNeedles = [
  'const CollabManager',
  'isPeerAvailable()',
  'typeof window.Peer',
  'new window.Peer',
  'showPeerUnavailable()',
  'const AiAssistantManager',
  'readStorage(scope, key)',
  'updateKeyStatus()',
  'markTourSignal(value)',
  'dismissPrompt()',
  'window.CollabManager = CollabManager',
  'window.AiAssistantManager = AiAssistantManager',
  'window.TutorialManager = TutorialManager',
];

const cssNeedles = [
  '.timeline-editor-panel.panel-open',
  '#tutorial-prompt-modal.tutorial-prompt-dock',
  '.collab-module-status.unavailable',
  '.ai-key-status.session',
  '#viewport-annotation-hint',
  '.import-quality-card',
  '.import-reliability-grid',
  '.import-quality-next-action',
  '.import-quality-action-copy',
  '.import-quality-action-btn',
  '.demo-presets-panel',
  '.demo-pack-panel',
  '.demo-pack-copy',
  '.rehearsal-pack-panel',
  '.rehearsal-pack-copy',
  '.handoff-pack-panel',
  '.client-brief-panel',
  '.client-brief-copy',
  '.handoff-checklist button.done',
  '.handoff-part-map-summary.ready',
  '.handoff-next-action.ready',
  '.handoff-next-action.blocked',
  '.handoff-next-action:hover',
  '.final-readiness-panel.handoff',
  '.final-readiness-panel.rehearsal',
  '.final-readiness-detail',
  '.beta-readiness-panel',
  '.beta-checklist span.pass',
  '.launch-readiness-panel',
  '.launch-readiness-panel.ready',
  '.launch-checklist span.pass',
  '.launch-readiness-meter',
  '.beta-ops-panel',
  '.beta-ops-panel.ready',
  '.beta-ops-checklist span.pass',
  '.beta-ops-actions',
  '.project-snapshot-panel',
  '.project-snapshot-actions',
  '.part-scan-panel.active',
  '.part-scan-map-chip.active',
  '.part-scan-map-track',
  '.part-scan-toggle.active',
  '.insight-icon-btn.active',
  '.annotation-badge.part-scan-focus',
  '.gesture-pilot-panel',
  '.gesture-pilot-panel.active',
  '.gesture-pilot-readouts',
  '.quality-boost-btn.active',
  '.quality-boost-btn:focus-visible',
  '.flow-final-btn.locked',
  '.final-pass-panel.locked',
  '.final-pass-checks span.pass',
  '#presentation-mode-status',
];

const forbiddenPublicNeedles = [
  ['Iron', ' Man'].join(''),
  ['Sta', 'rk'].join(''),
  ['ST', 'ARK'].join(''),
  ['Mar', 'vel'].join(''),
  ['Av', 'enger'].join(''),
  ['Mark', '-LXXXV'].join(''),
  ['Mark', ' 7'].join(''),
  ['MARK', ' II'].join(''),
  ['media', '__'].join(''),
  ['.ge', 'mini'].join(''),
  ['antigravity', '/brain'].join(''),
  ['iron', 'man_pc'].join(''),
];

const removedScratchFiles = [
  'make_pc.py',
  'replace.py',
  'restore.py',
  ['assets/', 'iron', 'man_pc.json'].join(''),
  'assets/blueprints/mk6.png',
  'assets/blueprints/mk7.png',
  'assets/blueprints/mk_render.png',
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function assertMissing(file) {
  try {
    await access(file);
    throw new Error(`Scratch artifact should be removed: ${file}`);
  } catch (error) {
    if (error.code === 'ENOENT') return;
    throw error;
  }
}

async function main() {
  for (const file of requiredFiles) {
    await readFile(file, 'utf8');
  }

  const [html, css, appJs, timelineJs, managerJs] = await Promise.all([
    readFile('index.html', 'utf8'),
    readFile('index.css', 'utf8'),
    readFile('app.js', 'utf8'),
    readFile('scripts/holosyn-timeline.js', 'utf8'),
    readFile('scripts/holosyn-pro-managers.js', 'utf8'),
  ]);

  for (const file of removedScratchFiles) {
    await assertMissing(file);
  }

  for (const id of htmlSelectors) {
    assert(html.includes(`id="${id}"`), `Missing #${id} in index.html`);
  }
  assert(html.includes('data-action="timeline"'), 'Missing mobile timeline action');
  assert(html.includes('index.css?v=20260709-upload'), 'CSS cache version is stale');
  assert(html.includes('app.js?v=20260709-upload'), 'Core JS cache version is stale');
  assert(html.includes('scripts/holosyn-timeline.js?v=20260709-upload'), 'Timeline script tag is missing or stale');
  assert(html.includes('scripts/holosyn-pro-managers.js?v=20260709-upload'), 'Pro managers script tag is missing or stale');
  assert(html.includes('id="handoff-next-action" class="handoff-next-action" type="button"'), 'Handoff next action should be clickable');
  assert(html.includes('id="final-readiness-panel" class="final-readiness-panel setup"'), 'Final readiness panel is missing');
  assert(html.includes('data-handoff-action="model"'), 'Handoff model jump action is missing');
  assert(html.includes('data-handoff-action="demo"'), 'Handoff demo jump action is missing');
  assert(html.includes('data-handoff-action="timeline"'), 'Handoff timeline jump action is missing');
  assert(html.includes('data-handoff-action="export"'), 'Handoff export jump action is missing');
  assert(html.includes('class="demo-presets-panel"'), 'Demo presets panel is missing');
  assert(html.includes('class="demo-pack-panel"'), 'Demo pack panel is missing');
  assert(html.includes('class="rehearsal-pack-panel"'), 'Rehearsal pack panel is missing');
  assert(html.includes('class="handoff-pack-panel"'), 'Handoff pack panel is missing');
  assert(html.includes('class="client-brief-panel"'), 'Client brief panel is missing');
  assert(html.includes('class="beta-readiness-panel"'), 'Beta readiness panel is missing');
  assert(html.includes('class="launch-readiness-panel"'), 'Launch readiness panel is missing');
  assert(html.includes('class="beta-ops-panel"'), 'Beta ops panel is missing');
  assert(html.includes('class="project-snapshot-panel"'), 'Project snapshot panel is missing');
  assert(html.includes('data-preset="exosuit"'), 'Exo Suit preset button is missing');
  assert(html.includes('data-demo-preset="suit"'), 'Suit Lab demo preset is missing');

  for (const needle of appNeedles) {
    assert(appJs.includes(needle), `Missing app.js checkpoint: ${needle}`);
  }

  const publicBundles = {
    'index.html': html,
    'README.md': await readFile('README.md', 'utf8'),
    'DEMO_SCRIPT.md': await readFile('DEMO_SCRIPT.md', 'utf8'),
    'app.js': appJs,
    'scripts/holosyn-pro-managers.js': managerJs,
  };
  for (const [file, contents] of Object.entries(publicBundles)) {
    for (const needle of forbiddenPublicNeedles) {
      assert(!contents.includes(needle), `Public bundle leaks private/reference term "${needle}" in ${file}`);
    }
  }
  assert(!appJs.includes('function setTimelinePanelOpen'), 'Timeline functions should live in scripts/holosyn-timeline.js');
  assert(!appJs.includes('function handleRemoteTimeline'), 'Remote timeline handlers should live in scripts/holosyn-timeline.js');
  assert(!appJs.includes('const CollabManager'), 'CollabManager should live in scripts/holosyn-pro-managers.js');
  assert(!appJs.includes('const AiAssistantManager'), 'AiAssistantManager should live in scripts/holosyn-pro-managers.js');
  assert(!appJs.includes('const TutorialManager'), 'TutorialManager should live in scripts/holosyn-pro-managers.js');
  assert(!appJs.includes('initSpeechRecognition'), 'Stale speech recognition initializer reference found');

  for (const needle of timelineNeedles) {
    assert(timelineJs.includes(needle), `Missing timeline checkpoint: ${needle}`);
  }
  assert(timelineJs.includes("panel.style.setProperty('transform', 'translateX(-50%) translateY(0)', 'important')"), 'Timeline panel open style sync is missing');
  assert(timelineJs.includes("panel.style.setProperty('transition', 'none', 'important')"), 'Timeline transition stabilizer is missing');
  assert(timelineJs.includes('panel.getBoundingClientRect()'), 'Timeline transition flush is missing');
  assert(!managerJs.includes('function handleRemoteTimeline'), 'Remote timeline handlers should live in scripts/holosyn-timeline.js');

  for (const needle of managerNeedles) {
    assert(managerJs.includes(needle), `Missing manager checkpoint: ${needle}`);
  }
  assert(!appJs.includes('typeof AIManager') && !managerJs.includes('typeof AIManager'), 'Stale AIManager reference found');
  assert(!appJs.includes('setupUI()'), 'Stale setupUI initializer reference found');

  for (const needle of cssNeedles) {
    assert(css.includes(needle), `Missing CSS checkpoint: ${needle}`);
  }
  assert(css.includes('Keep the dock clickable inside the three-column viewport'), 'Missing compact camera dock clickability fix');
  assert(css.includes('opacity: 1 !important'), 'Missing forced timeline panel open visibility fix');

  for (const file of ['app.js', 'scripts/holosyn-timeline.js', 'scripts/holosyn-pro-managers.js']) {
    const check = spawnSync('node', ['--check', file], {
      encoding: 'utf8',
    });
    assert(check.status === 0, check.stderr || check.stdout || `${file} syntax check failed`);
  }

  console.log('HOLOSYN smoke check passed.');
}

main().catch((error) => {
  console.error(`HOLOSYN smoke check failed: ${error.message}`);
  process.exit(1);
});
