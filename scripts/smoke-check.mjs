#!/usr/bin/env node
import { access, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

// `--root <dir>` verifies a built deploy bundle (e.g. _site) instead of the repo.
// The bundle has no docs or launchers, so it only checks that every local asset
// index.html asks for actually shipped.
const rootFlagIndex = process.argv.indexOf('--root');
const bundleRoot = rootFlagIndex !== -1 ? process.argv[rootFlagIndex + 1] : null;

// Every non-remote src/href in index.html must exist, or the deploy boots dead.
function collectLocalAssetRefs(html) {
  const refs = new Set();
  const pattern = /(?:src|href)="([^"]+)"/g;
  let match;
  while ((match = pattern.exec(html)) !== null) {
    const raw = match[1].trim();
    if (!raw) continue;
    if (/^(https?:)?\/\//i.test(raw)) continue;
    if (/^(data:|mailto:|#|javascript:)/i.test(raw)) continue;
    refs.add(raw.split(/[?#]/)[0]);
  }
  return [...refs];
}

async function assertLocalAssetsExist(html, root = '.') {
  const missing = [];
  for (const ref of collectLocalAssetRefs(html)) {
    try {
      await access(join(root, ref));
    } catch {
      missing.push(ref);
    }
  }
  assert(
    missing.length === 0,
    `index.html references missing local asset(s): ${missing.join(', ')}`
  );
}

async function verifyDeployBundle(root) {
  const html = await readFile(join(root, 'index.html'), 'utf8');
  for (const file of ['index.css', 'app.js', 'scripts/holosyn-timeline.js', 'scripts/holosyn-pro-managers.js']) {
    await access(join(root, file));
  }
  await assertLocalAssetsExist(html, root);
  console.log(`HOLOSYN deploy bundle check passed (${root}).`);
}

const requiredFiles = [
  'index.html',
  'index.css',
  'app.js',
  'scripts/holosyn-timeline.js',
  'scripts/holosyn-pro-managers.js',
  'README.md',
  'USER_GUIDE.md',
  'DEMO_SCRIPT.md',
  'HOLOSYN 실행.command',
  'HOLOSYN 전시.command',
];

const requiredAssetFiles = [
  'vendor/fonts/fonts.css',
  'vendor/fonts/inter-300.ttf',
  'vendor/fonts/inter-400.ttf',
  'vendor/fonts/inter-500.ttf',
  'vendor/fonts/inter-600.ttf',
  'vendor/fonts/inter-700.ttf',
  'vendor/fonts/outfit-300.ttf',
  'vendor/fonts/outfit-400.ttf',
  'vendor/fonts/outfit-500.ttf',
  'vendor/fonts/outfit-600.ttf',
  'vendor/fonts/outfit-700.ttf',
  'vendor/fonts/outfit-900.ttf',
  'vendor/fonts/share-tech-mono-400.ttf',
  'vendor/lucide/lucide.min.js',
  'vendor/peerjs/peerjs.min.js',
  'vendor/qrcode/qrcode.js',
  'vendor/three/three.min.js',
  'vendor/three/OrbitControls.js',
  'vendor/three/GLTFExporter.js',
  'vendor/three/GLTFLoader.js',
  'vendor/three/OBJLoader.js',
  'vendor/three/EffectComposer.js',
  'vendor/three/RenderPass.js',
  'vendor/three/ShaderPass.js',
  'vendor/three/CopyShader.js',
  'vendor/three/LuminosityHighPassShader.js',
  'vendor/three/UnrealBloomPass.js',
  'vendor/three/BokehShader.js',
  'vendor/three/BokehPass.js',
];

const htmlSelectors = [
  'btn-boot-system',
  'btn-archive-backup',
  'btn-stage-only',
  'stage-only-exit',
  'archive-storage-note',
  'btn-demo-run',
  'btn-pitch-run',
  'btn-final-pass',
  'flow-coach',
  'beginner-flow',
  'btn-beginner-import',
  'beginner-reveal-status',
  'btn-beginner-pitch',
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
  'material-view-control',
  'material-view-status',
  'material-view-detail',
  'tutorial-prompt-modal',
  'tutorial-overview',
  'tutorial-progress-rail',
  'btn-header-share-link',
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
  'share-link-panel',
  'share-link-status',
  'share-link-detail',
  'btn-copy-share-link',
  'btn-export-share-state',
  'btn-copy-exhibition-link',
  'btn-copy-reveal-link',
  'clip-export-panel',
  'clip-export-status',
  'btn-record-clip-3s',
  'btn-record-clip-5s',
  'presenter-notes-panel',
  'presenter-notes-status',
  'presenter-note-input',
  'btn-save-presenter-note',
  'btn-export-presenter-notes',
  'measurements-panel',
  'measurements-status',
  'measurements-list',
  'btn-export-measurements',
  'btn-clear-measurements',
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
  'btn-start-beta-session',
  'btn-run-performance-benchmark',
  'btn-export-error-report',
  'btn-export-example-pack',
  'btn-export-deploy-checklist',
  'btn-export-release-package',
  'beta-session-panel',
  'beta-session-status',
  'beta-session-timer',
  'beta-session-progress',
  'beta-task-scene',
  'beta-task-material',
  'beta-task-part',
  'beta-task-structure',
  'beta-task-handoff',
  'beta-session-friction',
  'btn-beta-session-reset',
  'btn-beta-session-export',
  'btn-beta-session-close',
  'project-snapshot-panel',
  'project-snapshot-status',
  'btn-save-project-snapshot',
  'btn-restore-project-snapshot',
  'btn-export-project-snapshot',
  'portable-project-row',
  'portable-project-status',
  'portable-project-detail',
  'btn-export-portable-project',
  'btn-import-portable-project',
  'portable-project-input',
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
  'btn-share-qr',
  'qr-share-modal',
  'qr-canvas-holder',
  'btn-qr-copy',
  'stage-tools',
  'btn-stage-pointer',
  'btn-stage-timer',
  'pointer-hud',
  'btn-pointer-clear',
  'pitch-timer',
  'pitch-timer-time',
  'btn-timer-start',
  'btn-timer-reset',
  'btn-narrate-notes',
  'btn-narrate-stop',
  'viewer-shell',
  'viewer-mode-label',
  'viewer-product-name',
  'viewer-status',
  'btn-viewer-play',
  'btn-viewer-replay-reveal',
  'btn-viewer-reset-camera',
  'btn-viewer-part-prev',
  'viewer-part-label',
  'btn-viewer-part-next',
  'btn-viewer-fullscreen',
  'btn-viewer-open-studio',
  'compare-scenes-panel',
  'compare-scenes-status',
  'compare-scene-a-summary',
  'compare-scene-b-summary',
  'btn-capture-compare-a',
  'btn-capture-compare-b',
  'btn-preview-compare-a',
  'btn-preview-compare-b',
  'btn-copy-compare-link',
  'viewer-compare-group',
  'reveal-experience',
  'reveal-phase-count',
  'reveal-kicker',
  'reveal-title',
  'reveal-detail',
  'btn-reveal-skip',
];

const appNeedles = [
  'scripts/holosyn-timeline.js so the',
  // The archive must carry the imported model, not settings alone. Without
  // these, a restore silently hands the presenter a demo preset under their
  // own product name.
  'prototypeRecord.modelGlb = glb;',
  'function applyArchiveDrawerCopy',
  'function captureArchiveThumbnail',
  'function initStageOnlyMode',
  // Persisting a setting must never block applying it.
  'function rememberSetting',
  'function persistPresenterNotes',
  'function persistSavedMeasurements',
  'function loadSavedMeasurements',
  // Recording must negotiate a format the browser actually has, and must not
  // report a save for an empty clip.
  "'video/mp4;codecs=avc1',",
  'if (blob.size === 0) {',
  'recorder.onerror = event => {',
  'function loadPresenterNotes',
  'const persisted = persistPresenterNotes();',
  "rememberSetting('holosyn_lang', lang);",
  "rememberSetting('holosyn_uimode', mode);",
  'const storage = canUseLocalStorage() ? getBrowserStorage() : null;',
  'function setStageOnly',
  'if (state.stageOnly) {',
  'function getModelScreenRect',
  'thumbnail: captureArchiveThumbnail(),',
  'if (proto.thumbnail) {',
  'exportPortableProjectBundle();',
  'if (proto.modelGlb) {',
  'parsePortableGlb(proto.modelGlb.slice(0))',
  "customImageBase64: state.imageUploaded ? state.customImageBase64 : null,",
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
  'function isBetaTestSessionRequested',
  'function startBetaTestSession',
  'document.body.appendChild(panel)',
  'function updateBetaTestSession',
  'function resetExplodedStateForBetaSession',
  'function buildBetaSessionReport',
  'function exportBetaSessionReport',
  'function sanitizeBetaSessionError',
  'window.HolosynBetaSession',
  "url.searchParams.delete('test')",
  "holosynReport: 'anonymous-beta-session-v1'",
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
  'function setMaterialView',
  'function applyMaterialView',
  'function updateMaterialViewUi',
  'function cloneMaterialSet',
  'function captureMaterialOpacity',
  'function restoreMaterialOpacity',
  'productMaterial',
  'hologramMaterial',
  'productColor: o.pc ||',
  "state.materialView === 'product'",
  'function exportPortableProjectBundle',
  'function importPortableProjectBundle',
  'function exportActiveModelGlb',
  'function sha256ArrayBuffer',
  'function updatePortableProjectPanel',
  "holosynBundle: 'portable-project-v1'",
  'function runThirtySecondPitch',
  'function updateBeginnerFlowUi',
  'function preparePitchShareUrl',
  'function buildShareState',
  'function buildCompactShareSnapshot',
  'function copyShareLink',
  'function applyShareStateFromUrl',
  'function recordViewportClip',
  'function savePresenterNote',
  'function buildPresenterNotesMarkdown',
  'function exportMeasurements',
  'function rebuildSavedMeasurementVisuals',
  'function normalizePresenterNotes',
  'function normalizeSavedMeasurements',
  'function createCaliperBadge',
  'presenterNotes: state.presenterNotes',
  'savedMeasurements: state.savedMeasurements',
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
  'function openQrShareModal',
  'function tryBuildQr',
  'matrix.getModuleCount() > maxQrModules',
  'function toggleStagePointer',
  'function renderStagePointer',
  'function startPitchTimer',
  'function updatePitchTimerDisplay',
  'function narratePresenterNotes',
  'function initStageTools',
  "event.shiftKey && event.key.toLowerCase() === 'p'",
  'if (e.shiftKey) break;',
  'function isViewerModeRequested',
  'function initViewerMode',
  'function refreshViewerModeUi',
  'function getStudioUrlFromViewer',
  'function captureComparisonScene',
  'function applyComparisonScene',
  'function copyComparisonLink',
  'function normalizeComparisonPayload',
  'function updateComparisonPanel',
  'function isExhibitionModeRequested',
  'function startExhibitionMode',
  'function toggleExhibitionPlayback',
  'function scheduleExhibitionComparisonCycle',
  'function copyExhibitionLink',
  'function isRevealModeRequested',
  'function startRevealExperience',
  'function finishRevealExperience',
  'function applyRevealPhase',
  'function updateRevealOverlay',
  'function copyRevealLink',
  'window.HolosynReveal',
  "holosynComparison: 'scene-comparison-v1'",
  "holosynComparisonScene: 'comparison-scene-v1'",
  'includeComparison: true',
  'exhibit: true',
  "url.searchParams.set('exhibit', '1')",
  "url.searchParams.set('reveal', '1')",
  "url.searchParams.set('compare', state.comparison.activeSlot)",
  "searchParams.get('compare')",
  "url.searchParams.set('viewer', '1')",
  "baseUrl.searchParams.set('viewer', '1')",
  'if (state.viewerMode) return;',
  'if (!state.viewerMode) savePreferences();',
  'if (!copied) {',
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
  'materialView: state.materialView',
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
  'isBetaTestSessionRequested',
  'renderTourMap(containerId, steps, currentIndex = null)',
  'window.CollabManager = CollabManager',
  'materialView: state.materialView',
  'window.AiAssistantManager = AiAssistantManager',
  'window.TutorialManager = TutorialManager',
];

const cssNeedles = [
  // Hiding the panels alone left the stage in the first grid cell, and the
  // hidden attribute does nothing without this override.
  'body.stage-only #app-container',
  'body.stage-only #hud-center-stage',
  '[hidden] {',
  '.timeline-editor-panel.panel-open',
  '#tutorial-prompt-modal.tutorial-prompt-dock',
  '.tutorial-progress-rail',
  '.collab-module-status.unavailable',
  '.ai-key-status.session',
  '#viewport-annotation-hint',
  '.import-quality-card',
  '.import-reliability-grid',
  '.import-quality-next-action',
  '.import-quality-action-copy',
  '.import-quality-action-btn',
  '.demo-presets-panel',
  '.flow-pitch-btn',
  '.beginner-flow',
  '.ui-beginner .flow-coach',
  '.beginner-material-btn.active',
  '.demo-pack-panel',
  '.demo-pack-copy',
  '.rehearsal-pack-panel',
  '.rehearsal-pack-copy',
  '.share-link-panel',
  '.clip-export-panel',
  '.presenter-notes-panel',
  '.measurements-panel',
  '.measurement-row',
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
  '.beta-session-panel',
  '.beta-session-panel.complete',
  '.beta-session-tasks li.done',
  '.beta-session-rating button.active',
  '.project-snapshot-panel',
  '.project-snapshot-actions',
  '.portable-project-row',
  '.portable-project-actions',
  '.portable-project-row.is-busy',
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
  '.material-view-control',
  '.material-view-segment',
  '.material-view-btn.active',
  '.quality-boost-btn:focus-visible',
  '.flow-final-btn.locked',
  '.final-pass-panel.locked',
  '.final-pass-checks span.pass',
  '#presentation-mode-status',
  '.stage-tools',
  '.stage-tool-btn[aria-pressed="true"]',
  '#stage-pointer-canvas.active',
  '.pointer-hud',
  '.pointer-mode-btn.active',
  '.pitch-timer',
  '.pitch-timer.pace-over .pitch-timer-time',
  '.qr-modal-content',
  '.qr-canvas-holder',
  'body.viewer-mode #app-container',
  'body.viewer-mode #hud-center-stage',
  '.viewer-topbar',
  '.viewer-controlbar',
  '.viewer-material-btn.active',
  '.compare-scenes-panel',
  '.viewer-compare-btn.active',
  'body.viewer-has-comparison .viewer-controlbar',
  'body.exhibition-mode.exhibition-idle',
  'body.exhibition-mode.exhibition-idle .viewer-controlbar',
  'body.exhibition-mode.exhibition-idle #annotations-container',
  '#reveal-experience',
  'body.reveal-running .viewer-controlbar',
  '#reveal-experience[data-phase="material"]',
  '.reveal-signature',
  '.reveal-progress span.is-active',
  '.viewer-reveal-replay',
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
  if (bundleRoot) {
    await verifyDeployBundle(bundleRoot);
    return;
  }

  for (const file of requiredFiles) {
    await readFile(file, 'utf8');
  }
  for (const file of requiredAssetFiles) {
    await access(file);
  }

  const [html, css, appJs, timelineJs, managerJs] = await Promise.all([
    readFile('index.html', 'utf8'),
    readFile('index.css', 'utf8'),
    readFile('app.js', 'utf8'),
    readFile('scripts/holosyn-timeline.js', 'utf8'),
    readFile('scripts/holosyn-pro-managers.js', 'utf8'),
  ]);

  await assertLocalAssetsExist(html);

  // Relative og:image renders no preview on most crawlers, and a shared link
  // is the core flow — so keep these absolute and keep the file shipping.
  for (const prop of ['og:image', 'twitter:image']) {
    const attr = prop.startsWith('og:') ? 'property' : 'name';
    const match = html.match(new RegExp(`<meta ${attr}="${prop}" content="([^"]+)"`));
    assert(match, `Missing ${prop} meta tag`);
    assert(/^https:\/\//.test(match[1]), `${prop} must be an absolute URL, got: ${match[1]}`);
    const file = match[1].split('/').pop();
    await access(file);
  }

  for (const file of removedScratchFiles) {
    await assertMissing(file);
  }

  for (const id of htmlSelectors) {
    assert(html.includes(`id="${id}"`), `Missing #${id} in index.html`);
  }
  assert(html.includes('data-action="timeline"'), 'Missing mobile timeline action');
  assert(html.includes('라이브 포인터 / 화면에 표시 (Shift+P)'), 'Live pointer shortcut label is stale');
  assert(html.includes('index.css?v=20260905-honest'), 'CSS cache version is stale');
  assert(html.includes('app.js?v=20260905-honest'), 'Core JS cache version is stale');
  assert(html.includes('scripts/holosyn-timeline.js?v=20260905-honest'), 'Timeline script tag is missing or stale');
  assert(html.includes('scripts/holosyn-pro-managers.js?v=20260905-honest'), 'Pro managers script tag is missing or stale');
  assert(html.includes('vendor/three/three.min.js'), 'Bundled Three.js runtime is missing');
  assert(html.includes('vendor/lucide/lucide.min.js'), 'Bundled Lucide runtime is missing');
  assert(html.includes('vendor/qrcode/qrcode.js'), 'Bundled QR runtime is missing');
  assert(html.includes('vendor/fonts/fonts.css'), 'Bundled font stylesheet is missing');
  for (const externalRuntime of ['fonts.googleapis.com', 'fonts.gstatic.com', 'unpkg.com', 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com']) {
    assert(!html.includes(externalRuntime), `External runtime dependency found in index.html: ${externalRuntime}`);
  }
  assert(html.includes("get('viewer') === '1'"), 'Viewer mode must be detected before first paint');
  assert(html.includes("initialParams.get('exhibit') === '1'"), 'Exhibition mode must be detected before first paint');
  assert(html.includes("initialParams.get('reveal') === '1'"), 'Reveal mode must be detected before first paint');
  assert(html.includes('data-viewer-material="hologram"'), 'Viewer hologram material control is missing');
  assert(html.includes('data-viewer-material="product"'), 'Viewer product material control is missing');
  assert(html.includes('data-viewer-material="hybrid"'), 'Viewer hybrid material control is missing');
  assert(html.includes('data-viewer-comparison="a"'), 'Viewer comparison A control is missing');
  assert(html.includes('data-viewer-comparison="b"'), 'Viewer comparison B control is missing');
  assert(html.includes('id="handoff-next-action" class="handoff-next-action" type="button"'), 'Handoff next action should be clickable');
  assert(html.includes('id="final-readiness-panel" class="final-readiness-panel setup"'), 'Final readiness panel is missing');
  assert(html.includes('data-handoff-action="model"'), 'Handoff model jump action is missing');
  assert(html.includes('data-handoff-action="demo"'), 'Handoff demo jump action is missing');
  assert(html.includes('data-handoff-action="timeline"'), 'Handoff timeline jump action is missing');
  assert(html.includes('data-handoff-action="export"'), 'Handoff export jump action is missing');
  assert(html.includes('id="demo-presets-panel"'), 'Demo presets panel is missing');
  assert(html.includes('class="demo-pack-panel"'), 'Demo pack panel is missing');
  assert(html.includes('class="rehearsal-pack-panel"'), 'Rehearsal pack panel is missing');
  assert(html.includes('class="share-link-panel"'), 'Share link panel is missing');
  assert(html.includes('class="clip-export-panel"'), 'Clip export panel is missing');
  assert(html.includes('class="presenter-notes-panel"'), 'Presenter notes panel is missing');
  assert(html.includes('class="measurements-panel"'), 'Measurements panel is missing');
  assert(html.includes('class="handoff-pack-panel"'), 'Handoff pack panel is missing');
  assert(html.includes('class="client-brief-panel"'), 'Client brief panel is missing');
  assert(html.includes('class="beta-readiness-panel"'), 'Beta readiness panel is missing');
  assert(html.includes('class="launch-readiness-panel"'), 'Launch readiness panel is missing');
  assert(html.includes('class="beta-ops-panel"'), 'Beta ops panel is missing');
  assert(html.includes('data-beta-rating="5"'), 'Beta session satisfaction control is missing');
  assert(html.includes('maxlength="600"'), 'Beta session friction note must stay bounded');
  assert(html.includes('class="project-snapshot-panel"'), 'Project snapshot panel is missing');
  assert(html.includes('data-preset="exosuit"'), 'Exo Suit preset button is missing');
  assert(html.includes('data-demo-preset="suit"'), 'Suit Lab demo preset is missing');

  for (const needle of appNeedles) {
    assert(appJs.includes(needle), `Missing app.js checkpoint: ${needle}`);
  }
  assert(appJs.includes(".glass-panel:not(.tutorial-card):not(.tutorial-prompt-content)"), 'Tutorial overlays must stay out of the shared tilt effect');
  assert(!appJs.includes('list.innerHTML = state.savedMeasurements.map'), 'Saved measurements must not render imported text through innerHTML');

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
  const qrShareSection = appJs.slice(
    appJs.indexOf('function openQrShareModal'),
    appJs.indexOf('function tryBuildQr')
  );
  assert(!qrShareSection.includes('window.history.replaceState'), 'Opening the QR modal must not replace the Studio URL');

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
