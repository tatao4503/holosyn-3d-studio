/**
 * ==========================================================================
 * HOLOSYN v3.2 "1-PERSON MAKER PROTOTYPE SUITE" ENGINE
 * Core Javascript - Vanilla ES6 & Three.js Pipeline
 * Optimized presentation tools for makers and hardware developers
 * Spatial frosted overlay, slide-in notifications, and automated presenter
 * Native GLB/GLTF/OBJ loader injections and floating 3D part annotations
 * ==========================================================================
 */

// i18n Translation Dictionary
const translations = {
    ko: {
        system_status: "SYS_STATUS: 활성",
        sound_status: "SOUND: 꺼짐",
        sound_status_on: "SOUND: 켜짐",
        pyramid_mode: "PYRAMID",
        presets_title: "샘플 모델로 시도하기",
        custom_injection: "3D 모델 & 이미지 임포트",
        dropzone_text: "3D 파일 (.glb, .gltf, .obj) 또는 이미지를 여기에 드롭",
        upload_btn: "내 컴퓨터에서 열기",
        upload_sub: "모델 크기 자동 보정 및 중앙 정렬 지원",
        tuning_title: "홀로그램 튜닝",
        glow_intensity: "광원 강도",
        rot_speed: "회전 속도",
        scanline_density: "스캔라인 밀도",
        glitch_freq: "글리치 빈도",
        scale: "프로젝션 크기",
        wavelength: "파장 대역 (색상)",
        render_schematic: "렌더링 도식화",
        point_cloud: "포인트 클라우드",
        wireframe: "와이어프레임",
        faceted_solid: "반투명 솔리드",
        telemetry_specs: "세부 사양 설정",
        product_name: "제품 이름",
        classification: "기술 분류",
        mass: "질량 (KG)",
        power: "소비 전력 (W)",
        laser_freq: "스캔 디테일",
        telemetry_reads: "실시간 투사 텔레메트리",
        unit_id: "장치 식별 코드",
        unit_volume: "장치 부피",
        stability_factor: "광학 안정성",
        energy_discharge: "에너지 방출율",
        emission_angle: "광선 방출각",
        diagnostics_title: "시스템 진단 피드",
        exit_pyramid: "피라미드 모드 종료",
        pyramid_title: "PEPPER'S GHOST 3D REFLECTION PROJECTOR",
        pyramid_desc1: "1. 전시 부스나 미팅룸 실내 조명을 끈 후, 모니터/패널 위에 아크릴 반사 피라미드를 올려 놓으십시오.",
        pyramid_desc2: "2. 장치의 4분면 입체 투사 빔이 아크릴 내에 맺혀 오프라인 공간 360° 입체 시제품 시연이 즉시 가능해집니다.",
        welcome_title: "HOLOSYN — 시작하기",
        welcome_intro: "홀로신은 1인 메이커와 하드웨어 개발자를 위한 프리미엄 3D 시제품 발표 도구입니다. 미팅룸이나 전시 부스에서 제품을 가장 돋보이게 시연해 보세요.",
        intro_feature1_title: "3D 파일 직접 투사",
        intro_feature1_desc: ".glb, .gltf, .obj 파일을 드래그 앤 드롭하여 바로 시제품을 3D 시각화합니다.",
        intro_feature2_title: "시네마틱 Showcase",
        intro_feature2_desc: "HUD를 완벽히 숨긴 채 3D 분해도 및 파트 라벨링으로 제품에만 완벽히 집중시킵니다.",
        intro_feature3_title: "프로페셔널 포맷 내보내기",
        intro_feature3_desc: "최적화된 GLB 3D 압축 모델, 스펙 명세 JSON, 고해상도 PNG 캡처를 지원합니다.",
        welcome_sound_note: "※ 실감나는 공간 시연을 위해 Web Audio API 기반의 공간 신디사이저가 내장되어 있습니다. 아래 버튼을 눌러 엔진을 기동하세요.",
        boot_btn: "HOLOSYN 엔진 기동 (BOOT ENGINE)",
        trigger_glitch: "공간 글리치 효과 시뮬레이션",
        // v2.1 Beginner/Pro strings
        mode_beginner: "비기너",
        mode_pro: "프로",
        exploded_view: "입체 분해도",
        exploded_desc: "내부 구조 분해 조립 수준",
        quick_styles: "간편 스타일 연출",
        style_minimal: "미니멀 블루",
        style_tactical: "택티컬 실버",
        style_matrix: "매트릭스 그린",
        // v3.1 Exporter labels
        export_suite: "내보내기 스위트",
        export_3d: "GLB 다운로드 (.glb)",
        export_spec: "사양 JSON 다운로드",
        export_photo: "PNG 캡처",
        thermal: "열감지 열화상",
        assembly_steps: "로봇 조립 시퀀스 가이드",
        ai_diagnostics: "시제품 점검 리포트",
        ai_scan_btn: "시제품 체크 실행",
        xray_shell: "엑스레이 투과",
        draw_caliper: "3D 측정",
        studio_environment: "스튜디오 공간 환경",
        env_cyberpunk: "네오 사이버펑크",
        env_cupertino: "큐퍼티노 연구소",
        env_windtunnel: "윈드 터널 실험",
        studio_lighting: "스튜디오 조명",
        light_studio: "스튜디오",
        light_warm: "따뜻함",
        light_cool: "차가움",
        light_dramatic: "드라마틱",
        light_brightness: "밝기",
        insight_title: "시제품 인사이트",
        insight_parts: "구성",
        insight_exploded: "분해도",
        insight_export: "내보내기",
        annotation_reset: "라벨 초기화",
        flow_model: "모델",
        flow_structure: "구조",
        flow_present: "발표",
        flow_export: "내보내기",
        flow_demo: "데모 런",
        voice_listening: "VOICE LISTENING... // 음성 명령 인식 중",
        voice_guide_title: "음성 명령 제어 가이드",
        voice_guide_subtitle: "마이크 버튼을 클릭한 뒤 아래 명령을 말씀하세요:",
        close: "닫기 // CLOSE",
        // v8.0 Timeline Presenter
        timeline_editor: "타임라인 키프레임 디렉터",
        add_keyframe: "키프레임 추가",
        play_timeline: "재생",
        pause_timeline: "일시정지",
        timeline_exported: "타임라인이 JSON으로 내보내졌습니다.",
        timeline_imported: "타임라인을 불러왔습니다.",
        timeline_kf_added: "키프레임이 추가되었습니다.",
        timeline_kf_deleted: "키프레임이 삭제되었습니다.",
        timeline_kf_max: "키프레임은 최대 20개까지 추가할 수 있습니다.",
        timeline_playing: "타임라인 재생 중...",
        timeline_stopped: "타임라인 재생 정지",
        switch_gyro: "자이로 카메라 (GYRO)",
        // v8.0 Collaboration
        collab_share: "실시간 협업",
        collab_title: "공간 실시간 협업",
        collab_subtitle: "실시간으로 3D 프로토타입을 공유하고 함께 제어하세요",
        collab_create: "새로운 세션 생성",
        collab_join: "세션 참가",
        collab_disconnect: "연결 해제",
        collab_voice: "음성 통화 (VOICE): 꺼짐",
        // v8.0 AI Assistant
        ai_assistant: "AI 어시스턴트",
        ai_assistant_title: "AI 공간 제어 어시스턴트",
        save: "저장",
        // v8.0 Tutorial
        tutorial_prompt_title: "HOLOSYN 가이드 투어",
        tutorial_prompt_desc: "HOLOSYN의 핵심 기능(프리셋, 분해도, 타임라인, 협업, AI)을 둘러보는 2분 가이드 투어를 시작하시겠습니까?",
        tutorial_skip_btn: "건너뛰기",
        tutorial_start_btn: "시작하기",
        tutorial_next: "다음",
        tutorial_back: "이전",
        tutorial_finish: "종료",
        tutorial_step_label: "단계",
        tutorial_title_step1: "샘플 모델 시제품 투사",
        tutorial_desc_step1: "드론, 링, 전기차, 배터리 등 내장된 3D 시제품을 클릭해 다른 모델을 즉시 투사할 수 있습니다.",
        tutorial_title_step2: "입체 분해 조립 튜너",
        tutorial_desc_step2: "이 슬라이더를 조절하여 제품을 내부 부품 단위로 분해하고 결합할 수 있는 3D 분해 시연을 진행합니다.",
        tutorial_title_step3: "타임라인 키프레임 디렉터",
        tutorial_desc_step3: "카메라 앵글, 분해도 수준 등을 타임라인에 키프레임(◆)으로 추가하여 자동으로 부드럽게 재생되는 제품 발표를 만듭니다.",
        tutorial_title_step4: "공간 실시간 협업",
        tutorial_desc_step4: "6자리 방 코드를 생성하거나 동료와 공유하여 같은 3D 모델을 원격으로 실시간 회전, 줌 및 주석 공유 협업을 진행합니다.",
        tutorial_title_step5: "AI 공간 제어 어시스턴트",
        tutorial_desc_step5: "자연어 명령으로 렌더 모드를 바꾸거나 특정 부품을 색칠하고, AI에게 시제품 사양 분석 리포트를 요청해 보세요."
    },
    en: {
        system_status: "SYS_STATUS: ACTIVE",
        sound_status: "SOUND: OFF",
        sound_status_on: "SOUND: ON",
        pyramid_mode: "PYRAMID",
        presets_title: "Try with sample",
        custom_injection: "3D Model & Image Import",
        dropzone_text: "Drag & drop 3D files (.glb, .gltf, .obj) or images here",
        upload_btn: "Open File Browser",
        upload_sub: "Auto-fit and center models for presentation",
        tuning_title: "HOLOGRAM TUNING",
        glow_intensity: "GLOW INTENSITY",
        rot_speed: "ROTATION SPEED",
        scanline_density: "SCANLINE DENSITY",
        glitch_freq: "GLITCH FREQUENCY",
        scale: "PROJECTION SCALE",
        wavelength: "WAVE WAVELENGTH (COLOR)",
        render_schematic: "RENDER SCHEMATIC",
        point_cloud: "POINT CLOUD",
        wireframe: "WIREFRAME",
        faceted_solid: "FACETED SOLID",
        telemetry_specs: "TELEMETRY SPECIFICATIONS",
        product_name: "PRODUCT NAME",
        classification: "CLASSIFICATION",
        mass: "MASS (KG)",
        power: "POWER SYSTEM (W)",
        laser_freq: "SCAN DETAIL",
        telemetry_reads: "PROJECTION TELEMETRY READS",
        unit_id: "UNIT IDENTIFIER",
        unit_volume: "UNIT VOLUME",
        stability_factor: "STABILITY FACTOR",
        energy_discharge: "ENERGY DISCHARGE",
        emission_angle: "EMISSION ANGLE",
        diagnostics_title: "SYSTEM DIAGNOSTICS FEEDS",
        exit_pyramid: "EXIT PYRAMID MODE",
        pyramid_title: "PEPPER'S GHOST 3D REFLECTION PROJECTOR",
        pyramid_desc1: "1. Turn off exhibition room lights, then place your acrylic pyramid on the screen center.",
        pyramid_desc2: "2. The symmetrical 4-way beam projects inside the acrylic for instant 360° offline prototype demonstrations.",
        welcome_title: "HOLOSYN — START",
        welcome_intro: "Holosyn is a premium 3D prototype presentation suite for 1-person makers and hardware developers. Present your hardware concepts at exhibition booths and meeting rooms.",
        intro_feature1_title: "Direct 3D Projection",
        intro_feature1_desc: "Drag & drop .glb, .gltf, or .obj files to visualize your hardware concept instantly in 3D.",
        intro_feature2_title: "Cinematic Showcase",
        intro_feature2_desc: "Completely mute all HUD layers to focus purely on the 3D product with exploded view and spatial labels.",
        intro_feature3_title: "Professional Exports Suite",
        intro_feature3_desc: "Export optimized GLB models, technical spec sheets in JSON format, or high-res PNG viewport snapshots.",
        welcome_sound_note: "* Ambient synthesizer driven by Web Audio API is integrated for immersive spatial audio. Click below to boot.",
        boot_btn: "BOOT ENGINE",
        trigger_glitch: "TRIGGER SPACE GLITCH EFFECT",
        // v2.1 Beginner/Pro strings
        mode_beginner: "Beginner",
        mode_pro: "Pro",
        exploded_view: "EXPLODED VIEW",
        exploded_desc: "Internal Parts Disassembly",
        quick_styles: "QUICK STYLES",
        style_minimal: "Minimal Blue",
        style_tactical: "Tactical Silver",
        style_matrix: "Matrix Green",
        // v3.1 Exporter labels
        export_suite: "EXPORT SUITE",
        export_3d: "GLB Download (.glb)",
        export_spec: "Specs JSON Download",
        export_photo: "PNG Capture",
        thermal: "THERMAL IMAGER",
        assembly_steps: "ROBOTIC ASSEMBLY STEPS",
        ai_diagnostics: "PROTOTYPE CHECK REPORT",
        ai_scan_btn: "RUN PROTOTYPE CHECK",
        xray_shell: "X-RAY SHELL",
        draw_caliper: "3D MEASURE",
        studio_environment: "STUDIO ENVIRONMENT",
        env_cyberpunk: "NEO CYBERPUNK",
        env_cupertino: "CUPERTINO LAB",
        env_windtunnel: "WIND TUNNEL",
        studio_lighting: "STUDIO LIGHTING",
        light_studio: "Studio",
        light_warm: "Warm",
        light_cool: "Cool",
        light_dramatic: "Dramatic",
        light_brightness: "BRIGHTNESS",
        insight_title: "PROTOTYPE INSIGHT",
        insight_parts: "PARTS",
        insight_exploded: "EXPLODED",
        insight_export: "EXPORT",
        annotation_reset: "RESET LABELS",
        flow_model: "MODEL",
        flow_structure: "STRUCTURE",
        flow_present: "PRESENT",
        flow_export: "EXPORT",
        flow_demo: "DEMO RUN",
        voice_listening: "VOICE LISTENING...",
        voice_guide_title: "Voice Command Guide",
        voice_guide_subtitle: "Click the mic button and say the following:",
        close: "CLOSE",
        // v8.0 Timeline Presenter
        timeline_editor: "TIMELINE KEYFRAME DIRECTOR",
        add_keyframe: "ADD KEYFRAME",
        play_timeline: "PLAY",
        pause_timeline: "PAUSE",
        timeline_exported: "Timeline exported as JSON.",
        timeline_imported: "Timeline imported successfully.",
        timeline_kf_added: "Keyframe added.",
        timeline_kf_deleted: "Keyframe deleted.",
        timeline_kf_max: "Maximum 20 keyframes allowed.",
        timeline_playing: "Timeline playing...",
        timeline_stopped: "Timeline playback stopped",
        switch_gyro: "GYRO CAMERA",
        // v8.0 Collaboration
        collab_share: "COLLABORATE",
        collab_title: "SPATIAL COLLABORATION",
        collab_subtitle: "SHARE AND CONTROL 3D PROTOTYPE IN REAL-TIME",
        collab_create: "CREATE NEW ROOM",
        collab_join: "JOIN ROOM",
        collab_disconnect: "DISCONNECT",
        collab_voice: "VOICE CHAT: OFF",
        // v8.0 AI Assistant
        ai_assistant: "AI ASSISTANT",
        ai_assistant_title: "AI SPATIAL ASSISTANT",
        save: "SAVE",
        // v8.0 Tutorial
        tutorial_prompt_title: "HOLOSYN Guide Tour",
        tutorial_prompt_desc: "Would you like to take a 2-minute guide tour to explore HOLOSYN's core features (presets, exploded views, timeline, collaboration, AI)?",
        tutorial_skip_btn: "Skip",
        tutorial_start_btn: "Start Tour",
        tutorial_next: "Next",
        tutorial_back: "Back",
        tutorial_finish: "Finish",
        tutorial_step_label: "STEP",
        tutorial_title_step1: "Sample Prototype Presets",
        tutorial_desc_step1: "Click preset buttons to instantly project different 3D models like Drone, Ring, Car, or Battery.",
        tutorial_title_step2: "Exploded View Tuner",
        tutorial_desc_step2: "Adjust this slider to disassemble or assemble the product parts in real-time for detailed structural reviews.",
        tutorial_title_step3: "Timeline Keyframe Director",
        tutorial_desc_step3: "Add viewport states as keyframes (◆) on the timeline to create a fully animated, automated presentation.",
        tutorial_title_step4: "Spatial Collaboration",
        tutorial_desc_step4: "Generate or share a 6-digit room code to collaborate with colleagues, syncing 3D viewports and annotations in real-time.",
        tutorial_title_step5: "AI Spatial Assistant",
        tutorial_desc_step5: "Control the 3D scene using natural language commands, color components, or request spatial analysis reports from AI."
    }
};

// Global Application State
const state = {
    uiMode: 'beginner',           // 'beginner' or 'pro' - Beginner is default clean mode
    gyroActive: false,
    language: 'ko',
    themeColor: '#007aff',         // Studio blue as default
    themeColorGlow: 'rgba(0, 122, 255, 0.22)',
    activePreset: 'drone',       // drone, ring, car, battery, exosuit, custom
    renderMode: 'wireframe',      // points, wireframe, solid
    materialView: 'hologram',     // hologram, product, hybrid
    visualQualityBoost: true,
    glowIntensity: 1.5,
    rotationSpeed: 1.0,
    scanlineDensity: 1.0,
    glitchFrequency: 15,          // percentage (0 - 100)
    scale: 1.0,
    explodedLevel: 0.0,           // Exploded View level (0.0 to 1.0)
    cameraMode: 'orbit',          // orbit, front, top, macro
    isShowcaseMode: false,        // Keynote Presentation Showcase Mode
    isSoundOn: false,
    isPyramidMode: false,
    targetingReticles: true,      // Gyro targeting rings
    isScanning: false,            // AI auto-scanning state
    customImageParticles: null,   // Will hold coordinates if image uploaded
    customImageTexture: null,     // Holds texture if using solid plane mode
    imageUploaded: false,
    lighting: { mood: 'studio', brightness: 1.0 },  // studio lighting control (v10.x)
    customImageExtrusion: 0.75,   // Real-time Z-depth volume extrusion scale (v3.9)
    floatHeight: 0.15,            // Target Y float position bias
    studioEnvironment: 'cyberpunk', // cyberpunk, cupertino, windtunnel
    engineBooted: false,
    workflowStep: 'model',
    workflowCompleted: {
        model: false,
        structure: false,
        present: false,
        export: false
    },
    demoFlowRunning: false,
    pitchRunRunning: false,
    activeDemoPreset: null,
    gesturePilot: {
        pointerStart: null,
        touchStartDistance: null,
        touchStartExplodedLevel: 0
    },
    importQuality: {
        status: 'ready',
        statusLabel: 'READY',
        source: 'Built-in samples',
        meshes: '-',
        fit: 'Auto-fit standby',
        reliabilityType: 'SAMPLE',
        reliabilityScale: 'READY',
        reliabilityParts: 'AUTO',
        reliabilityRisk: 'LOW',
        reliabilityWarnings: [],
        note: '샘플을 고르거나 파일을 드롭하면 발표 적합도를 즉시 확인합니다.',
        actionKey: 'structure',
        actionText: '샘플 선택 후 구조 보기로 이어가세요.',
        actionLabel: '실행',
        actionDisabled: false
    },
    handoffReady: {
        model: true,
        demo: false,
        timeline: false,
        export: false
    },
    finalPass: {
        status: 'standby',
        lockedAt: null
    },
    projectSnapshotLastSaved: null,
    betaReadiness: {
        webgl: false,
        cdn: false,
        storage: false,
        model: false,
        snapshot: false
    },
    launchReadiness: {
        guide: false,
        import: false,
        performance: false,
        snapshot: false,
        export: false,
        docs: false,
        score: 0,
        label: 'CHECK'
    },
    betaOps: {
        test: false,
        perf: false,
        errors: false,
        examples: false,
        package: false,
        deploy: false,
        lastBenchmark: null,
        lastReportAt: null
    },
    shareStateLastBuilt: null,
    pendingShareState: null,
    portableProject: {
        status: 'READY',
        detail: '모델과 발표 상태를 한 파일로 전달합니다.',
        busy: false,
        lastExportedAt: null,
        lastImportedAt: null
    },
    presenterNotes: [],
    savedMeasurements: [],
    stageTools: {
        pointerActive: false,
        pointerMode: 'laser',
        timerActive: false,
        timerRunning: false,
        timerTarget: 30,
        timerElapsedMs: 0,
        narrating: false
    },
    diagnosticsLog: [],
    runtimeErrors: [],
    partScanActive: false,
    partScanIndex: 0,
    // v8.0 Timeline Presenter
    timelineOpen: false,
    timelinePlaying: false,
    timelineLoop: false,
    timelineSpeed: 1.0,
    timelineDuration: 30,       // Total duration in seconds (max 120)
    timelineCurrentTime: 0,
    timelineKeyframes: []       // Array of keyframe objects
};

const fanExperimentConfig = {
    // Public release: the exo-suit preset always uses generic, IP-safe copy.
    // Brand-specific reference names are never shown in the UI.
    ironSuitEnabled: false,
    releaseSafeMode: true
};

function isIronSuitFanMode() {
    return fanExperimentConfig.ironSuitEnabled && !fanExperimentConfig.releaseSafeMode;
}

// Web Audio API Synthesizer Context
let audioCtx = null;
let ambientGain = null;
let compressor = null;
let ambientOsc = null;
let filterNode = null;

// Three.js Primary Stage Variables
let container = null;
let renderer = null;
let scene = null;
let camera = null;
let controls = null;

// HOLOSYN V9 Pro Variables
let composer = null;
let bloomPass = null;
let sceneLights = null; // { ambient, key, rim, fill, base } for runtime studio lighting control
let activeModelGroup = null; // Container for the rotating 3D models
let reticleGroup = null;     // Container for target reticles (v3.4)
let scanningPlane = null;    // Bounding surface scanner plane (v3.4)

// 3D Spatial Drawing & Spark Particles (v3.5)
let drawingsGroup = new THREE.Group();
let pointerRayLine = null;
let sparkParticles = null;
let sparkGeometry = null;
let sparkSpeeds = [];
let drawingPointsCache = [];

// v5.0 Ultimate Pro Edition — Holographic Scan Dome & History Archive Variables
let scanDomeGroup = null; // Container for scan dome and rings
let scanDomeCage = null;
let scanRingOuter = null;
let scanRingInner = null;
let scanDomePulseTime = 0;

const DOM = {}; // Cached DOM queries dictionary for runtime performance (v5.0 Optimization)

// ==========================================================================
// v6.0 Ultimate Engineering Suite Global Variables
// ==========================================================================
let windTunnelParticles = null;
let windTunnelSpeeds = [];
let windTunnelOriginalPositions = [];
state.heatSources = [];             // Stores custom heat sources: { point: Vector3, pinMesh: Mesh }
let assemblyTweensList = [];       // Stores active assembly interpolation objects
let customCalloutAnchors = [];     // User custom annotations: { id, point, pinMesh, title, desc, badgeEl }
let activeCalloutClickPoint = null; // Temp holder for raycast point before popup modal submit



// Caliper & Environment Assets (v3.7)
let isCaliperActive = false;
let caliperStartPoint = null;
let calipersList = [];       // Cache of { line, badgeEl, start, end, id }
let environmentGroup = new THREE.Group();
let envParticles = null;
let envLines = [];           // Cache for windtunnel line objects

// v3.8 Production Grade — Performance Flags
let fpsFrameCount = 0;
let fpsLastTime = performance.now();
let fpsDisplay = 0;
let resizeDebounceTimer = null;

// v3.8 Preferences Persistence (localStorage)
function savePreferences() {
    try {
        const prefs = {
            themeColor: state.themeColor,
            themeColorGlow: state.themeColorGlow,
            renderMode: state.renderMode,
            materialView: state.materialView,
            visualQualityBoost: state.visualQualityBoost,
            glowIntensity: state.glowIntensity,
            rotationSpeed: state.rotationSpeed,
            scanlineDensity: state.scanlineDensity,
            glitchFrequency: state.glitchFrequency,
            scale: state.scale,
            studioEnvironment: state.studioEnvironment,
            uiMode: state.uiMode,
            language: state.language,
            activePreset: state.activePreset
        };
        localStorage.setItem('holosyn_prefs', JSON.stringify(prefs));
    } catch (e) {
        // Silently fail if localStorage is unavailable
    }
}

function loadPreferences() {
    try {
        const raw = localStorage.getItem('holosyn_prefs');
        if (!raw) return;
        const prefs = JSON.parse(raw);
        
        // Merge saved preferences into state
        if (prefs.themeColor) state.themeColor = prefs.themeColor;
        if (prefs.themeColorGlow) state.themeColorGlow = prefs.themeColorGlow;
        if (prefs.renderMode) state.renderMode = prefs.renderMode;
        if (['hologram', 'product', 'hybrid'].includes(prefs.materialView)) state.materialView = prefs.materialView;
        if (typeof prefs.visualQualityBoost === 'boolean') state.visualQualityBoost = prefs.visualQualityBoost;
        if (typeof prefs.glowIntensity === 'number') state.glowIntensity = prefs.glowIntensity;
        if (typeof prefs.rotationSpeed === 'number') state.rotationSpeed = prefs.rotationSpeed;
        if (typeof prefs.scanlineDensity === 'number') state.scanlineDensity = prefs.scanlineDensity;
        if (typeof prefs.glitchFrequency === 'number') state.glitchFrequency = prefs.glitchFrequency;
        if (typeof prefs.scale === 'number') state.scale = prefs.scale;
        if (prefs.studioEnvironment) state.studioEnvironment = prefs.studioEnvironment;
        if (prefs.uiMode) state.uiMode = prefs.uiMode;
        if (prefs.language) state.language = prefs.language;
        if (prefs.activePreset) state.activePreset = prefs.activePreset;
        if (state.materialView !== 'hologram') state.renderMode = 'solid';
        
        // Apply body theme class from saved color
        const colorMap = {
            '#007aff': 'blue', '#34c759': 'green', '#ff9500': 'orange',
            '#af52de': 'purple', '#e5e5ea': 'silver', '#ff1e27': 'crimson',
            '#ffca28': 'gold', '#8e8e93': 'silver'
        };
        const themeClass = colorMap[state.themeColor];
        if (themeClass) document.body.className = `theme-${themeClass}`;
    } catch (e) {
        // Silently fail if parse errors
    }
}

// Three.js Cinematic Camera Targets
let targetCameraPosition = new THREE.Vector3(0, 4, 10);
let targetCameraTarget = new THREE.Vector3(0, 0, 0);

// Three.js Symmetrical 4-Way Emitter Variables (Pepper's Ghost)
let pyramidRenderer = null;
let pyramidCanvas = null;
let quadCameras = {
    top: null,
    bottom: null,
    left: null,
    right: null
};

// Radar Telemetry Canvas Variables
let radarCanvas = null;
let radarCtx = null;
let radarAngle = 0;
const radarPoints = [];

// Hologram Materials Map
let hologramMaterials = {
    wireframe: null,
    points: null,
    solid: null
};

// Time trackers
let clock = new THREE.Clock();
let lastGlitchTime = 0;
let glitchActive = false;
let glitchDuration = 0;

// Animated Scrolling Diagnostic Message Database (clean studio logs)
const systemLogTemplates = {
    ko: [
        "[진단] 스튜디오 정밀 하향식 조명 강도 보정 완료.",
        "[알루미늄] 거치대 정렬 상태 확인. 미세 진동: 0.002mm.",
        "[온도] 시스템 냉각 장치 구동 중. 하드웨어 상태: 최적.",
        "[카메라] 시네마틱 트래킹 오토 렌즈 포커싱 완료.",
        "[보정] 3D 입체 분해도 레이아웃 축 설정 완료.",
        "[데이터] 시제품 3차원 설계 축 로딩 완료.",
        "[원격] 텔레메트리 데이터가 가상 프레젠테이션 뷰에 연동 중입니다.",
        "[그리드] 제품 설계 구조 분석 완료."
    ],
    en: [
        "[DIAG] Studio overhead lighting calibration complete.",
        "[BASE] Aluminum display pedestal aligned. Micro-vibration: 0.002mm.",
        "[THERMAL] System cooling hardware operating in normal parameters.",
        "[CAMERA] Cinematic auto orbit tracking lens focused.",
        "[DIAG] 3D exploded disassembly axes mapped successfully.",
        "[DATA] Prototype 3D CAD axes loaded successfully.",
        "[TELEMETRY] Spec telemetry linked to virtual presentation views.",
        "[GRID] Structural schematic parsed."
    ]
};

// Custom Imported 3D Model placeholder
let uploadedMeshGroup = null;

// Floating 3D Part Annotations database (New v3.2)
const partAnnotations = {
    drone: [
        { name: "rotor", label: "HD Carbon Propeller (고속 로터)", offset: new THREE.Vector3(0.5, 0.4, 0.5) },
        { name: "chassis", label: "Aluminum Frame (메인 프레임)", offset: new THREE.Vector3(-0.6, 0.3, 0) },
        { name: "dome", label: "HD Sensor Dome (센서 보호 돔)", offset: new THREE.Vector3(0, 0.6, -0.2) },
        { name: "camera", label: "HD Gymbal Camera (짐벌 카메라)", offset: new THREE.Vector3(0.3, -0.6, 0.3) }
    ],
    ring: [
        { name: "gyro1", label: "Primary Gyroscopic Ring (1차 자이로)", offset: new THREE.Vector3(0.6, 0.6, 0) },
        { name: "gyro2", label: "Secondary Gyroscopic Ring (2차 자이로)", offset: new THREE.Vector3(-0.6, -0.6, 0) },
        { name: "gyro-core", label: "Primary Quantum Core (양자 융합 코어)", offset: new THREE.Vector3(0, 0, 0.5) },
        { name: "outer", label: "Space Titanium Shell (외경 하우징)", offset: new THREE.Vector3(0.9, 0, -0.9) }
    ],
    car: [
        { name: "cabin", label: "Aerodynamic Canopy (에어로 캐노피)", offset: new THREE.Vector3(-0.4, 0.6, 0) },
        { name: "spoiler", label: "Carbon Active Spoiler (스포일러)", offset: new THREE.Vector3(0.8, 0.5, 0) },
        { name: "wheel", label: "EV Chrome Rim Wheels (전동 크롬 휠)", offset: new THREE.Vector3(-0.7, -0.4, 0.6) },
        { name: "body", label: "Monocoque Chassis (초경량 합금 섀시)", offset: new THREE.Vector3(0.3, -0.2, -0.6) }
    ],
    battery: [
        { name: "rod", label: "Chronos Energy Rod (에너지 융합 로드)", offset: new THREE.Vector3(0.5, 0.3, 0.5) },
        { name: "plasma-ring-1", label: "Anode Plasma Ring (양극 배전 링)", offset: new THREE.Vector3(-0.8, -0.4, 0.8) },
        { name: "cap", label: "Aluminum Terminal Cap (알루미늄 단자)", offset: new THREE.Vector3(0, 0.9, -0.4) },
        { name: "tube", label: "Protective Outer Shell (외벽 쉴드)", offset: new THREE.Vector3(0.8, 0, -0.8) }
    ],
    exosuit: [
        { name: "helmet", label: "Helmet Shell (헬멧 쉘)", offset: new THREE.Vector3(0.30, 0.95, 0.35) },
        { name: "faceplate", label: "Faceplate Assembly (페이스플레이트)", offset: new THREE.Vector3(-0.35, 0.92, 0.76) },
        { name: "eye-r", label: "Optic Sensor Slit (광학 센서)", offset: new THREE.Vector3(0.38, 1.05, 0.88) },
        { name: "chest", label: "Torso Armor Shell (흉부 아머 쉘)", offset: new THREE.Vector3(0.46, 0.28, 0.68) },
        { name: "reactor-core", label: "Chest Power Core (가슴 파워 코어)", offset: new THREE.Vector3(-0.44, 0.18, 0.86) },
        { name: "gauntlet-r", label: "Right Gauntlet Assembly (우측 건틀릿)", offset: new THREE.Vector3(0.85, -0.10, 0.55) },
        { name: "palm-emitter-r", label: "Palm Thruster Emitter (손바닥 추진기)", offset: new THREE.Vector3(0.95, -0.25, 0.90) },
        { name: "thruster-pack", label: "Back Thruster Pack (등판 추진 팩)", offset: new THREE.Vector3(-0.50, 0.45, -0.85) },
        { name: "back-flap-r", label: "Flight Stabilizer Flap (비행 안정화 플랩)", offset: new THREE.Vector3(0.65, 0.50, -0.78) },
        { name: "boot-jet-r", label: "Boot Jet Nozzle (부츠 제트 노즐)", offset: new THREE.Vector3(0.45, -0.95, 0.35) }
    ],
    stand: [
        { name: "front-panel", label: "앞판 — 브랜드 명패면 (Front Nameplate)", offset: new THREE.Vector3(0, 0.55, 0.55) },
        { name: "living-hinge", label: "리빙 힌지 — 실용신안 포인트 (Living Hinge)", offset: new THREE.Vector3(0.7, 0.0, 0.4) },
        { name: "base-foot", label: "받침대 — 65° 자립 지지부 (Base Foot)", offset: new THREE.Vector3(0, -0.35, -0.55) }
    ],
    custom: [
        { name: "generic-1", label: "Chassis Frame (외관 프레임)", offset: new THREE.Vector3(0.8, 0.4, 0.8) },
        { name: "generic-2", label: "Central Core (중앙 연산 유닛)", offset: new THREE.Vector3(-0.8, -0.4, -0.8) }
    ]
};

const partScanRoleHints = {
    drone: {
        rotor: {
            ko: '추진력을 담당하는 회전부입니다. 발표 중에는 회전 안정성과 교체 가능한 모듈 구조를 강조하세요.',
            en: 'Propulsion rotor module. In demos, use it to explain flight stability and replaceable modular hardware.'
        },
        chassis: {
            ko: '부품을 지지하는 메인 프레임입니다. 무게 중심과 내구성 설명에 적합합니다.',
            en: 'Main support frame. Best for explaining weight balance, stiffness, and durability.'
        },
        dome: {
            ko: '센서 보호부입니다. 주변 인식, 보호 커버, 외부 환경 대응을 설명할 때 유용합니다.',
            en: 'Sensor protection dome. Use it for perception, protective housing, and environment-readiness talking points.'
        },
        camera: {
            ko: '시각 데이터 입력부입니다. 촬영, 검사, 원격 모니터링 기능을 한 번에 설명하기 좋습니다.',
            en: 'Visual input module. Good for camera, inspection, and remote monitoring explanations.'
        }
    },
    ring: {
        gyro1: {
            ko: '1차 자이로 구조입니다. 착용형 제품의 안정감과 내부 링 동작을 보여주는 핵심 부품입니다.',
            en: 'Primary gyro structure. Use it to explain inner-ring motion and wearable stability.'
        },
        gyro2: {
            ko: '2차 자이로 링입니다. 반대 방향 움직임으로 균형과 인터랙션을 보강합니다.',
            en: 'Secondary gyro ring. It supports balance and interaction through counter motion.'
        },
        'gyro-core': {
            ko: '중앙 코어입니다. 제품의 연산/센서/에너지 이야기를 집중시키기 좋은 발표 지점입니다.',
            en: 'Central core. A strong anchor for compute, sensing, and energy-system storytelling.'
        },
        outer: {
            ko: '외부 셸입니다. 사용자가 직접 만지는 표면, 소재감, 내구성 설명에 적합합니다.',
            en: 'Outer shell. Best for discussing touch surface, material quality, and durability.'
        }
    },
    car: {
        cabin: {
            ko: '탑승/센서 캐노피입니다. 공력 흐름과 사용자 공간을 함께 설명하세요.',
            en: 'Cabin and sensor canopy. Use it for airflow and user-space explanations.'
        },
        spoiler: {
            ko: '능동 스포일러입니다. 고속 안정성, 다운포스, 움직이는 부품의 가치를 보여줍니다.',
            en: 'Active spoiler. It highlights stability, downforce, and moving-part value.'
        },
        wheel: {
            ko: '휠 모듈입니다. 구동부, 접지력, 유지보수성을 짧게 설명하기 좋습니다.',
            en: 'Wheel module. Use it for drivetrain, grip, and maintainability notes.'
        },
        body: {
            ko: '차체 프레임입니다. 전체 구조, 탑재 공간, 충돌 안정성의 기준점입니다.',
            en: 'Body frame. The baseline for structure, packaging, and impact stability.'
        }
    },
    battery: {
        rod: {
            ko: '에너지 로드입니다. 코어 출력과 내부 에너지 흐름을 설명하는 중심축입니다.',
            en: 'Energy rod. The central axis for output and internal energy-flow storytelling.'
        },
        'plasma-ring-1': {
            ko: '배전 링입니다. 전력 분산, 보호 회로, 열 흐름을 시각적으로 설명하기 좋습니다.',
            en: 'Distribution ring. Useful for explaining power spread, protection, and heat flow.'
        },
        cap: {
            ko: '터미널 캡입니다. 연결부, 교체성, 안전 체결 포인트를 보여주세요.',
            en: 'Terminal cap. Use it for connection, replaceability, and safe coupling points.'
        },
        tube: {
            ko: '외부 보호 셸입니다. 충격 보호와 열 차폐를 설명하는 외곽 부품입니다.',
            en: 'Outer protective shell. Best for impact protection and thermal shielding.'
        }
    },
    exosuit: {
        helmet: {
            ko: '헬멧 쉘입니다. 시야, 보호, 센서 탑재 공간을 한 번에 설명하는 상단 기준점입니다.',
            en: 'Helmet shell. A top-level anchor for visibility, protection, and sensor packaging.'
        },
        faceplate: {
            ko: '페이스플레이트입니다. 사용자가 가장 먼저 인식하는 얼굴부와 보호 구조를 강조하세요.',
            en: 'Faceplate assembly. Use it to highlight the recognisable front surface and protection layer.'
        },
        'eye-r': {
            ko: '광학 센서 슬릿입니다. 인식, 타겟팅, 상태 표시를 설명하기 좋은 디테일입니다.',
            en: 'Optic sensor slit. Good for perception, targeting, and status-light details.'
        },
        chest: {
            ko: '흉부 아머 쉘입니다. 상체 하중, 보호 범위, 코어 탑재 구조의 기준입니다.',
            en: 'Torso armor shell. The baseline for upper-body load, protection, and core packaging.'
        },
        'reactor-core': {
            ko: '가슴 파워 코어입니다. 전체 시스템의 에너지 중심으로 발표 임팩트가 가장 큰 부품입니다.',
            en: 'Chest power core. The strongest hero part for explaining the energy center of the system.'
        },
        'gauntlet-r': {
            ko: '우측 건틀릿입니다. 손 제어부, 보호부, 추진기 모듈을 이어주는 조립 포인트입니다.',
            en: 'Right gauntlet assembly. It links hand control, protection, and thruster modules.'
        },
        'palm-emitter-r': {
            ko: '손바닥 추진기입니다. 제스처 기반 출력과 방향 제어를 보여주는 발표용 디테일입니다.',
            en: 'Palm thruster emitter. A strong detail for gesture-driven output and direction control.'
        },
        'thruster-pack': {
            ko: '등판 추진 팩입니다. 보조 추진, 열 배출, 후면 구조를 설명하기 좋은 부품입니다.',
            en: 'Back thruster pack. Useful for auxiliary thrust, heat exhaust, and rear-structure explanation.'
        },
        'back-flap-r': {
            ko: '비행 안정화 플랩입니다. 자세 제어와 접힘/펼침 기구를 보여주는 움직임 포인트입니다.',
            en: 'Flight stabilizer flap. Use it for attitude control and folding mechanism storytelling.'
        },
        'boot-jet-r': {
            ko: '부츠 제트 노즐입니다. 착지 안정성, 보조 추진, 하단 구조 설명에 적합합니다.',
            en: 'Boot jet nozzle. Good for landing stability, auxiliary thrust, and lower-body structure.'
        }
    },
    stand: {
        'front-panel': {
            ko: '브랜드 명패면입니다. 고객이 가장 먼저 보는 정보면과 매대 가시성을 설명하세요.',
            en: 'Front nameplate face. Use it to explain first-glance shelf visibility and message area.'
        },
        'living-hinge': {
            ko: '리빙 힌지입니다. 접힘/펼침 구조와 반복 사용성을 보여주는 핵심 포인트입니다.',
            en: 'Living hinge. The key point for fold-open structure and repeated-use durability.'
        },
        'base-foot': {
            ko: '받침대입니다. 65도 자립 각도와 매대 위 안정성을 보여주는 하단 구조입니다.',
            en: 'Base foot. Shows the 65-degree self-standing angle and shelf stability.'
        }
    },
    custom: {
        'generic-1': {
            ko: '주요 외관 또는 섀시 부품입니다. 사용자가 가져온 모델의 핵심 형상을 먼저 설명하세요.',
            en: 'Primary shell or chassis part. Start by explaining the main form of the imported model.'
        },
        'generic-2': {
            ko: '중앙 코어 또는 보조 부품입니다. 내부 기능과 조립 관계를 설명하는 데 적합합니다.',
            en: 'Central core or secondary part. Use it to explain internal function and assembly relation.'
        }
    }
};

function clonePartAnnotation(ann) {
    return {
        ...ann,
        offset: ann.offset?.clone ? ann.offset.clone() : new THREE.Vector3(0.6, 0.4, 0.6)
    };
}

const defaultCustomPartAnnotations = partAnnotations.custom.map(clonePartAnnotation);
const defaultCustomPartScanHints = { ...partScanRoleHints.custom };

function resetCustomPartMap() {
    partAnnotations.custom = defaultCustomPartAnnotations.map(clonePartAnnotation);
    partScanRoleHints.custom = { ...defaultCustomPartScanHints };
}

function cleanImportedPartName(rawName, fallbackIndex) {
    const readable = String(rawName || '')
        .replace(/\.[^/.]+$/g, '')
        .replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    return readable || `Imported Part ${String(fallbackIndex + 1).padStart(2, '0')}`;
}

function slugImportedPartName(rawName, fallbackIndex, usedNames) {
    const genericNames = /^(mesh|object|node|group|scene|default|geometry|primitive)$/i;
    let base = cleanImportedPartName(rawName, fallbackIndex)
        .toLowerCase()
        .replace(/[^a-z0-9가-힣]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 42);
    if (!base || genericNames.test(base)) base = `import-part-${fallbackIndex + 1}`;

    let candidate = base;
    let suffix = 2;
    while (usedNames.has(candidate)) {
        candidate = `${base}-${suffix}`;
        suffix++;
    }
    usedNames.add(candidate);
    return candidate;
}

function inferImportedPartRole(rawName, index) {
    const name = String(rawName || '').toLowerCase();
    const rules = [
        {
            test: /(wheel|tire|rim|rotor|fan|prop|blade|thruster|motor|nozzle)/,
            label: 'Drive Module',
            ko: '구동/추진 계열 부품입니다. 움직임, 방향 제어, 출력 전달을 설명하기 좋습니다.',
            en: 'Drive or propulsion component. Use it for motion, directional control, or power delivery.'
        },
        {
            test: /(camera|sensor|lens|lidar|radar|optic|eye)/,
            label: 'Sensor Module',
            ko: '센서/광학 계열 부품입니다. 인식, 입력 데이터, 사용자 피드백을 설명하는 지점입니다.',
            en: 'Sensor or optics component. Good for perception, input data, and feedback explanations.'
        },
        {
            test: /(core|battery|cell|power|reactor|engine|cpu|board|pcb)/,
            label: 'Core Module',
            ko: '전원/연산/핵심 코어 계열 부품입니다. 제품 가치와 기능 중심을 설명하세요.',
            en: 'Power, compute, or core module. Use it as the functional center of the product story.'
        },
        {
            test: /(shell|body|frame|chassis|case|housing|cover|panel|plate)/,
            label: 'Shell Module',
            ko: '외장/프레임 계열 부품입니다. 소재감, 구조 강성, 사용자 접점을 설명하기 좋습니다.',
            en: 'Shell or frame component. Best for material quality, structure, and user-facing surfaces.'
        },
        {
            test: /(arm|leg|hinge|joint|link|mount|bracket|connector)/,
            label: 'Linkage Module',
            ko: '연결/관절/지지 계열 부품입니다. 조립 관계와 반복 사용성을 보여주는 데 적합합니다.',
            en: 'Linkage, joint, or support component. Good for explaining assembly relation and durability.'
        }
    ];
    const rule = rules.find(item => item.test.test(name));
    return rule || {
        label: `Mapped Part ${String(index + 1).padStart(2, '0')}`,
        ko: '자동 인식된 커스텀 부품입니다. 형상 위치와 주변 부품과의 관계를 중심으로 설명하세요.',
        en: 'Auto-mapped imported component. Explain its form, position, and relationship to neighboring parts.'
    };
}

function rebuildCustomPartAnnotations(group) {
    resetCustomPartMap();
    if (!group) return 0;

    const usedNames = new Set();
    const mapped = [];
    let meshIndex = 0;
    group.updateMatrixWorld(true);

    group.traverse(child => {
        if (!child.isMesh) return;
        const originalName = child.userData.originalImportName || child.name || '';
        const safeName = slugImportedPartName(originalName, meshIndex, usedNames);
        const readableName = cleanImportedPartName(originalName, meshIndex);
        const role = inferImportedPartRole(originalName || safeName, meshIndex);
        const box = new THREE.Box3().setFromObject(child);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        if (!box.isEmpty()) {
            box.getSize(size);
            box.getCenter(center);
        }

        child.userData.originalImportName = readableName;
        child.name = safeName;

        const offset = child.userData.explodedOffset?.clone
            ? child.userData.explodedOffset.clone()
            : new THREE.Vector3(center.x || 0, center.y >= 0 ? 0.45 : -0.45, center.z || 0).normalize().multiplyScalar(0.7);
        const score = Math.max(size.x * size.y * size.z, size.lengthSq(), 0.001);

        mapped.push({
            name: safeName,
            label: `${readableName} (${role.label})`,
            defaultLabel: `${readableName} (${role.label})`,
            offset,
            score,
            role
        });
        meshIndex++;
    });

    if (mapped.length === 0) return 0;

    const selected = mapped
        .sort((a, b) => b.score - a.score)
        .slice(0, 12);

    partAnnotations.custom = selected.map(({ score, role, ...ann }) => ({
        name: ann.name,
        label: ann.label,
        defaultLabel: ann.defaultLabel,
        offset: ann.offset
    }));
    partScanRoleHints.custom = selected.reduce((hints, item) => {
        hints[item.name] = { ko: item.role.ko, en: item.role.en };
        return hints;
    }, {});
    applyAnnotationLabelOverrides();
    return partAnnotations.custom.length;
}

const prototypePresenterTips = {
    drone: {
        ko: "분해도 50%와 Top view를 함께 쓰면 구조 설명이 가장 선명합니다.",
        en: "Use 50% exploded view with Top view for the clearest structure walkthrough."
    },
    ring: {
        ko: "Macro view에서 내부 링과 코어를 천천히 회전시키면 착용형 제품 데모가 좋아집니다.",
        en: "Use Macro view with a slow orbit to present the inner rings and wearable core."
    },
    car: {
        ko: "Front view로 외형을 먼저 보여준 뒤, 분해도로 휠과 차체 구조를 펼쳐 보세요.",
        en: "Start from Front view, then open the exploded view to show wheels and chassis."
    },
    battery: {
        ko: "X-ray 또는 열감지 모드와 함께 쓰면 내부 코어 구조 설명에 적합합니다.",
        en: "Pair X-ray or thermal mode with this model to explain the internal core."
    },
    exosuit: {
        ko: "Macro view와 분해도 35%를 함께 쓰면 헬멧, 파워 코어, 손바닥 추진 빔, 부츠 플레어가 가장 잘 보입니다.",
        en: "Use Macro view with 35% exploded view to show the helmet, power core, palm thrusters, and boot flare clearly."
    },
    stand: {
        ko: "Front view로 명패면을 먼저 보여준 뒤, 분해도(또는 조립 시퀀스)로 접힘→펼침과 리빙 힌지(실용신안 포인트)를 강조하세요.",
        en: "Show the nameplate face in Front view, then use the exploded/assembly view to highlight the fold and the living hinge."
    },
    customMulti: {
        ko: "제품명과 기술 분류를 먼저 정리한 뒤 Showcase를 실행하면 바로 발표 패키지가 됩니다.",
        en: "Edit the product name and category first, then run Showcase for a ready demo flow."
    },
    customSingle: {
        ko: "단일 메쉬입니다. 파트 분해가 필요하면 부품이 분리된 GLB/OBJ로 다시 내보내 보세요.",
        en: "This is a single mesh. Export a multi-part GLB/OBJ if you need exploded assembly."
    },
    image: {
        ko: "이미지 기반 투사입니다. PNG 캡처 중심의 콘셉트 보드 시연에 적합합니다.",
        en: "This is an image-based projection. It works best as a concept-board snapshot."
    }
};

const samplePrototypeCatalog = {
    drone: {
        label: 'AeroDrone',
        source: 'UAV pitch sample',
        meshes: '7 parts',
        fit: 'Auto-fit ready',
        noteKo: '투자자용 30초 시연에 가장 무난한 기본 샘플입니다.',
        noteEn: 'Best default sample for a concise investor-style walkthrough.'
    },
    ring: {
        label: 'Nexus Ring',
        source: 'Wearable sample',
        meshes: '4 parts',
        fit: 'Macro ready',
        noteKo: '접사와 회전으로 착용형 디바이스 감성을 보여주기 좋습니다.',
        noteEn: 'Good for macro views and premium wearable presentation.'
    },
    car: {
        label: 'EV Concept',
        source: 'Mobility sample',
        meshes: '5 parts',
        fit: 'Wide-view ready',
        noteKo: '외형, 휠, 차체 구조를 순서대로 보여주는 쇼룸형 샘플입니다.',
        noteEn: 'Showroom-style sample for exterior, wheels, and chassis structure.'
    },
    battery: {
        label: 'Core Cell',
        source: 'Energy sample',
        meshes: '6 parts',
        fit: 'X-ray ready',
        noteKo: '열감지와 엑스레이 모드로 내부 코어 설명에 적합합니다.',
        noteEn: 'Designed for thermal and X-ray explanation of internal core systems.'
    },
    exosuit: {
        label: 'Forge Exo-Suit',
        source: 'Armor lab sample',
        meshes: '53 parts',
        fit: 'Suit demo ready',
        noteKo: '헬멧, 흉부 코어, 손바닥 추진기, 등판 플랩, 부츠 노즐을 분해도와 함께 보여주는 파워드 아머 시연입니다.',
        noteEn: 'Powered armor demo with helmet, chest core, palm thrusters, back flaps, and boot nozzles ready for exploded views.'
    },
    stand: {
        label: 'ST,AND',
        source: '소셜벤처 실제 제품',
        meshes: '3 parts',
        fit: '65° 자립 명패',
        noteKo: '편의점 라면 매대용 자립 명패. 분해도 또는 조립 시퀀스로 접힘→펼침 구조와 리빙 힌지를 시연하세요.',
        noteEn: 'Self-standing nameplate for ramen shelves. Use exploded/assembly view to show the fold and living hinge.'
    }
};

const demoPresetScenarios = {
    investor: {
        label: 'Investor Pitch',
        preset: 'drone',
        renderMode: 'solid',
        camera: 'front',
        environment: 'cupertino',
        explodedLevel: 0.18,
        rotationSpeed: 0.35,
        keyframes: [
            { time: 0, position: { x: 0, y: 0.8, z: 7.5 }, target: { x: 0, y: 0, z: 0 }, explodedLevel: 0.0, renderMode: 'solid', subtitleKo: '제품 전체 인상과 시장 발표용 실루엣', subtitleEn: 'Hero silhouette and market-ready product impression.' },
            { time: 4, position: { x: 0, y: 7.5, z: 0.01 }, target: { x: 0, y: 0, z: 0 }, explodedLevel: 0.5, renderMode: 'wireframe', subtitleKo: '핵심 구조와 부품 분해 포인트', subtitleEn: 'Core structure and exploded component logic.' },
            { time: 9, position: { x: 0.8, y: 0.4, z: 2.5 }, target: { x: 0.2, y: 0.1, z: 0.1 }, explodedLevel: 0.22, renderMode: 'solid', subtitleKo: '차별화된 디테일을 접사로 강조', subtitleEn: 'Macro focus on the differentiating detail.' }
        ]
    },
    exploded: {
        label: 'Exploded View',
        preset: 'battery',
        renderMode: 'xray',
        camera: 'top',
        environment: 'cyberpunk',
        explodedLevel: 0.75,
        rotationSpeed: 0.18,
        keyframes: [
            { time: 0, position: { x: 0, y: 4, z: 10 }, target: { x: 0, y: 0, z: 0 }, explodedLevel: 0.0, renderMode: 'wireframe', subtitleKo: '결합 상태의 기준 형상', subtitleEn: 'Baseline assembled geometry.' },
            { time: 3.5, position: { x: 0, y: 7.5, z: 0.01 }, target: { x: 0, y: 0, z: 0 }, explodedLevel: 0.78, renderMode: 'xray', subtitleKo: '내부 구조를 분해도와 엑스레이로 확인', subtitleEn: 'Internal layout through exploded X-ray view.' },
            { time: 8, position: { x: 0.8, y: 0.4, z: 2.5 }, target: { x: 0.2, y: 0.1, z: 0.1 }, explodedLevel: 0.48, renderMode: 'thermal', subtitleKo: '핵심 코어와 열 흐름 검토', subtitleEn: 'Core and heat-flow review.' }
        ]
    },
    retail: {
        label: 'Retail Showcase',
        preset: 'ring',
        renderMode: 'solid',
        camera: 'macro',
        environment: 'cupertino',
        explodedLevel: 0.08,
        rotationSpeed: 0.55,
        keyframes: [
            { time: 0, position: { x: 0, y: 4, z: 10 }, target: { x: 0, y: 0, z: 0 }, explodedLevel: 0.0, renderMode: 'solid', subtitleKo: '프리미엄 제품 쇼룸 오프닝', subtitleEn: 'Premium showroom opening shot.' },
            { time: 3, position: { x: 0.8, y: 0.4, z: 2.5 }, target: { x: 0.2, y: 0.1, z: 0.1 }, explodedLevel: 0.12, renderMode: 'solid', subtitleKo: '소재와 디테일 중심 접사', subtitleEn: 'Macro material and detail pass.' },
            { time: 7, position: { x: 0, y: 0.8, z: 7.5 }, target: { x: 0, y: 0, z: 0 }, explodedLevel: 0.0, renderMode: 'wireframe', subtitleKo: '마지막에 구조 신뢰도 보강', subtitleEn: 'Final structural credibility pass.' }
        ]
    },
    tech: {
        label: 'Tech Review',
        preset: 'car',
        renderMode: 'wireframe',
        camera: 'top',
        environment: 'windtunnel',
        explodedLevel: 0.55,
        rotationSpeed: 0.22,
        keyframes: [
            { time: 0, position: { x: 0, y: 0.8, z: 7.5 }, target: { x: 0, y: 0, z: 0 }, explodedLevel: 0.0, renderMode: 'wireframe', subtitleKo: '엔지니어링 리뷰용 정면 기준', subtitleEn: 'Engineering review baseline front angle.' },
            { time: 4, position: { x: 0, y: 7.5, z: 0.01 }, target: { x: 0, y: 0, z: 0 }, explodedLevel: 0.56, renderMode: 'wireframe', subtitleKo: '상단 도식과 공력 흐름 검토', subtitleEn: 'Top schematic and airflow review.' },
            { time: 9, position: { x: 0.8, y: 0.4, z: 2.5 }, target: { x: 0.2, y: 0.1, z: 0.1 }, explodedLevel: 0.35, renderMode: 'xray', subtitleKo: '섀시 내부 구조 확인', subtitleEn: 'Chassis internal structure inspection.' }
        ]
    },
    suit: {
        label: 'Exo-Suit Lab',
        preset: 'exosuit',
        renderMode: 'xray',
        camera: 'front',
        environment: 'cyberpunk',
        explodedLevel: 0.28,
        rotationSpeed: 0.28,
        keyframes: [
            { time: 0, position: { x: 0, y: 0.8, z: 7.5 }, target: { x: 0, y: 0.25, z: 0 }, explodedLevel: 0.0, renderMode: 'xray', subtitleKo: '엑소수트 엑스레이 홀로그램 구동', subtitleEn: 'Exo-suit full x-ray hologram boot sequence.' },
            { time: 4, position: { x: 0.8, y: 0.4, z: 2.5 }, target: { x: 0.08, y: 0.45, z: 0.12 }, explodedLevel: 0.35, renderMode: 'xray', subtitleKo: '가슴 파워 코어, 빔 이미터, 헬멧 안구 센서 동기화', subtitleEn: 'Chest power core, beam emitter, and helmet eye sensors sync.' },
            { time: 8, position: { x: 0, y: 7.5, z: 0.01 }, target: { x: 0, y: 0, z: 0 }, explodedLevel: 0.66, renderMode: 'wireframe', subtitleKo: '비행 플랩, 손바닥 추진 빔, 부츠 플레어 분해도 전개', subtitleEn: 'Exploded layout of flight flaps, palm thruster beams, and boot flare.' }
        ]
    }
};

const releaseSafeExosuitCopy = {
    sample: {
        label: 'Forge Exo Suit',
        source: 'Armor lab sample',
        meshes: '53 parts',
        fit: 'Suit demo ready',
        noteKo: '헬멧, 흉부 코어, 손바닥 추진기, 등판 플랩, 부츠 노즐을 분해도와 함께 보여주는 파워드 아머 시연입니다.',
        noteEn: 'Powered armor demo with helmet, chest core, palm thrusters, back flaps, and boot nozzles ready for exploded views.'
    },
    demoLabel: 'Suit Lab',
    specName: 'Forge Exo Suit',
    specCategory: 'WEARABLE // ARMOR',
    specSubtitle: 'POWERED EXOSUIT // ARMOR LAB CONCEPT',
    specs: {
        weight: "95 kg",
        power: "1.2 MW",
        thermal: "94%",
        id: "EXO-FG-FAN",
        volume: "1.85 m³",
        stability: "99.18%",
        discharge: "24.0 kWh",
        emission: "15.0°"
    },
    keyframes: [
        { time: 0, position: { x: 0, y: 0.8, z: 7.5 }, target: { x: 0, y: 0.25, z: 0 }, explodedLevel: 0.0, renderMode: 'solid', subtitleKo: '파워드 아머 전체 레이아웃 구동', subtitleEn: 'Powered armor full layout boot sequence.' },
        { time: 4, position: { x: 0.8, y: 0.4, z: 2.5 }, target: { x: 0.08, y: 0.45, z: 0.12 }, explodedLevel: 0.32, renderMode: 'xray', subtitleKo: '가슴 코어 및 헬멧 센서 동기화', subtitleEn: 'Chest core and helmet sensor sync.' },
        { time: 8, position: { x: 0, y: 7.5, z: 0.01 }, target: { x: 0, y: 0, z: 0 }, explodedLevel: 0.62, renderMode: 'wireframe', subtitleKo: '비행 플랩 및 손 추진기 분해도 전개', subtitleEn: 'Exploded layout of flight flaps and palm thrusters.' }
    ]
};

function getExosuitPresentationCopy() {
    if (!isIronSuitFanMode()) return releaseSafeExosuitCopy;
    return {
        sample: samplePrototypeCatalog.exosuit,
        demoLabel: 'Exo-Suit Lab',
        specName: 'Forge Exo-Suit',
        specCategory: 'WEARABLE // ARMOR',
        specSubtitle: 'NANO COLLAPSIBLE ARMOR // ADVANCED LAB CONCEPT',
        specs: {
            weight: "95 kg",
            power: "1.2 GW",
            thermal: "94%",
            id: "EXO-85-NANO",
            volume: "1.85 m³",
            stability: "99.98%",
            discharge: "2.4 GWh",
            emission: "15.0°"
        },
        keyframes: demoPresetScenarios.suit.keyframes
    };
}

function applyLocalFanExperimentCopy() {
    const copy = getExosuitPresentationCopy();
    if (!isIronSuitFanMode()) {
        samplePrototypeCatalog.exosuit = { ...copy.sample };
        demoPresetScenarios.suit.label = copy.demoLabel;
        demoPresetScenarios.suit.keyframes = copy.keyframes;
    }

    const presetBtn = document.querySelector('[data-preset="exosuit"]');
    if (presetBtn) {
        presetBtn.title = copy.specName;
        const label = presetBtn.querySelector('span');
        if (label) label.textContent = isIronSuitFanMode() ? 'Exo-Suit' : 'Suit';
    }

    const demoBtn = document.querySelector('[data-demo-preset="suit"] span');
    if (demoBtn) demoBtn.textContent = copy.demoLabel;
}

function getAnnotationStorageKey() {
    return 'holosyn_annotation_labels';
}

function getBrowserStorage() {
    return (typeof window !== 'undefined' && window.localStorage) ? window.localStorage : null;
}

function getAnnotationOverrides() {
    try {
        const storage = getBrowserStorage();
        if (!storage) return {};
        const raw = storage.getItem(getAnnotationStorageKey());
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        return {};
    }
}

function applyAnnotationLabelOverrides() {
    const overrides = getAnnotationOverrides();
    Object.entries(overrides).forEach(([presetName, labels]) => {
        if (!partAnnotations[presetName] || !labels || typeof labels !== 'object') return;
        partAnnotations[presetName].forEach(ann => {
            if (typeof labels[ann.name] === 'string' && labels[ann.name].trim()) {
                ann.label = labels[ann.name].trim();
            }
        });
    });
}

function saveAnnotationLabel(presetName, partName, label) {
    try {
        const overrides = getAnnotationOverrides();
        if (!overrides[presetName]) overrides[presetName] = {};
        overrides[presetName][partName] = label;
        const storage = getBrowserStorage();
        if (storage) storage.setItem(getAnnotationStorageKey(), JSON.stringify(overrides));
    } catch (e) {
        // Label edits still work for the current session when storage is unavailable.
    }
}

function resetAnnotationLabels(presetName = state.activePreset) {
    const defaults = {
        drone: {
            rotor: "HD Carbon Propeller (고속 로터)",
            chassis: "Aluminum Frame (메인 프레임)",
            dome: "HD Sensor Dome (센서 보호 돔)",
            camera: "HD Gymbal Camera (짐벌 카메라)"
        },
        ring: {
            gyro1: "Primary Gyroscopic Ring (1차 자이로)",
            gyro2: "Secondary Gyroscopic Ring (2차 자이로)",
            "gyro-core": "Primary Quantum Core (양자 융합 코어)",
            outer: "Space Titanium Shell (외경 하우징)"
        },
        car: {
            cabin: "Aerodynamic Canopy (에어로 캐노피)",
            spoiler: "Carbon Active Spoiler (스포일러)",
            wheel: "EV Chrome Rim Wheels (전동 크롬 휠)",
            body: "Monocoque Chassis (초경량 합금 섀시)"
        },
        battery: {
            rod: "Chronos Energy Rod (에너지 융합 로드)",
            "plasma-ring-1": "Anode Plasma Ring (양극 배전 링)",
            cap: "Aluminum Terminal Cap (알루미늄 단자)",
            tube: "Protective Outer Shell (외벽 쉴드)"
        },
        exosuit: {
            helmet: "Helmet Shell (헬멧 쉘)",
            faceplate: "Faceplate Assembly (페이스플레이트)",
            "eye-r": "Optic Sensor Slit (광학 센서)",
            chest: "Torso Armor Shell (흉부 아머 쉘)",
            "reactor-core": "Chest Power Core (가슴 파워 코어)",
            "gauntlet-r": "Right Gauntlet Assembly (우측 건틀릿)",
            "palm-emitter-r": "Palm Thruster Emitter (손바닥 추진기)",
            "thruster-pack": "Back Thruster Pack (등판 추진 팩)",
            "back-flap-r": "Flight Stabilizer Flap (비행 안정화 플랩)",
            "boot-jet-r": "Boot Jet Nozzle (부츠 제트 노즐)"
        },
        custom: {
            "generic-1": "Chassis Frame (외관 프레임)",
            "generic-2": "Central Core (중앙 연산 유닛)"
        }
    };

    if (!partAnnotations[presetName] || !defaults[presetName]) return;

    partAnnotations[presetName].forEach(ann => {
        if (defaults[presetName][ann.name]) {
            ann.label = defaults[presetName][ann.name];
        } else if (presetName === 'custom' && ann.defaultLabel) {
            ann.label = ann.defaultLabel;
        }
    });

    try {
        const overrides = getAnnotationOverrides();
        delete overrides[presetName];
        const storage = getBrowserStorage();
        if (storage) storage.setItem(getAnnotationStorageKey(), JSON.stringify(overrides));
    } catch (e) {
        // Reset still applies in memory.
    }

    const container = document.getElementById('annotations-container');
    if (container) container.innerHTML = '';
    editingPartName = null;
    if (controls) controls.enabled = true;

    showNotification(
        state.language === 'ko' ? "파트 라벨 초기화" : "Part Labels Reset",
        state.language === 'ko' ? "현재 모델의 파트 라벨을 기본값으로 되돌렸습니다." : "Current model part labels were restored to defaults."
    );
}

function initAnnotationLabelControls() {
    const resetBtn = document.getElementById('btn-reset-annotations');
    if (!resetBtn) return;
    resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetAnnotationLabels(state.activePreset);
    });
}

function findModelPartRoot(partName) {
    if (!activeModelGroup || !partName) return null;
    let target = null;
    activeModelGroup.traverse(child => {
        if (!target && child.name === partName) {
            target = child;
        }
    });
    return target;
}

function isNodeInsidePart(node, partName) {
    let current = node;
    while (current && current !== activeModelGroup) {
        if (current.name === partName) return true;
        current = current.parent;
    }
    return false;
}

function getPartScanList(presetName = state.activePreset) {
    const annotations = partAnnotations[presetName] || [];
    if (!activeModelGroup || activeModelGroup.children.length === 0) return annotations;
    return annotations.filter(ann => !!findModelPartRoot(ann.name));
}

function getCurrentPartScanAnnotation() {
    const scanList = getPartScanList();
    if (scanList.length === 0) return null;
    state.partScanIndex = ((state.partScanIndex % scanList.length) + scanList.length) % scanList.length;
    return scanList[state.partScanIndex];
}

function getPartScanTitle(ann) {
    if (!ann) return state.language === 'ko' ? '부품 스캔' : 'Part Scan';
    return ann.label.replace(/\s*\([^)]*\)/g, '').trim() || ann.name.replace(/[-_]/g, ' ');
}

function getPartScanDescription(ann) {
    if (!ann) {
        return state.language === 'ko'
            ? '분리된 부품이 있는 모델을 선택하면 핵심 파트를 하나씩 강조합니다.'
            : 'Choose a multi-part model to isolate and present each component one by one.';
    }
    const hint = partScanRoleHints[state.activePreset]?.[ann.name];
    if (hint) return state.language === 'ko' ? hint.ko : hint.en;
    return state.language === 'ko'
        ? `${getPartScanTitle(ann)} 부품을 단독 강조합니다. 나머지 구조는 투명하게 남겨 조립 관계를 유지합니다.`
        : `Isolating ${getPartScanTitle(ann)} while keeping the surrounding assembly as a translucent reference.`;
}

function setPartScanButtonState() {
    const buttons = [
        document.getElementById('btn-part-scan'),
        document.getElementById('btn-part-scan-card')
    ].filter(Boolean);

    buttons.forEach(btn => {
        btn.classList.toggle('active', !!state.partScanActive);
        btn.setAttribute('aria-pressed', state.partScanActive ? 'true' : 'false');
    });

    const toggleBtn = document.getElementById('btn-part-scan');
    const label = toggleBtn?.querySelector('span');
    if (label) {
        label.textContent = state.partScanActive
            ? (state.language === 'ko' ? 'SCAN ON' : 'SCAN ON')
            : 'PART SCAN';
    }
}

function renderPartScanMap(scanList, activeIndex) {
    const map = document.getElementById('part-scan-map');
    const track = document.getElementById('part-scan-map-track');
    const count = document.getElementById('part-scan-map-count');
    if (!map || !track) return;

    const list = Array.isArray(scanList) ? scanList : [];
    if (count) count.textContent = String(list.length);
    map.classList.toggle('empty', list.length === 0);
    track.innerHTML = '';

    list.forEach((item, index) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'part-scan-map-chip';
        chip.dataset.partScanIndex = String(index);
        chip.classList.toggle('active', index === activeIndex);
        chip.setAttribute('aria-pressed', index === activeIndex ? 'true' : 'false');
        chip.title = getPartScanTitle(item);

        const num = document.createElement('span');
        num.className = 'part-scan-map-index';
        num.textContent = String(index + 1).padStart(2, '0');

        const name = document.createElement('span');
        name.className = 'part-scan-map-name';
        name.textContent = getPartScanTitle(item);

        chip.append(num, name);
        track.appendChild(chip);
    });
}

function updatePartScanPanel() {
    const panel = document.getElementById('part-scan-panel');
    if (!panel) return;

    const scanList = getPartScanList();
    const ann = getCurrentPartScanAnnotation();
    panel.classList.toggle('active', !!state.partScanActive && !!ann);
    renderPartScanMap(scanList, ann ? state.partScanIndex : -1);

    const counter = document.getElementById('part-scan-counter');
    if (counter) {
        counter.textContent = ann ? `${state.partScanIndex + 1} / ${scanList.length}` : '0 / 0';
    }

    const title = document.getElementById('part-scan-title');
    if (title) title.textContent = getPartScanTitle(ann);

    const desc = document.getElementById('part-scan-desc');
    if (desc) desc.textContent = getPartScanDescription(ann);

    setPartScanButtonState();
}

function cloneMaterialSet(material) {
    if (Array.isArray(material)) return material.map(item => item?.clone ? item.clone() : item);
    return material?.clone ? material.clone() : material;
}

function visitMaterialSet(material, callback) {
    if (Array.isArray(material)) {
        material.forEach((item, index) => item && callback(item, index));
    } else if (material) {
        callback(material, 0);
    }
}

function captureMaterialOpacity(material) {
    if (Array.isArray(material)) {
        return material.map(item => Number.isFinite(item?.opacity) ? item.opacity : 1);
    }
    return Number.isFinite(material?.opacity) ? material.opacity : 1;
}

function restoreMaterialOpacity(material, savedOpacity, fallbackOpacity = 1) {
    visitMaterialSet(material, (item, index) => {
        const saved = Array.isArray(savedOpacity) ? savedOpacity[index] : savedOpacity;
        const opacity = Number.isFinite(saved) ? saved : fallbackOpacity;
        item.transparent = opacity < 1;
        item.opacity = opacity;
        item.needsUpdate = true;
    });
}

function updateMaterialViewUi() {
    const status = document.getElementById('material-view-status');
    const detail = document.getElementById('material-view-detail');
    const labels = {
        hologram: 'HOLOGRAM',
        product: 'PRODUCT COLOR',
        hybrid: 'HYBRID REVEAL'
    };
    if (status) status.textContent = labels[state.materialView] || labels.hologram;
    document.querySelectorAll('.material-view-btn, .beginner-material-btn').forEach(btn => {
        const active = btn.dataset.materialView === state.materialView;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
    });
    updateBeginnerFlowUi();

    if (!detail) return;
    const ko = state.language === 'ko';
    if (state.materialView === 'product') {
        detail.textContent = state.activePreset === 'custom' && !state.imageUploaded
            ? (ko ? '가져온 모델의 원본 PBR 색상·텍스처·금속감을 표시합니다.' : 'Shows the imported model original PBR color, textures, and metal response.')
            : (state.imageUploaded
                ? (ko ? '업로드 이미지의 원색과 표면 디테일을 표시합니다.' : 'Shows the uploaded image color and surface detail.')
                : (ko ? '프리셋의 제품 컬러와 불투명 소재감을 표시합니다.' : 'Shows the preset product color and opaque material finish.'));
    } else if (state.materialView === 'hybrid') {
        detail.textContent = state.partScanActive
            ? (ko ? '선택 부품은 실제 재질, 나머지는 홀로그램으로 비교합니다.' : 'Shows the focused component in product material and ghosts the rest.')
            : (ko ? '부품 포커스가 없으면 제품 전체 재질을 표시합니다.' : 'Without component focus, the full product material is shown.');
    } else {
        detail.textContent = ko ? '홀로그램 스타일로 구조와 실루엣을 강조합니다.' : 'Emphasizes structure and silhouette in hologram style.';
    }
}

function applyMaterialView() {
    if (!activeModelGroup) {
        updateMaterialViewUi();
        return;
    }
    const mode = ['hologram', 'product', 'hybrid'].includes(state.materialView) ? state.materialView : 'hologram';
    const focused = state.partScanActive ? getCurrentPartScanAnnotation() : null;
    const focusedName = focused?.name || null;
    const useWholeProductForHybrid = mode === 'hybrid' && !focusedName;

    if (scanDomeGroup) {
        scanDomeGroup.visible = state.uiMode === 'pro' && mode !== 'product';
    }
    if (reticleGroup) {
        reticleGroup.visible = state.targetingReticles && mode !== 'product';
    }
    if (volumetricLaserBeam && mode === 'product') {
        volumetricLaserBeam.visible = false;
    }

    activeModelGroup.traverse(node => {
        const data = node.userData || {};
        const isFocused = focusedName ? isNodeInsidePart(node, focusedName) : false;
        const showProduct = mode === 'product' || useWholeProductForHybrid || (mode === 'hybrid' && isFocused);

        if (data.solidMesh && data.solidMaterial) {
            const solid = data.solidMesh;
            const wire = data.wireMesh;
            const points = data.pointsMesh;
            solid.material = showProduct && data.productMaterial ? data.productMaterial : data.solidMaterial;
            if (!showProduct) {
                const baseOpacity = data.isChrome ? 0.85 : 0.65;
                restoreMaterialOpacity(data.solidMaterial, null, baseOpacity * state.glowIntensity);
                visitMaterialSet(data.solidMaterial, material => {
                    if (material.emissive) material.emissiveIntensity = data.emissiveIntensity || 0.35;
                });
            }
            if (mode === 'product' || (mode === 'hybrid' && showProduct)) {
                solid.visible = true;
                if (wire) wire.visible = false;
                if (points) points.visible = false;
            } else if (mode === 'hybrid') {
                visitMaterialSet(data.solidMaterial, material => {
                    material.transparent = true;
                    material.opacity = 0.08;
                    material.needsUpdate = true;
                });
                solid.visible = true;
                if (wire) wire.visible = true;
                if (points) points.visible = false;
            }
            return;
        }

        if (node.isMesh && data.hologramMaterial && data.productMaterial) {
            node.material = showProduct ? data.productMaterial : data.hologramMaterial;
            node.visible = true;
            if (!showProduct) {
                const baseOpacity = data.isChrome ? 0.85 : 0.65;
                const savedOpacity = data.solidMaterial ? null : data.hologramOpacity;
                restoreMaterialOpacity(data.hologramMaterial, savedOpacity, baseOpacity * state.glowIntensity);
            }
            if (mode === 'hybrid' && !showProduct) {
                visitMaterialSet(data.hologramMaterial, material => {
                    material.transparent = true;
                    material.opacity = 0.10;
                    material.needsUpdate = true;
                });
            }
        }
    });
    updateMaterialViewUi();
}

function setMaterialView(mode, options = {}) {
    if (!['hologram', 'product', 'hybrid'].includes(mode)) return;
    const { notify = true, broadcast = true, autoFocus = true } = options;
    state.materialView = mode;
    if ((mode === 'product' || mode === 'hybrid') && state.renderMode !== 'solid') {
        setRenderModeByKey('solid');
    }
    if (mode === 'hybrid' && autoFocus && !state.partScanActive && getPartScanList().length > 0) {
        setPartScanActive(true, state.partScanIndex || 0);
    } else {
        toggleRenderVisibility();
    }
    updateMaterialViewUi();
    savePreferences();

    if (broadcast && typeof CollabManager !== 'undefined' && CollabManager.isActive) {
        CollabManager.broadcast({ type: 'state_update', key: 'materialView', value: mode });
    }
    if (notify) {
        const messages = {
            hologram: state.language === 'ko' ? '홀로그램 구조 표현으로 전환했습니다.' : 'Switched to hologram structure view.',
            product: state.language === 'ko' ? '제품의 실제 색상과 소재를 표시합니다.' : 'Showing product colors and materials.',
            hybrid: state.language === 'ko' ? '선택 부품만 실제 재질로 드러냅니다.' : 'Revealing the focused component in its product material.'
        };
        showNotification(
            state.language === 'ko' ? 'Material Reveal' : 'Material Reveal',
            messages[mode]
        );
        addConsoleLog(`[MATERIAL] View switched to ${mode.toUpperCase()}.`, 'info');
    }
}

function applyPartScanVisuals() {
    if (!activeModelGroup) return;
    applyMaterialView();
    if (state.materialView !== 'hologram') return;
    const focused = state.partScanActive ? getCurrentPartScanAnnotation() : null;
    const focusedName = focused?.name || null;
    if (!focusedName) return;

    activeModelGroup.traverse(child => {
        if (!(child instanceof THREE.Group || child.isMesh) || !child.userData || !child.userData.solidMaterial) return;

        const isFocused = focusedName && isNodeInsidePart(child, focusedName);
        const isGhost = focusedName && !isFocused;
        const solid = child.userData.solidMesh;
        const wire = child.userData.wireMesh;
        const points = child.userData.pointsMesh;
        const baseSolid = child.userData.isChrome ? 0.85 : 0.65;
        const wireBase = child.userData.paletteWireOpacity || 0.72;
        const pointsBase = child.userData.palettePointsOpacity || 0.82;

        const solidOpacity = isGhost ? 0.10 : (isFocused ? Math.min(1, baseSolid * 1.28) : baseSolid * state.glowIntensity);
        const wireOpacity = isGhost ? 0.15 : (isFocused ? 1.0 : wireBase * state.glowIntensity);
        const pointsOpacity = isGhost ? 0.12 : (isFocused ? 0.95 : pointsBase * state.glowIntensity);

        if (child.userData.solidMaterial) {
            child.userData.solidMaterial.transparent = true;
            child.userData.solidMaterial.opacity = solidOpacity;
            if (child.userData.solidMaterial.emissive) {
                child.userData.solidMaterial.emissiveIntensity = isFocused
                    ? Math.max(child.userData.emissiveIntensity || 0.35, 0.85)
                    : (child.userData.emissiveIntensity || 0.35);
            }
        }
        if (child.userData.wireMaterial) {
            child.userData.wireMaterial.transparent = true;
            child.userData.wireMaterial.opacity = wireOpacity;
        }
        if (child.userData.pointsMaterial) {
            child.userData.pointsMaterial.transparent = true;
            child.userData.pointsMaterial.opacity = pointsOpacity;
        }

        [solid, wire, points].forEach((mesh, idx) => {
            if (!mesh || !mesh.material) return;
            mesh.material.transparent = true;
            mesh.material.opacity = idx === 0 ? solidOpacity : (idx === 1 ? wireOpacity : pointsOpacity);
        });
    });
}

function syncPartScanLayout() {
    if (activeModelGroup && activeModelGroup.children.length > 0) {
        updateExplodedTranslations(activeModelGroup.children[0]);
    }
    updatePartScanPanel();
    applyPartScanVisuals();
}

function setPartScanActive(active, requestedIndex = state.partScanIndex) {
    if (active && !state.engineBooted) {
        showNotification(
            state.language === 'ko' ? '엔진 기동 필요' : 'Boot Required',
            state.language === 'ko' ? '먼저 HOLOSYN 엔진을 기동한 뒤 부품 스캔을 실행하세요.' : 'Boot HOLOSYN before running Part Scan.'
        );
        return;
    }

    const scanList = getPartScanList();
    if (active && scanList.length === 0) {
        showNotification(
            state.language === 'ko' ? '분리된 부품 없음' : 'No Separated Parts',
            state.language === 'ko' ? '부품 라벨이 있는 멀티 파트 모델에서 사용할 수 있습니다.' : 'Use a multi-part model with component labels.'
        );
        return;
    }

    state.partScanActive = !!active;
    state.partScanIndex = scanList.length ? ((requestedIndex % scanList.length) + scanList.length) % scanList.length : 0;

    if (state.partScanActive) {
        if (state.explodedLevel < 0.24) {
            animateExplodedLevel(0.34, 650);
        }
        setWorkflowProgress('present', ['model', 'structure']);
        const ann = getCurrentPartScanAnnotation();
        addConsoleLog(`[PART SCAN] Focus locked: ${ann ? getPartScanTitle(ann) : 'component'}.`, 'info');
        showNotification(
            state.language === 'ko' ? 'Part Scan 활성화' : 'Part Scan Enabled',
            state.language === 'ko' ? '부품을 하나씩 분리해 발표용으로 강조합니다.' : 'Components are isolated one by one for presentation.'
        );
    } else {
        addConsoleLog('[PART SCAN] Component focus released.', 'info');
        toggleRenderVisibility();
    }

    syncPartScanLayout();
}

function cyclePartScan(delta) {
    const scanList = getPartScanList();
    if (scanList.length === 0) return;
    if (!state.partScanActive) {
        setPartScanActive(true, 0);
        return;
    }
    state.partScanIndex = (state.partScanIndex + delta + scanList.length) % scanList.length;
    const ann = getCurrentPartScanAnnotation();
    addConsoleLog(`[PART SCAN] Component ${state.partScanIndex + 1}/${scanList.length}: ${ann ? getPartScanTitle(ann) : 'component'}.`, 'info');
    syncPartScanLayout();
}

function jumpToPartScanIndex(index) {
    const scanList = getPartScanList();
    if (scanList.length === 0) return;
    const nextIndex = ((index % scanList.length) + scanList.length) % scanList.length;
    if (!state.partScanActive) {
        setPartScanActive(true, nextIndex);
        return;
    }
    state.partScanIndex = nextIndex;
    const ann = getCurrentPartScanAnnotation();
    addConsoleLog(`[PART SCAN] Map jump ${state.partScanIndex + 1}/${scanList.length}: ${ann ? getPartScanTitle(ann) : 'component'}.`, 'info');
    syncPartScanLayout();
}

function initPartScanControls() {
    const toggleBtn = document.getElementById('btn-part-scan');
    const cardBtn = document.getElementById('btn-part-scan-card');
    const prevBtn = document.getElementById('btn-part-scan-prev');
    const nextBtn = document.getElementById('btn-part-scan-next');
    const mapTrack = document.getElementById('part-scan-map-track');
    const toggleScan = () => {
        playSynthClick(state.partScanActive ? 360 : 820, 0.06);
        setPartScanActive(!state.partScanActive);
    };

    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleScan);
    }
    if (cardBtn) {
        cardBtn.addEventListener('click', toggleScan);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            playSynthClick(620, 0.05);
            cyclePartScan(-1);
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            playSynthClick(740, 0.05);
            cyclePartScan(1);
        });
    }
    if (mapTrack) {
        mapTrack.addEventListener('click', (event) => {
            if (!(event.target instanceof Element)) return;
            const chip = event.target.closest('[data-part-scan-index]');
            if (!chip) return;
            playSynthClick(780, 0.05);
            jumpToPartScanIndex(Number(chip.dataset.partScanIndex || 0));
        });
    }

    setPartScanButtonState();
    updatePartScanPanel();
}

// Start the welcome modal boot sequence
document.addEventListener('DOMContentLoaded', () => {
    loadPreferences(); // v3.8: Restore saved settings from localStorage
    registerRuntimeErrorCapture();
    applyAnnotationLabelOverrides();
    initLanguageEngine();
    applyLocalFanExperimentCopy();
    initUIControls();
    initAnnotationLabelControls();
    initPartScanControls();
    initWorkflowControls();
    initProductizationControls();
    initRadar();
    
    // Boot button on Welcome Modal
    const bootBtn = document.getElementById('btn-boot-system');
    if (bootBtn) {
        bootBtn.addEventListener('click', () => {
            if (state.engineBooted) return;
            state.engineBooted = true;
            bootBtn.disabled = true;
            initThreeEngine();
            loadPresetModel(state.activePreset);
            if (state.pendingShareState) {
                setTimeout(() => applyShareState(state.pendingShareState), 350);
            }
            
            // Setup initial UI layout
            toggleUIMode(state.uiMode);
            
            // Hide overlay modal
            const modal = document.getElementById('welcome-modal');
            if (modal) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.classList.add('hidden-stage');
                    // Automatically slide in welcome notification toast
                    showNotification(
                        state.language === 'ko' ? "HOLOSYN 스튜디오 부팅 성공" : "HOLOSYN Studio Boot Successful",
                        state.language === 'ko' ? "시제품 3D 발표 스튜디오가 준비되었습니다." : "The 3D prototype presentation studio is ready."
                    );

                    // Proactively prompt the user for the guide tour (Phase D)
                    setTimeout(() => {
                        if (typeof TutorialManager !== 'undefined') {
                            TutorialManager.showPrompt();
                        }
                    }, 1200);
                }, 600);
            }
            
            // Auto-run continuous diagnostic log timer
            setInterval(triggerRandomDiagnosticLog, 7000);
        });
    }

    applyShareStateFromUrl();

    // Initialize Tutorial Manager (Phase D)
    if (typeof TutorialManager !== 'undefined') {
        TutorialManager.init();
    }
});

// ==========================================================================
// 1. LANGUAGE & INTERNATIONALIZATION (i18n) ENGINE
// ==========================================================================
function initLanguageEngine() {
    const savedLang = localStorage.getItem('holosyn_lang') || 'ko';
    updateLanguageHTML(savedLang);
}

function updateLanguageHTML(lang) {
    state.language = lang;
    localStorage.setItem('holosyn_lang', lang);
    savePreferences();
    
    // 1. Update text content for elements tagged with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (key.includes('desc2') || key.includes('welcome_desc')) {
                el.innerHTML = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
    
    // 2. Update Language switcher label
    const langLabel = document.getElementById('lang-label');
    if (langLabel) {
        langLabel.textContent = lang === 'ko' ? "한국어" : "ENGLISH";
    }
    
    // 3. Update dynamic layouts
    updateTelemetryBarText();
    updateWorkflowCoach();
    
    const modeEl = document.getElementById('tele-render');
    if (modeEl) modeEl.innerText = translations[lang][state.renderMode] || state.renderMode.toUpperCase();
    updateQualityBoostUi();
    updateMaterialViewUi();
    
    if (typeof CollabManager !== 'undefined' && typeof CollabManager.updateVoiceUI === 'function') {
        CollabManager.updateVoiceUI(CollabManager.voiceChatActive);
    }
    if (typeof CollabManager !== 'undefined' && typeof CollabManager.updateModuleStatus === 'function') {
        CollabManager.updateModuleStatus();
    }
    if (typeof AiAssistantManager !== 'undefined' && typeof AiAssistantManager.updateKeyStatus === 'function') {
        AiAssistantManager.updateKeyStatus();
    }
}

function updateTelemetryBarText() {
    const bar = document.getElementById('telemetry-bar-text');
    if (!bar) return;
    if (state.language === 'ko') {
        bar.textContent = "그리드 정렬: 0.002mm | 빔 프로파일: 활성 | 시스템 스캔: 정상";
    } else {
        bar.textContent = "GRID ALIGNMENT: 0.002mm | BEAM PROFILE: ACTIVE | SYS_LIDAR: RUNNING";
    }
}

// ==========================================================================
// 1.5. DYNAMIC UI MODE CONTROL (Beginner / Pro Split)
// ==========================================================================
let proTourOffered = false; // session flag: offer the Pro guide tour once
function toggleUIMode(mode) {
    state.uiMode = mode;
    localStorage.setItem('holosyn_uimode', mode);
    savePreferences();
    
    const containerLayout = document.getElementById('app-container');
    const beginnerBtn = document.getElementById('btn-mode-beginner');
    const proBtn = document.getElementById('btn-mode-pro');
    
    // Toggle microphone button display dynamically (v5.0)
    const voiceBtn = document.getElementById('btn-voice-command');
    const voiceHelpBtn = document.getElementById('btn-voice-help');
    if (voiceBtn) {
        voiceBtn.style.display = (mode === 'pro') ? 'inline-flex' : 'none';
    }
    if (voiceHelpBtn) {
        voiceHelpBtn.style.display = (mode === 'pro') ? 'inline-flex' : 'none';
    }
    
    // Toggle scan dome & archive drawer visibility (v5.0)
    if (scanDomeGroup) {
        scanDomeGroup.visible = (mode === 'pro');
    }
    
    const toggleArchiveBtn = document.getElementById('btn-toggle-archive-drawer');
    if (toggleArchiveBtn) {
        toggleArchiveBtn.style.display = (mode === 'pro') ? 'inline-flex' : 'none';
    }
    
    // Close archive drawer when returning to beginner mode
    if (mode === 'beginner') {
        const archiveDrawer = document.getElementById('hud-archive-drawer');
        if (archiveDrawer) {
            archiveDrawer.style.bottom = '-280px';
        }
        const voiceHelpModal = document.getElementById('voice-help-modal');
        if (voiceHelpModal) {
            voiceHelpModal.style.display = 'none';
        }
    }
    
    // Toggle classes
    if (mode === 'beginner') {
        if (containerLayout) containerLayout.classList.add('ui-beginner');
        if (beginnerBtn) beginnerBtn.classList.add('active');
        if (proBtn) proBtn.classList.remove('active');
        
        if (state.language === 'ko') {
            addConsoleLog("[시스템] 비기너 모드 전환: 주요 기능에 가치를 맞춘 미니멀 제어 모드입니다.", "info");
        } else {
            addConsoleLog("[SYS] Switched UI to Beginner Mode. Minimal layout active.", "info");
        }
    } else {
        if (containerLayout) containerLayout.classList.remove('ui-beginner');
        if (proBtn) proBtn.classList.add('active');
        if (beginnerBtn) beginnerBtn.classList.remove('active');
        
        if (state.language === 'ko') {
            addConsoleLog("[시스템] 프로 모드 전환: 모든 제어 스위치와 입체 튜너가 활성화됩니다.", "info");
        } else {
            addConsoleLog("[SYS] Switched UI to Pro Mode. Access to all micro sliders and technical reads.", "info");
        }

        // First user-initiated Pro switch this session → auto-offer the Pro guide tour
        // (mirrors the Beginner prompt that auto-shows on boot). Skip while a tour is
        // already running so the tutorial's own mode-switch doesn't re-trigger it.
        const tourRunning = (typeof TutorialManager !== 'undefined') && TutorialManager.isActive;
        if (!proTourOffered && state.engineBooted && !tourRunning) {
            proTourOffered = true;
            setTimeout(() => {
                if (typeof TutorialManager !== 'undefined' && !TutorialManager.isActive && state.uiMode === 'pro') {
                    TutorialManager.showPrompt();
                }
            }, 650);
        }
    }

    updateBeginnerFlowUi();

    // Recalculate 3D viewport canvas aspect ratio
    setTimeout(onWindowResize, 450);
}

// Apply Quick Preset Styles (Minimal Blue, Tactical Silver, Matrix Green)
function applyQuickStyle(styleName) {
    playSynthClick(580, 0.08);
    playSynthSweep(150, 600, 0.4);
    
    const activeColorBtn = document.querySelector(`.color-select-btn[data-color="${styleName === 'minimal' ? 'blue' : styleName === 'tactical' ? 'silver' : 'purple'}"]`);
    
    switch (styleName) {
        case 'minimal':
            state.renderMode = 'solid';
            state.themeColor = '#007aff'; // Studio Blue
            state.themeColorGlow = 'rgba(0, 122, 255, 0.22)';
            document.body.className = "theme-blue";
            
            state.rotationSpeed = 0.8;
            state.glowIntensity = 1.2;
            state.glitchFrequency = 0;
            break;
            
        case 'tactical':
            state.renderMode = 'wireframe';
            state.themeColor = '#8e8e93'; // Studio Silver
            state.themeColorGlow = 'rgba(229, 229, 234, 0.22)';
            document.body.className = "theme-silver";
            
            state.rotationSpeed = 1.0;
            state.glowIntensity = 1.5;
            state.glitchFrequency = 10;
            break;
            
        case 'matrix':
            state.renderMode = 'points';
            state.themeColor = '#af52de'; // Studio Purple
            state.themeColorGlow = 'rgba(175, 82, 222, 0.22)';
            document.body.className = "theme-purple";
            
            state.rotationSpeed = 1.6;
            state.glowIntensity = 2.0;
            state.glitchFrequency = 35;
            break;
    }
    
    // Update active color pickers circle
    document.querySelectorAll('.color-select-btn').forEach(b => b.classList.remove('active-color'));
    if (activeColorBtn) activeColorBtn.classList.add('active-color');
    
    // Update render mode buttons indicators
    document.querySelectorAll('.render-mode-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-mode') === state.renderMode) {
            btn.classList.add('active');
        }
    });
    
    // Update micro parameters values
    const intensityTuner = document.getElementById('tuner-intensity');
    if (intensityTuner) intensityTuner.value = state.glowIntensity;
    const intensityReadout = document.getElementById('readout-intensity');
    if (intensityReadout) intensityReadout.innerText = state.glowIntensity;
    
    const rotSpeedTuner = document.getElementById('tuner-rot-speed');
    if (rotSpeedTuner) rotSpeedTuner.value = state.rotationSpeed;
    const rotSpeedReadout = document.getElementById('readout-rot-speed');
    if (rotSpeedReadout) rotSpeedReadout.innerText = state.rotationSpeed;
    
    const glitchTuner = document.getElementById('tuner-glitch');
    if (glitchTuner) glitchTuner.value = state.glitchFrequency;
    const glitchReadout = document.getElementById('readout-glitch');
    if (glitchReadout) glitchReadout.innerText = `${state.glitchFrequency}%`;
    
    // Update materials and visibility
    updateHolographicMaterials();
    toggleRenderVisibility();
    savePreferences(); // v3.8
    
    if (state.language === 'ko') {
        addConsoleLog(`[연출] 간편 스타일 적용 완료: [${styleName.toUpperCase()}]`, "success");
    } else {
        addConsoleLog(`[STYLE] Quick Style preset applied: [${styleName.toUpperCase()}]`, "success");
    }
}

// ==========================================================================
// 2. WEB AUDIO API SYNTHESIZER ENGINE (HOLOSYN acoustic sound design)
// ==========================================================================
function initAudioEngine() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
        
        compressor = audioCtx.createDynamicsCompressor();
        compressor.threshold.setValueAtTime(-20, audioCtx.currentTime);
        compressor.knee.setValueAtTime(30, audioCtx.currentTime);
        compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
        compressor.attack.setValueAtTime(0.003, audioCtx.currentTime);
        compressor.release.setValueAtTime(0.25, audioCtx.currentTime);
        
        ambientGain = audioCtx.createGain();
        ambientGain.gain.setValueAtTime(0.0, audioCtx.currentTime); // Start muted
        
        compressor.connect(audioCtx.destination);
        ambientGain.connect(compressor);
    } catch (e) {
        console.warn("Web Audio API not supported on this browser.", e);
    }
}

// Low ambient synthesizer hum oscillators creator
function startAmbientHum() {
    if (!audioCtx || !state.isSoundOn) return;
    
    // Create a very soft, smooth spatial hum (low frequency arpeggiated/constant warm hum)
    if (ambientOsc) {
        try { ambientOsc.stop(); } catch(e) {}
    }
    
    ambientOsc = audioCtx.createOscillator();
    ambientOsc.type = 'sawtooth';
    ambientOsc.frequency.setValueAtTime(55, audioCtx.currentTime); // 55Hz Low hum
    
    filterNode = audioCtx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(105, audioCtx.currentTime); // warm low-pass filter
    filterNode.Q.setValueAtTime(1, audioCtx.currentTime);
    
    ambientOsc.connect(filterNode);
    filterNode.connect(ambientGain);
    
    ambientOsc.start();
    
    // Smoothly fade in ambientGain
    ambientGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    ambientGain.gain.exponentialRampToValueAtTime(0.09, audioCtx.currentTime + 1.2);
}

function stopAmbientHum() {
    if (ambientGain) {
        ambientGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
    }
    setTimeout(() => {
        if (ambientOsc) {
            try { ambientOsc.stop(); } catch(e) {}
            ambientOsc = null;
        }
    }, 600);
}

// Toggle Sound hum on/off
function toggleSound() {
    if (!audioCtx) {
        initAudioEngine();
    }
    if (!audioCtx) return;
    
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    const soundSwitch = document.getElementById('switch-sound');
    
    if (state.isSoundOn) {
        stopAmbientHum();
        state.isSoundOn = false;
        if (soundSwitch) soundSwitch.checked = false;
        showNotification(
            state.language === 'ko' ? "오디오 출력 비활성화" : "Audio Output Deactivated",
            state.language === 'ko' ? "시스템 사운드가 비활성화되었습니다." : "System spatial audio synthesizer disabled."
        );
    } else {
        state.isSoundOn = true;
        if (soundSwitch) soundSwitch.checked = true;
        startAmbientHum();
        playHolosynChime();
        showNotification(
            state.language === 'ko' ? "오디오 출력 활성화" : "Audio Output Activated",
            state.language === 'ko' ? "실시간 입체 신디사이저 사운드 기능이 켜졌습니다." : "Real-time spatial synthesizers are now running."
        );
    }
}

// Minimalist smooth chime sound (E major chords, soft bell tone)
function playHolosynChime() {
    if (!audioCtx || !state.isSoundOn) return;
    
    const chords = [329.63, 415.30, 493.88, 659.25]; // E major chords
    const now = audioCtx.currentTime;
    
    chords.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + (idx * 0.05)); // Arpeggiated chime
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.06, now + (idx * 0.05) + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + (idx * 0.1));
        
        osc.connect(gainNode);
        gainNode.connect(compressor);
        
        osc.start(now);
        osc.stop(now + 1.6);
    });
}

// Gentle acoustic interface click
function playSynthClick(freq = 600, dur = 0.08) {
    if (!audioCtx || !state.isSoundOn) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    
    osc.connect(gain);
    gain.connect(compressor);
    
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
}

// Airy camera transition whoosh sound
function playSynthSweep(startFreq = 200, endFreq = 600, dur = 0.5) {
    if (!audioCtx || !state.isSoundOn) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + dur);
    
    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    
    osc.connect(gain);
    gain.connect(compressor);
    
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
}

// AI SFX: Sweep sweep charging sound (v3.6)
function playAiSweep(dur = 1.2) {
    if (!audioCtx || !state.isSoundOn) return;
    
    const osc = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    const gain = audioCtx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + dur);
    
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(12, audioCtx.currentTime);
    filter.frequency.setValueAtTime(120, audioCtx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + dur);
    
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(compressor || audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
}

// AI SFX: Target parsing fast double beeps (v3.6)
function playAiBeep(freq = 1200) {
    if (!audioCtx || !state.isSoundOn) return;
    
    const now = audioCtx.currentTime;
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 1.5, now + 0.04);
    
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(compressor || audioCtx.destination);
    
    osc1.start(now);
    osc1.stop(now + 0.1);
    osc2.start(now + 0.04);
    osc2.stop(now + 0.14);
}

// AI SFX: Success complete arpeggio (v3.6)
function playAiComplete() {
    if (!audioCtx || !state.isSoundOn) return;
    
    const now = audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
    
    notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + (idx * 0.06));
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.05, now + (idx * 0.06) + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.0 + (idx * 0.08));
        
        osc.connect(gainNode);
        gainNode.connect(compressor || audioCtx.destination);
        
        osc.start(now + (idx * 0.06));
        osc.stop(now + 1.5);
    });
}

// Manual glitch white noise burst softened for the HOLOSYN studio aesthetic.
function playGlitchNoise() {
    if (!audioCtx || !state.isSoundOn) return;
    
    const bufferSize = audioCtx.sampleRate * 0.15;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    
    const noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = buffer;
    
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, audioCtx.currentTime);
    
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);
    
    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(compressor);
    
    noiseNode.start();
}

// ==========================================================================
// 2.5. macOS Slide-in Notification Toast Container Injector
// ==========================================================================
function showNotification(title, message) {
    const container = document.getElementById('mac-toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'mac-toast';
    
    toast.innerHTML = `
        <div class="toast-icon-wrapper">
            <i data-lucide="sparkles"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Initialize newly created toast icon
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    // Play arpeggiated bell chime
    playHolosynChime();
    
    // Auto fade out and remove after 4 seconds
    setTimeout(() => {
        toast.classList.add('toast-fade-out');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 500);
    }, 4000);
}

// ==========================================================================
// 3. INTERACTIVE LIDAR RADAR SIMULATOR (2D Canvas HUD Graphic)
// ==========================================================================
function initRadar() {
    radarCanvas = document.getElementById('radar-canvas');
    if (!radarCanvas) return;
    radarCtx = radarCanvas.getContext('2d');
    
    for (let i = 0; i < 15; i++) {
        radarPoints.push({
            angle: Math.random() * Math.PI * 2,
            distance: 10 + Math.random() * 20,
            opacity: Math.random() * 0.8 + 0.2,
            size: Math.random() * 2 + 1
        });
    }
    requestAnimationFrame(updateRadar);
}

function updateRadar() {
    if (!radarCanvas || !radarCtx) return;
    
    const width = radarCanvas.width;
    const height = radarCanvas.height;
    const cx = width / 2;
    const cy = height / 2;
    
    radarCtx.clearRect(0, 0, width, height);
    
    radarCtx.strokeStyle = state.themeColor;
    radarCtx.lineWidth = 0.5;
    
    radarCtx.beginPath();
    radarCtx.arc(cx, cy, cx - 2, 0, Math.PI * 2);
    radarCtx.strokeStyle = changeOpacity(state.themeColor, 0.12);
    radarCtx.stroke();
    
    radarCtx.beginPath();
    radarCtx.moveTo(2, cy); radarCtx.lineTo(width - 2, cy);
    radarCtx.moveTo(cx, 2); radarCtx.lineTo(cx, height - 2);
    radarCtx.strokeStyle = changeOpacity(state.themeColor, 0.05);
    radarCtx.stroke();
    
    radarPoints.forEach(p => {
        const x = cx + Math.cos(p.angle) * p.distance;
        const y = cy + Math.sin(p.angle) * p.distance;
        
        radarCtx.fillStyle = state.themeColor;
        radarCtx.globalAlpha = p.opacity * 0.5;
        radarCtx.beginPath();
        radarCtx.arc(x, y, p.size, 0, Math.PI * 2);
        radarCtx.fill();
    });
    radarCtx.globalAlpha = 1.0;
    
    radarAngle += 0.015;
    const sweepX = cx + Math.cos(radarAngle) * (cx - 2);
    const sweepY = cy + Math.sin(radarAngle) * (cy - 2);
    
    radarCtx.beginPath();
    radarCtx.moveTo(cx, cy);
    radarCtx.lineTo(sweepX, sweepY);
    radarCtx.strokeStyle = changeOpacity(state.themeColor, 0.4);
    radarCtx.lineWidth = 1;
    radarCtx.stroke();
    
    requestAnimationFrame(updateRadar);
}

function changeOpacity(hex, alpha) {
    hex = hex.replace('#', '');
    if (hex === 'e5e5ea') hex = '8e8e93';
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ==========================================================================
// 4. THREE.JS 3D HOLOGRAM STAGE PROJECTOR PIPELINE
// ==========================================================================
function initThreeEngine() {
    container = document.getElementById('hologram-viewport');
    if (!container) return;
    
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 4, 10);
    
    // WebGL Renderer with WebXR Support
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(getRenderPixelRatio());
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = false;
    renderer.xr.enabled = true; // Enable WebXR
    container.appendChild(renderer.domElement);
    
    // Add AR Button to document with hit-test feature
    if (typeof ARButton !== 'undefined') {
        try {
            document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ['hit-test'], optionalFeatures: ['hand-tracking'] }));
            
            // Setup AR Reticle
            const reticleGeometry = new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2);
            const reticleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
            window.arReticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
            window.arReticle.matrixAutoUpdate = false;
            window.arReticle.visible = false;
            scene.add(window.arReticle);
            
            window.hitTestSource = null;
            window.hitTestSourceRequested = false;
            
            renderer.xr.addEventListener('sessionstart', () => {
                window.hitTestSourceRequested = false;
                window.hitTestSource = null;
            });
            
            renderer.xr.addEventListener('sessionend', () => {
                window.hitTestSourceRequested = false;
                window.hitTestSource = null;
                if (window.arReticle) window.arReticle.visible = false;
            });
            
            // Handle click/pinch to place model
            const controller = renderer.xr.getController(0);
            controller.addEventListener('select', () => {
                if (window.arReticle && window.arReticle.visible && activeModelGroup) {
                    activeModelGroup.position.setFromMatrixPosition(window.arReticle.matrix);
                }
            });
            scene.add(controller);
            
            // V10 Premium Core: Hand Tracking
            let isPinching = false;
            let pinchStartRotation = 0;
            let pinchStartX = 0;

            const onPinchStart = (e) => {
                isPinching = true;
                const indexTip = e.target.joints['index-finger-tip'];
                if (indexTip) {
                    pinchStartX = indexTip.position.x;
                    pinchStartRotation = activeModelGroup ? activeModelGroup.rotation.y : 0;
                }
            };
            const onPinchEnd = () => {
                isPinching = false;
            };

            for (let i = 0; i < 2; i++) {
                const hand = renderer.xr.getHand(i);
                hand.addEventListener('pinchstart', onPinchStart);
                hand.addEventListener('pinchend', onPinchEnd);
                scene.add(hand);
            }
            
            // Add tiny glowing spheres for each joint to give cybernetic feel
            const jointSpheres = [];
            const sphereGeometry = new THREE.SphereGeometry(0.008, 16, 16);
            const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.7 });
            for (let j = 0; j < 50; j++) { // 25 per hand * 2
                const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
                mesh.visible = false;
                scene.add(mesh);
                jointSpheres.push(mesh);
            }
            
            // Add a tick listener to hand tracking logic
            window.updateHandGestures = () => {
                let sphereIdx = 0;
                for (let i = 0; i < 2; i++) {
                    const hand = renderer.xr.getHand(i);
                    if (hand && hand.joints) {
                        for (const jointName in hand.joints) {
                            const joint = hand.joints[jointName];
                            const sphere = jointSpheres[sphereIdx++];
                            if (joint.visible) {
                                sphere.visible = true;
                                sphere.position.copy(joint.position);
                            } else {
                                sphere.visible = false;
                            }
                        }
                    }
                }
                
                if (isPinching && activeModelGroup) {
                    const hand = renderer.xr.getHand(0);
                    if (hand && hand.joints) {
                        const indexTip = hand.joints['index-finger-tip'];
                        if (indexTip && indexTip.visible) {
                            const deltaX = indexTip.position.x - pinchStartX;
                            activeModelGroup.rotation.y = pinchStartRotation + (deltaX * 5.0); // 5x multiplier for rotation speed
                        }
                    }
                }
            };
        } catch (err) {
            console.warn("WebXR AR Initialization failed:", err);
            addConsoleLog("[시스템] WebXR 증강현실 모드를 지원하지 않는 환경입니다.", "warning");
        }
    }
    
    // Setup Post-Processing (Cinematic Bloom & DoF)
    if (typeof THREE.EffectComposer !== 'undefined') {
        const renderScene = new THREE.RenderPass(scene, camera);
        bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = 0.2;
        bloomPass.strength = 1.2;
        bloomPass.radius = 0.5;
        
        composer = new THREE.EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);
        
        // V10 Premium Core: Cinematic DoF (Bokeh Pass)
        if (typeof THREE.BokehPass !== 'undefined') {
            window.bokehPass = new THREE.BokehPass(scene, camera, {
                focus: 4.0,
                aperture: 0.005,
                maxblur: 0.015,
                width: container.clientWidth,
                height: container.clientHeight
            });
            window.bokehPass.enabled = false; // Disabled by default, toggled via UI
            composer.addPass(window.bokehPass);
        }
    }
    applyRenderQualitySettings();
    
    // Orbit Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 3;
    controls.maxDistance = 20;
    
    targetCameraPosition.copy(camera.position);
    targetCameraTarget.copy(controls.target);

    controls.addEventListener('start', () => {
        state.gesturePilot.controlStartPosition = camera.position.clone();
    });
    
    // V10 Premium Core: Sync camera movement in Holo-Meeting
    controls.addEventListener('change', () => {
        if (typeof CollabManager !== 'undefined' && CollabManager.isActive && CollabManager.isHost && !CollabManager.isApplyingSync) {
            CollabManager.broadcast({
                type: 'camera',
                position: camera.position,
                target: controls.target
            });
        }
    });
    controls.addEventListener('end', () => {
        if (!shouldUseGesturePilot() || !state.gesturePilot.controlStartPosition) return;
        const orbitDistance = camera.position.distanceTo(state.gesturePilot.controlStartPosition);
        state.gesturePilot.controlStartPosition = null;
        if (orbitDistance < 0.08) return;
        state.rotationSpeed = Number(clampValue(orbitDistance * 0.65, 0.15, 2.4).toFixed(1));
        syncRotationControlsFromState();
        savePreferences();
        updateGesturePilotPanel('ORBIT MOMENTUM', state.rotationSpeed / 2.4, true);
        addConsoleLog(`[GESTURE] Orbit momentum captured at ${state.rotationSpeed.toFixed(1)}x.`, 'info');
    });
    
    // HOLOSYN studio downlight lighting (high metalness specular highlights setup).
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);
    
    const studioDownlight = new THREE.SpotLight(0xffffff, 2.2, 18, Math.PI / 6, 0.4, 1);
    studioDownlight.position.set(0, 7.5, 0);
    studioDownlight.target.position.set(0, 0, 0);
    scene.add(studioDownlight);
    scene.add(studioDownlight.target);
    
    const warmRimLight = new THREE.DirectionalLight(0x007aff, 0.6);
    warmRimLight.position.set(-6, 3, -6);
    scene.add(warmRimLight);
    
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.45);
    fillLight.position.set(5, 4, 5);
    scene.add(fillLight);

    // Expose lights + their neutral base intensities for runtime studio lighting control
    sceneLights = {
        ambient: ambientLight,
        key: studioDownlight,
        rim: warmRimLight,
        fill: fillLight,
        base: { ambient: 0.35, key: 2.2, rim: 0.6, fill: 0.45 }
    };
    applyLighting(state.lighting.mood, state.lighting.brightness);

    const customGrid = new THREE.GridHelper(10, 16, 0xffffff, 0xffffff);
    customGrid.position.y = -1.5;
    customGrid.material.transparent = true;
    customGrid.material.opacity = 0.04;
    scene.add(customGrid);
    
    // Model group container
    activeModelGroup = new THREE.Group();
    activeModelGroup.position.y = 0.15;
    scene.add(activeModelGroup);
    
    // 1. Build targeting reticles HUD and volumetric laser cone (v7.0)
    createSpatialReticleRings();
    if (reticleGroup) {
        reticleGroup.position.copy(activeModelGroup.position);
        reticleGroup.visible = state.targetingReticles;
    }
    initVolumetricLaserBeam();
    
    // 2. Build AI scanning laser plane (v3.4)
    const scanPlaneGeo = new THREE.PlaneGeometry(3.2, 3.2, 10, 10);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
        color: 0xff1e27, // Crimson Red laser
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.0, // Invisible initially
        wireframe: true
    });
    scanningPlane = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    scanningPlane.rotation.x = Math.PI / 2;
    scanningPlane.position.y = 0.15;
    scene.add(scanningPlane);
    
    // 3. Build Spatial Drawing pencil elements (v3.5)
    // Append drawingsGroup inside activeModelGroup so drawings rotate dynamically with the prototype mesh!
    activeModelGroup.add(drawingsGroup);
    
    // Pointer line from camera pedestal base area
    const rayLineGeo = new THREE.BufferGeometry();
    rayLineGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, -1.5, 0, 0, 0, 0], 3));
    const rayLineMat = new THREE.LineBasicMaterial({
        color: themeColorObj(),
        transparent: true,
        opacity: 0.0 // Hidden initially
    });
    pointerRayLine = new THREE.Line(rayLineGeo, rayLineMat);
    scene.add(pointerRayLine);
    
    // Spark particles on laser intersection point
    const sparkCount = 30;
    sparkGeometry = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    sparkGeometry.setAttribute('position', new THREE.Float32BufferAttribute(sparkPos, 3));
    
    const sparkMat = new THREE.PointsMaterial({
        color: themeColorObj(),
        size: 0.08,
        transparent: true,
        opacity: 0.0
    });
    sparkParticles = new THREE.Points(sparkGeometry, sparkMat);
    scene.add(sparkParticles);
    
    // Initialize speeds for spark expansions
    for (let i = 0; i < sparkCount; i++) {
        sparkSpeeds.push(new THREE.Vector3(
            (Math.random() - 0.5) * 1.5,
            (Math.random() - 0.5) * 1.5,
            (Math.random() - 0.5) * 1.5
        ));
    }
    
    // 4. Build Studio Environment presets group (v3.7)
    scene.add(environmentGroup);
    updateStudioEnvironment();
    
    // 4.5. Build Holographic Scan Dome (v5.0)
    createHolographicScanDome();
    
    updateHolographicMaterials();
    window.addEventListener('resize', onWindowResize);
    renderer.setAnimationLoop(renderLoop);
}

// Hologram Shader Materials Generator
function updateHolographicMaterials() {
    const activeColor = themeColorObj();
    
    if (!hologramMaterials.wireframe) {
        hologramMaterials.wireframe = new THREE.MeshBasicMaterial({
            color: activeColor,
            wireframe: true,
            transparent: true,
            opacity: 0.65 * state.glowIntensity,
            side: THREE.DoubleSide
        });
    } else {
        hologramMaterials.wireframe.color.copy(activeColor);
        hologramMaterials.wireframe.opacity = 0.65 * state.glowIntensity;
    }
    
    if (!hologramMaterials.points) {
        hologramMaterials.points = new THREE.PointsMaterial({
            color: activeColor,
            size: 0.055,
            transparent: true,
            opacity: 0.85 * state.glowIntensity,
            sizeAttenuation: true
        });
    } else {
        hologramMaterials.points.color.copy(activeColor);
        hologramMaterials.points.opacity = 0.85 * state.glowIntensity;
    }
    
    // Traverse standard materials inside meshes
    if (activeModelGroup) {
        activeModelGroup.traverse(child => {
            if (child.userData && child.userData.solidMaterial) {
                const solidColor = child.userData.paletteColor
                    ? new THREE.Color(child.userData.paletteColor)
                    : activeColor;
                child.userData.solidMaterial.color.copy(solidColor);
                if (child.userData.productMaterial && !child.userData.hologramMaterial && !child.userData.paletteColor) {
                    visitMaterialSet(child.userData.productMaterial, material => {
                        if (material.color) material.color.copy(solidColor);
                    });
                }
                const baseOpacity = child.userData.isChrome ? 0.85 : 0.65;
                child.userData.solidMaterial.opacity = baseOpacity * state.glowIntensity;
                if (child.userData.paletteColor && child.userData.wireMaterial) {
                    child.userData.wireMaterial.color.copy(solidColor);
                    child.userData.wireMaterial.opacity = (child.userData.paletteWireOpacity || 0.72) * state.glowIntensity;
                }
                if (child.userData.paletteColor && child.userData.pointsMaterial) {
                    child.userData.pointsMaterial.color.copy(solidColor);
                    child.userData.pointsMaterial.opacity = (child.userData.palettePointsOpacity || 0.82) * state.glowIntensity;
                }
                if (child.userData.emissiveColor && child.userData.solidMaterial.emissive) {
                    child.userData.solidMaterial.emissive.copy(new THREE.Color(child.userData.emissiveColor));
                    child.userData.solidMaterial.emissiveIntensity = child.userData.emissiveIntensity || 0.35;
                }
            }
            if (child.name === "generic-rays" && child.material) {
                child.material.color.copy(activeColor);
                child.material.opacity = 0.25 * state.glowIntensity;
            }
        });
    }
    
    // Update reticles & scanning plane colors (v7.0)
    createSpatialReticleRings();
    initVolumetricLaserBeam();
    if (scanningPlane && scanningPlane.material && !state.isScanning) {
        scanningPlane.material.color.copy(activeColor);
    }
    
    // Sync scan dome & orbital rings colors dynamically (v5.0)
    if (scanDomeGroup) {
        scanDomeGroup.traverse(child => {
            if (child.material) {
                child.material.color.copy(activeColor);
            }
        });
    }
    
    // Thermal shader schematic material (v3.5)
    if (!hologramMaterials.thermal) {
        hologramMaterials.thermal = new THREE.MeshBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.85 * state.glowIntensity,
            side: THREE.DoubleSide
        });
    } else {
        hologramMaterials.thermal.opacity = 0.85 * state.glowIntensity;
    }
    
    // Dynamic color update for drawn markings and raycasts
    if (pointerRayLine && pointerRayLine.material) {
        pointerRayLine.material.color.copy(activeColor);
    }
    if (sparkParticles && sparkParticles.material) {
        sparkParticles.material.color.copy(activeColor);
    }
    if (drawingsGroup) {
        drawingsGroup.traverse(child => {
            if (child.material) {
                child.material.color.copy(activeColor);
            }
        });
    }
    applyPartScanVisuals();
}

function onWindowResize() {
    clearTimeout(resizeDebounceTimer);
    resizeDebounceTimer = setTimeout(() => {
        if (!camera || !renderer) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(getRenderPixelRatio());
        if (composer) {
            composer.setSize(container.clientWidth, container.clientHeight);
        }
    }, 150);
}

// v3.8: Pause render loop when tab is hidden to save GPU
document.addEventListener('visibilitychange', () => {
    if (!renderer) return;
    if (document.hidden) {
        renderer.setAnimationLoop(null);
    } else {
        renderer.setAnimationLoop(renderLoop);
    }
});

// ==========================================================================
// 5. PROCEDURAL 3D CAD MODEL LIBRARY GENERATOR WITH EXPLODED PARTS MAPPING
// ==========================================================================
function loadPresetModel(presetName) {
    if (state.activePreset !== presetName) {
        invalidateFinalPassLock();
    }
    state.activePreset = presetName; // Track active preset locally (v3.9)
    // Selecting any built-in preset exits image-projection mode (so image-only
    // tweaks like the softened bloom don't linger on 3D models).
    if (presetName !== 'custom') {
        state.imageUploaded = false;
    }
    if (presetName !== 'custom' || state.imageUploaded || !uploadedMeshGroup) {
        resetCustomPartMap();
    }
    
    if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
        CollabManager.broadcast({
            type: 'state_update',
            key: 'activePreset',
            value: presetName
        });
    }
    
    // Clear heat sources and restore custom callout anchors on preset model load (v6.0)
    resetHeatSources();
    setTimeout(() => {
        restoreCustomAnchorsFromStorage();
    }, 100);
    
    // Toggle 3D Extrusion Slider UI row (only show for Custom uploaded images)
    const extrusionRow = document.getElementById('tuner-extrusion-row');
    if (extrusionRow) {
        extrusionRow.style.display = (presetName === 'custom' && state.imageUploaded) ? 'flex' : 'none';
    }
    
    while (activeModelGroup.children.length > 0) {
        const obj = activeModelGroup.children[0];
        disposeHierarchy(obj); // Safe GPU memory disposal (v5.0 Optimization)
        activeModelGroup.remove(obj);
    }
    
    if (state.language === 'ko') {
        addConsoleLog(`[스튜디오] 3D 형상 모델 배치 완료: [${presetName.toUpperCase()}]`, "info");
    } else {
        addConsoleLog(`[STUDIO] Generated 3D shape meshes for [${presetName.toUpperCase()}]`, "info");
    }
    
    let compoundMesh = new THREE.Group();
    const presName = document.getElementById('pres-product-name');
    const presSub = document.getElementById('pres-product-sub');
    
    switch (presetName) {
        case 'drone':
            compoundMesh = createAeroDroneGeometry();
            updateSpecsHUD("AeroDrone Scout-V", "PROTOTYPE // UAV", {
                weight: "12 kg",
                power: "850 W",
                thermal: "78%",
                id: "AERO-V-089A",
                volume: "0.45 m³",
                stability: "99.84%",
                discharge: "2.4 kWh",
                emission: "32.4°"
            });
            if (presName) presName.textContent = "AeroDrone Scout-V";
            if (presSub) presSub.textContent = "PROTOTYPE // MULTIROTOR UAV DEVELOPMENT";
            break;
            
        case 'ring':
            compoundMesh = createNexusRingGeometry();
            updateSpecsHUD("Nexus Quantum Ring", "WEARABLE // TECH", {
                weight: "18 g",
                power: "5 W",
                thermal: "82%",
                id: "NEX-Q-229X",
                volume: "0.002 m³",
                stability: "99.98%",
                discharge: "0.08 kWh",
                emission: "12.8°"
            });
            if (presName) presName.textContent = "Nexus Quantum Ring";
            if (presSub) presSub.textContent = "WEARABLE TECH // INTUITIVE QUANTUM INTERACTION";
            break;
            
        case 'car':
            compoundMesh = createHyperCarGeometry();
            updateSpecsHUD("HyperCar EV-Concept", "AUTOMOTIVE // TRANS", {
                weight: "1450 kg",
                power: "450 kW",
                thermal: "88%",
                id: "CAR-EV-990P",
                volume: "4.82 m³",
                stability: "98.12%",
                discharge: "85.0 kWh",
                emission: "45.0°"
            });
            if (presName) presName.textContent = "HyperCar Concept-EV";
            if (presSub) presSub.textContent = "AERODYNAMIC ELECTRIC TRANSPORTATION CELL";
            break;
            
        case 'battery':
            compoundMesh = createChronosCoreGeometry();
            updateSpecsHUD("Chronos Battery Cell", "POWER // ENERGY", {
                weight: "85 kg",
                power: "12 kW",
                thermal: "72%",
                id: "BAT-CH-770K",
                volume: "0.88 m³",
                stability: "99.20%",
                discharge: "250 kWh",
                emission: "22.5°"
            });
            if (presName) presName.textContent = "Chronos Battery Cell";
            if (presSub) presSub.textContent = "LEVITY ENERGY MATRIX // POWER SOURCE STABILITY";
            break;
            
        case 'exosuit':
            const exosuitCopy = getExosuitPresentationCopy();
            compoundMesh = createForgeExoSuitGeometry();
            updateSpecsHUD(exosuitCopy.specName, exosuitCopy.specCategory, exosuitCopy.specs);
            if (presName) presName.textContent = exosuitCopy.specName;
            if (presSub) presSub.textContent = exosuitCopy.specSubtitle;
            break;

        case 'stand':
            compoundMesh = createStandGeometry();
            updateSpecsHUD("ST,AND", "SOCIAL VENTURE // 진열 명패", {
                weight: "12 g",
                power: "PASSIVE",
                thermal: "100%",
                id: "STAND-PP-01",
                volume: "150×100mm",
                stability: "99.9%",
                discharge: "재사용 ∞",
                emission: "65.0°"
            });
            if (presName) presName.textContent = "ST,AND";
            if (presSub) presSub.textContent = "자리가 상품을 만듭니다 // 매대 위 작은 명패";
            break;
            
        case 'custom':
            if (uploadedMeshGroup) {
                compoundMesh = uploadedMeshGroup;
                const specNameInput = document.getElementById('spec-name').value;
                updateSpecsHUD(specNameInput || "User 3D Model", "IMPORTED // 3D", {
                    weight: "2.4 kg",
                    power: "120 W",
                    thermal: "76%",
                    id: "IMP-OBJ-981X",
                    volume: "0.18 m³",
                    stability: "99.12%",
                    discharge: "1.8 kWh",
                    emission: "28.5°"
                });
                if (presName) presName.textContent = specNameInput || "Imported 3D Model";
                if (presSub) presSub.textContent = "USER IMPORTED 3D CAD MODEL // SPATIAL DISPLAY ACTIVE";

                // Unified mesh count warning check for v3.6 (Exploded + Assembly)
                let meshCount = 0;
                uploadedMeshGroup.traverse(c => { if (c.isMesh) meshCount++; });
                if (meshCount <= 1) {
                    showNotification(
                        state.language === 'ko' ? "안내 — 분해도 & 조립 단계" : "Heads up — Exploded & Assembly",
                        state.language === 'ko'
                            ? "이 모델은 단일 메쉬 구조입니다. 파트가 분리되지 않아 [입체 분해도] 및 [로봇 조립 시퀀스]에 파트별 분해가 적용되지 않습니다."
                            : "This model consists of a single mesh. Exploded View and Robotic Assembly steps cannot separate parts. Import a multi-part model for full features."
                    );
                }
            } else if (state.imageUploaded && state.customImageParticles) {
                compoundMesh = createCustomImageGeometry();
                const specNameInput = document.getElementById('spec-name').value;
                updateSpecsHUD(specNameInput || "User Custom Object", "INJECTED // PNG", {
                    weight: "0.5 kg",
                    power: "45 W",
                    thermal: "68%",
                    id: "INJ-OBJ-711Z",
                    volume: "0.08 m³",
                    stability: "96.40%",
                    discharge: "1.2 kWh",
                    emission: "40.2°"
                });
                if (presName) presName.textContent = specNameInput || "Custom Prototyping Object";
                if (presSub) presSub.textContent = "INJECTED USER 2D DESIGN // LASER EDGE CONSTRUCT";
            } else {
                compoundMesh = createAeroDroneGeometry();
                if (presName) presName.textContent = "AeroDrone Scout-V";
                if (presSub) presSub.textContent = "PROTOTYPE // MULTIROTOR UAV DEVELOPMENT";
            }
            break;
    }
    
    compoundMesh.traverse(child => {
        if (child instanceof THREE.Group && child.userData.explodedOffset) {
            child.userData.originalPosition = child.position.clone();
        }
    });
    
    updateExplodedTranslations(compoundMesh);
    
    compoundMesh.scale.set(0.001, 0.001, 0.001);
    activeModelGroup.add(compoundMesh);
    
    // V9.1 Polish: Materialize Elastic Animation
    let animProgress = 0;
    const animateMaterialize = () => {
        animProgress += 0.04; // Adjust speed
        if (animProgress <= 1.0) {
            const p = animProgress;
            const elastic = Math.sin(-13.0 * (p + 1.0) * Math.PI / 2) * Math.pow(2.0, -10.0 * p) + 1.0;
            const currentScale = state.scale * Math.max(0, elastic);
            compoundMesh.scale.set(currentScale, currentScale, currentScale);
            requestAnimationFrame(animateMaterialize);
        } else {
            compoundMesh.scale.set(state.scale, state.scale, state.scale);
        }
    };
    animateMaterialize();
    if (state.partScanActive) {
        state.partScanIndex = 0;
    }
    updatePrototypeInsight(compoundMesh, presetName);
    if (presetName === 'custom') {
        updateImportQualityFromModel(compoundMesh, {
            source: document.getElementById('spec-name')?.value || 'Custom import',
            type: state.imageUploaded ? 'image' : '3d'
        });
    } else {
        updateImportQualityForSample(presetName);
    }
    // Performance Optimization: Cache animated mesh parts (Phase F)
    rebuildAnimatedNodesCache(compoundMesh);
    syncPartScanLayout();
    setWorkflowProgress('structure', ['model']);
    updateHandoffPackStatus();

    // ST,AND-only demo controls (fold state + product lineup) — show/reset (v10.0)
    syncStandControls(presetName);
}

// Show ST,AND-only controls only for the stand preset, reset to default (open + BASIC)
function syncStandControls(presetName) {
    const section = document.getElementById('stand-control-section');
    if (!section) return;
    const isStand = presetName === 'stand';
    section.style.display = isStand ? 'block' : 'none';
    if (!isStand) return;
    // reset button states
    document.querySelectorAll('.stand-fold-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-fold') === 'open'));
    document.querySelectorAll('.stand-line-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-line') === 'basic'));
    // apply BASIC (opaque PP) look by default
    setStandLineup('basic');
}

// Animate the front panel between unfolded (self-standing 65°) and folded-flat (4mm storage)
let standFoldRAF = null;
function setStandFold(foldState) {
    if (state.activePreset !== 'stand' || !activeModelGroup) return;
    const panel = activeModelGroup.getObjectByName('front-panel');
    if (!panel) return;
    const OPEN = -THREE.MathUtils.degToRad(22);   // leaning, self-standing
    const CLOSED = -Math.PI / 2;                   // lying flat onto the base
    const target = foldState === 'closed' ? CLOSED : OPEN;
    if (standFoldRAF) cancelAnimationFrame(standFoldRAF);
    playSynthClick(foldState === 'closed' ? 360 : 640, 0.1);
    const stepFn = () => {
        panel.rotation.x += (target - panel.rotation.x) * 0.15;
        if (Math.abs(target - panel.rotation.x) < 0.004) {
            panel.rotation.x = target;
            standFoldRAF = null;
            return;
        }
        standFoldRAF = requestAnimationFrame(stepFn);
    };
    stepFn();
    addConsoleLog(foldState === 'closed'
        ? "[ST,AND] 접힘 상태 — 두께 약 4mm 납작 보관."
        : "[ST,AND] 펼침 상태 — 65° 자립 명패.", "success");
}

// Switch ST,AND product lineup material (BASIC opaque PP / CLEAR acrylic / CUSTOM brand color)
function setStandLineup(type) {
    if (state.activePreset !== 'stand' || !activeModelGroup) return;
    activeModelGroup.traverse(node => {
        const mat = node.userData && node.userData.solidMaterial;
        const productMat = node.userData && node.userData.productMaterial;
        if (!mat) return;
        if (node.userData.isChrome) return; // keep the living-hinge highlight intact
        if (type === 'clear') {
            mat.opacity = 0.32; mat.metalness = 0.10; mat.roughness = 0.05;
            if (productMat) {
                productMat.transparent = true;
                productMat.opacity = 0.32;
                productMat.metalness = 0.10;
                productMat.roughness = 0.05;
            }
        } else if (type === 'custom') {
            mat.color.set(state.themeColor); mat.opacity = 0.88; mat.metalness = 0.30; mat.roughness = 0.40;
            if (productMat) {
                productMat.color.set(state.themeColor);
                productMat.transparent = false;
                productMat.opacity = 1;
                productMat.metalness = 0.30;
                productMat.roughness = 0.40;
            }
        } else { // basic — opaque PP
            mat.opacity = 0.92; mat.metalness = 0.12; mat.roughness = 0.62;
            if (productMat) {
                productMat.transparent = false;
                productMat.opacity = 1;
                productMat.metalness = 0.12;
                productMat.roughness = 0.62;
            }
        }
        mat.needsUpdate = true;
        if (productMat) productMat.needsUpdate = true;
    });
    applyMaterialView();
    const labelMap = { basic: 'BASIC — 표준 PP(불투명)', clear: 'CLEAR — 프리미엄 아크릴(투명)', custom: 'CUSTOM — 브랜드 컬러' };
    addConsoleLog(`[ST,AND] 라인업: ${labelMap[type] || type}`, "info");
}

function initStandControlsUi() {
    document.querySelectorAll('.stand-fold-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.stand-fold-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            setStandFold(e.currentTarget.getAttribute('data-fold'));
        });
    });
    document.querySelectorAll('.stand-line-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.stand-line-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            setStandLineup(e.currentTarget.getAttribute('data-line'));
        });
    });
}

function updatePrototypeInsight(modelGroup, presetName = state.activePreset) {
    const card = document.getElementById('prototype-insight-card');
    if (!card || !modelGroup) return;

    const name = document.getElementById('spec-name')?.value || document.getElementById('pres-product-name')?.textContent || "Prototype";
    const productNameEl = document.getElementById('insight-product-name');
    const statusEl = document.getElementById('insight-status-pill');
    const partCountEl = document.getElementById('insight-part-count');
    const explodedEl = document.getElementById('insight-exploded-status');
    const exportEl = document.getElementById('insight-export-status');
    const noteEl = document.getElementById('insight-presenter-note');
    const lang = state.language === 'ko' ? 'ko' : 'en';

    let partCount = 0;
    let meshCount = 0;
    modelGroup.traverse(child => {
        if (child.userData && child.userData.explodedOffset) partCount++;
        if (child.isMesh) meshCount++;
    });

    const isImageProjection = presetName === 'custom' && state.imageUploaded;
    const imagePointCount = state.customImageParticles ? state.customImageParticles.length : 0;
    const isSingleMesh = presetName === 'custom' && !isImageProjection && partCount <= 1;
    const canExplode = partCount > 1 && !isImageProjection;

    let statusText = lang === 'ko' ? "발표 준비" : "READY";
    let statusClass = "ready";
    let partText = `${partCount || meshCount} parts`;
    let explodedText = lang === 'ko' ? "가능" : "Ready";
    let exportText = "PNG · JSON · GLB";
    let tipKey = presetName;

    if (isImageProjection) {
        statusText = lang === 'ko' ? "이미지 투사" : "IMAGE";
        statusClass = "image";
        partText = imagePointCount > 0 ? `${imagePointCount.toLocaleString()} pts` : "Point cloud";
        explodedText = lang === 'ko' ? "제한" : "Limited";
        exportText = "PNG · JSON";
        tipKey = "image";
    } else if (isSingleMesh) {
        statusText = lang === 'ko' ? "단일 메쉬" : "SINGLE";
        statusClass = "limited";
        partText = "1 mesh";
        explodedText = lang === 'ko' ? "제한" : "Limited";
        tipKey = "customSingle";
    } else if (presetName === 'custom') {
        statusText = lang === 'ko' ? "임포트 완료" : "IMPORTED";
        tipKey = "customMulti";
    }

    if (productNameEl) productNameEl.textContent = name;
    if (statusEl) {
        statusEl.textContent = statusText;
        statusEl.className = `insight-status-pill ${statusClass}`;
    }
    if (partCountEl) partCountEl.textContent = partText;
    if (explodedEl) explodedEl.textContent = explodedText;
    if (exportEl) exportEl.textContent = exportText;
    if (noteEl) {
        const tip = prototypePresenterTips[tipKey] || prototypePresenterTips.customMulti;
        noteEl.textContent = tip[lang];
    }
}

function refreshPrototypeInsight() {
    if (!activeModelGroup || activeModelGroup.children.length === 0) return;
    updatePrototypeInsight(activeModelGroup.children[0], state.activePreset);
}

function formatFileSize(bytes = 0) {
    if (!bytes) return '0 KB';
    if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getImportFileTypeLabel(fileOrMeta = {}) {
    const name = fileOrMeta.name || fileOrMeta.source || '';
    const ext = fileOrMeta.extension || (typeof name === 'string' && name.includes('.') ? name.split('.').pop() : '');
    if (fileOrMeta.type === 'image' || fileOrMeta.type?.startsWith?.('image/')) return 'IMAGE';
    if (fileOrMeta.type === 'sample') return 'SAMPLE';
    return ext ? ext.toUpperCase() : '3D';
}

function getModelQualityStats(modelGroup) {
    const stats = {
        meshes: 0,
        explodedParts: 0,
        vertices: 0,
        maxDimension: 0,
        dimensions: { x: 0, y: 0, z: 0 },
        hasGeometry: false
    };
    if (!modelGroup) return stats;

    modelGroup.traverse(child => {
        if (child.isMesh) {
            stats.meshes++;
            if (child.geometry?.attributes?.position) {
                stats.vertices += child.geometry.attributes.position.count;
                stats.hasGeometry = true;
            }
        }
        if (child.userData && child.userData.explodedOffset) {
            stats.explodedParts++;
        }
    });

    const box = new THREE.Box3().setFromObject(modelGroup);
    if (!box.isEmpty()) {
        const size = new THREE.Vector3();
        box.getSize(size);
        stats.maxDimension = Math.max(size.x, size.y, size.z);
        stats.dimensions = { x: size.x, y: size.y, z: size.z };
    }
    return stats;
}

function getImportReliabilityReport(modelGroup, meta = {}, stats = getModelQualityStats(modelGroup)) {
    const isImage = meta.type === 'image';
    const customPartCount = meta.customPartCount ?? (state.activePreset === 'custom' ? getPartScanList('custom').length : 0);
    const fileSizeMb = Number.isFinite(meta.fileSize) ? meta.fileSize / (1024 * 1024) : 0;
    const typeLabel = getImportFileTypeLabel(meta);
    const scaleLabel = stats.maxDimension > 0
        ? `${stats.maxDimension.toFixed(2)}u`
        : (isImage ? '2D->3D' : 'AUTO');
    const partsLabel = isImage
        ? `${state.customImageParticles?.length?.toLocaleString() || 0} pts`
        : (customPartCount > 0 ? `${customPartCount} mapped` : `${stats.meshes || 0} mesh`);
    const warnings = [];

    if (!isImage && stats.meshes === 0) warnings.push('NO_MESH');
    if (!isImage && customPartCount <= 1) warnings.push('SINGLE_PART');
    if (stats.vertices > 180000) warnings.push('HEAVY_VERTICES');
    if (fileSizeMb > 60) warnings.push('LARGE_FILE');
    if (stats.maxDimension > 6) warnings.push('AUTO_SCALED');

    let risk = 'LOW';
    if (warnings.includes('NO_MESH') || warnings.includes('HEAVY_VERTICES') || fileSizeMb > 120) {
        risk = 'HIGH';
    } else if (warnings.length > 0 || isImage) {
        risk = 'MED';
    }

    return {
        typeLabel,
        scaleLabel,
        partsLabel,
        risk,
        warnings
    };
}

function getImportQualityActionDefaults(actionKey, overrides = {}) {
    const ko = state.language === 'ko';
    const map = {
        'part-scan': {
            text: ko ? 'Part Scan으로 핵심 부품을 하나씩 설명하세요.' : 'Use Part Scan to explain the key components one by one.',
            label: 'Part Scan'
        },
        structure: {
            text: ko ? '분해도와 상단 시점으로 구조를 먼저 확인하세요.' : 'Open the exploded top view to inspect the structure first.',
            label: ko ? '구조 보기' : 'Structure'
        },
        showcase: {
            text: ko ? '분해가 제한된 모델은 Showcase로 발표 흐름을 잡으세요.' : 'Use Showcase mode when part-level separation is limited.',
            label: 'Showcase'
        },
        'demo-preset': {
            text: ko ? '데모 프리셋으로 바로 발표 장면을 구성하세요.' : 'Use a demo preset to stage the presentation quickly.',
            label: ko ? '프리셋' : 'Preset'
        },
        'demo-pack': {
            text: ko ? '시연 패키지로 브리프와 핸드오프 자료를 묶으세요.' : 'Create a demo pack to bundle the brief and handoff assets.',
            label: ko ? '패키지' : 'Pack'
        },
        model: {
            text: ko ? '다른 3D 파일이나 샘플을 선택해 다시 확인하세요.' : 'Choose another 3D file or sample and check again.',
            label: ko ? '다시 선택' : 'Choose'
        }
    };
    const fallback = {
        text: ko ? '품질 확인 후 다음 행동을 추천합니다.' : 'The next action appears after the quality check.',
        label: ko ? '대기' : 'Wait'
    };
    const copy = map[actionKey] || fallback;

    return {
        actionKey: actionKey || null,
        actionText: overrides.actionText || copy.text,
        actionLabel: overrides.actionLabel || copy.label,
        actionDisabled: overrides.actionDisabled ?? !actionKey
    };
}

function getImportQualityModelAction(isLimited) {
    const ko = state.language === 'ko';
    const canPartScan = !isLimited && getPartScanList().length > 0;
    if (canPartScan) return getImportQualityActionDefaults('part-scan');
    if (isLimited) return getImportQualityActionDefaults('showcase');
    return getImportQualityActionDefaults('structure', {
        actionText: ko
            ? '구조 보기를 먼저 적용하고 필요하면 라벨을 보강하세요.'
            : 'Open Structure first, then add labels if the imported model needs them.'
    });
}

function setImportQualityCard(nextQuality) {
    state.importQuality = { ...state.importQuality, ...nextQuality };
    const card = document.getElementById('import-quality-card');
    if (!card) return;

    card.classList.remove('import-empty', 'import-ready', 'import-good', 'import-limited', 'import-error');
    card.classList.add(`import-${state.importQuality.status || 'empty'}`);

    const statusEl = document.getElementById('import-quality-status');
    const sourceEl = document.getElementById('import-quality-source');
    const meshesEl = document.getElementById('import-quality-meshes');
    const fitEl = document.getElementById('import-quality-fit');
    const reliabilityTypeEl = document.getElementById('import-reliability-type');
    const reliabilityScaleEl = document.getElementById('import-reliability-scale');
    const reliabilityPartsEl = document.getElementById('import-reliability-parts');
    const reliabilityRiskEl = document.getElementById('import-reliability-risk');
    const noteEl = document.getElementById('import-quality-note');
    const actionTextEl = document.getElementById('import-quality-action-text');
    const actionBtn = document.getElementById('btn-import-quality-action');
    const actionLabelEl = document.getElementById('import-quality-action-button-label');
    const actionKey = state.importQuality.actionKey || '';

    if (statusEl) statusEl.textContent = state.importQuality.statusLabel || 'READY';
    if (sourceEl) sourceEl.textContent = state.importQuality.source || '-';
    if (meshesEl) meshesEl.textContent = state.importQuality.meshes || '-';
    if (fitEl) fitEl.textContent = state.importQuality.fit || '-';
    if (reliabilityTypeEl) reliabilityTypeEl.textContent = state.importQuality.reliabilityType || '-';
    if (reliabilityScaleEl) reliabilityScaleEl.textContent = state.importQuality.reliabilityScale || '-';
    if (reliabilityPartsEl) reliabilityPartsEl.textContent = state.importQuality.reliabilityParts || '-';
    if (reliabilityRiskEl) {
        reliabilityRiskEl.textContent = state.importQuality.reliabilityRisk || 'LOW';
        reliabilityRiskEl.dataset.risk = state.importQuality.reliabilityRisk || 'LOW';
    }
    if (noteEl) noteEl.textContent = state.importQuality.note || '';
    if (actionTextEl) actionTextEl.textContent = state.importQuality.actionText || '';
    if (actionLabelEl) actionLabelEl.textContent = state.importQuality.actionLabel || (state.language === 'ko' ? '실행' : 'Run');
    if (actionBtn) {
        actionBtn.dataset.importAction = actionKey;
        actionBtn.disabled = !!state.importQuality.actionDisabled || !actionKey;
        actionBtn.setAttribute('aria-disabled', actionBtn.disabled ? 'true' : 'false');
    }
}

function setImportQualityPending(file) {
    const source = file ? `${file.name} · ${formatFileSize(file.size)}` : 'Custom import';
    setImportQualityCard({
        status: 'limited',
        statusLabel: state.language === 'ko' ? 'CHECKING' : 'CHECKING',
        source,
        meshes: '-',
        fit: state.language === 'ko' ? 'Parsing' : 'Parsing',
        reliabilityType: file ? getImportFileTypeLabel(file) : 'FILE',
        reliabilityScale: 'PENDING',
        reliabilityParts: '-',
        reliabilityRisk: 'CHECK',
        reliabilityWarnings: [],
        note: state.language === 'ko'
            ? '파일 구조를 읽고 발표 적합도를 계산하는 중입니다.'
            : 'Parsing the file and checking presentation readiness.',
        ...getImportQualityActionDefaults(null, {
            actionText: state.language === 'ko' ? '분석이 끝나면 다음 행동을 추천합니다.' : 'The next action will appear after analysis.',
            actionLabel: state.language === 'ko' ? '대기' : 'Wait',
            actionDisabled: true
        })
    });
}

function setImportQualityError(file, message) {
    setImportQualityCard({
        status: 'error',
        statusLabel: 'ERROR',
        source: file ? file.name : 'Unsupported file',
        meshes: '-',
        fit: 'Blocked',
        reliabilityType: file ? getImportFileTypeLabel(file) : 'FILE',
        reliabilityScale: 'BLOCKED',
        reliabilityParts: '-',
        reliabilityRisk: 'HIGH',
        reliabilityWarnings: ['PARSE_ERROR'],
        note: message || (state.language === 'ko' ? '지원되지 않는 파일입니다.' : 'Unsupported file.'),
        ...getImportQualityActionDefaults('model')
    });
}

function updateImportQualityFromModel(modelGroup, meta = {}) {
    const stats = getModelQualityStats(modelGroup);
    const isImage = meta.type === 'image';
    const customPartCount = meta.customPartCount ?? (state.activePreset === 'custom' ? getPartScanList('custom').length : 0);
    const reliability = getImportReliabilityReport(modelGroup, { ...meta, customPartCount }, stats);
    const isLimited = isImage || stats.explodedParts <= 1 || (state.activePreset === 'custom' && customPartCount <= 1);
    const status = isLimited ? 'limited' : 'good';
    const statusLabel = isLimited ? (state.language === 'ko' ? 'LIMITED' : 'LIMITED') : 'READY';
    const meshesText = isImage
        ? `${state.customImageParticles?.length?.toLocaleString() || 0} pts`
        : `${stats.meshes || 1} mesh${stats.meshes === 1 ? '' : 'es'}`;
    const fitText = stats.maxDimension > 0
        ? `Auto-fit ${stats.maxDimension.toFixed(1)}u`
        : 'Auto-fit ready';
    const note = meta.note || (
        state.activePreset === 'custom' && !isImage && customPartCount > 1
            ? (state.language === 'ko'
                ? `${customPartCount}개 커스텀 부품을 자동 매핑했습니다. Part Scan으로 가져온 모델을 바로 설명할 수 있습니다.`
                : `${customPartCount} imported parts auto-mapped. Part Scan can walk through the custom model.`)
            : (isLimited
                ? (state.language === 'ko'
                    ? '발표는 가능하지만 파트별 분해/조립 설명은 제한됩니다.'
                    : 'Presentation-ready, but part-level exploded assembly is limited.')
                : (state.language === 'ko'
                    ? '멀티 파트 구조로 분해도, 라벨, 타임라인 발표에 적합합니다.'
                    : 'Multi-part model ready for exploded views, labels, and timeline demos.'))
    );

    setImportQualityCard({
        status,
        statusLabel,
        source: meta.source || document.getElementById('spec-name')?.value || 'Custom import',
        meshes: meshesText,
        fit: fitText,
        reliabilityType: reliability.typeLabel,
        reliabilityScale: reliability.scaleLabel,
        reliabilityParts: reliability.partsLabel,
        reliabilityRisk: reliability.risk,
        reliabilityWarnings: reliability.warnings,
        note,
        ...getImportQualityModelAction(isLimited)
    });
}

function updateImportQualityForSample(presetName) {
    const sample = samplePrototypeCatalog[presetName];
    if (!sample) return;
    const canPartScan = (partAnnotations[presetName] || []).length > 0;
    const action = getImportQualityActionDefaults(canPartScan ? 'part-scan' : 'structure');
    setImportQualityCard({
        status: 'good',
        statusLabel: 'SAMPLE READY',
        source: sample.source,
        meshes: sample.meshes,
        fit: sample.fit,
        reliabilityType: 'SAMPLE',
        reliabilityScale: 'READY',
        reliabilityParts: canPartScan ? `${(partAnnotations[presetName] || []).length} mapped` : 'SINGLE',
        reliabilityRisk: canPartScan ? 'LOW' : 'MED',
        reliabilityWarnings: canPartScan ? [] : ['SINGLE_PART'],
        note: state.language === 'ko' ? sample.noteKo : sample.noteEn,
        ...action
    });
}

function updatePresetButtonSelection(presetName) {
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-preset') === presetName);
    });
}

function applyStudioEnvironmentPreset(env) {
    if (!env) return;
    state.studioEnvironment = env;
    document.querySelectorAll('.env-mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-env') === env);
    });
    if (environmentGroup) updateStudioEnvironment();
}

// ===== Studio Lighting (v10.x) =====
// Mood = intensity multipliers on each light's neutral base + key/rim colors.
const LIGHTING_MOODS = {
    studio:   { ambient: 1.0,  key: 1.0,  rim: 1.0,  fill: 1.0,  keyColor: 0xffffff, rimColor: 0x007aff },
    warm:     { ambient: 0.9,  key: 1.15, rim: 0.7,  fill: 1.0,  keyColor: 0xffe6bf, rimColor: 0xff8a3d },
    cool:     { ambient: 0.9,  key: 1.0,  rim: 1.15, fill: 0.9,  keyColor: 0xd6e6ff, rimColor: 0x1e6bff },
    dramatic: { ambient: 0.3,  key: 1.55, rim: 1.35, fill: 0.25, keyColor: 0xffffff, rimColor: 0x0a84ff }
};

function applyLighting(mood = state.lighting.mood, brightness = state.lighting.brightness) {
    if (!sceneLights) return;
    const m = LIGHTING_MOODS[mood] || LIGHTING_MOODS.studio;
    const b = (typeof brightness === 'number' && !isNaN(brightness)) ? brightness : 1.0;
    const base = sceneLights.base;
    sceneLights.ambient.intensity = base.ambient * m.ambient * b;
    sceneLights.key.intensity     = base.key     * m.key     * b;
    sceneLights.rim.intensity     = base.rim     * m.rim     * b;
    sceneLights.fill.intensity    = base.fill    * m.fill    * b;
    sceneLights.key.color.setHex(m.keyColor);
    sceneLights.rim.color.setHex(m.rimColor);
    state.lighting.mood = mood;
    state.lighting.brightness = b;
}

function initLightingControls() {
    document.querySelectorAll('.light-mode-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.light-mode-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            applyLighting(e.currentTarget.getAttribute('data-light'), state.lighting.brightness);
            playSynthClick(560, 0.06);
        });
    });
    const slider = document.getElementById('tuner-light-brightness');
    const readout = document.getElementById('readout-light-brightness');
    if (slider) slider.addEventListener('input', () => {
        const v = parseFloat(slider.value);
        if (readout) readout.textContent = v.toFixed(1);
        applyLighting(state.lighting.mood, v);
    });
}

function buildScenarioKeyframes(scenario) {
    const themeColor = state.themeColor;
    const environment = scenario.environment || state.studioEnvironment;
    return scenario.keyframes.map((item, index) => ({
        id: `scenario-${scenario.label.toLowerCase().replace(/\s+/g, '-')}-${index}-${Date.now()}`,
        time: item.time,
        camera: {
            position: item.position,
            target: item.target
        },
        explodedLevel: item.explodedLevel,
        renderMode: item.renderMode,
        materialView: item.materialView || (item.renderMode === 'solid' ? 'product' : 'hologram'),
        themeColor,
        assemblyStep: 0,
        environment,
        rotationSpeed: scenario.rotationSpeed,
        cameraMode: scenario.camera,
        subtitle: state.language === 'ko' ? item.subtitleKo : item.subtitleEn,
        label: `${scenario.label} ${index + 1}`
    }));
}

function applyDemoPreset(presetKey) {
    const scenario = demoPresetScenarios[presetKey];
    if (!scenario) return;
    if (!state.engineBooted) {
        showNotification(
            state.language === 'ko' ? '엔진 기동 필요' : 'Boot Required',
            state.language === 'ko' ? '먼저 HOLOSYN 엔진을 기동한 뒤 데모 프리셋을 적용하세요.' : 'Boot HOLOSYN before applying demo presets.'
        );
        return;
    }

    clearDemoFlowTimers();
    if (state.isShowcaseMode) stopCinematicPresentation();

    state.activeDemoPreset = presetKey;
    state.handoffReady.demo = true;
    state.handoffReady.timeline = true;

    document.querySelectorAll('.demo-preset-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-demo-preset') === presetKey);
    });
    const statusEl = document.getElementById('demo-preset-status');
    if (statusEl) statusEl.textContent = scenario.label;

    state.imageUploaded = false;
    uploadedMeshGroup = null;
    updatePresetButtonSelection(scenario.preset);
    loadPresetModel(scenario.preset);
    setRenderModeByKey(scenario.renderMode);
    applyStudioEnvironmentPreset(scenario.environment);
    applyCameraView(scenario.camera, false);
    animateExplodedLevel(scenario.explodedLevel, 900);
    state.rotationSpeed = scenario.rotationSpeed;

    state.timelineDuration = 12;
    state.timelineCurrentTime = 0;
    state.timelinePlaying = false;
    state.timelineKeyframes = buildScenarioKeyframes(scenario);
    if (typeof setTimelinePanelOpen === 'function') {
        setTimelinePanelOpen(true);
    }
    if (typeof updateTimelineFooter === 'function') {
        updateTimelineFooter();
    }
    if (typeof updateTimelinePlayhead === 'function') {
        updateTimelinePlayhead();
    }

    setWorkflowProgress('present', ['model', 'structure']);
    updateHandoffPackStatus();
    showNotification(
        state.language === 'ko' ? '데모 프리셋 적용' : 'Demo Preset Applied',
        state.language === 'ko'
            ? `${scenario.label} 흐름과 타임라인 키프레임을 준비했습니다.`
            : `${scenario.label} flow and timeline keyframes are ready.`
    );
    addConsoleLog(`[DEMO] Scenario preset applied: ${scenario.label}`, 'success');
}

function updateHandoffPackStatus() {
    state.handoffReady.model = !!(activeModelGroup && activeModelGroup.children.length > 0);
    state.handoffReady.timeline = state.handoffReady.timeline || state.timelineKeyframes.length >= 2;

    const map = {
        model: document.getElementById('handoff-check-model'),
        demo: document.getElementById('handoff-check-demo'),
        timeline: document.getElementById('handoff-check-timeline'),
        export: document.getElementById('handoff-check-export')
    };
    Object.entries(map).forEach(([key, el]) => {
        if (el) el.classList.toggle('done', !!state.handoffReady[key]);
    });

    const readyCount = Object.values(state.handoffReady).filter(Boolean).length;
    const statusEl = document.getElementById('handoff-pack-status');
    if (statusEl) statusEl.textContent = `${readyCount} / 4 READY`;
    updateHandoffPartMapStatus();
    updateBetaReadinessPanel();
    updateHandoffNextAction();
}

function updateHandoffPartMapStatus() {
    const summaryEl = document.getElementById('handoff-part-map-summary');
    const countEl = document.getElementById('handoff-part-map-count');
    if (!summaryEl || !countEl) return;

    const hasModel = !!(activeModelGroup && activeModelGroup.children.length > 0);
    const partCount = hasModel ? buildPartMapSummary().total : 0;
    summaryEl.classList.toggle('ready', partCount > 0);
    countEl.textContent = partCount > 0
        ? `${partCount} COMPONENT${partCount === 1 ? '' : 'S'}`
        : '0 COMPONENTS';
}

function getHandoffNextAction() {
    const isKo = state.language === 'ko';
    const hasModel = !!(activeModelGroup && activeModelGroup.children.length > 0);
    const partCount = hasModel ? buildPartMapSummary().total : 0;

    if (!state.handoffReady.model) {
        return {
            state: 'blocked',
            actionKey: 'model',
            text: isKo
                ? '샘플을 고르거나 3D 파일을 드롭해 모델 준비부터 시작하세요.'
                : 'Load a sample or drop a 3D file to begin handoff prep.'
        };
    }
    if (!state.handoffReady.demo) {
        return {
            state: 'next',
            actionKey: 'demo',
            text: isKo
                ? '데모 프리셋을 적용하거나 데모 런을 실행해 발표 흐름을 고정하세요.'
                : 'Apply a demo preset or run Demo Run to lock the presentation flow.'
        };
    }
    if (!state.handoffReady.timeline) {
        return {
            state: 'next',
            actionKey: 'timeline',
            text: isKo
                ? 'Timeline을 열어 키프레임을 만들거나 프리셋 타임라인을 준비하세요.'
                : 'Open Timeline to stage keyframes, or prepare a preset timeline.'
        };
    }
    if (!state.handoffReady.export) {
        return {
            state: 'next',
            actionKey: 'export',
            text: partCount > 0
                ? (isKo
                    ? `Part Map ${partCount}개가 준비되었습니다. Runbook, Demo Pack, Manifest로 마감하세요.`
                    : `${partCount} Part Map components are ready. Close with a Runbook, Demo Pack, or Manifest.`)
                : (isKo
                    ? '단일 셸 모델입니다. Runbook, Demo Pack, Manifest로 마감하면 됩니다.'
                    : 'This is a single-shell model. Close with a Runbook, Demo Pack, or Manifest.')
        };
    }

    return {
        state: 'ready',
        actionKey: 'export',
        text: partCount > 0
            ? (isKo
                ? `핸드오프 준비 완료. ${partCount}개 컴포넌트 요약까지 포함됩니다.`
                : `Ready to hand off with ${partCount} mapped components.`)
            : (isKo
                ? '핸드오프 준비 완료. 단일 셸 모델로 요약됩니다.'
                : 'Ready to hand off as a single-shell model.')
    };
}

function updateHandoffNextAction() {
    const box = document.getElementById('handoff-next-action');
    const textEl = document.getElementById('handoff-next-action-text');
    if (!box || !textEl) return;

    const nextAction = getHandoffNextAction();
    textEl.textContent = nextAction.text;
    box.dataset.handoffAction = nextAction.actionKey || 'export';
    box.setAttribute('aria-label', nextAction.text);
    box.setAttribute('title', nextAction.text);
    box.classList.toggle('ready', nextAction.state === 'ready');
    box.classList.toggle('blocked', nextAction.state === 'blocked');
}

function runHandoffChecklistAction(actionKey) {
    if (!actionKey) return;
    playSynthClick(660, 0.05);

    if (actionKey === 'model') {
        focusModelImportArea();
        return;
    }

    if (actionKey === 'demo') {
        openWorkflowDrawer('left');
        const panel = document.getElementById('demo-presets-panel');
        pulseWorkflowTarget(panel);
        if (panel) panel.scrollIntoView({ block: 'center', behavior: 'smooth' });
        showNotification(
            state.language === 'ko' ? '데모 프리셋' : 'Demo Preset',
            state.language === 'ko' ? '목적에 맞는 프리셋을 골라 발표 흐름을 고정하세요.' : 'Choose a preset to lock the presentation flow.'
        );
        return;
    }

    if (actionKey === 'timeline') {
        handleWorkflowStep('present');
        if (typeof setTimelinePanelOpen === 'function') {
            setTimelinePanelOpen(true);
        }
        const panel = document.getElementById('timeline-editor') || document.getElementById('btn-toggle-timeline');
        pulseWorkflowTarget(panel);
        showNotification(
            state.language === 'ko' ? '타임라인 준비' : 'Timeline Prep',
            state.language === 'ko' ? '키프레임을 확인해 발표 순서를 고정하세요.' : 'Review keyframes to lock the presentation sequence.'
        );
        return;
    }

    if (actionKey === 'export') {
        handleWorkflowStep('export');
        const panel = document.getElementById('demo-pack-panel') || document.querySelector('.export-buttons-grid');
        pulseWorkflowTarget(panel);
        if (panel) panel.scrollIntoView({ block: 'center', behavior: 'smooth' });
        showNotification(
            state.language === 'ko' ? '내보내기 준비' : 'Export Ready',
            state.language === 'ko' ? 'Runbook, Demo Pack, Manifest, PNG, GLB 중 필요한 산출물을 저장하세요.' : 'Save the needed Runbook, Demo Pack, Manifest, PNG, or GLB deliverable.'
        );
    }
}

function markHandoffExportReady() {
    state.handoffReady.export = true;
    updateHandoffPackStatus();
    updateFinalPassPanel();
    updateLaunchReadinessPanel();
}

function getProjectSnapshotStorageKey() {
    return 'holosyn_project_snapshot_v1';
}

function getStoredProjectSnapshot() {
    try {
        const storage = getBrowserStorage();
        if (!storage) return null;
        const raw = storage.getItem(getProjectSnapshotStorageKey());
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        return null;
    }
}

function setBetaCheckState(id, isReady) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('pass', !!isReady);
    el.classList.toggle('warn', !isReady);
}

function canUseLocalStorage() {
    try {
        const storage = getBrowserStorage();
        if (!storage) return false;
        const key = '__holosyn_storage_probe__';
        storage.setItem(key, '1');
        storage.removeItem(key);
        return true;
    } catch (error) {
        return false;
    }
}

function updateBetaReadinessPanel() {
    state.betaReadiness = {
        webgl: typeof window !== 'undefined' && !!window.WebGLRenderingContext,
        cdn: typeof window !== 'undefined'
            && !!(window.THREE && THREE.GLTFExporter && THREE.GLTFLoader && THREE.OBJLoader && window.lucide),
        storage: canUseLocalStorage(),
        model: !!(activeModelGroup && activeModelGroup.children.length > 0),
        snapshot: !!getStoredProjectSnapshot()
    };

    setBetaCheckState('beta-check-webgl', state.betaReadiness.webgl);
    setBetaCheckState('beta-check-cdn', state.betaReadiness.cdn);
    setBetaCheckState('beta-check-storage', state.betaReadiness.storage);
    setBetaCheckState('beta-check-model', state.betaReadiness.model);
    setBetaCheckState('beta-check-snapshot', state.betaReadiness.snapshot);

    const readyCount = Object.values(state.betaReadiness).filter(Boolean).length;
    const statusEl = document.getElementById('beta-readiness-status');
    if (statusEl) {
        if (readyCount === 5) {
            statusEl.textContent = 'READY';
        } else if (readyCount >= 4) {
            statusEl.textContent = `${readyCount} / 5 OK`;
        } else {
            statusEl.textContent = `${readyCount} / 5 CHECK`;
        }
    }
    updateFinalReadinessScore();
}

function getRenderPixelRatioCap() {
    return state.visualQualityBoost ? 2.5 : 2;
}

function getRenderPixelRatio() {
    const ratio = typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1;
    return Math.min(ratio, getRenderPixelRatioCap());
}

function getSpecCardExportScale() {
    return state.visualQualityBoost ? 1.5 : 1;
}

function updateQualityBoostUi() {
    const btn = document.getElementById('btn-quality-boost');
    const status = document.getElementById('quality-boost-status');
    if (!btn || !status) return;

    const isActive = !!state.visualQualityBoost;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
    status.textContent = isActive
        ? `${getRenderPixelRatioCap().toFixed(1)}x DPR · ${getSpecCardExportScale().toFixed(1)}x PNG`
        : '2.0x DPR · 1.0x PNG';
    updateFinalPassPanel();
}

function applyRenderQualitySettings(shouldLog = false) {
    if (renderer) renderer.setPixelRatio(getRenderPixelRatio());
    if (composer && container) composer.setSize(container.clientWidth, container.clientHeight);
    updateQualityBoostUi();

    if (shouldLog) {
        addConsoleLog(
            state.visualQualityBoost
                ? '[HQ] High quality boost enabled: 2.5x DPR cap and 1.5x PNG export scale.'
                : '[HQ] High quality boost disabled: balanced render scale restored.',
            'info'
        );
    }
}

function toggleQualityBoost() {
    state.visualQualityBoost = !state.visualQualityBoost;
    applyRenderQualitySettings(true);
    savePreferences();
}

function setFinalPassCheckState(id, isReady) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('pass', !!isReady);
    el.classList.toggle('warn', !isReady);
}

function invalidateFinalPassLock() {
    if (state.finalPass.status !== 'locked') return;
    state.finalPass.status = 'standby';
    state.finalPass.lockedAt = null;
    updateFinalPassPanel();
}

function getFinalPassSummary() {
    const hasModel = !!(activeModelGroup && activeModelGroup.children.length > 0);
    const snapshot = getStoredProjectSnapshot();
    const checks = {
        model: hasModel,
        hq: !!state.visualQualityBoost,
        snapshot: !!snapshot,
        export: !!state.handoffReady.export
    };
    const coreReady = checks.model && checks.hq && checks.snapshot;
    const locked = state.finalPass.status === 'locked' && coreReady;
    const label = locked
        ? (checks.export ? 'LOCKED' : 'EXPORT PENDING')
        : (coreReady ? 'READY TO LOCK' : 'STANDBY');
    const detail = locked
        ? (checks.export
            ? 'Final pass saved. A runbook, Demo Pack, or Manifest has been exported.'
            : 'Final pass saved. Export Runbook, Demo Pack, Manifest, or HQ PNG next.')
        : (coreReady
            ? 'HQ Boost and snapshot are ready. Run Final Pass to lock the demo state.'
            : 'Boot a model, keep HQ Boost on, and save a project snapshot before final export.');

    return {
        label,
        locked,
        coreReady,
        lockedAt: state.finalPass.lockedAt,
        checks,
        detail,
        exportScale: getSpecCardExportScale(),
        renderPixelRatioCap: getRenderPixelRatioCap()
    };
}

function updateFinalPassPanel() {
    const panel = document.getElementById('final-pass-panel');
    const statusEl = document.getElementById('final-pass-status');
    const detailEl = document.getElementById('final-pass-detail');
    const flowBtn = document.getElementById('btn-final-pass');
    if (!panel || !statusEl || !detailEl) return;

    const summary = getFinalPassSummary();
    panel.classList.remove('standby', 'needs-work', 'locked');
    panel.classList.add(summary.locked ? 'locked' : summary.coreReady ? 'needs-work' : 'standby');
    statusEl.textContent = summary.label;
    detailEl.textContent = summary.detail;

    setFinalPassCheckState('final-pass-check-model', summary.checks.model);
    setFinalPassCheckState('final-pass-check-hq', summary.checks.hq);
    setFinalPassCheckState('final-pass-check-snapshot', summary.checks.snapshot);
    setFinalPassCheckState('final-pass-check-export', summary.checks.export);
    if (flowBtn) flowBtn.classList.toggle('locked', summary.locked);
}

function runFinalPass() {
    playSynthClick(720, 0.06);

    if (!state.engineBooted) {
        const bootBtn = document.getElementById('btn-boot-system');
        pulseWorkflowTarget(bootBtn);
        showNotification(
            state.language === 'ko' ? '엔진 기동 필요' : 'Boot Required',
            state.language === 'ko' ? '먼저 HOLOSYN 엔진을 기동한 뒤 Final Pass를 실행하세요.' : 'Boot HOLOSYN before running Final Pass.'
        );
        return;
    }

    if (!activeModelGroup || activeModelGroup.children.length === 0) {
        focusModelImportArea();
        showNotification(
            state.language === 'ko' ? '모델 필요' : 'Model Required',
            state.language === 'ko' ? '샘플 또는 3D 파일을 먼저 준비한 뒤 마감 패스를 실행하세요.' : 'Load a sample or 3D file before locking the final pass.'
        );
        return;
    }

    clearDemoFlowTimers();
    if (state.isShowcaseMode) stopCinematicPresentation();
    if (!state.visualQualityBoost) {
        state.visualQualityBoost = true;
        applyRenderQualitySettings(true);
        savePreferences();
    } else {
        applyRenderQualitySettings();
    }

    setWorkflowProgress('export', ['model', 'structure', 'present']);
    openWorkflowDrawer('right');
    applyCameraView('orbit', false);
    state.finalPass.status = 'locked';
    state.finalPass.lockedAt = new Date().toISOString();
    const snapshot = saveProjectSnapshot({ silent: true });
    updateHandoffPackStatus();
    updateFinalPassPanel();

    const panel = document.getElementById('final-pass-panel') || document.getElementById('demo-pack-panel');
    pulseWorkflowTarget(panel);
    if (panel) panel.scrollIntoView({ block: 'center', behavior: 'smooth' });

    showNotification(
        state.language === 'ko' ? 'Final Pass 완료' : 'Final Pass Locked',
        snapshot
            ? (state.language === 'ko'
                ? 'HQ Boost와 프로젝트 스냅샷을 잠갔습니다. 이제 Runbook, Demo Pack, Manifest, PNG 중 필요한 산출물을 저장하세요.'
                : 'HQ Boost and project snapshot are locked. Export Runbook, Demo Pack, Manifest, or PNG when ready.')
            : (state.language === 'ko'
                ? 'HQ Boost는 잠겼지만 스냅샷 저장소를 사용할 수 없습니다. 브라우저 저장 권한을 확인하세요.'
                : 'HQ Boost is locked, but snapshot storage is unavailable. Check browser storage access.')
    );
    addConsoleLog(
        snapshot
            ? '[FINAL PASS] Demo state locked with HQ Boost and project snapshot.'
            : '[FINAL PASS] HQ Boost locked, but project snapshot storage was unavailable.',
        snapshot ? 'success' : 'warning'
    );
}

function getFinalReadinessSummary() {
    const handoffReady = Object.values(state.handoffReady).filter(Boolean).length;
    const betaReady = Object.values(state.betaReadiness).filter(Boolean).length;
    const partMapTotal = activeModelGroup && activeModelGroup.children.length > 0
        ? buildPartMapSummary().total
        : 0;
    const score = Math.min(100, (handoffReady * 14) + (betaReady * 8) + (partMapTotal > 0 ? 4 : 0));

    let tier = 'setup';
    let label = 'SETUP';
    if (score >= 90) {
        tier = 'handoff';
        label = 'HANDOFF READY';
    } else if (score >= 75) {
        tier = 'demo';
        label = 'DEMO READY';
    } else if (score >= 55) {
        tier = 'rehearsal';
        label = 'PRIVATE REHEARSAL';
    }

    return {
        score,
        tier,
        label,
        handoffReady,
        handoffTotal: 4,
        betaReady,
        betaTotal: 5,
        partMapTotal,
        nextAction: getHandoffNextAction()
    };
}

function updateFinalReadinessScore() {
    const panel = document.getElementById('final-readiness-panel');
    const scoreEl = document.getElementById('final-readiness-score');
    const labelEl = document.getElementById('final-readiness-label');
    const detailEl = document.getElementById('final-readiness-detail');
    if (!panel || !scoreEl || !labelEl || !detailEl) return;

    const summary = getFinalReadinessSummary();
    panel.classList.remove('setup', 'rehearsal', 'demo', 'handoff');
    panel.classList.add(summary.tier);
    scoreEl.textContent = `${summary.score}%`;
    labelEl.textContent = summary.label;
    detailEl.textContent = `${summary.handoffReady} / ${summary.handoffTotal} handoff · ${summary.betaReady} / ${summary.betaTotal} preflight${summary.partMapTotal > 0 ? ` · ${summary.partMapTotal} parts` : ''}`;
    updateFinalPassPanel();
    updateLaunchReadinessPanel();
}

function getTourSignalState() {
    try {
        const storage = getBrowserStorage();
        return storage?.getItem('holosyn_tour_completed_v1') || storage?.getItem('holosyn_tour_signal_v1') || '';
    } catch (error) {
        return '';
    }
}

function setLaunchCheckState(id, isReady) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('pass', !!isReady);
    el.classList.toggle('warn', !isReady);
}

function getLaunchReadinessSummary() {
    const guideAvailable = typeof window !== 'undefined'
        && !!window.TutorialManager
        && !!document.getElementById('btn-help-tour')
        && !!document.getElementById('tutorial-card');
    const importReady = state.importQuality.status !== 'error' && state.importQuality.reliabilityRisk !== 'HIGH';
    const performanceReady = fpsDisplay >= 30;
    const snapshotReady = !!getStoredProjectSnapshot();
    const exportReady = !!state.handoffReady.export;
    const docsReady = typeof buildClientBriefMarkdown === 'function'
        && typeof buildRehearsalRunbookMarkdown === 'function'
        && typeof buildDemoPackData === 'function'
        && typeof buildHandoffManifestData === 'function';
    const checks = {
        guide: guideAvailable,
        import: importReady,
        performance: performanceReady,
        snapshot: snapshotReady,
        export: exportReady,
        docs: docsReady
    };
    const readyCount = Object.values(checks).filter(Boolean).length;
    const total = Object.keys(checks).length;
    const score = Math.round((readyCount / total) * 100);
    const missing = Object.entries(checks)
        .filter(([, ready]) => !ready)
        .map(([key]) => key);
    let label = 'CHECK';
    if (readyCount === total) label = 'READY';
    else if (readyCount >= total - 1) label = 'NEAR READY';
    else if (readyCount >= 3) label = 'BETA CHECK';

    return {
        checks,
        readyCount,
        total,
        score,
        label,
        missing,
        tourSignal: getTourSignalState(),
        fps: fpsDisplay,
        importRisk: state.importQuality.reliabilityRisk || 'LOW',
        snapshotAt: getStoredProjectSnapshot()?.savedAt || null
    };
}

function getLaunchReadinessDetail(summary = getLaunchReadinessSummary()) {
    const ko = state.language === 'ko';
    if (summary.readyCount === summary.total) {
        return ko
            ? `공유 준비 완료 · ${summary.score}% · FPS ${summary.fps || '--'}`
            : `Ready to share · ${summary.score}% · FPS ${summary.fps || '--'}`;
    }

    const labels = {
        guide: ko ? '가이드 투어 확인' : 'guide tour',
        import: ko ? `임포트 위험도 ${summary.importRisk}` : `import risk ${summary.importRisk}`,
        performance: ko ? `성능 샘플 FPS ${summary.fps || '--'}` : `performance sample FPS ${summary.fps || '--'}`,
        snapshot: ko ? '프로젝트 스냅샷' : 'project snapshot',
        export: ko ? 'Runbook/Demo Pack/Manifest 산출물' : 'Runbook/Demo Pack/Manifest export',
        docs: ko ? '문서/팩 생성기' : 'docs/package builders'
    };
    const next = summary.missing.slice(0, 2).map(key => labels[key] || key).join(', ');
    return ko
        ? `${summary.readyCount} / ${summary.total} 준비 · 다음: ${next}`
        : `${summary.readyCount} / ${summary.total} ready · Next: ${next}`;
}

function updateLaunchReadinessPanel() {
    const panel = document.getElementById('launch-readiness-panel');
    const statusEl = document.getElementById('launch-readiness-status');
    const detailEl = document.getElementById('launch-readiness-detail');
    const fillEl = document.getElementById('launch-readiness-fill');
    if (!panel || !statusEl || !detailEl) return;

    const summary = getLaunchReadinessSummary();
    state.launchReadiness = {
        ...summary.checks,
        score: summary.score,
        label: summary.label,
        missing: summary.missing
    };

    setLaunchCheckState('launch-check-guide', summary.checks.guide);
    setLaunchCheckState('launch-check-import', summary.checks.import);
    setLaunchCheckState('launch-check-performance', summary.checks.performance);
    setLaunchCheckState('launch-check-snapshot', summary.checks.snapshot);
    setLaunchCheckState('launch-check-export', summary.checks.export);
    setLaunchCheckState('launch-check-docs', summary.checks.docs);

    panel.classList.toggle('ready', summary.readyCount === summary.total);
    panel.classList.toggle('blocked', summary.readyCount < summary.total);
    statusEl.textContent = `${summary.readyCount} / ${summary.total} ${summary.label}`;
    detailEl.textContent = getLaunchReadinessDetail(summary);
    if (fillEl) fillEl.style.width = `${summary.score}%`;
    updateBetaOpsPanel();
}

function runLaunchReadinessCheck() {
    const before = getLaunchReadinessSummary();
    if (!before.checks.snapshot && before.checks.import && state.betaReadiness.storage && activeModelGroup) {
        saveProjectSnapshot({ silent: true });
    }

    updateBetaReadinessPanel();
    const summary = getLaunchReadinessSummary();
    updateLaunchReadinessPanel();

    const firstMissing = summary.missing[0];
    const targetByMissing = {
        guide: document.getElementById('btn-help-tour'),
        import: document.getElementById('import-quality-card'),
        performance: document.getElementById('btn-quality-boost') || document.getElementById('fps-counter'),
        snapshot: document.getElementById('project-snapshot-panel'),
        export: document.getElementById('demo-pack-panel') || document.getElementById('rehearsal-pack-panel'),
        docs: document.getElementById('client-brief-panel')
    };
    const target = targetByMissing[firstMissing] || document.getElementById('launch-readiness-panel');
    pulseWorkflowTarget(target);
    if (target && typeof target.scrollIntoView === 'function') target.scrollIntoView({ block: 'center', behavior: 'smooth' });

    if (summary.readyCount === summary.total) {
        showNotification(
            state.language === 'ko' ? 'Beta Launch Pack 준비 완료' : 'Beta Launch Pack Ready',
            state.language === 'ko' ? '가이드, 임포트, 성능, 스냅샷, 산출물, 문서 흐름이 모두 준비되었습니다.' : 'Guide, import, performance, snapshot, exports, and package docs are ready.'
        );
        addConsoleLog(`[LAUNCH] Beta launch pack passed at ${summary.score}%.`, 'success');
        return;
    }

    showNotification(
        state.language === 'ko' ? 'Beta Launch Pack 점검' : 'Beta Launch Check',
        getLaunchReadinessDetail(summary)
    );
    addConsoleLog(`[LAUNCH] ${summary.readyCount}/${summary.total} ready. Missing: ${summary.missing.join(', ') || 'none'}.`, 'warning');
}

function setBetaOpsCheckState(id, isReady) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('pass', !!isReady);
    el.classList.toggle('warn', !isReady);
}

function getDiagnosticsLogSnapshot(limit = 80) {
    const fromState = Array.isArray(state.diagnosticsLog) ? state.diagnosticsLog.slice(-limit) : [];
    if (fromState.length > 0) return fromState;
    return Array.from(document.querySelectorAll('#console-logs .log-line'))
        .slice(-limit)
        .map(line => ({
            at: new Date().toISOString(),
            type: line.className.includes('text-error') ? 'error' : line.className.includes('text-warning') ? 'warning' : 'info',
            message: line.textContent || ''
        }));
}

function getRuntimeErrorSnapshot(limit = 40) {
    return Array.isArray(state.runtimeErrors) ? state.runtimeErrors.slice(-limit) : [];
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
        suggestedFirstRun: ['drone', 'stand', 'exosuit'],
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

function registerRuntimeErrorCapture() {
    if (typeof window === 'undefined' || window.__holosynErrorCaptureRegistered) return;
    window.__holosynErrorCaptureRegistered = true;
    const pushError = (entry) => {
        state.runtimeErrors.push({
            at: new Date().toISOString(),
            ...entry
        });
        while (state.runtimeErrors.length > 50) state.runtimeErrors.shift();
        updateBetaOpsPanel();
    };
    window.addEventListener('error', (event) => {
        pushError({
            type: 'error',
            message: event.message || 'Runtime error',
            source: event.filename || '',
            line: event.lineno || 0,
            column: event.colno || 0
        });
    });
    window.addEventListener('unhandledrejection', (event) => {
        pushError({
            type: 'unhandledrejection',
            message: event.reason?.message || String(event.reason || 'Unhandled promise rejection')
        });
    });
}

if (typeof window !== 'undefined') {
    window.updateLaunchReadinessPanel = updateLaunchReadinessPanel;
    window.getLaunchReadinessSummary = getLaunchReadinessSummary;
    window.getBetaOpsSummary = getBetaOpsSummary;
}

// Current product name from the spec form (fallback to a neutral default).
function getProductName() {
    return document.getElementById('spec-name')?.value || 'Holosyn Prototype';
}

// Fresh THREE.Color from the active theme (new instance each call — Colors are mutable).
function themeColorObj() {
    return new THREE.Color(state.themeColor);
}

function getProductSpecState() {
    return {
        name: getProductName(),
        category: document.getElementById('spec-category')?.value || 'PROTO',
        weight: document.getElementById('spec-param-weight')?.value || '12',
        power: document.getElementById('spec-param-power')?.value || '850',
        thermal: document.getElementById('spec-param-thermal')?.value || '78',
        telemetry: {
            unitId: document.getElementById('tbl-unit-id')?.innerText || 'N/A',
            volume: document.getElementById('tbl-volume')?.innerText || 'N/A',
            stability: document.getElementById('tbl-stability')?.innerText || 'N/A',
            discharge: document.getElementById('tbl-discharge')?.innerText || 'N/A',
            emission: document.getElementById('tbl-emission')?.innerText || 'N/A'
        }
    };
}

function applyProductSpecState(specs = {}) {
    const setValue = (id, value) => {
        const el = document.getElementById(id);
        if (el && value !== undefined && value !== null) el.value = value;
    };
    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el && value !== undefined && value !== null) el.innerText = value;
    };

    setValue('spec-name', specs.name);
    setValue('spec-category', specs.category);
    setValue('spec-param-weight', specs.weight);
    setValue('spec-param-power', specs.power);
    setValue('spec-param-thermal', specs.thermal);
    if (specs.weight !== undefined) setText('readout-weight', `${specs.weight} kg`);
    if (specs.power !== undefined) setText('readout-power', `${specs.power} W`);
    if (specs.thermal !== undefined) setText('readout-thermal', `${specs.thermal}%`);

    if (specs.telemetry) {
        setText('tbl-unit-id', specs.telemetry.unitId);
        setText('tbl-volume', specs.telemetry.volume);
        setText('tbl-stability', specs.telemetry.stability);
        setText('tbl-discharge', specs.telemetry.discharge);
        setText('tbl-emission', specs.telemetry.emission);
    }
    refreshPrototypeInsight();
}

function buildProjectSnapshot() {
    const productName = getProductName();
    return {
        holosynSnapshot: 'project-snapshot-v1',
        savedAt: new Date().toISOString(),
        product: {
            name: productName,
            category: document.getElementById('spec-category')?.value || 'PROTO'
        },
        specs: getProductSpecState(),
        model: {
            activePreset: state.activePreset,
            isCustom: state.activePreset === 'custom',
            imageProjection: !!state.imageUploaded,
            customFileIncluded: false
        },
        presentation: {
            activeDemoPreset: state.activeDemoPreset || 'manual',
            renderMode: state.renderMode,
            materialView: state.materialView,
            partScanActive: !!state.partScanActive,
            partScanIndex: state.partScanIndex,
            cameraMode: state.cameraMode,
            environment: state.studioEnvironment,
            lighting: state.lighting,
            explodedLevel: state.explodedLevel,
            rotationSpeed: state.rotationSpeed,
            themeColor: state.themeColor,
            themeColorGlow: state.themeColorGlow,
            visualQualityBoost: state.visualQualityBoost,
            renderPixelRatioCap: getRenderPixelRatioCap(),
            specCardExportScale: getSpecCardExportScale()
        },
        camera: getCameraShareState(),
        timeline: {
            duration: state.timelineDuration,
            currentTime: state.timelineCurrentTime,
            keyframes: state.timelineKeyframes
        },
        importQuality: state.importQuality,
        partMap: buildPartMapSummary(),
        handoffReady: state.handoffReady,
        finalPass: {
            status: state.finalPass.status,
            lockedAt: state.finalPass.lockedAt,
            summary: getFinalPassSummary()
        },
        launchReadiness: getLaunchReadinessSummary(),
        betaOps: getBetaOpsSummary(),
        presenterNotes: state.presenterNotes,
        savedMeasurements: state.savedMeasurements,
        annotations: partAnnotations[state.activePreset] || []
    };
}

function buildCompactShareSnapshot(snapshot = buildProjectSnapshot()) {
    return {
        holosynSnapshot: snapshot.holosynSnapshot,
        savedAt: snapshot.savedAt,
        product: snapshot.product,
        specs: snapshot.specs,
        model: snapshot.model,
        presentation: snapshot.presentation,
        camera: snapshot.camera,
        timeline: snapshot.timeline,
        presenterNotes: normalizePresenterNotes(snapshot.presenterNotes),
        savedMeasurements: normalizeSavedMeasurements(snapshot.savedMeasurements),
        annotations: Array.isArray(snapshot.annotations)
            ? snapshot.annotations.slice(0, 100).map(annotation => ({
                name: limitSnapshotText(annotation?.name, '', 120),
                label: limitSnapshotText(annotation?.label, '', 240)
            })).filter(annotation => annotation.name)
            : []
    };
}

function restoreProjectSnapshotAnnotations(snapshot) {
    const preset = snapshot?.model?.activePreset || state.activePreset;
    const current = partAnnotations[preset];
    if (!Array.isArray(current) || !Array.isArray(snapshot?.annotations)) return;

    const savedLabels = new Map(
        snapshot.annotations.slice(0, 100)
            .map(annotation => [
                limitSnapshotText(annotation?.name, '', 120),
                limitSnapshotText(annotation?.label, '', 240)
            ])
            .filter(([name, label]) => name && label)
    );
    current.forEach(annotation => {
        const label = savedLabels.get(annotation.name);
        if (label) annotation.label = label;
    });

    const container = document.getElementById('annotations-container');
    if (container) container.replaceChildren();
}

function updateProjectSnapshotStatus(snapshot = getStoredProjectSnapshot()) {
    const statusEl = document.getElementById('project-snapshot-status');
    if (!statusEl) return;
    if (!snapshot?.savedAt) {
        statusEl.textContent = 'NO SNAPSHOT';
        updateFinalPassPanel();
        return;
    }
    state.projectSnapshotLastSaved = snapshot.savedAt;
    const saved = new Date(snapshot.savedAt);
    statusEl.textContent = Number.isNaN(saved.getTime())
        ? 'SAVED'
        : saved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    updateFinalPassPanel();
}

function saveProjectSnapshot(options = {}) {
    const { silent = false } = options;
    const storage = getBrowserStorage();
    if (!storage) {
        if (!silent) {
            showNotification(
                state.language === 'ko' ? '저장 불가' : 'Storage Unavailable',
                state.language === 'ko' ? '이 브라우저에서는 로컬 스냅샷 저장소를 사용할 수 없습니다.' : 'Local snapshot storage is not available in this browser.'
            );
        }
        return null;
    }

    const snapshot = buildProjectSnapshot();
    storage.setItem(getProjectSnapshotStorageKey(), JSON.stringify(snapshot));
    updateProjectSnapshotStatus(snapshot);
    updateBetaReadinessPanel();
    if (!silent) {
        showNotification(
            state.language === 'ko' ? '프로젝트 스냅샷 저장' : 'Project Snapshot Saved',
            state.language === 'ko' ? '현재 발표 세팅과 타임라인을 이 브라우저에 저장했습니다.' : 'Saved the current presentation setup and timeline in this browser.'
        );
        addConsoleLog(`[SNAPSHOT] Project setup saved for ${snapshot.product.name}.`, 'success');
    }
    return snapshot;
}

function applyProjectSnapshot(snapshot, options = {}) {
    if (!snapshot || snapshot.holosynSnapshot !== 'project-snapshot-v1') {
        showNotification(
            state.language === 'ko' ? '스냅샷 오류' : 'Snapshot Error',
            state.language === 'ko' ? 'HOLOSYN 프로젝트 스냅샷 형식이 아닙니다.' : 'This is not a HOLOSYN project snapshot.'
        );
        return false;
    }
    if (!state.engineBooted) {
        showNotification(
            state.language === 'ko' ? '엔진 기동 필요' : 'Boot Required',
            state.language === 'ko' ? '먼저 HOLOSYN 엔진을 기동한 뒤 스냅샷을 복원하세요.' : 'Boot HOLOSYN before restoring a project snapshot.'
        );
        return false;
    }

    const preset = snapshot.model?.activePreset || 'drone';
    if (samplePrototypeCatalog[preset]) {
        state.imageUploaded = false;
        uploadedMeshGroup = null;
        state.customImageParticles = null;
        updatePresetButtonSelection(preset);
        loadPresetModel(preset);
    } else if (preset === 'custom' && !options.customAssetLoaded) {
        addConsoleLog(
            state.language === 'ko'
                ? '[SNAPSHOT] 커스텀 파일은 보안상 스냅샷에 포함되지 않습니다. 모델 파일을 다시 드롭하면 세팅을 이어서 사용할 수 있습니다.'
                : '[SNAPSHOT] Custom files are not embedded in snapshots. Drop the model file again to continue with the saved setup.',
            'warning'
        );
    }

    applyProductSpecState(snapshot.specs);
    restoreProjectSnapshotAnnotations(snapshot);

    const presentation = snapshot.presentation || {};
    state.activeDemoPreset = presentation.activeDemoPreset
        && presentation.activeDemoPreset !== 'manual'
        && demoPresetScenarios[presentation.activeDemoPreset]
        ? presentation.activeDemoPreset
        : null;
    document.querySelectorAll('.demo-preset-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-demo-preset') === state.activeDemoPreset);
    });
    const demoStatusEl = document.getElementById('demo-preset-status');
    if (demoStatusEl) {
        const scenario = state.activeDemoPreset ? demoPresetScenarios[state.activeDemoPreset] : null;
        demoStatusEl.textContent = scenario?.label || 'Manual';
    }
    if (presentation.renderMode) setRenderModeByKey(presentation.renderMode);
    if (typeof presentation.partScanActive === 'boolean') {
        state.partScanActive = presentation.partScanActive && getPartScanList().length > 0;
        state.partScanIndex = Number.isFinite(presentation.partScanIndex) ? presentation.partScanIndex : 0;
    }
    if (presentation.materialView) {
        setMaterialView(presentation.materialView, { notify: false, broadcast: false, autoFocus: false });
    }
    if (presentation.themeColor) {
        applyThemeColorFromHex(presentation.themeColor, presentation.themeColorGlow);
    }
    if (typeof presentation.visualQualityBoost === 'boolean') {
        state.visualQualityBoost = presentation.visualQualityBoost;
        applyRenderQualitySettings();
    }
    if (presentation.environment) applyStudioEnvironmentPreset(presentation.environment);
    if (presentation.lighting) {
        state.lighting = {
            mood: presentation.lighting.mood || state.lighting.mood,
            brightness: Number.isFinite(presentation.lighting.brightness) ? presentation.lighting.brightness : state.lighting.brightness
        };
        applyLighting(state.lighting.mood, state.lighting.brightness);
        updateLightingUi();
    }
    if (Number.isFinite(presentation.rotationSpeed)) state.rotationSpeed = presentation.rotationSpeed;
    if (Number.isFinite(presentation.explodedLevel)) animateExplodedLevel(presentation.explodedLevel, 700);
    if (presentation.cameraMode) applyCameraView(presentation.cameraMode, false);
    if (snapshot.camera) restoreCameraShareState(snapshot.camera);

    if (snapshot.timeline) {
        state.timelineDuration = snapshot.timeline.duration || state.timelineDuration;
        state.timelineCurrentTime = snapshot.timeline.currentTime || 0;
        state.timelineKeyframes = Array.isArray(snapshot.timeline.keyframes) ? snapshot.timeline.keyframes : [];
        state.timelinePlaying = false;
        if (typeof renderTimelineRuler === 'function') renderTimelineRuler();
        if (typeof renderTimelineKeyframes === 'function') renderTimelineKeyframes();
        if (typeof updateTimelineFooter === 'function') updateTimelineFooter();
        if (typeof updateTimelinePlayhead === 'function') updateTimelinePlayhead();
    }

    state.handoffReady = {
        model: !!(activeModelGroup && activeModelGroup.children.length > 0),
        demo: !!state.activeDemoPreset || !!snapshot.handoffReady?.demo,
        timeline: state.timelineKeyframes.length >= 2,
        export: false
    };
    state.finalPass = {
        status: 'standby',
        lockedAt: null
    };
    state.presenterNotes = normalizePresenterNotes(snapshot.presenterNotes);
    state.savedMeasurements = normalizeSavedMeasurements(snapshot.savedMeasurements);
    rebuildSavedMeasurementVisuals();
    updatePresenterNotesPanel();
    updatePartScanPanel();
    updateHandoffPackStatus();
    updateProjectSnapshotStatus(snapshot);
    updateBetaReadinessPanel();
    showNotification(
        state.language === 'ko' ? '프로젝트 스냅샷 복원' : 'Project Snapshot Restored',
        state.language === 'ko' ? '발표 세팅, 렌더 모드, 타임라인을 복원했습니다.' : 'Restored presentation setup, render mode, and timeline.'
    );
    addConsoleLog(`[SNAPSHOT] Project setup restored for ${snapshot.product?.name || 'HOLOSYN project'}.`, 'success');
    return true;
}

function restoreProjectSnapshot() {
    const snapshot = getStoredProjectSnapshot();
    if (!snapshot) {
        showNotification(
            state.language === 'ko' ? '복원할 스냅샷 없음' : 'No Snapshot',
            state.language === 'ko' ? '먼저 현재 발표 세팅을 저장하세요.' : 'Save the current presentation setup first.'
        );
        return false;
    }
    return applyProjectSnapshot(snapshot);
}

function exportProjectSnapshot() {
    const snapshot = saveProjectSnapshot();
    if (!snapshot) return;
    const productName = snapshot.product.name || 'Holosyn Prototype';
    triggerDownload(
        JSON.stringify(snapshot, null, 2),
        'application/json',
        `${productName.replace(/\s+/g, '_')}_holosyn_project_snapshot.json`
    );
    markHandoffExportReady();
    addConsoleLog(`[SNAPSHOT] Project snapshot JSON exported for ${productName}.`, 'success');
}

const PORTABLE_PROJECT_MAX_BYTES = 80 * 1024 * 1024;

function updatePortableProjectPanel() {
    const row = document.getElementById('portable-project-row');
    const status = document.getElementById('portable-project-status');
    const detail = document.getElementById('portable-project-detail');
    if (row) {
        row.classList.toggle('is-busy', !!state.portableProject.busy);
        row.classList.toggle('is-ready', state.portableProject.status === 'SAVED' || state.portableProject.status === 'RESTORED');
    }
    if (status) status.textContent = state.portableProject.status || 'READY';
    if (detail) detail.textContent = state.portableProject.detail || '모델과 발표 상태를 한 파일로 전달합니다.';
}

function setPortableProjectState(status, detail, busy = false) {
    state.portableProject.status = status;
    state.portableProject.detail = detail;
    state.portableProject.busy = busy;
    updatePortableProjectPanel();
}

function exportActiveModelGlb() {
    return new Promise((resolve, reject) => {
        if (!window.THREE || !THREE.GLTFExporter || !activeModelGroup) {
            reject(new Error('GLB exporter or active model is unavailable.'));
            return;
        }

        const restoredNodes = [];
        const restoredMaterials = [];
        const restoredVisibility = [];
        activeModelGroup.traverse(node => {
            if (node.userData?.originalPosition && node.position) {
                restoredNodes.push({ node, position: node.position.clone() });
                node.position.copy(node.userData.originalPosition);
            }
            const data = node.userData || {};
            if (data.solidMesh && data.productMaterial) {
                restoredMaterials.push({ mesh: data.solidMesh, material: data.solidMesh.material });
                data.solidMesh.material = data.productMaterial;
                [data.solidMesh, data.wireMesh, data.pointsMesh].forEach(mesh => {
                    if (!mesh) return;
                    restoredVisibility.push({ mesh, visible: mesh.visible });
                });
                data.solidMesh.visible = true;
                if (data.wireMesh) data.wireMesh.visible = false;
                if (data.pointsMesh) data.pointsMesh.visible = false;
            } else if (node.isMesh && data.productMaterial) {
                restoredMaterials.push({ mesh: node, material: node.material });
                node.material = data.productMaterial;
            }
        });
        const previousGroupY = activeModelGroup.position.y;
        activeModelGroup.position.y = 0.15;
        activeModelGroup.updateMatrixWorld(true);

        const restoreScene = () => {
            restoredNodes.forEach(({ node, position }) => node.position.copy(position));
            restoredMaterials.forEach(({ mesh, material }) => { mesh.material = material; });
            restoredVisibility.forEach(({ mesh, visible }) => { mesh.visible = visible; });
            activeModelGroup.position.y = previousGroupY;
            activeModelGroup.updateMatrixWorld(true);
        };

        const exporter = new THREE.GLTFExporter();
        exporter.parse(activeModelGroup, result => {
            restoreScene();
            if (!(result instanceof ArrayBuffer)) {
                reject(new Error('Portable project export did not produce a binary GLB.'));
                return;
            }
            resolve(result);
        }, error => {
            restoreScene();
            reject(error instanceof Error ? error : new Error(String(error)));
        }, { binary: true });
    });
}

function arrayBufferToDataUrl(buffer, mimeType = 'model/gltf-binary') {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error || new Error('Could not encode the portable model.'));
        reader.readAsDataURL(new Blob([buffer], { type: mimeType }));
    });
}

function dataUrlToArrayBuffer(dataUrl) {
    const match = /^data:([^;,]+)?;base64,(.+)$/s.exec(String(dataUrl || ''));
    if (!match) throw new Error('Portable project model payload is invalid.');
    const binary = atob(match[2]);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index);
    return bytes.buffer;
}

async function sha256ArrayBuffer(buffer) {
    if (!window.crypto?.subtle) throw new Error('SHA-256 verification is unavailable in this browser.');
    const digest = await window.crypto.subtle.digest('SHA-256', buffer);
    return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
}

function parsePortableGlb(buffer) {
    return new Promise((resolve, reject) => {
        const loader = new THREE.GLTFLoader();
        loader.parse(buffer, '', gltf => resolve(gltf.scene), error => {
            reject(error instanceof Error ? error : new Error(String(error)));
        });
    });
}

async function exportPortableProjectBundle() {
    if (!state.engineBooted || !activeModelGroup || activeModelGroup.children.length === 0) {
        showNotification(
            state.language === 'ko' ? '번들 대기' : 'Bundle Waiting',
            state.language === 'ko' ? '엔진을 기동하고 모델을 먼저 불러오세요.' : 'Boot the engine and load a model first.'
        );
        return;
    }

    setPortableProjectState('PACKING', '현재 모델을 휴대용 GLB로 패킹하고 있습니다.', true);
    try {
        const snapshot = buildProjectSnapshot();
        const originalPreset = snapshot.model.activePreset;
        snapshot.model = {
            ...snapshot.model,
            activePreset: 'custom',
            originalPreset,
            isCustom: true,
            customFileIncluded: true
        };
        const glb = await exportActiveModelGlb();
        if (glb.byteLength > PORTABLE_PROJECT_MAX_BYTES) {
            throw new Error(`Portable GLB exceeds ${Math.round(PORTABLE_PROJECT_MAX_BYTES / 1024 / 1024)}MB.`);
        }
        const sha256 = await sha256ArrayBuffer(glb);
        const modelDataUrl = await arrayBufferToDataUrl(glb);
        const bundle = {
            holosynBundle: 'portable-project-v1',
            exportedAt: new Date().toISOString(),
            app: 'HOLOSYN',
            model: {
                name: `${getExportBaseName(getProductName())}.glb`,
                mimeType: 'model/gltf-binary',
                byteLength: glb.byteLength,
                sha256,
                dataUrl: modelDataUrl
            },
            projectSnapshot: snapshot
        };
        triggerDownload(
            JSON.stringify(bundle),
            'application/vnd.holosyn.project+json',
            `${getExportBaseName(getProductName())}.holosyn`
        );
        state.portableProject.lastExportedAt = bundle.exportedAt;
        setPortableProjectState('SAVED', `${formatFileSize(glb.byteLength)} 모델과 발표 상태를 한 파일로 저장했습니다.`);
        markHandoffExportReady();
        showNotification(
            state.language === 'ko' ? '휴대용 프로젝트 저장' : 'Portable Project Saved',
            state.language === 'ko' ? '모델·카메라·타임라인·노트·치수를 .holosyn 파일 하나에 담았습니다.' : 'Packed the model, camera, timeline, notes, and dimensions into one .holosyn file.'
        );
        addConsoleLog(`[BUNDLE] Portable project saved (${formatFileSize(glb.byteLength)} GLB).`, 'success');
    } catch (error) {
        setPortableProjectState('ERROR', error.message || '휴대용 프로젝트를 만들지 못했습니다.');
        showNotification(
            state.language === 'ko' ? '프로젝트 번들 실패' : 'Project Bundle Failed',
            state.language === 'ko' ? '모델 내보내기 호환성 또는 80MB 제한을 확인하세요.' : 'Check model export compatibility or the 80MB limit.'
        );
        addConsoleLog(`[BUNDLE] Export failed: ${error.message}`, 'error');
    }
}

async function importPortableProjectBundle(file) {
    if (!file) return;
    if (!state.engineBooted) {
        showNotification(
            state.language === 'ko' ? '엔진 기동 필요' : 'Boot Required',
            state.language === 'ko' ? '먼저 HOLOSYN 엔진을 기동한 뒤 번들을 여세요.' : 'Boot HOLOSYN before opening a portable project.'
        );
        return;
    }
    if (file.size > PORTABLE_PROJECT_MAX_BYTES * 1.5) {
        showNotification(
            state.language === 'ko' ? '번들 용량 초과' : 'Bundle Too Large',
            state.language === 'ko' ? '휴대용 프로젝트는 최대 약 120MB까지 열 수 있습니다.' : 'Portable project files are limited to about 120MB.'
        );
        return;
    }

    setPortableProjectState('OPENING', `${file.name} 무결성을 확인하고 있습니다.`, true);
    try {
        const bundle = JSON.parse(await file.text());
        if (bundle.holosynBundle !== 'portable-project-v1') {
            throw new Error('This is not a HOLOSYN portable project.');
        }
        if (!bundle.projectSnapshot || bundle.projectSnapshot.holosynSnapshot !== 'project-snapshot-v1') {
            throw new Error('Portable project snapshot is missing.');
        }
        if (!bundle.model?.dataUrl || !Number.isFinite(bundle.model.byteLength) || !/^[a-f0-9]{64}$/i.test(bundle.model.sha256 || '')) {
            throw new Error('Portable project model is missing.');
        }
        if (bundle.model.byteLength > PORTABLE_PROJECT_MAX_BYTES) {
            throw new Error('Portable project model exceeds the 80MB safety limit.');
        }

        const modelBuffer = dataUrlToArrayBuffer(bundle.model.dataUrl);
        if (modelBuffer.byteLength !== bundle.model.byteLength) {
            throw new Error('Portable project model size check failed.');
        }
        const sha256 = await sha256ArrayBuffer(modelBuffer);
        if (sha256 !== bundle.model.sha256.toLowerCase()) {
            throw new Error('Portable project model integrity check failed.');
        }
        uploadedMeshGroup = await parsePortableGlb(modelBuffer);
        applyWorkspaceMaterialsToLoadedMesh(uploadedMeshGroup);
        state.imageUploaded = false;
        state.customImageParticles = null;
        state.customImageBase64 = null;
        state.activePreset = 'custom';
        updatePresetButtonSelection('custom');
        loadPresetModel('custom');
        updateImportQualityFromModel(uploadedMeshGroup, {
            source: `${bundle.model.name || file.name} · portable bundle`,
            type: '3d',
            extension: 'glb',
            fileSize: bundle.model.byteLength
        });
        applyProjectSnapshot(bundle.projectSnapshot, { customAssetLoaded: true });
        state.portableProject.lastImportedAt = new Date().toISOString();
        setPortableProjectState('RESTORED', `${file.name} 모델과 발표 상태를 복원했습니다.`);
        showNotification(
            state.language === 'ko' ? '휴대용 프로젝트 복원' : 'Portable Project Restored',
            state.language === 'ko' ? '모델·카메라·타임라인·노트·치수를 모두 복원했습니다.' : 'Restored the model, camera, timeline, notes, and dimensions.'
        );
        addConsoleLog(`[BUNDLE] Portable project restored: ${file.name}.`, 'success');
    } catch (error) {
        setPortableProjectState('ERROR', error.message || '휴대용 프로젝트를 열지 못했습니다.');
        showNotification(
            state.language === 'ko' ? '프로젝트 번들 오류' : 'Project Bundle Error',
            state.language === 'ko' ? '파일 형식, 모델 데이터, 용량 제한을 확인하세요.' : 'Check the file format, model payload, and size limit.'
        );
        addConsoleLog(`[BUNDLE] Import failed: ${error.message}`, 'error');
    }
}

function getExportBaseName(name) {
    return (name || 'Holosyn Prototype')
        .trim()
        .replace(/[\\/:*?"<>|]+/g, '')
        .replace(/\s+/g, '_')
        .slice(0, 80) || 'Holosyn_Prototype';
}

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

function buildPartMapSummary(limit = 12) {
    const fullList = getPartScanList();
    const scanList = fullList.slice(0, limit);
    const currentPart = state.partScanActive ? getCurrentPartScanAnnotation() : null;
    return {
        preset: state.activePreset,
        total: fullList.length,
        exported: scanList.length,
        currentFocus: currentPart ? {
            index: state.partScanIndex + 1,
            id: currentPart.name,
            title: getPartScanTitle(currentPart)
        } : null,
        parts: scanList.map((ann, index) => ({
            index: index + 1,
            id: ann.name,
            title: getPartScanTitle(ann),
            description: getPartScanDescription(ann)
        }))
    };
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

function getRehearsalRiskList() {
    const finalReadiness = getFinalReadinessSummary();
    const finalPass = getFinalPassSummary();
    const quality = state.importQuality || {};
    const risks = [];

    if (finalReadiness.score < 75) {
        risks.push(state.language === 'ko'
            ? `Final Readiness ${finalReadiness.score}% - 데모 프리셋, 타임라인, 산출물 준비를 먼저 맞추세요.`
            : `Final Readiness ${finalReadiness.score}% - prepare the demo preset, timeline, and exports first.`);
    }
    if (quality.reliabilityRisk === 'HIGH') {
        risks.push(state.language === 'ko'
            ? 'Import Risk HIGH - 모델 파일을 다시 확인하거나 가벼운 샘플로 리허설하세요.'
            : 'Import Risk HIGH - verify the model file or rehearse with a lighter sample.');
    } else if (quality.reliabilityRisk === 'MED') {
        risks.push(state.language === 'ko'
            ? 'Import Risk MED - 파트 분해가 제한될 수 있으니 Showcase 흐름을 백업으로 준비하세요.'
            : 'Import Risk MED - part separation may be limited, so keep Showcase as a backup flow.');
    }
    if (!finalPass.checks.snapshot) {
        risks.push(state.language === 'ko'
            ? 'Project Snapshot 없음 - 같은 세팅을 복원할 수 있게 스냅샷을 저장하세요.'
            : 'No Project Snapshot - save one so the setup can be restored.');
    }
    if (!finalPass.checks.export) {
        risks.push(state.language === 'ko'
            ? 'Export 미완료 - Runbook, Demo Pack, Manifest, PNG 중 하나 이상을 저장하세요.'
            : 'Export not complete - save at least one Runbook, Demo Pack, Manifest, or PNG.');
    }
    if (state.timelineKeyframes.length < 2) {
        risks.push(state.language === 'ko'
            ? '타임라인 키프레임 부족 - 3분 발표에는 최소 2개 장면을 준비하세요.'
            : 'Timeline needs keyframes - prepare at least two scenes for the 3-minute version.');
    }

    return risks.length > 0
        ? risks
        : [state.language === 'ko'
            ? '핵심 리스크 없음 - 30초 버전으로 한 번만 더 리허설하면 됩니다.'
            : 'No core risks - one more 30-second rehearsal is enough.'];
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

if (typeof window !== 'undefined') {
    window.HolosynClientBrief = {
        build: buildClientBriefMarkdown,
        exportMarkdown: exportClientBriefMarkdown,
        buildRehearsalRunbook: buildRehearsalRunbookMarkdown,
        exportRehearsalRunbook: exportRehearsalPack
    };
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

function focusModelImportArea() {
    setWorkflowProgress('model');
    openWorkflowDrawer('left');
    const target = document.getElementById('drop-zone') || document.getElementById('import-quality-card');
    pulseWorkflowTarget(target);
    if (target) target.scrollIntoView({ block: 'center', behavior: 'smooth' });
    showNotification(
        state.language === 'ko' ? '모델 선택' : 'Choose Model',
        state.language === 'ko' ? '샘플을 고르거나 3D 파일을 드롭해 품질을 다시 확인하세요.' : 'Choose a sample or drop a 3D file to refresh the quality check.'
    );
}

function runImportQualityAction() {
    const actionBtn = document.getElementById('btn-import-quality-action');
    const actionKey = actionBtn?.dataset.importAction || state.importQuality.actionKey;
    if (!actionKey || state.importQuality.actionDisabled) return;

    playSynthClick(720, 0.06);

    if (actionKey === 'model') {
        focusModelImportArea();
        return;
    }

    if (!state.engineBooted) {
        showNotification(
            state.language === 'ko' ? '엔진 기동 필요' : 'Boot Required',
            state.language === 'ko' ? '먼저 HOLOSYN 엔진을 기동한 뒤 추천 행동을 실행하세요.' : 'Boot HOLOSYN before running the recommended action.'
        );
        return;
    }

    if (actionKey === 'part-scan') {
        if (getPartScanList().length > 0) {
            closeMobileDrawers();
            applyCameraView('macro', false);
            setPartScanActive(true, 0);
            pulseWorkflowTarget(document.getElementById('part-scan-panel') || document.getElementById('btn-part-scan'));
            return;
        }
        handleWorkflowStep('structure');
        showNotification(
            state.language === 'ko' ? '구조 보기로 전환' : 'Structure Fallback',
            state.language === 'ko' ? '이 모델은 라벨 스캔 정보가 부족해 분해 구조 보기로 먼저 열었습니다.' : 'This model needs labels before Part Scan, so Structure view was opened first.'
        );
        return;
    }

    if (actionKey === 'structure') {
        handleWorkflowStep('structure');
        return;
    }

    if (actionKey === 'showcase') {
        closeMobileDrawers();
        if (!state.isShowcaseMode) {
            startCinematicPresentation();
        } else {
            showNotification(
                state.language === 'ko' ? 'Showcase 실행 중' : 'Showcase Active',
                state.language === 'ko' ? '이미 발표용 쇼케이스 모드입니다.' : 'The presentation showcase is already active.'
            );
        }
        return;
    }

    if (actionKey === 'demo-preset') {
        openWorkflowDrawer('left');
        const panel = document.getElementById('demo-presets-panel');
        pulseWorkflowTarget(panel);
        if (panel) panel.scrollIntoView({ block: 'center', behavior: 'smooth' });
        showNotification(
            state.language === 'ko' ? '데모 프리셋 선택' : 'Choose Demo Preset',
            state.language === 'ko' ? '목적에 맞는 프리셋을 눌러 카메라와 타임라인을 준비하세요.' : 'Pick a preset to prepare the camera and timeline.'
        );
        return;
    }

    if (actionKey === 'demo-pack') {
        handleWorkflowStep('export');
        pulseWorkflowTarget(document.getElementById('demo-pack-panel'));
    }
}

function initProductizationControls() {
    document.querySelectorAll('.demo-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => applyDemoPreset(btn.getAttribute('data-demo-preset')));
    });
    const handoffBtn = document.getElementById('btn-export-handoff-pack');
    if (handoffBtn) {
        handoffBtn.addEventListener('click', exportHandoffManifest);
    }
    const clientBriefBtn = document.getElementById('btn-export-client-brief');
    if (clientBriefBtn) {
        clientBriefBtn.addEventListener('click', exportClientBriefMarkdown);
    }
    const demoPackBtn = document.getElementById('btn-export-demo-pack');
    if (demoPackBtn) {
        demoPackBtn.addEventListener('click', exportDemoPack);
    }
    const rehearsalPackBtn = document.getElementById('btn-export-rehearsal-pack');
    if (rehearsalPackBtn) {
        rehearsalPackBtn.addEventListener('click', exportRehearsalPack);
    }
    const launchCheckBtn = document.getElementById('btn-run-launch-check');
    if (launchCheckBtn) {
        launchCheckBtn.addEventListener('click', runLaunchReadinessCheck);
    }
    const betaTestPlanBtn = document.getElementById('btn-export-beta-test-plan');
    if (betaTestPlanBtn) {
        betaTestPlanBtn.addEventListener('click', exportBetaTestPlan);
    }
    const performanceBenchmarkBtn = document.getElementById('btn-run-performance-benchmark');
    if (performanceBenchmarkBtn) {
        performanceBenchmarkBtn.addEventListener('click', runPerformanceBenchmark);
    }
    const errorReportBtn = document.getElementById('btn-export-error-report');
    if (errorReportBtn) {
        errorReportBtn.addEventListener('click', exportErrorReport);
    }
    const examplePackBtn = document.getElementById('btn-export-example-pack');
    if (examplePackBtn) {
        examplePackBtn.addEventListener('click', exportExamplePack);
    }
    const deployChecklistBtn = document.getElementById('btn-export-deploy-checklist');
    if (deployChecklistBtn) {
        deployChecklistBtn.addEventListener('click', exportDeploymentChecklist);
    }
    const releasePackageBtn = document.getElementById('btn-export-release-package');
    if (releasePackageBtn) {
        releasePackageBtn.addEventListener('click', exportBetaReleasePackage);
    }
    const finalPassPanelBtn = document.getElementById('btn-run-final-pass');
    if (finalPassPanelBtn) {
        finalPassPanelBtn.addEventListener('click', runFinalPass);
    }
    const importActionBtn = document.getElementById('btn-import-quality-action');
    if (importActionBtn) {
        importActionBtn.addEventListener('click', runImportQualityAction);
    }
    document.querySelectorAll('[data-handoff-action]').forEach(btn => {
        btn.addEventListener('click', () => runHandoffChecklistAction(btn.getAttribute('data-handoff-action')));
    });
    const saveSnapshotBtn = document.getElementById('btn-save-project-snapshot');
    if (saveSnapshotBtn) saveSnapshotBtn.addEventListener('click', saveProjectSnapshot);
    const restoreSnapshotBtn = document.getElementById('btn-restore-project-snapshot');
    if (restoreSnapshotBtn) restoreSnapshotBtn.addEventListener('click', restoreProjectSnapshot);
    const exportSnapshotBtn = document.getElementById('btn-export-project-snapshot');
    if (exportSnapshotBtn) exportSnapshotBtn.addEventListener('click', exportProjectSnapshot);
    const exportPortableProjectBtn = document.getElementById('btn-export-portable-project');
    if (exportPortableProjectBtn) exportPortableProjectBtn.addEventListener('click', exportPortableProjectBundle);
    const importPortableProjectBtn = document.getElementById('btn-import-portable-project');
    const portableProjectInput = document.getElementById('portable-project-input');
    if (importPortableProjectBtn && portableProjectInput) {
        importPortableProjectBtn.addEventListener('click', () => portableProjectInput.click());
        portableProjectInput.addEventListener('change', event => {
            importPortableProjectBundle(event.target.files?.[0]);
            event.target.value = '';
        });
    }
    const copyShareLinkBtn = document.getElementById('btn-copy-share-link');
    if (copyShareLinkBtn) copyShareLinkBtn.addEventListener('click', copyShareLink);
    const headerShareLinkBtn = document.getElementById('btn-header-share-link');
    if (headerShareLinkBtn) headerShareLinkBtn.addEventListener('click', copyShareLink);
    const exportShareStateBtn = document.getElementById('btn-export-share-state');
    if (exportShareStateBtn) exportShareStateBtn.addEventListener('click', exportShareState);
    const recordClip3sBtn = document.getElementById('btn-record-clip-3s');
    if (recordClip3sBtn) recordClip3sBtn.addEventListener('click', () => recordViewportClip(3000));
    const recordClip5sBtn = document.getElementById('btn-record-clip-5s');
    if (recordClip5sBtn) recordClip5sBtn.addEventListener('click', () => recordViewportClip(5000));
    const savePresenterNoteBtn = document.getElementById('btn-save-presenter-note');
    if (savePresenterNoteBtn) savePresenterNoteBtn.addEventListener('click', savePresenterNote);
    const exportPresenterNotesBtn = document.getElementById('btn-export-presenter-notes');
    if (exportPresenterNotesBtn) exportPresenterNotesBtn.addEventListener('click', exportPresenterNotesMarkdown);
    const exportMeasurementsBtn = document.getElementById('btn-export-measurements');
    if (exportMeasurementsBtn) exportMeasurementsBtn.addEventListener('click', exportMeasurements);
    const clearMeasurementsBtn = document.getElementById('btn-clear-measurements');
    if (clearMeasurementsBtn) clearMeasurementsBtn.addEventListener('click', clearAllSavedMeasurements);
    initStageTools();
    updateImportQualityForSample(state.activePreset);
    updateProjectSnapshotStatus();
    updatePortableProjectPanel();
    updateShareLinkPanel();
    updatePresenterNotesPanel();
    updateMeasurementsPanel();
    updateHandoffPackStatus();
    updateBetaReadinessPanel();
    updateFinalPassPanel();
    updateLaunchReadinessPanel();
    updateBetaOpsPanel();
}

let demoFlowTimers = [];

function setWorkflowProgress(activeStep = state.workflowStep, completedSteps = []) {
    state.workflowStep = activeStep;
    completedSteps.forEach(step => {
        if (step in state.workflowCompleted) state.workflowCompleted[step] = true;
    });
    updateWorkflowCoach();
}

function updateWorkflowCoach() {
    const coach = document.getElementById('flow-coach');
    if (coach) {
        document.querySelectorAll('.flow-step').forEach(btn => {
            const step = btn.getAttribute('data-flow-step');
            btn.classList.toggle('active', step === state.workflowStep);
            btn.classList.toggle('done', !!state.workflowCompleted[step]);
        });
    }

    const demoBtn = document.getElementById('btn-demo-run');
    if (demoBtn) demoBtn.classList.toggle('is-running', !!state.demoFlowRunning);
    const pitchBtn = document.getElementById('btn-pitch-run');
    if (pitchBtn) pitchBtn.classList.toggle('is-running', !!state.pitchRunRunning);
    const finalPassBtn = document.getElementById('btn-final-pass');
    if (finalPassBtn) finalPassBtn.classList.toggle('locked', state.finalPass.status === 'locked');
    updateBeginnerFlowUi();
}

function updateBeginnerFlowUi() {
    const importBtn = document.getElementById('btn-beginner-import');
    const revealControl = document.querySelector('.beginner-reveal-control');
    const pitchBtn = document.getElementById('btn-beginner-pitch');
    const modeStatus = document.getElementById('beginner-reveal-status');
    const isImportStep = state.workflowStep === 'model';
    const isPitchStep = state.pitchRunRunning || state.workflowStep === 'export';

    if (importBtn) {
        importBtn.classList.toggle('current', isImportStep);
        importBtn.classList.toggle('done', !!state.workflowCompleted.model);
        if (isImportStep) importBtn.setAttribute('aria-current', 'step');
        else importBtn.removeAttribute('aria-current');
    }
    if (revealControl) {
        revealControl.classList.toggle('current', !isImportStep && !isPitchStep);
        revealControl.classList.toggle('done', !!state.workflowCompleted.structure);
    }
    if (pitchBtn) {
        pitchBtn.classList.toggle('current', isPitchStep);
        pitchBtn.classList.toggle('done', !!state.workflowCompleted.export);
        pitchBtn.classList.toggle('is-running', !!state.pitchRunRunning);
        if (isPitchStep) pitchBtn.setAttribute('aria-current', 'step');
        else pitchBtn.removeAttribute('aria-current');
    }

    document.querySelectorAll('.beginner-material-btn').forEach(btn => {
        const active = btn.dataset.materialView === state.materialView;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
    });

    if (modeStatus) {
        modeStatus.textContent = {
            hologram: 'HOLO',
            product: 'COLOR',
            hybrid: 'PART'
        }[state.materialView] || 'HOLO';
    }

    const ko = state.language === 'ko';
    const importLabel = document.getElementById('beginner-import-label');
    const revealLabel = document.getElementById('beginner-reveal-label');
    const pitchLabel = document.getElementById('beginner-pitch-label');
    if (importLabel) importLabel.textContent = ko ? '넣기' : 'IMPORT';
    if (revealLabel) revealLabel.textContent = ko ? '보기' : 'REVEAL';
    if (pitchLabel) pitchLabel.textContent = ko ? '발표·공유' : 'PITCH & SHARE';
}

function clearDemoFlowTimers() {
    demoFlowTimers.forEach(timer => clearTimeout(timer));
    demoFlowTimers = [];
    state.demoFlowRunning = false;
    state.pitchRunRunning = false;
    updateWorkflowCoach();
}

function pulseWorkflowTarget(target) {
    if (!target) return;
    target.classList.add('flow-focus-ring');
    setTimeout(() => target.classList.remove('flow-focus-ring'), 1400);
}

function openWorkflowDrawer(side) {
    const isMobile = window.innerWidth <= 768;
    const leftPanel = document.getElementById('hud-left-panel');
    const rightPanel = document.getElementById('hud-right-panel');
    const backdrop = document.getElementById('drawer-backdrop');

    if (!isMobile) return;

    if (leftPanel) leftPanel.classList.toggle('drawer-open', side === 'left');
    if (rightPanel) rightPanel.classList.toggle('drawer-open', side === 'right');
    if (backdrop) backdrop.classList.add('active');
}

function applyCameraView(view, shouldLog = false) {
    if (!view) return;

    document.querySelectorAll('.camera-dock-btn[data-view]').forEach(btn => {
        btn.classList.toggle('active-dock', btn.getAttribute('data-view') === view);
    });

    state.cameraMode = view;
    if (controls) {
        controls.autoRotate = view === 'orbit';
        if (view === 'orbit') controls.autoRotateSpeed = 1.0;
    }

    if (view === 'orbit') {
        targetCameraPosition.set(0, 4, 10);
        targetCameraTarget.set(0, 0, 0);
        state.rotationSpeed = Math.max(state.rotationSpeed, 0.55);
        if (shouldLog) {
            addConsoleLog(state.language === 'ko' ? "[카메라] 자동 궤도 시점으로 복귀합니다." : "[CAMERA] Returning to auto-orbit view.", "info");
        }
    } else if (view === 'front') {
        targetCameraPosition.set(0, 0.8, 7.5);
        targetCameraTarget.set(0, 0, 0);
        if (shouldLog) {
            addConsoleLog(state.language === 'ko' ? "[카메라] 스튜디오 전면 시점으로 이동합니다." : "[CAMERA] Sliding camera to front view.", "info");
        }
    } else if (view === 'top') {
        targetCameraPosition.set(0, 7.5, 0.01);
        targetCameraTarget.set(0, 0, 0);
        if (shouldLog) {
            addConsoleLog(state.language === 'ko' ? "[카메라] 상단 구조 시점으로 이동합니다." : "[CAMERA] Sliding camera to top technical view.", "info");
        }
    } else if (view === 'macro') {
        targetCameraPosition.set(0.8, 0.4, 2.5);
        targetCameraTarget.set(0.2, 0.1, 0.1);
        if (shouldLog) {
            addConsoleLog(state.language === 'ko' ? "[카메라] 접사 포커스 시점으로 이동합니다." : "[CAMERA] Gliding camera to macro focus.", "info");
        }
    }
}

function initWorkflowControls() {
    document.querySelectorAll('.flow-step').forEach(btn => {
        btn.addEventListener('click', () => {
            handleWorkflowStep(btn.getAttribute('data-flow-step'));
        });
    });

    const demoBtn = document.getElementById('btn-demo-run');
    if (demoBtn) {
        demoBtn.addEventListener('click', runSmoothDemoFlow);
    }
    const pitchBtn = document.getElementById('btn-pitch-run');
    if (pitchBtn) {
        pitchBtn.addEventListener('click', runThirtySecondPitch);
    }
    const finalPassBtn = document.getElementById('btn-final-pass');
    if (finalPassBtn) {
        finalPassBtn.addEventListener('click', runFinalPass);
    }

    const beginnerImportBtn = document.getElementById('btn-beginner-import');
    if (beginnerImportBtn) {
        beginnerImportBtn.addEventListener('click', () => handleWorkflowStep('model'));
    }
    document.querySelectorAll('.beginner-material-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!state.engineBooted) {
                showNotification(
                    state.language === 'ko' ? '엔진 기동 필요' : 'Boot Required',
                    state.language === 'ko' ? '먼저 HOLOSYN 엔진을 기동하세요.' : 'Boot HOLOSYN first.'
                );
                return;
            }
            clearDemoFlowTimers();
            const mode = btn.dataset.materialView;
            setWorkflowProgress('structure', ['model']);
            if (mode !== 'hybrid') {
                if (state.partScanActive) setPartScanActive(false);
                if (state.explodedLevel > 0.01) animateExplodedLevel(0, 450);
            }
            setMaterialView(mode);
            if (mode === 'product') applyCameraView('front', false);
            if (mode === 'hologram') applyCameraView('orbit', false);
        });
    });
    const beginnerPitchBtn = document.getElementById('btn-beginner-pitch');
    if (beginnerPitchBtn) {
        beginnerPitchBtn.addEventListener('click', runThirtySecondPitch);
    }

    updateWorkflowCoach();
}

function handleWorkflowStep(step) {
    if (!state.engineBooted) {
        showNotification(
            state.language === 'ko' ? "엔진 기동 필요" : "Boot Required",
            state.language === 'ko' ? "먼저 HOLOSYN 엔진을 기동한 뒤 흐름을 실행하세요." : "Boot the HOLOSYN engine before running the workflow."
        );
        return;
    }

    clearDemoFlowTimers();

    if (step === 'model') {
        setWorkflowProgress('model');
        openWorkflowDrawer('left');
        const dropZone = document.getElementById('drop-zone');
        pulseWorkflowTarget(dropZone);
        if (dropZone) dropZone.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return;
    }

    if (step === 'structure') {
        closeMobileDrawers();
        setWorkflowProgress('structure', ['model']);
        applyCameraView('top', true);
        animateExplodedLevel(0.5, 900);
        showNotification(
            state.language === 'ko' ? "구조 보기 준비" : "Structure View Ready",
            state.language === 'ko' ? "분해도와 상단 시점으로 부품 구조를 펼칩니다." : "Opening the exploded view and top camera angle."
        );
        return;
    }

    if (step === 'present') {
        closeMobileDrawers();
        setWorkflowProgress('present', ['model', 'structure']);
        if (!state.isShowcaseMode) startCinematicPresentation();
        return;
    }

    if (step === 'export') {
        if (state.isShowcaseMode) stopCinematicPresentation();
        setWorkflowProgress('export', ['model', 'structure', 'present']);
        openWorkflowDrawer('right');
        const exportPanel = document.querySelector('.export-buttons-grid');
        pulseWorkflowTarget(exportPanel);
        if (exportPanel) exportPanel.scrollIntoView({ block: 'center', behavior: 'smooth' });
        showNotification(
            state.language === 'ko' ? "내보내기 준비" : "Export Ready",
            state.language === 'ko' ? "PNG, JSON, GLB 중 필요한 산출물을 선택하세요." : "Choose PNG, JSON, or GLB for the handoff."
        );
    }
}

function runSmoothDemoFlow() {
    if (!state.engineBooted || !activeModelGroup || activeModelGroup.children.length === 0) {
        showNotification(
            state.language === 'ko' ? "데모 런 대기" : "Demo Run Waiting",
            state.language === 'ko' ? "엔진을 기동하고 모델을 먼저 불러오세요." : "Boot the engine and load a model first."
        );
        return;
    }

    clearDemoFlowTimers();
    if (state.isShowcaseMode) stopCinematicPresentation();

    state.demoFlowRunning = true;
    state.activeDemoPreset = 'smooth-flow';
    state.handoffReady.demo = true;
    updateWorkflowCoach();
    updateHandoffPackStatus();
    closeMobileDrawers();
    setRenderModeByKey('wireframe');
    applyCameraView('front', false);
    animateExplodedLevel(0.0, 450);
    setWorkflowProgress('model', ['model']);

    addConsoleLog(state.language === 'ko' ? "[플로우] 매끄러운 데모 런을 시작합니다." : "[FLOW] Starting smooth demo run.", "info");

    const schedule = (delay, fn) => {
        const timer = setTimeout(fn, delay);
        demoFlowTimers.push(timer);
    };

    schedule(900, () => {
        setWorkflowProgress('structure', ['model']);
        applyCameraView('top', false);
        animateExplodedLevel(0.55, 1200);
        showNotification(
            state.language === 'ko' ? "구조 전개" : "Structure Open",
            state.language === 'ko' ? "부품 라벨과 분해도를 발표용 상태로 펼칩니다." : "Opening part labels and exploded spacing for presentation."
        );
    });

    schedule(3000, () => {
        setWorkflowProgress('present', ['model', 'structure']);
        applyCameraView('macro', false);
        animateExplodedLevel(0.28, 900);
        state.rotationSpeed = 0.35;
        showNotification(
            state.language === 'ko' ? "발표 앵글" : "Presentation Angle",
            state.language === 'ko' ? "접사 카메라로 핵심 디테일을 잡습니다." : "Moving to macro focus for the hero detail."
        );
    });

    schedule(5100, () => {
        setWorkflowProgress('export', ['model', 'structure', 'present']);
        updateHandoffPackStatus();
        applyCameraView('orbit', false);
        pulseWorkflowTarget(document.getElementById('demo-pack-panel') || document.querySelector('.export-buttons-grid'));
        showNotification(
            state.language === 'ko' ? "흐름 완료" : "Flow Complete",
            state.language === 'ko' ? "이제 리허설 런북이나 시연 패키지로 공유용 묶음을 저장하면 됩니다." : "The handoff is ready. Save a rehearsal runbook or one-click demo pack when needed."
        );
    });

    schedule(6500, () => {
        state.demoFlowRunning = false;
        updateWorkflowCoach();
        addConsoleLog(state.language === 'ko' ? "[플로우] 데모 런 완료. 내보내기 대기 상태입니다." : "[FLOW] Demo run complete. Waiting for export.", "success");
    });
}

function preparePitchShareUrl() {
    const result = buildShareUrl();
    try {
        window.history.replaceState(null, '', result.url);
    } catch (error) {
        window.location.hash = new URL(result.url).hash;
    }
    markHandoffExportReady();
    const status = document.getElementById('share-link-status');
    const detail = document.getElementById('share-link-detail');
    if (status) status.textContent = 'PITCH URL';
    if (detail) detail.textContent = `30초 피치 장면 URL 준비됨 · ${result.url.length} chars`;
    addConsoleLog(`[PITCH] Share URL prepared (${result.url.length} chars).`, 'success');
    return result;
}

function runThirtySecondPitch() {
    if (!state.engineBooted || !activeModelGroup || activeModelGroup.children.length === 0) {
        showNotification(
            state.language === 'ko' ? '30초 피치 대기' : '30s Pitch Waiting',
            state.language === 'ko' ? '엔진을 기동하고 모델을 먼저 불러오세요.' : 'Boot the engine and load a model first.'
        );
        return;
    }

    clearDemoFlowTimers();
    if (state.isShowcaseMode) stopCinematicPresentation();

    state.demoFlowRunning = true;
    state.pitchRunRunning = true;
    state.activeDemoPreset = '30s-pitch';
    state.handoffReady.demo = true;
    state.handoffReady.timeline = true;
    updateWorkflowCoach();
    updateHandoffPackStatus();
    closeMobileDrawers();

    setMaterialView('hologram', { notify: false, broadcast: false, autoFocus: false });
    setRenderModeByKey('solid');
    applyStudioEnvironmentPreset('cupertino');
    applyCameraView('front', false);
    animateExplodedLevel(0.0, 450);
    state.rotationSpeed = 0.42;
    setWorkflowProgress('model', ['model']);

    showNotification(
        state.language === 'ko' ? '30초 Pitch 시작' : '30s Pitch Started',
        state.language === 'ko' ? '히어로샷, 구조, 파트 포커스, 쇼케이스, 공유 준비까지 자동으로 진행합니다.' : 'Running hero, structure, part focus, showcase, and share prep.'
    );
    addConsoleLog('[PITCH] 30-second judge/demo pitch started.', 'info');

    const schedule = (delay, fn) => {
        const timer = setTimeout(fn, delay);
        demoFlowTimers.push(timer);
    };

    schedule(1600, () => {
        setWorkflowProgress('structure', ['model']);
        setRenderModeByKey('wireframe');
        applyCameraView('top', false);
        animateExplodedLevel(0.58, 1200);
        showNotification(
            state.language === 'ko' ? '구조 한 컷' : 'Structure Beat',
            state.language === 'ko' ? '분해도와 상단 시점으로 “어떻게 생겼는지”를 바로 보여줍니다.' : 'Showing the top exploded view so the structure lands immediately.'
        );
    });

    schedule(4700, () => {
        setWorkflowProgress('present', ['model', 'structure']);
        applyCameraView('macro', false);
        setRenderModeByKey(state.activePreset === 'exosuit' ? 'xray' : 'solid');
        animateExplodedLevel(0.34, 850);
        if (getPartScanList().length > 0) {
            setPartScanActive(true, 0);
        }
        setMaterialView('hybrid', { notify: false, broadcast: false, autoFocus: false });
        showNotification(
            state.language === 'ko' ? '핵심 부품 포커스' : 'Component Focus',
            state.language === 'ko' ? 'Part Scan으로 한 부품만 강조해 설명 포인트를 만듭니다.' : 'Part Scan isolates one component for a clear talking point.'
        );
    });

    schedule(8200, () => {
        if (getPartScanList().length > 1) {
            cyclePartScan(1);
        }
        applyCameraView('orbit', false);
        state.rotationSpeed = 0.7;
        showNotification(
            state.language === 'ko' ? '두 번째 증거' : 'Second Proof Point',
            state.language === 'ko' ? '다음 부품으로 넘어가 구조가 실제로 나뉘어 있음을 보여줍니다.' : 'Jumping to a second component to prove the model is structured.'
        );
    });

    schedule(11200, () => {
        setMaterialView('product', { notify: false, broadcast: false, autoFocus: false });
        startCinematicPresentation({ preserveFlowTimers: true });
        showNotification(
            state.language === 'ko' ? '쇼케이스 컷' : 'Showcase Beat',
            state.language === 'ko' ? 'HUD를 줄이고 제품만 보이는 발표 컷으로 전환합니다.' : 'Switching into the product-only presentation cut.'
        );
    });

    schedule(17200, () => {
        runFinalPass();
        const result = preparePitchShareUrl();
        const headerShare = document.getElementById('btn-header-share-link');
        pulseWorkflowTarget(headerShare);
        state.demoFlowRunning = false;
        state.pitchRunRunning = false;
        updateWorkflowCoach();
        showNotification(
            state.language === 'ko' ? '30초 Pitch 준비 완료' : '30s Pitch Ready',
            state.language === 'ko' ? 'Final Pass와 공유 URL이 준비됐습니다. 이제 주소창 링크나 SHARE 버튼으로 전달하면 됩니다.' : 'Final Pass and share URL are ready. Use the address bar or SHARE button to hand it off.'
        );
        addConsoleLog(`[PITCH] 30-second pitch completed. URL length: ${result.url.length}.`, 'success');
    });
}

// Unified node builder - MeshStandardMaterial shiny integration
function buildHologramNode(geometry, isChrome = false) {
    const nodeGroup = new THREE.Group();
    
    const activeColor = themeColorObj();
    const solidMat = new THREE.MeshStandardMaterial({
        color: activeColor,
        transparent: true,
        opacity: isChrome ? 0.85 : 0.65,
        metalness: isChrome ? 0.95 : 0.25,
        roughness: isChrome ? 0.08 : 0.55,
        side: THREE.DoubleSide,
        blending: THREE.NormalBlending
    });
    
    const solidMesh = new THREE.Mesh(geometry, solidMat);
    solidMesh.name = "solid-layer";
    nodeGroup.add(solidMesh);
    
    const wireMesh = new THREE.Mesh(geometry, hologramMaterials.wireframe);
    wireMesh.name = "wire-layer";
    nodeGroup.add(wireMesh);
    
    const pointsMesh = new THREE.Points(geometry, hologramMaterials.points);
    pointsMesh.name = "points-layer";
    nodeGroup.add(pointsMesh);
    
    nodeGroup.userData.solidMaterial = solidMat;
    nodeGroup.userData.hologramOpacity = captureMaterialOpacity(solidMat);
    const productMat = solidMat.clone();
    productMat.transparent = false;
    productMat.opacity = 1;
    productMat.depthWrite = true;
    productMat.needsUpdate = true;
    nodeGroup.userData.productMaterial = productMat;
    nodeGroup.userData.solidMesh = solidMesh;
    nodeGroup.userData.wireMesh = wireMesh;
    nodeGroup.userData.pointsMesh = pointsMesh;
    nodeGroup.userData.isChrome = isChrome;
    
    return nodeGroup;
}

function applyPartPalette(nodeGroup, colorHex, options = {}) {
    if (!nodeGroup || !colorHex) return nodeGroup;
    const color = new THREE.Color(colorHex);
    const productColor = new THREE.Color(options.productColor || colorHex);
    nodeGroup.userData.paletteColor = colorHex;
    nodeGroup.userData.paletteWireOpacity = options.wireOpacity || 0.72;
    nodeGroup.userData.palettePointsOpacity = options.pointsOpacity || 0.82;
    if (nodeGroup.userData.solidMaterial) {
        nodeGroup.userData.solidMaterial.color.copy(color);
        if (nodeGroup.userData.productMaterial?.color) {
            nodeGroup.userData.productMaterial.color.copy(productColor);
        }
        if (options.emissiveColor && nodeGroup.userData.solidMaterial.emissive) {
            nodeGroup.userData.emissiveColor = options.emissiveColor;
            nodeGroup.userData.emissiveIntensity = options.emissiveIntensity || 0.35;
            nodeGroup.userData.solidMaterial.emissive.copy(new THREE.Color(options.emissiveColor));
            nodeGroup.userData.solidMaterial.emissiveIntensity = nodeGroup.userData.emissiveIntensity;
            if (nodeGroup.userData.productMaterial?.emissive) {
                nodeGroup.userData.productMaterial.emissive.copy(new THREE.Color(options.productEmissiveColor || options.emissiveColor));
                nodeGroup.userData.productMaterial.emissiveIntensity = options.productEmissiveIntensity ?? Math.min(nodeGroup.userData.emissiveIntensity, 0.35);
            }
        }
    }
    if (nodeGroup.userData.wireMesh && nodeGroup.userData.wireMesh.material) {
        const wireMaterial = nodeGroup.userData.wireMesh.material.clone();
        wireMaterial.color.copy(color);
        wireMaterial.opacity = nodeGroup.userData.paletteWireOpacity * state.glowIntensity;
        nodeGroup.userData.wireMesh.material = wireMaterial;
        nodeGroup.userData.wireMaterial = wireMaterial;
    }
    if (nodeGroup.userData.pointsMesh && nodeGroup.userData.pointsMesh.material) {
        const pointsMaterial = nodeGroup.userData.pointsMesh.material.clone();
        pointsMaterial.color.copy(color);
        pointsMaterial.opacity = nodeGroup.userData.palettePointsOpacity * state.glowIntensity;
        nodeGroup.userData.pointsMesh.material = pointsMaterial;
        nodeGroup.userData.pointsMaterial = pointsMaterial;
    }
    return nodeGroup;
}

// Preset A: AeroDrone construction (Standard metallic upgrades)
function createAeroDroneGeometry() {
    const drone = new THREE.Group();
    drone.name = "drone";
    
    const frameGeo = new THREE.BoxGeometry(0.8, 0.25, 0.8);
    const bodyMesh = buildHologramNode(frameGeo, false);
    bodyMesh.name = "chassis";
    bodyMesh.userData.explodedOffset = new THREE.Vector3(0, 0, 0);
    drone.add(bodyMesh);
    
    const domeGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const domeMesh = buildHologramNode(domeGeo, false);
    domeMesh.name = "dome";
    domeMesh.position.y = 0.15;
    domeMesh.userData.explodedOffset = new THREE.Vector3(0, 0.7, 0);
    drone.add(domeMesh);
    
    const armLengths = [-1, 1];
    armLengths.forEach(x => {
        armLengths.forEach(z => {
            const subAssembly = new THREE.Group();
            subAssembly.name = "chassis-arm";
            subAssembly.position.set(x * 0.4, 0, z * 0.4);
            
            const armGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
            const armMesh = buildHologramNode(armGeo, false);
            armMesh.rotation.x = Math.PI / 2;
            armMesh.rotation.z = Math.atan2(z, x) + Math.PI / 4;
            subAssembly.add(armMesh);
            
            const motorGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.15, 8);
            const motorMesh = buildHologramNode(motorGeo, false);
            motorMesh.position.set(x * 0.35, 0.1, z * 0.35);
            subAssembly.add(motorMesh);
            
            const rotorGeo = new THREE.BoxGeometry(0.75, 0.01, 0.05);
            const rotorMesh = buildHologramNode(rotorGeo, true); // Polished chrome rotor!
            rotorMesh.position.set(x * 0.35, 0.18, z * 0.35);
            rotorMesh.name = "rotor";
            subAssembly.add(rotorMesh);
            
            subAssembly.userData.explodedOffset = new THREE.Vector3(x * 0.8, 0.1, z * 0.8);
            drone.add(subAssembly);
        });
    });
    
    const camGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 8);
    const camMesh = buildHologramNode(camGeo, false);
    camMesh.name = "camera";
    camMesh.position.y = -0.22;
    camMesh.userData.explodedOffset = new THREE.Vector3(0, -0.8, 0);
    drone.add(camMesh);
    
    return drone;
}

// Preset B: Nexus Ring geometry
function createNexusRingGeometry() {
    const ringGroup = new THREE.Group();
    ringGroup.name = "ring";
    
    const outerTorusGeo = new THREE.TorusGeometry(1.2, 0.1, 12, 48);
    const outerTorus = buildHologramNode(outerTorusGeo, false);
    outerTorus.name = "outer";
    outerTorus.userData.explodedOffset = new THREE.Vector3(0, 0, 0);
    ringGroup.add(outerTorus);
    
    const gyro1Geo = new THREE.TorusGeometry(0.85, 0.05, 8, 36);
    const gyro1 = buildHologramNode(gyro1Geo, true); // Polished chrome gyro 1!
    gyro1.name = "gyro1";
    gyro1.userData.explodedOffset = new THREE.Vector3(0, 0.6, 0);
    ringGroup.add(gyro1);
    
    const gyro2Geo = new THREE.TorusGeometry(0.55, 0.035, 8, 24);
    const gyro2 = buildHologramNode(gyro2Geo, true); // Polished chrome gyro 2!
    gyro2.name = "gyro2";
    gyro2.userData.explodedOffset = new THREE.Vector3(0, -0.6, 0);
    ringGroup.add(gyro2);
    
    const coreGeo = new THREE.IcosahedronGeometry(0.25, 1);
    const core = buildHologramNode(coreGeo, true); // Core!
    core.name = "gyro-core";
    core.userData.explodedOffset = new THREE.Vector3(0, 0, 0.8);
    ringGroup.add(core);
    
    for (let i = 0; i < 4; i++) {
        const orbitNodeGeo = new THREE.SphereGeometry(0.06, 8, 8);
        const node = buildHologramNode(orbitNodeGeo, false);
        const angle = (i / 4) * Math.PI * 2;
        node.position.set(Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5);
        node.name = `node-${i}`;
        node.userData.explodedOffset = new THREE.Vector3(Math.cos(angle) * 0.8, 0, Math.sin(angle) * 0.8);
        ringGroup.add(node);
    }
    
    return ringGroup;
}

// Preset C: HyperCar geometry
function createHyperCarGeometry() {
    const car = new THREE.Group();
    car.name = "car";
    
    const bodyGeo = new THREE.BoxGeometry(2.1, 0.22, 0.9);
    const body = buildHologramNode(bodyGeo, false);
    body.name = "body";
    body.position.y = 0.05;
    body.userData.explodedOffset = new THREE.Vector3(0, 0, 0);
    car.add(body);
    
    const cabinGeo = new THREE.ConeGeometry(0.5, 0.65, 4);
    const cabin = buildHologramNode(cabinGeo, false);
    cabin.name = "cabin";
    cabin.rotation.y = Math.PI / 4;
    cabin.rotation.x = -Math.PI / 6;
    cabin.scale.set(1.4, 0.6, 1.2);
    cabin.position.set(-0.15, 0.25, 0);
    cabin.userData.explodedOffset = new THREE.Vector3(-0.4, 0.6, 0);
    car.add(cabin);
    
    const spoilerGeo = new THREE.BoxGeometry(0.12, 0.2, 0.8);
    const spoiler = buildHologramNode(spoilerGeo, false);
    spoiler.name = "spoiler";
    spoiler.position.set(0.85, 0.2, 0);
    spoiler.userData.explodedOffset = new THREE.Vector3(0.5, 0.5, 0);
    car.add(spoiler);
    
    const wheelPositions = [
        { x: -0.7, z: -0.5 },
        { x: -0.7, z: 0.5 },
        { x: 0.7, z: -0.5 },
        { x: 0.7, z: 0.5 }
    ];
    wheelPositions.forEach((pos, idx) => {
        const wheelGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.16, 12);
        const wheel = buildHologramNode(wheelGeo, true); // Polished chrome wheel rim!
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(pos.x, -0.05, pos.z);
        wheel.name = `wheel-${idx}`;
        wheel.userData.explodedOffset = new THREE.Vector3(0, -0.2, pos.z * 1.2);
        car.add(wheel);
    });
    
    return car;
}

// Preset D: Chronos Battery Cell geometry
function createChronosCoreGeometry() {
    const battery = new THREE.Group();
    battery.name = "battery";
    
    const tubeGeo = new THREE.CylinderGeometry(0.6, 0.6, 1.8, 16, 4, true);
    const tube = buildHologramNode(tubeGeo, false);
    tube.name = "tube";
    tube.userData.explodedOffset = new THREE.Vector3(0, 0, 0);
    battery.add(tube);
    
    const rodGeo = new THREE.CylinderGeometry(0.18, 0.18, 2.0, 8);
    const rod = buildHologramNode(rodGeo, true); // Chrome rod!
    rod.name = "rod";
    rod.userData.explodedOffset = new THREE.Vector3(0.8, 0, 0.8);
    battery.add(rod);

    const ring1Geo = new THREE.TorusGeometry(0.42, 0.04, 8, 24);
    const ring1 = buildHologramNode(ring1Geo, true);
    ring1.name = "plasma-ring-1";
    ring1.position.set(0, -0.3, 0);
    ring1.userData.explodedOffset = new THREE.Vector3(-0.8, -0.4, 0.8);
    battery.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(0.42, 0.04, 8, 24);
    const ring2 = buildHologramNode(ring2Geo, true);
    ring2.name = "plasma-ring-2";
    ring2.position.set(0, 0.3, 0);
    ring2.userData.explodedOffset = new THREE.Vector3(-0.8, 0.4, 0.8);
    battery.add(ring2);

    const capGeo = new THREE.CylinderGeometry(0.58, 0.58, 0.1, 16);
    const cap = buildHologramNode(capGeo, false);
    cap.name = "cap";
    cap.position.set(0, 0.9, 0);
    cap.userData.explodedOffset = new THREE.Vector3(0, 0.9, -0.4);
    battery.add(cap);
    
    return battery;
}

// Preset: ST,AND — folding nameplate display stand (real social-venture product)
// 앞판(front panel) + 리빙 힌지(living hinge) + 받침대(base foot). Self-stands at ~65° from ground.
// Real dims: panel 150x100x2mm, base 80x20x2mm, total 12g. Modeled to scene scale.
function createStandGeometry() {
    const stand = new THREE.Group();
    stand.name = "stand";

    const panelW = 1.6, panelH = 1.05, panelT = 0.04;
    const tiltRad = THREE.MathUtils.degToRad(22); // lean back from vertical (~65° from ground)

    // Front panel (앞판) — the brand nameplate face. Pivot at its bottom edge.
    const panelGeo = new THREE.BoxGeometry(panelW, panelH, panelT);
    panelGeo.translate(0, panelH / 2, 0); // move bottom edge to local origin so it pivots there
    const panel = buildHologramNode(panelGeo, false);
    panel.name = "front-panel";
    panel.rotation.x = -tiltRad; // lean the top backward (-z)
    panel.position.set(0, 0.05, 0.32);
    panel.userData.explodedOffset = new THREE.Vector3(0, 0.5, 0.55);
    stand.add(panel);

    // Living hinge (리빙 힌지) — the patent-pending fold joint, chrome highlight
    const hingeGeo = new THREE.CylinderGeometry(0.05, 0.05, panelW * 0.98, 14);
    hingeGeo.rotateZ(Math.PI / 2); // lay the cylinder along the X (width) axis
    const hinge = buildHologramNode(hingeGeo, true);
    hinge.name = "living-hinge";
    hinge.position.set(0, 0.06, 0.32);
    hinge.userData.explodedOffset = new THREE.Vector3(0.7, 0.0, 0.4);
    stand.add(hinge);

    // Base foot (받침대) — extends backward along the ground to hold the panel upright
    const baseW = 0.85, baseDepth = 0.62, baseT = 0.04;
    const baseGeo = new THREE.BoxGeometry(baseW, baseT, baseDepth);
    baseGeo.translate(0, 0, -baseDepth / 2); // extend backward (-z) from the hinge
    const base = buildHologramNode(baseGeo, false);
    base.name = "base-foot";
    base.position.set(0, 0.03, 0.32);
    base.userData.explodedOffset = new THREE.Vector3(0, -0.35, -0.55);
    stand.add(base);

    return stand;
}

// Preset E: Forge Exo-Suit - 3D Hologram
// Uses LatheGeometry (helmet dome), ExtrudeGeometry (faceplate, eyes, chest, boots)
function createForgeExoSuitGeometry() {
    // Required smoke test checkpoints:
    // EXO BUILD-II PROTOTYPE, FORGE DYNAMICS, faceplate, eye-r, reactor-core, palm-emitter-r, boot-jet-r
    const suit = new THREE.Group();
    suit.name = "exosuit";

    // Hologram palette stays cyan; product reveal uses a grounded finish palette.
    const C = {
        red: '#005588', dk: '#002244', gold: '#00aaff', lt: '#44ccff',
        jnt: '#001122', met: '#004466', gl: '#88eeff', glH: '#ffffff', eye: '#ffffff'
    };
    const P = {
        red: '#8f2028', dk: '#171b22', gold: '#c5a15a', lt: '#c7d0d8',
        jnt: '#101318', met: '#626d78', gl: '#7de3f4', glH: '#eafcff', eye: '#eafcff'
    };

    // Part builder
    const mk = (nm, geo, p, ex, o={}) => {
        const nd = buildHologramNode(geo, !!o.chr);
        nd.name = nm;
        nd.position.set(p[0],p[1],p[2]);
        if(o.r) nd.rotation.set(o.r[0]||0, o.r[1]||0, o.r[2]||0);
        if(o.s) nd.scale.set(o.s[0]||1, o.s[1]||1, o.s[2]||1);
        nd.userData.explodedOffset = new THREE.Vector3(ex[0],ex[1],ex[2]);
        if(o.c) {
            const role = Object.keys(C).find(key => C[key] === o.c);
            applyPartPalette(nd, o.c, {
                emissiveColor: o.ec,
                emissiveIntensity: o.ei,
                productColor: o.pc || (role ? P[role] : o.c),
                productEmissiveColor: o.pec || (o.ec ? P.glH : undefined),
                productEmissiveIntensity: o.pei
            });
        }
        suit.add(nd);
        return nd;
    };

    const shapeFromPts = (pts) => {
        const s = new THREE.Shape();
        s.moveTo(pts[0][0], pts[0][1]);
        for (let i=1; i<pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
        s.closePath();
        return s;
    };

    const bev = (d, t=0.008) => ({depth:d, bevelEnabled:true, bevelThickness:t, bevelSize:t, bevelSegments:2});
    const flat = (d) => ({depth:d, bevelEnabled:false});

    // =================================================================
    //  1. HELMET
    // =================================================================
    const helmetPts = [
        [0.00, 0.30], [0.06, 0.29], [0.13, 0.26], [0.19, 0.20],
        [0.23, 0.11], [0.24, 0.02], [0.23,-0.06], [0.20,-0.12],
        [0.16,-0.17], [0.10,-0.21], [0.05,-0.23], [0.00,-0.24]
    ].map(v => new THREE.Vector2(v[0], v[1]));
    mk("helmet", new THREE.LatheGeometry(helmetPts, 24), [0,1.40,-0.02], [0,0.92,0.10], {s:[0.88,1.0,0.94], c:C.red});

    const fpGeo = new THREE.ExtrudeGeometry(shapeFromPts([
        [0, 0.12],[-0.12, 0.10],[-0.15, 0.03],[-0.14,-0.04],
        [-0.10,-0.10],[-0.04,-0.13],[0,-0.14],[0.04,-0.13],
        [0.10,-0.10],[0.14,-0.04],[0.15, 0.03],[0.12, 0.10]
    ]), bev(0.05));
    mk("faceplate", fpGeo, [0,1.36,0.16], [0,0.96,0.56], {c:C.gold, chr:true});

    const eyeL = new THREE.ExtrudeGeometry(shapeFromPts([
        [-0.042,0.007],[-0.012,0.013],[0.032,0.005],
        [0.042,-0.005],[0.016,-0.009],[-0.032,-0.001]
    ]), flat(0.018));
    mk("eye-l", eyeL, [-0.062,1.41,0.22], [-0.10,1.00,0.58], {chr:true, c:C.eye, ec:C.glH, ei:1.8});

    const eyeR = new THREE.ExtrudeGeometry(shapeFromPts([
        [0.042,0.007],[0.012,0.013],[-0.032,0.005],
        [-0.042,-0.005],[-0.016,-0.009],[0.032,-0.001]
    ]), flat(0.018));
    mk("eye-r", eyeR, [0.062,1.41,0.22], [0.10,1.00,0.58], {chr:true, c:C.eye, ec:C.glH, ei:1.8});

    mk("brow", new THREE.BoxGeometry(0.30,0.03,0.08), [0,1.47,0.14], [0,1.06,0.48], {c:C.red});
    mk("crest", new THREE.BoxGeometry(0.05,0.04,0.30), [0,1.52,0.0], [0,1.12,0.0], {c:C.dk});
    mk("jaw-l", new THREE.BoxGeometry(0.08,0.10,0.12), [-0.13,1.25,0.12], [-0.16,0.84,0.46], {r:[0,-0.08,0], c:C.gold, chr:true});
    mk("jaw-r", new THREE.BoxGeometry(0.08,0.10,0.12), [0.13,1.25,0.12], [0.16,0.84,0.46], {r:[0,0.08,0], c:C.gold, chr:true});
    mk("chin", new THREE.BoxGeometry(0.10,0.05,0.08), [0,1.17,0.18], [0,0.76,0.54], {c:C.gold, chr:true});
    mk("cheek-l", new THREE.BoxGeometry(0.05,0.10,0.10), [-0.17,1.32,0.08], [-0.22,0.94,0.42], {c:C.red});
    mk("cheek-r", new THREE.BoxGeometry(0.05,0.10,0.10), [0.17,1.32,0.08], [0.22,0.94,0.42], {c:C.red});
    mk("neck", new THREE.CylinderGeometry(0.13,0.17,0.10,14), [0,1.08,0], [0,0.68,0.04], {c:C.jnt});

    // =================================================================
    //  2. TORSO
    // =================================================================
    const chestGeo = new THREE.ExtrudeGeometry(shapeFromPts([
        [0,0.18],[-0.22,0.16],[-0.36,0.08],[-0.38,-0.02],
        [-0.34,-0.14],[-0.18,-0.17],[0,-0.18],
        [0.18,-0.17],[0.34,-0.14],[0.38,-0.02],[0.36,0.08],[0.22,0.16]
    ]), bev(0.28, 0.015));
    mk("chest", chestGeo, [0,0.82,-0.08], [0,0.18,0.16], {c:C.red});

    mk("pec-l", new THREE.BoxGeometry(0.24,0.14,0.06), [-0.14,0.82,0.18], [-0.12,0.16,0.36], {r:[0,0.10,0], c:C.red});
    mk("pec-r", new THREE.BoxGeometry(0.24,0.14,0.06), [0.14,0.82,0.18], [0.12,0.16,0.36], {r:[0,-0.10,0], c:C.red});
    mk("collar-l", new THREE.BoxGeometry(0.22,0.04,0.28), [-0.26,0.98,0.02], [-0.12,0.32,0.10], {c:C.gold});
    mk("collar-r", new THREE.BoxGeometry(0.22,0.04,0.28), [0.26,0.98,0.02], [0.12,0.32,0.10], {c:C.gold});

    mk("reactor-ring", new THREE.TorusGeometry(0.09,0.016,12,24), [0,0.78,0.19], [0,0.22,0.52], {r:[Math.PI/2,0,0], c:C.lt, chr:true});
    mk("reactor-core", new THREE.SphereGeometry(0.06,16,12), [0,0.78,0.20], [0,0.22,0.58], {chr:true, c:C.gl, ec:C.glH, ei:1.6});
    mk("reactor-housing", new THREE.CylinderGeometry(0.12,0.12,0.02,3), [0,0.78,0.175], [0,0.22,0.48], {r:[Math.PI/2,0,Math.PI], c:C.met, chr:true});

    mk("mid-torso", new THREE.BoxGeometry(0.62,0.12,0.28), [0,0.62,0], [0,0.02,0.08], {c:C.dk});

    for (let r=0; r<3; r++) {
        const y = 0.48 - r*0.10;
        mk(`ab-l-${r}`, new THREE.BoxGeometry(0.13,0.08,0.05), [-0.08,y,0.15], [-0.10,-0.10-r*0.08,0.28], {c:r===0?C.red:C.dk});
        mk(`ab-r-${r}`, new THREE.BoxGeometry(0.13,0.08,0.05), [0.08,y,0.15], [0.10,-0.10-r*0.08,0.28], {c:r===0?C.red:C.dk});
    }

    mk("ab-line", new THREE.BoxGeometry(0.012,0.28,0.035), [0,0.38,0.16], [0,-0.18,0.30], {c:C.lt, chr:true});
    mk("side-l", new THREE.BoxGeometry(0.05,0.38,0.22), [-0.38,0.70,0], [-0.28,0.10,0], {c:C.dk});
    mk("side-r", new THREE.BoxGeometry(0.05,0.38,0.22), [0.38,0.70,0], [0.28,0.10,0], {c:C.dk});
    mk("pelvis", new THREE.BoxGeometry(0.58,0.14,0.26), [0,0.18,0], [0,-0.28,0], {c:C.red});
    mk("groin-guard", new THREE.BoxGeometry(0.18,0.10,0.14), [0,0.08,0.05], [0,-0.36,0.08], {c:C.gold});

    // =================================================================
    //  3. ARMS & LEGS
    // =================================================================
    [{s:"l",d:-1},{s:"r",d:1}].forEach(({s,d}) => {
        mk(`pauldron-${s}`, new THREE.SphereGeometry(0.18,14,10), [d*0.50,0.96,0], [d*0.70,0.38,0.14], {s:[1.3,0.7,1.1], c:C.red});
        mk(`pld-ridge-${s}`, new THREE.BoxGeometry(0.24,0.025,0.10), [d*0.50,0.98,0], [d*0.72,0.42,0.14], {c:C.gold});
        mk(`sh-joint-${s}`, new THREE.SphereGeometry(0.09,10,8), [d*0.50,0.88,0], [d*0.66,0.30,0.06], {c:C.jnt});
        mk(`bicep-${s}`, new THREE.CylinderGeometry(0.09,0.11,0.26,12), [d*0.60,0.70,0], [d*0.84,0.14,0.08], {c:C.red});
        mk(`bicep-band-${s}`, new THREE.CylinderGeometry(0.115,0.115,0.025,12), [d*0.60,0.62,0], [d*0.84,0.06,0.08], {c:C.gold});
        mk(`elbow-${s}`, new THREE.SphereGeometry(0.07,10,8), [d*0.62,0.52,0.02], [d*0.88,-0.02,0.16], {c:C.jnt});
        mk(`forearm-${s}`, new THREE.CylinderGeometry(0.10,0.08,0.28,12), [d*0.64,0.34,0.03], [d*0.92,-0.16,0.26], {c:C.red});

        const gShape = shapeFromPts([[0,0.06],[-0.07,0.05],[-0.08,0],[-0.07,-0.05],[0,-0.06],[0.07,-0.05],[0.08,0],[0.07,0.05]]);
        mk(`gauntlet-${s}`, new THREE.ExtrudeGeometry(gShape, bev(0.12, 0.006)), [d*0.65,0.16,0.0], [d*0.96,-0.30,0.36], {c:C.gold, chr:true});
        mk(`wrist-${s}`, new THREE.TorusGeometry(0.065,0.012,8,16), [d*0.65,0.20,0.03], [d*0.94,-0.26,0.32], {r:[Math.PI/2,0,0], c:C.lt, chr:true});
        mk(`hand-${s}`, new THREE.BoxGeometry(0.09,0.09,0.05), [d*0.66,0.06,0.05], [d*1.00,-0.38,0.44], {c:C.gold});
        mk(`fingers-${s}`, new THREE.BoxGeometry(0.08,0.05,0.04), [d*0.66,0.00,0.06], [d*1.02,-0.44,0.48], {c:C.red});
        mk(`thumb-${s}`, new THREE.BoxGeometry(0.025,0.05,0.035), [d*0.72,0.04,0.06], [d*1.06,-0.40,0.48], {c:C.red});
        mk(`palm-emitter-${s}`, new THREE.CylinderGeometry(0.030,0.030,0.012,14), [d*0.66,0.06,0.09], [d*1.00,-0.38,0.52], {r:[Math.PI/2,0,0], chr:true, c:C.gl, ec:C.glH, ei:1.5});

        mk(`hip-${s}`, new THREE.BoxGeometry(0.12,0.14,0.16), [d*0.20,0.10,0], [d*0.26,-0.32,0.03], {c:C.red});
        mk(`thigh-${s}`, new THREE.CylinderGeometry(0.13,0.11,0.40,12), [d*0.20,-0.16,0], [d*0.30,-0.56,0.05], {c:C.red});
        mk(`thigh-pnl-${s}`, new THREE.BoxGeometry(0.10,0.18,0.035), [d*0.20,-0.14,0.09], [d*0.30,-0.54,0.16], {c:C.gold});
        mk(`knee-${s}`, new THREE.SphereGeometry(0.07,10,8), [d*0.20,-0.38,0.02], [d*0.32,-0.72,0.12], {c:C.jnt});
        mk(`knee-cap-${s}`, new THREE.BoxGeometry(0.10,0.08,0.05), [d*0.20,-0.38,0.07], [d*0.32,-0.72,0.20], {c:C.gold});
        mk(`shin-${s}`, new THREE.CylinderGeometry(0.10,0.08,0.36,12), [d*0.20,-0.62,0.02], [d*0.34,-0.86,0.10], {c:C.red});
        mk(`shin-grd-${s}`, new THREE.BoxGeometry(0.08,0.20,0.035), [d*0.20,-0.58,0.09], [d*0.34,-0.82,0.20], {c:C.gold});
        mk(`calf-${s}`, new THREE.BoxGeometry(0.08,0.22,0.05), [d*0.20,-0.60,-0.06], [d*0.34,-0.84,-0.12], {c:C.dk});

        const bootShape = shapeFromPts([[0,0.08],[-0.08,0.07],[-0.09,0],[-0.08,-0.07],[-0.05,-0.08],[0.10,-0.08],[0.12,-0.04],[0.10,0.04],[0.06,0.07]]);
        mk(`boot-${s}`, new THREE.ExtrudeGeometry(bootShape, bev(0.16, 0.008)), [d*0.20,-0.86,-0.02], [d*0.36,-0.98,0.22], {r:[Math.PI/2,0,0], c:C.gold});
        mk(`boot-cuff-${s}`, new THREE.CylinderGeometry(0.09,0.10,0.05,12), [d*0.20,-0.80,0.02], [d*0.36,-0.92,0.14], {c:C.red});
        mk(`boot-sole-${s}`, new THREE.BoxGeometry(0.16,0.025,0.30), [d*0.20,-0.95,0.03], [d*0.36,-1.06,0.24], {c:C.jnt});
        mk(`boot-jet-${s}`, new THREE.CylinderGeometry(0.05,0.015,0.04,12), [d*0.20,-0.97,0.03], [d*0.36,-1.10,0.24], {chr:true, c:C.gl, ec:C.glH, ei:1.3});
    });

    // =================================================================
    //  4. BACK
    // =================================================================
    mk("spine", new THREE.BoxGeometry(0.05,0.48,0.05), [0,0.68,-0.18], [0,0.22,-0.50], {c:C.met, chr:true});
    mk("back-upper", new THREE.BoxGeometry(0.46,0.22,0.07), [0,0.84,-0.20], [0,0.38,-0.58], {c:C.red});
    mk("back-lower", new THREE.BoxGeometry(0.40,0.18,0.07), [0,0.56,-0.18], [0,0.06,-0.52], {c:C.dk});
    mk("thruster-pack", new THREE.BoxGeometry(0.34,0.28,0.10), [0,0.72,-0.28], [0,0.30,-0.80], {c:C.met, chr:true});
    mk("nozzle-l", new THREE.CylinderGeometry(0.05,0.08,0.14,14), [-0.10,0.56,-0.36], [-0.22,0.12,-0.88], {r:[Math.PI*0.45,0,0], chr:true, c:C.gl, ec:C.glH, ei:0.9});
    mk("nozzle-r", new THREE.CylinderGeometry(0.05,0.08,0.14,14), [0.10,0.56,-0.36], [0.22,0.12,-0.88], {r:[Math.PI*0.45,0,0], chr:true, c:C.gl, ec:C.glH, ei:0.9});
    mk("back-flap-l", new THREE.BoxGeometry(0.18,0.36,0.02), [-0.20,0.74,-0.24], [-0.48,0.42,-0.66], {r:[0,-Math.PI/10,0], c:C.red});
    mk("back-flap-r", new THREE.BoxGeometry(0.18,0.36,0.02), [0.20,0.74,-0.24], [0.48,0.42,-0.66], {r:[0,Math.PI/10,0], c:C.red});
    mk("flap-acc-l", new THREE.BoxGeometry(0.03,0.26,0.015), [-0.20,0.74,-0.22], [-0.48,0.42,-0.62], {r:[0,-Math.PI/10,0], c:C.gold});
    mk("flap-acc-r", new THREE.BoxGeometry(0.03,0.26,0.015), [0.20,0.74,-0.22], [0.48,0.42,-0.62], {r:[0,Math.PI/10,0], c:C.gold});
    mk("tail-fin", new THREE.BoxGeometry(0.06,0.14,0.02), [0,0.50,-0.32], [0,0.04,-0.76], {c:C.dk});

    return suit;
}

// ==========================================================================
// 6. CUSTOM NATIVE 3D LOADERS (GLB/GLTF/OBJ) & 2D CLOUD TRANSLATOR
// ==========================================================================
const MAX_UPLOAD_MB = 300;

// Route a FileList/array through the importer (first file replaces, rest merge).
function handleUploadFiles(files) {
    const list = Array.from(files || []);
    if (!list.length) return;
    list.forEach((file, index) => processCustomUpload(file, index > 0));
}

// Accept a dropped model/image anywhere on the window, with a fullscreen cue.
function initWindowDropUpload() {
    let overlay = document.getElementById('global-drop-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'global-drop-overlay';
        overlay.innerHTML = `<div class="global-drop-inner">
            <i data-lucide="upload-cloud"></i>
            <div class="global-drop-title"></div>
            <div class="global-drop-sub">.glb · .gltf · .obj · image</div>
        </div>`;
        document.body.appendChild(overlay);
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
    const titleEl = overlay.querySelector('.global-drop-title');

    let dragDepth = 0;
    const hasFiles = (e) => e.dataTransfer && Array.from(e.dataTransfer.types || []).includes('Files');

    window.addEventListener('dragenter', (e) => {
        if (!hasFiles(e)) return;
        e.preventDefault();
        dragDepth++;
        if (titleEl) titleEl.textContent = state.language === 'ko' ? '여기에 드롭하여 임포트' : 'Drop to import';
        overlay.classList.add('active');
    });
    window.addEventListener('dragover', (e) => {
        if (!hasFiles(e)) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });
    window.addEventListener('dragleave', (e) => {
        if (!hasFiles(e)) return;
        dragDepth = Math.max(0, dragDepth - 1);
        if (dragDepth === 0) overlay.classList.remove('active');
    });
    window.addEventListener('drop', (e) => {
        if (!e.dataTransfer) return;
        e.preventDefault();
        dragDepth = 0;
        overlay.classList.remove('active');
        const dz = document.getElementById('drop-zone');
        if (dz) dz.classList.remove('drag-over');
        if (e.dataTransfer.files.length > 0) handleUploadFiles(e.dataTransfer.files);
    });
}

function processCustomUpload(file, merge = false) {
    const filename = file.name.toLowerCase();
    const ext = filename.split('.').pop();

    // Guard against oversized files that would freeze the browser during parse.
    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
        const message = state.language === 'ko'
            ? `파일이 너무 큽니다 (${formatFileSize(file.size)}). 최대 ${MAX_UPLOAD_MB}MB까지 지원합니다.`
            : `File too large (${formatFileSize(file.size)}). Maximum supported size is ${MAX_UPLOAD_MB}MB.`;
        setImportQualityError(file, message);
        showNotification(state.language === 'ko' ? "파일 용량 초과" : "File Too Large", message);
        return;
    }

    playSynthClick(580, 0.08);
    setImportQualityPending(file);

    if (ext === 'glb' || ext === 'gltf') {
        if (state.language === 'ko') {
            addConsoleLog("[시스템] 주입된 GLTF/GLB 3D 제품 데이터를 로드 중입니다...", "info");
        } else {
            addConsoleLog("[SYS] Loading injected GLTF/GLB 3D model...", "info");
        }
        
        showNotification(
            state.language === 'ko' ? "3D 모델 불러오기 시작" : "Loading 3D Model",
            state.language === 'ko' ? "파일 구조 및 자원 맵을 파싱 중입니다..." : "Parsing file structure and nodes map..."
        );
        
        const reader = new FileReader();
        reader.onerror = function() {
            const message = state.language === 'ko' ? "파일을 읽지 못했습니다." : "Could not read the file.";
            setImportQualityError(file, message);
            showNotification(state.language === 'ko' ? "읽기 오류" : "Read Error", message);
        };
        reader.readAsArrayBuffer(file);
        reader.onload = function(e) {
            const contents = e.target.result;
            const loader = new THREE.GLTFLoader();
            loader.parse(contents, '', function(gltf) {
                if (merge && uploadedMeshGroup) {
                    uploadedMeshGroup.add(gltf.scene);
                } else {
                    uploadedMeshGroup = gltf.scene;
                }
                
                // Set standard metallic materials nicely to fit the HOLOSYN studio.
                applyWorkspaceMaterialsToLoadedMesh(uploadedMeshGroup);
                
                state.imageUploaded = false; // Disable image mode, enable 3D mode
                state.customImageParticles = null;
                state.activePreset = 'custom';
                
                // Update Spec Sheet inputs to reflect the filename
                const cleanName = file.name.replace(/\.[^/.]+$/, "");
                const specNameInput = document.getElementById('spec-name');
                if (specNameInput) specNameInput.value = cleanName;
                
                loadPresetModel('custom');
                updateImportQualityFromModel(uploadedMeshGroup, {
                    source: `${cleanName} · ${formatFileSize(file.size)}`,
                    type: '3d',
                    extension: ext,
                    fileSize: file.size
                });

                // Count meshes for diagnostic logging
                let meshCount = 0;
                uploadedMeshGroup.traverse(c => { if (c.isMesh) meshCount++; });

                showNotification(
                    state.language === 'ko' ? "3D 모델 임포트 성공" : "3D Model Loaded",
                    state.language === 'ko' ? `${cleanName} 3D 시제품이 뷰포트에 투사되었습니다.` : `${cleanName} loaded successfully under studio pedestal.`
                );

                if (state.language === 'ko') {
                    addConsoleLog(`[성공] 3D 모델 파일 임포트 완료: [${cleanName}] (메쉬 ${meshCount}개)`, "success");
                } else {
                    addConsoleLog(`[SYS] 3D Model file imported successfully: [${cleanName}] (${meshCount} mesh${meshCount === 1 ? '' : 'es'})`, "success");
                }
            }, function(error) {
                console.error("GLTFLoader error:", error);
                const message = state.language === 'ko' ? "GLB/GLTF 파일 파싱 도중 오류가 발생했습니다." : "Error occurred parsing standard GLB/GLTF nodes.";
                setImportQualityError(file, message);
                showNotification(
                    state.language === 'ko' ? "임포트 오류" : "Load Error",
                    message
                );
            });
        };
    } else if (ext === 'obj') {
        if (state.language === 'ko') {
            addConsoleLog("[시스템] 주입된 OBJ 3D 모델을 로드 중입니다...", "info");
        } else {
            addConsoleLog("[SYS] Loading injected OBJ model...", "info");
        }
        
        showNotification(
            state.language === 'ko' ? "3D 모델 불러오기 시작" : "Loading 3D Model",
            state.language === 'ko' ? "OBJ 다각형 구조 데이터를 해독 중입니다..." : "Parsing OBJ vertex structure..."
        );
        
        const reader = new FileReader();
        reader.onerror = function() {
            const message = state.language === 'ko' ? "파일을 읽지 못했습니다." : "Could not read the file.";
            setImportQualityError(file, message);
            showNotification(state.language === 'ko' ? "읽기 오류" : "Read Error", message);
        };
        reader.readAsArrayBuffer(file);
        reader.onload = function(e) {
            const contents = e.target.result;
            const loader = new THREE.OBJLoader();
            try {
                // Parse array buffer as text decoder
                const decoder = new TextDecoder("utf-8");
                const text = decoder.decode(contents);
                
                uploadedMeshGroup = loader.parse(text);
                applyWorkspaceMaterialsToLoadedMesh(uploadedMeshGroup);
                
                state.imageUploaded = false;
                state.customImageParticles = null;
                state.activePreset = 'custom';
                
                const cleanName = file.name.replace(/\.[^/.]+$/, "");
                const specNameInput = document.getElementById('spec-name');
                if (specNameInput) specNameInput.value = cleanName;
                
                loadPresetModel('custom');
                updateImportQualityFromModel(uploadedMeshGroup, {
                    source: `${cleanName} · ${formatFileSize(file.size)}`,
                    type: '3d',
                    extension: ext,
                    fileSize: file.size
                });
                
                showNotification(
                    state.language === 'ko' ? "3D 모델 임포트 성공" : "3D Model Loaded",
                    state.language === 'ko' ? `${cleanName} 3D 시제품이 뷰포트에 투사되었습니다.` : `${cleanName} loaded successfully under studio pedestal.`
                );
            } catch (error) {
                console.error("OBJLoader error:", error);
                const message = state.language === 'ko' ? "OBJ 파일 형식을 읽는 동안 오류가 발생했습니다." : "Error occurred during OBJ data parse.";
                setImportQualityError(file, message);
                showNotification(
                    state.language === 'ko' ? "임포트 오류" : "Load Error",
                    message
                );
            }
        };
    } else if (file.type.startsWith('image/')) {
        // Run standard pixel point cloud parser
        processCustomImage(file);
    } else {
        const message = state.language === 'ko' ? "3D 파일(.glb, .gltf, .obj) 또는 이미지만 지원됩니다." : "Only 3D models (.glb, .gltf, .obj) or images are supported.";
        setImportQualityError(file, message);
        showNotification(
            state.language === 'ko' ? "지원되지 않는 파일" : "Unsupported File",
            message
        );
    }
}

function autoFitAndCenter(group, targetSize = 2.0) {
    if (!group) return;
    // Reset transform so we measure raw geometry
    group.position.set(0, 0, 0);
    group.scale.set(1, 1, 1);
    group.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(group);
    if (box.isEmpty()) return;

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = targetSize / maxDim;
    group.scale.setScalar(scale);

    // Re-measure after scaling so the recenter accounts for the new bounds
    group.updateMatrixWorld(true);
    const scaledBox = new THREE.Box3().setFromObject(group);
    const scaledCenter = new THREE.Vector3();
    scaledBox.getCenter(scaledCenter);
    // Sit the model on the pedestal: center XZ at origin, bottom at y=0
    group.position.x -= scaledCenter.x;
    group.position.z -= scaledCenter.z;
    group.position.y -= scaledBox.min.y;
}

function applyWorkspaceMaterialsToLoadedMesh(group) {
    if (!group) return;

    // Normalize size & position FIRST so explodedOffset measurements use sane bounds
    autoFitAndCenter(group, 2.0);

    group.name = "custom";
    const activeColor = themeColorObj();
    let partIdx = 0;
    
    group.traverse(child => {
        if (child.isMesh) {
            // Apply standard materials
            const originalImportName = child.userData.originalImportName || child.name || '';
            const cName = originalImportName.toLowerCase();
            const isChromePart = (cName.includes('rotor') || cName.includes('wheel') || cName.includes('gear') || cName.includes('ring') || cName.includes('rim') || cName.includes('rod'));
            child.userData.originalImportName = originalImportName || `Imported Part ${partIdx + 1}`;
            if (!child.userData.productMaterial) {
                child.userData.productMaterial = cloneMaterialSet(child.material);
            }
            
            const solidMat = new THREE.MeshStandardMaterial({
                color: activeColor,
                transparent: true,
                opacity: isChromePart ? 0.85 : 0.65,
                metalness: isChromePart ? 0.95 : 0.25,
                roughness: isChromePart ? 0.08 : 0.55,
                side: THREE.DoubleSide
            });
            
            child.material = solidMat;
            child.userData.solidMaterial = solidMat;
            child.userData.hologramMaterial = solidMat;
            child.userData.hologramOpacity = captureMaterialOpacity(solidMat);
            child.userData.isChrome = isChromePart;
            
            // Set up a dynamic exploded direction radially or vertically
            const box = new THREE.Box3().setFromObject(child);
            const center = new THREE.Vector3();
            box.getCenter(center);
            
            // If the center is far from origin, explode radially, otherwise explode vertically
            const radialOffset = new THREE.Vector3(center.x, 0, center.z).normalize().multiplyScalar(0.7);
            if (radialOffset.lengthSq() < 0.1) {
                child.userData.explodedOffset = new THREE.Vector3(0, (center.y >= 0 ? 0.7 : -0.7), 0);
            } else {
                child.userData.explodedOffset = radialOffset;
            }
            
            child.userData.originalPosition = child.position.clone();
            partIdx++;
        }
    });
    const mappedCount = rebuildCustomPartAnnotations(group);
    if (mappedCount > 0) {
        addConsoleLog(`[PART MAP] Auto-mapped ${mappedCount} imported component${mappedCount === 1 ? '' : 's'} for Part Scan.`, 'info');
    }
}

function processCustomImage(file) {
    if (state.language === 'ko') {
        addConsoleLog("[이미지] 주입된 이미지 픽셀 정보를 해석 중입니다...", "info");
    } else {
        addConsoleLog("[QUANTUM] Decoding injected image binary feed...", "info");
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Higher sampling resolution so complex/detailed images keep their structure
            // (was 80 → coarse relief on photos). 160 ≈ 4× the point/vertex detail.
            const maxDim = 160;
            let w = img.width;
            let h = img.height;
            if (w > h) {
                if (w > maxDim) { h = Math.round(h * maxDim / w); w = maxDim; }
            } else {
                if (h > maxDim) { w = Math.round(w * maxDim / h); h = maxDim; }
            }
            
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(img, 0, 0, w, h);
            
            const imgData = ctx.getImageData(0, 0, w, h);
            const data = imgData.data;
            const pointsList = [];
            const luminances = [];
            const colorsList = []; // Extract normalized RGB values for vertex coloring
            
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const idx = (y * w + x) * 4;
                    const r = data[idx];
                    const g = data[idx+1];
                    const b = data[idx+2];
                    const alpha = data[idx+3];
                    
                    let luminance = 0;
                    if (alpha > 40) {
                        luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
                    }
                    luminances.push(luminance);
                    
                    // Normalize RGB values for Three.js Color Attribute [0.0 - 1.0]
                    colorsList.push(r / 255, g / 255, b / 255);
                    
                    if (alpha > 40 && (r + g + b) > 50) {
                        const posX = ((x / w) - 0.5) * 2.2;
                        const posY = (0.5 - (y / h)) * 2.2;
                        const posZ = (luminance - 0.5) * 0.25;
                        
                        pointsList.push(new THREE.Vector3(posX, posY, posZ));
                    }
                }
            }
            
            state.customImageParticles = pointsList;
            state.customImageLuminances = luminances;
            state.customImageColors = colorsList; // Save colors to state
            state.customImageGridSize = { w: w, h: h };
            state.customImageBase64 = event.target.result; // Cache base64 string for IndexedDB
            state.customImageTexture = new THREE.TextureLoader().load(event.target.result);
            state.customImageTexture.minFilter = THREE.LinearFilter;
            state.customImageTexture.encoding = THREE.sRGBEncoding;

            // Reset uploaded GLB mesh group if using image fallback
            uploadedMeshGroup = null;
            state.imageUploaded = true;
            if (state.language === 'ko') {
                addConsoleLog(`[이미지] 이미지 가공 완료. ${pointsList.length}개의 발광 좌표 데이터를 생성했습니다.`, "success");
            } else {
                addConsoleLog(`[QUANTUM] Extraction complete. Scanned ${pointsList.length} glowing light coordinates.`, "success");
            }
            
            state.activePreset = 'custom';
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            
            const specNameInput = document.getElementById('spec-name');
            if (specNameInput) {
                const cleanName = file.name.replace(/\.[^/.]+$/, "");
                specNameInput.value = cleanName;
            }
            
            loadPresetModel('custom');
            updateImportQualityFromModel(activeModelGroup?.children?.[0] || null, {
                source: `${file.name.replace(/\.[^/.]+$/, "")} · ${formatFileSize(file.size)}`,
                type: 'image',
                extension: file.name.split('.').pop(),
                fileSize: file.size,
                note: state.language === 'ko'
                    ? '이미지 기반 포인트/볼륨 투사로 PNG 캡처와 콘셉트 보드 시연에 적합합니다.'
                    : 'Image projection is best for PNG capture and concept-board demos.'
            });
            playSynthSweep(150, 1400, 0.9);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// Convert extracted pixel coordinates into standard Three.js Point clouds
function createCustomImageGeometry() {
    const customGroup = new THREE.Group();
    customGroup.name = "custom";
    
    const w = state.customImageGridSize ? state.customImageGridSize.w : 0;
    const h = state.customImageGridSize ? state.customImageGridSize.h : 0;
    const lums = state.customImageLuminances || [];
    const colors = state.customImageColors || [];
    
    if (w > 0 && h > 0 && lums.length > 0) {
        // 1. Build Extruded 3D Heightfield Surface
        const surfaceGeo = new THREE.PlaneGeometry(2.2, 2.2, w - 1, h - 1);
        const posAttr = surfaceGeo.attributes.position;
        
        // Elevate vertices along Z-axis by luminance dynamically (v3.9)
        for (let i = 0; i < posAttr.count; i++) {
            const xIdx = i % w;
            const yIdx = Math.floor(i / w);
            const pixelIdx = yIdx * w + xIdx;
            const lum = lums[pixelIdx] || 0.0;

            // Smoothstep contrast curve spreads mid-tones so complex images read as
            // cleaner, deeper relief instead of a flat/noisy luminance bump.
            const shaped = lum * lum * (3 - 2 * lum);
            posAttr.setZ(i, shaped * state.customImageExtrusion * 1.35);
        }
        
        // Apply color mapping if vertex colors are extracted
        if (colors.length > 0) {
            surfaceGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        }
        
        surfaceGeo.computeVertexNormals();
        
        // Select custom responsive material to project full-color textures
        let meshMaterial;
        if (state.customImageTexture) {
            if (state.renderMode === 'solid') {
                // Self-illuminate the image in ITS OWN colors (emissiveMap = the texture)
                // so complex/detailed images keep their detail instead of being washed
                // out by a flat theme-color glow. This is the correct holographic look.
                meshMaterial = new THREE.MeshStandardMaterial({
                    map: state.customImageTexture,
                    emissive: new THREE.Color(0xffffff),
                    emissiveMap: state.customImageTexture,
                    emissiveIntensity: 0.7, // self-lit hologram; bloom threshold is raised for images so detail survives
                    transparent: true,
                    opacity: 0.98,
                    metalness: 0.15,
                    roughness: 0.72,
                    side: THREE.DoubleSide
                });
            } else if (state.renderMode === 'wireframe') {
                meshMaterial = new THREE.MeshBasicMaterial({
                    map: state.customImageTexture,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.65 * state.glowIntensity,
                    side: THREE.DoubleSide
                });
            } else {
                meshMaterial = state.renderMode === 'solid' ? hologramMaterials.solid : hologramMaterials.wireframe;
            }
        } else {
            meshMaterial = state.renderMode === 'solid' ? hologramMaterials.solid : hologramMaterials.wireframe;
        }
        const productImageMaterial = state.customImageTexture
            ? new THREE.MeshStandardMaterial({
                map: state.customImageTexture,
                color: 0xffffff,
                emissive: new THREE.Color(0xffffff),
                emissiveMap: state.customImageTexture,
                emissiveIntensity: 0.12,
                transparent: false,
                opacity: 1,
                metalness: 0.05,
                roughness: 0.68,
                side: THREE.DoubleSide
            })
            : cloneMaterialSet(meshMaterial);
        
        const surfaceMesh = new THREE.Mesh(surfaceGeo, meshMaterial);
        surfaceMesh.name = "generic-1"; // Essential for matching annotation logic
        surfaceMesh.userData.hologramMaterial = meshMaterial;
        surfaceMesh.userData.hologramOpacity = captureMaterialOpacity(meshMaterial);
        surfaceMesh.userData.productMaterial = productImageMaterial;
        
        surfaceMesh.userData.originalPosition = new THREE.Vector3(0, 0, 0);
        surfaceMesh.userData.explodedOffset = new THREE.Vector3(0, 0.4, 0); // Displace Y (local Z) for exploded view!
        surfaceMesh.rotation.x = -Math.PI / 2; // Flat horizontal facing upwards on pedestal
        customGroup.add(surfaceMesh);
        
        // 2. Build 3D Solid Side Walls to create real 3D Volume & Thickness!
        const wallVertices = [];
        const wallColors = [];
        const wallUVs = [];
        const wallIndices = [];
        
        // Trace the perimeter of PlaneGeometry in orderly sequence
        const boundaryIndices = [];
        // Top edge: x from 0 to w-1
        for (let x = 0; x < w; x++) boundaryIndices.push(0 * w + x);
        // Right edge: y from 1 to h-1
        for (let y = 1; y < h; y++) boundaryIndices.push(y * w + (w - 1));
        // Bottom edge: x from w-2 down to 0
        for (let x = w - 2; x >= 0; x--) boundaryIndices.push((h - 1) * w + x);
        // Left edge: y from h-2 down to 1
        for (let y = h - 2; y >= 1; y--) boundaryIndices.push(y * w + 0);
        
        if (boundaryIndices.length > 0) {
            boundaryIndices.push(boundaryIndices[0]); // Seal loop closure
        }
        
        let vertCount = 0;
        for (let i = 0; i < boundaryIndices.length - 1; i++) {
            const idxA = boundaryIndices[i];
            const idxB = boundaryIndices[i+1];
            
            const Ax = posAttr.getX(idxA);
            const Ay = posAttr.getY(idxA);
            const Az = posAttr.getZ(idxA);
            
            const Bx = posAttr.getX(idxB);
            const By = posAttr.getY(idxB);
            const Bz = posAttr.getZ(idxB);
            
            // Wall Quad Vertices (top elevated edge to flat Z=0 bottom edge)
            wallVertices.push(Ax, Ay, Az);
            wallVertices.push(Bx, By, Bz);
            wallVertices.push(Bx, By, 0.0);
            wallVertices.push(Ax, Ay, 0.0);
            
            // Map UV mapping coordinates matching image outline borders
            const xA = idxA % w;
            const yA = Math.floor(idxA / w);
            const xB = idxB % w;
            const yB = Math.floor(idxB / w);
            wallUVs.push(xA / w, 1.0 - (yA / h));
            wallUVs.push(xB / w, 1.0 - (yB / h));
            wallUVs.push(xB / w, 1.0 - (yB / h));
            wallUVs.push(xA / w, 1.0 - (yA / h));
            
            // Inject vertex colors on walls
            if (colors.length > 0) {
                const colorIdxA = idxA * 3;
                const colorIdxB = idxB * 3;
                wallColors.push(colors[colorIdxA], colors[colorIdxA+1], colors[colorIdxA+2]);
                wallColors.push(colors[colorIdxB], colors[colorIdxB+1], colors[colorIdxB+2]);
                // Blend bottom with ambient shadow color
                wallColors.push(colors[colorIdxB] * 0.3, colors[colorIdxB+1] * 0.3, colors[colorIdxB+2] * 0.3);
                wallColors.push(colors[colorIdxA] * 0.3, colors[colorIdxA+1] * 0.3, colors[colorIdxA+2] * 0.3);
            }
            
            // Map indices for two triangles
            const baseIndex = vertCount;
            wallIndices.push(baseIndex, baseIndex + 1, baseIndex + 2);
            wallIndices.push(baseIndex, baseIndex + 2, baseIndex + 3);
            
            vertCount += 4;
        }
        
        const wallGeo = new THREE.BufferGeometry();
        wallGeo.setAttribute('position', new THREE.Float32BufferAttribute(wallVertices, 3));
        wallGeo.setAttribute('uv', new THREE.Float32BufferAttribute(wallUVs, 2));
        if (wallColors.length > 0) {
            wallGeo.setAttribute('color', new THREE.Float32BufferAttribute(wallColors, 3));
        }
        wallGeo.setIndex(wallIndices);
        wallGeo.computeVertexNormals();
        
        const wallMesh = new THREE.Mesh(wallGeo, meshMaterial);
        wallMesh.name = "generic-1-walls";
        wallMesh.userData.hologramMaterial = meshMaterial;
        wallMesh.userData.hologramOpacity = captureMaterialOpacity(meshMaterial);
        wallMesh.userData.productMaterial = productImageMaterial;
        wallMesh.userData.originalPosition = new THREE.Vector3(0, 0, 0);
        wallMesh.userData.explodedOffset = new THREE.Vector3(0, 0.4, 0);
        wallMesh.rotation.x = -Math.PI / 2;
        customGroup.add(wallMesh);
        
        // 3. Flat Bottom Cap to seal the volume 100% closed
        const bottomCapGeo = new THREE.PlaneGeometry(2.2, 2.2, w - 1, h - 1);
        if (colors.length > 0) {
            const darkColors = colors.map(val => val * 0.25); // Sci-fi shadow base
            bottomCapGeo.setAttribute('color', new THREE.Float32BufferAttribute(darkColors, 3));
        }
        const bottomCapMesh = new THREE.Mesh(bottomCapGeo, meshMaterial);
        bottomCapMesh.name = "generic-1-bottomcap";
        bottomCapMesh.userData.hologramMaterial = meshMaterial;
        bottomCapMesh.userData.hologramOpacity = captureMaterialOpacity(meshMaterial);
        bottomCapMesh.userData.productMaterial = productImageMaterial;
        bottomCapMesh.userData.originalPosition = new THREE.Vector3(0, 0, 0);
        bottomCapMesh.userData.explodedOffset = new THREE.Vector3(0, 0.4, 0);
        bottomCapMesh.rotation.x = Math.PI / 2; // Face downwards
        customGroup.add(bottomCapMesh);
        
        // 4. Build 3D Point Cloud with authentic pixel colors for stunning spatial scattering
        const ptGeo = surfaceGeo.clone();
        let ptMaterial;
        
        if (colors.length > 0) {
            ptMaterial = new THREE.PointsMaterial({
                size: 0.028,
                vertexColors: true,
                transparent: true,
                opacity: 0.95 * state.glowIntensity,
                blending: THREE.AdditiveBlending
            });
        } else {
            ptMaterial = hologramMaterials.points;
        }
        
        const ptCloud = new THREE.Points(ptGeo, ptMaterial);
        ptCloud.name = "generic-1-sparkles";
        ptCloud.userData.originalPosition = new THREE.Vector3(0, 0, 0);
        ptCloud.userData.explodedOffset = new THREE.Vector3(0, 0.4, 0);
        ptCloud.rotation.x = -Math.PI / 2;
        customGroup.add(ptCloud);
        
        // 5. Build Flat base platform
        const baseGeo = new THREE.PlaneGeometry(2.2, 2.2, w - 1, h - 1);
        const baseMesh = new THREE.Mesh(baseGeo, hologramMaterials.wireframe);
        baseMesh.name = "generic-2";
        baseMesh.position.y = -0.4;
        baseMesh.userData.originalPosition = new THREE.Vector3(0, -0.4, 0);
        baseMesh.userData.explodedOffset = new THREE.Vector3(0, -0.4, 0);
        baseMesh.rotation.x = -Math.PI / 2;
        customGroup.add(baseMesh);
        
        // 6. Emitter rays connecting base vertices to elevated surface vertices
        const rayPositions = [];
        const rayGeo = new THREE.BufferGeometry();
        
        const basePosAttr = baseGeo.attributes.position;
        for (let i = 0; i < posAttr.count; i += 4) {
            const sx = posAttr.getX(i);
            const sy = posAttr.getY(i);
            const sz = posAttr.getZ(i);
            
            const bx = basePosAttr.getX(i);
            const by = basePosAttr.getY(i);
            const bz = basePosAttr.getZ(i);
            
            rayPositions.push(bx, by, bz - 0.4);
            rayPositions.push(sx, sy, sz); 
        }
        
        rayGeo.setAttribute('position', new THREE.Float32BufferAttribute(rayPositions, 3));
        const rayMat = new THREE.LineBasicMaterial({
            color: themeColorObj(),
            transparent: true,
            opacity: 0.25 * state.glowIntensity
        });
        const rays = new THREE.LineSegments(rayGeo, rayMat);
        rays.name = "generic-rays";
        rays.rotation.x = -Math.PI / 2;
        customGroup.add(rays);
    } else {
        // Fallback placeholder if no image data parsed
        const tempGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const tempMesh = buildHologramNode(tempGeo, true);
        tempMesh.name = "generic-1";
        customGroup.add(tempMesh);
    }
    
    // Correctly apply standard coordinates positioning to float nicely on pedestal
    customGroup.traverse(child => {
        if (child.userData.originalPosition && child.position) {
            child.position.copy(child.userData.originalPosition);
        }
    });
    
    return customGroup;
}

// Apply Exploded sliders displacements
function updateExplodedTranslations(group) {
    if (!group) return;
    const focused = state.partScanActive ? getCurrentPartScanAnnotation() : null;
    const focusedName = focused?.name || null;
    
    group.traverse(child => {
        if ((child instanceof THREE.Group || child instanceof THREE.Mesh || child instanceof THREE.Points) && child.userData.explodedOffset && child.userData.originalPosition) {
            const focusBoost = focusedName && isNodeInsidePart(child, focusedName) ? 0.42 : 0;
            child.position.copy(child.userData.originalPosition)
                .addScaledVector(child.userData.explodedOffset, state.explodedLevel + focusBoost);
        }
    });
}

// ==========================================================================
// 7. ANIMATION & RENDER TICK LOOP & ANNOTATION DRAWER
// ==========================================================================
let tempVector = new THREE.Vector3();
let editingPartName = null; // Global tracking for editing state

function editAnnotation(ann, badgeEl) {
    if (editingPartName) return; // Only edit one at a time
    
    editingPartName = ann.name;
    badgeEl.classList.add('editing');
    
    // Disable OrbitControls to prevent rotating camera while typing
    if (controls) controls.enabled = false;
    
    const currentText = ann.label;
    badgeEl.textContent = '';
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'annotation-edit-input';
    input.value = currentText;
    input.setAttribute('aria-label', state.language === 'ko' ? '파트 라벨 편집' : 'Edit part label');
    badgeEl.appendChild(input);
    
    input.focus();
    input.select();
    
    function commitEdit() {
        if (!editingPartName) return;
        const newText = input.value.trim().slice(0, 80) || currentText;
        ann.label = newText;
        saveAnnotationLabel(state.activePreset, ann.name, newText);
        
        badgeEl.textContent = newText;
        badgeEl.classList.remove('editing');
        
        editingPartName = null;
        if (controls) controls.enabled = true;
        
        showNotification(
            state.language === 'ko' ? "부품 정보 업데이트" : "Part Label Updated",
            state.language === 'ko' ? `부품 정보가 '${newText}'(으)로 갱신되었습니다.` : `Updated component spec label to '${newText}'.`
        );
        
        if (state.language === 'ko') {
            addConsoleLog(`[정보] 부품 스펙 라벨 수정 완료: [${ann.name}] -> [${newText}]`, "info");
        } else {
            addConsoleLog(`[SYS] Component spec label updated: [${ann.name}] -> [${newText}]`, "info");
        }
    }
    
    function cancelEdit() {
        if (!editingPartName) return;
        badgeEl.textContent = currentText;
        badgeEl.classList.remove('editing');
        
        editingPartName = null;
        if (controls) controls.enabled = true;
    }
    
    // Bind enter and escape keys
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            commitEdit();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            cancelEdit();
        }
        e.stopPropagation();
    });
    
    // Commit on blur
    input.addEventListener('blur', () => {
        commitEdit();
    });
}

function renderAnnotations() {
    const container = document.getElementById('annotations-container');
    if (!container) return;
    
    // Clear container if Exploded view is disabled (< 15%) or in Pepper's Ghost mode
    if (state.explodedLevel < 0.15 || state.isPyramidMode || !activeModelGroup || activeModelGroup.children.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    const preset = state.activePreset;
    const annList = partAnnotations[preset] || [];
    
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // Check if we need to initialize or rebuild the DOM structure
    let svgEl = container.querySelector('.annotation-svg');
    let badges = container.querySelectorAll('.annotation-badge');
    
    // If mismatch, rebuild entirely
    if (!svgEl || badges.length !== annList.length || (badges.length > 0 && badges[0].getAttribute('data-preset') !== preset)) {
        container.innerHTML = '';
        
        // Re-create SVG overlay
        const svgNS = "http://www.w3.org/2000/svg";
        svgEl = document.createElementNS(svgNS, "svg");
        svgEl.setAttribute("class", "annotation-svg");
        svgEl.setAttribute("style", "width:100%; height:100%; position:absolute; pointer-events:none; top:0; left:0; z-index:10;");
        container.appendChild(svgEl);
        
        annList.forEach((ann) => {
            // Create Path element in SVG
            const path = document.createElementNS(svgNS, "path");
            path.setAttribute("class", `annotation-path-${ann.name}`);
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", state.themeColor);
            path.setAttribute("stroke-width", "1.2");
            path.setAttribute("stroke-dasharray", "3,3");
            path.setAttribute("opacity", "0.75");
            path.setAttribute("style", `filter: drop-shadow(0 0 2px ${state.themeColor});`);
            svgEl.appendChild(path);
            
            // Create Circle element in SVG
            const circle = document.createElementNS(svgNS, "circle");
            circle.setAttribute("class", `annotation-circle-${ann.name}`);
            circle.setAttribute("r", "3.5");
            circle.setAttribute("fill", state.themeColor);
            circle.setAttribute("style", `filter: drop-shadow(0 0 4px ${state.themeColor});`);
            svgEl.appendChild(circle);
            
            // Create Div Badge
            const badge = document.createElement("div");
            badge.setAttribute("class", "annotation-badge visible");
            badge.setAttribute("data-part-name", ann.name);
            badge.setAttribute("data-preset", preset);
            badge.innerText = ann.label;
            
            // Add double-click listener for interactive edit
            badge.addEventListener('dblclick', () => {
                editAnnotation(ann, badge);
            });
            
            container.appendChild(badge);
        });
        
        // Fetch newly created nodes
        badges = container.querySelectorAll('.annotation-badge');
    }
    
    // Loop over components and dynamically reposition them
    const focusedPart = state.partScanActive ? getCurrentPartScanAnnotation() : null;
    const focusedPartName = focusedPart?.name || null;
    annList.forEach((ann) => {
        let targetMesh = null;
        const badge = container.querySelector(`.annotation-badge[data-part-name="${ann.name}"]`);
        const path = svgEl.querySelector(`.annotation-path-${ann.name}`);
        const circle = svgEl.querySelector(`.annotation-circle-${ann.name}`);
        const isPartScanFocus = focusedPartName && ann.name === focusedPartName;

        if (badge) {
            badge.classList.toggle('part-scan-focus', !!isPartScanFocus);
        }

        if (focusedPartName && !isPartScanFocus) {
            if (badge) badge.style.display = 'none';
            if (path) path.style.display = 'none';
            if (circle) circle.style.display = 'none';
            return;
        }
        
        // Find matching child mesh inside activeModelGroup
        activeModelGroup.traverse(child => {
            if ((child.name === ann.name || child.parent.name === ann.name) && (child.isMesh || child instanceof THREE.Points)) {
                targetMesh = child;
            }
        });
        
        if (targetMesh) {
            // Get 3D world position of part
            tempVector.setFromMatrixPosition(targetMesh.matrixWorld);
            
            // Calculate starting 3D point of label connection slightly offset
            const start3D = tempVector.clone();
            const end3D = tempVector.clone().add(ann.offset.clone().multiplyScalar(state.explodedLevel * 1.5));
            
            // Project to screen space
            const start2D = start3D.project(camera);
            const startX = (start2D.x * 0.5 + 0.5) * containerWidth;
            const startY = (start2D.y * -0.5 + 0.5) * containerHeight;
            
            const end2D = end3D.project(camera);
            const endX = (end2D.x * 0.5 + 0.5) * containerWidth;
            const endY = (end2D.y * -0.5 + 0.5) * containerHeight;
            
            // Check if behind camera
            if (start2D.z <= 1.0 && end2D.z <= 1.0) {
                if (badge) {
                    badge.style.left = `${endX}px`;
                    badge.style.top = `${endY}px`;
                    badge.style.display = 'flex'; // Use flex for alignment (dot + text)
                    // Update content if not editing
                    if (editingPartName !== ann.name) {
                        badge.innerText = ann.label;
                    }
                }
                
                if (path && circle) {
                    const dx = endX - startX;
                    const dy = endY - startY;
                    const controlX = startX + dx * 0.25;
                    const controlY = startY + dy * 0.75;
                    
                    path.setAttribute("d", `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`);
                    path.setAttribute("stroke", state.themeColor);
                    path.setAttribute("style", `filter: drop-shadow(0 0 2px ${state.themeColor});`);
                    
                    circle.setAttribute("cx", startX);
                    circle.setAttribute("cy", startY);
                    circle.setAttribute("fill", state.themeColor);
                    circle.setAttribute("style", `filter: drop-shadow(0 0 4px ${state.themeColor});`);
                    
                    path.style.display = 'block';
                    circle.style.display = 'block';
                }
            } else {
                if (badge) badge.style.display = 'none';
                if (path) path.style.display = 'none';
                if (circle) circle.style.display = 'none';
            }
        } else {
            if (badge) badge.style.display = 'none';
            if (path) path.style.display = 'none';
            if (circle) circle.style.display = 'none';
        }
    });
}

// Glassmorphic 3D Caliper midpoint projection renderer (v3.7)
function renderCaliperBadge() {
    const container = document.getElementById('annotations-container');
    if (!container || calipersList.length === 0) return;
    
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    calipersList.forEach(caliper => {
        const badge = caliper.badgeEl || container.querySelector(`.caliper-badge[data-caliper-id="${caliper.id}"]`);
        if (!badge) return;

        // Midpoint in world space
        const mid3D = new THREE.Vector3().addVectors(caliper.start, caliper.end).multiplyScalar(0.5);
        const mid2D = mid3D.project(camera);
        const midX = (mid2D.x * 0.5 + 0.5) * containerWidth;
        const midY = (mid2D.y * -0.5 + 0.5) * containerHeight;

        if (mid2D.z <= 1.0) {
            badge.style.left = `${midX}px`;
            badge.style.top = `${midY}px`;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });
}

function renderLoop(timestamp, frame) {
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();
    
    // V10 Premium Core: Process hand tracking
    if (window.updateHandGestures) window.updateHandGestures();
    
    // V9.1 Polish: AR Hit-test processing
    if (frame && window.arReticle) {
        const referenceSpace = renderer.xr.getReferenceSpace();
        const session = renderer.xr.getSession();
        
        if (window.hitTestSourceRequested === false) {
            session.requestReferenceSpace('viewer').then((refSpace) => {
                session.requestHitTestSource({ space: refSpace }).then((source) => {
                    window.hitTestSource = source;
                });
            });
            session.addEventListener('end', () => {
                window.hitTestSourceRequested = false;
                window.hitTestSource = null;
            });
            window.hitTestSourceRequested = true;
        }
        
        if (window.hitTestSource) {
            const hitTestResults = frame.getHitTestResults(window.hitTestSource);
            if (hitTestResults.length > 0) {
                const hit = hitTestResults[0];
                window.arReticle.visible = true;
                window.arReticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
            } else {
                window.arReticle.visible = false;
            }
        }
    }
    
    updateFpsCounter(); // v3.8: FPS tracking
    updateTimelinePlayback(); // v8.0: Timeline keyframe interpolation
    
    // Update active quantum shockwave spark particles physics (v5.0)
    if (activeModelGroup) {
        updateShockwaveParticlesPhysics(delta);
    }
    
    // Real-time spatial rotation hum frequency modulation (v4.0)
    if (controls && ambientOsc && filterNode && state.isSoundOn) {
        if (!window.lastCameraPos) {
            window.lastCameraPos = new THREE.Vector3().copy(camera.position);
        }
        const dist = camera.position.distanceTo(window.lastCameraPos);
        const dragMomentum = Math.min(dist * 18, 1.0); // Normalize velocity momentum
        
        // Modulate baseline 55Hz pitch to 110Hz based on rotation momentum
        const targetFreq = 55 + (dragMomentum * 55);
        // Brighten low-pass cutoff filter up to 380Hz on high speeds to simulate wind friction
        const targetFilterFreq = 105 + (dragMomentum * 275);
        
        ambientOsc.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.08);
        filterNode.frequency.setTargetAtTime(targetFilterFreq, audioCtx.currentTime, 0.08);
        
        window.lastCameraPos.copy(camera.position);
    }
    
    if (controls) controls.update();
    
    // Broadcast camera state in collaboration mode
    if (typeof CollabManager !== 'undefined' && CollabManager.isActive && !state.timelinePlaying) {
        if (!window.lastBroadcastCameraPos) {
            window.lastBroadcastCameraPos = new THREE.Vector3();
            window.lastBroadcastCameraTarget = new THREE.Vector3();
            window.lastBroadcastTime = 0;
        }
        const now = Date.now();
        if (now - window.lastBroadcastTime > 80) { // 12fps camera sync
            const posChanged = camera.position.distanceTo(window.lastBroadcastCameraPos) > 0.005;
            const targetChanged = controls.target.distanceTo(window.lastBroadcastCameraTarget) > 0.005;
            
            if (posChanged || targetChanged) {
                CollabManager.broadcast({
                    type: 'camera',
                    position: { x: camera.position.x, y: camera.position.y, z: camera.position.z },
                    target: { x: controls.target.x, y: controls.target.y, z: controls.target.z }
                });
                window.lastBroadcastCameraPos.copy(camera.position);
                window.lastBroadcastCameraTarget.copy(controls.target);
                window.lastBroadcastTime = now;
            }
        }
    }
    
    // 1. Smoothly Interpolate (Lerp) camera positions during cinematic glide pans
    if (state.cameraMode !== 'orbit' && targetCameraPosition) {
        camera.position.lerp(targetCameraPosition, 0.05); // Smooth 5% lerp per frame
        controls.target.lerp(targetCameraTarget, 0.05);
    }
    
    // 2. Auto-Orbit Camera rotation mode or Showcase presenter float adjustments
    if (activeModelGroup && !state.isPyramidMode) {
        const rotSpeed = state.rotationSpeed;
        if (state.cameraMode === 'orbit') {
            activeModelGroup.rotation.y += delta * 0.45 * rotSpeed;
        }
        
        // Performance Optimization: Direct cache iteration to eliminate per-frame traverse (Phase F)
        const cache = animatedNodesCache;
        for (let i = 0, len = cache.rotors.length; i < len; i++) {
            cache.rotors[i].rotation.y += delta * 15 * rotSpeed;
        }
        for (let i = 0, len = cache.gyro1s.length; i < len; i++) {
            cache.gyro1s[i].rotation.x += delta * 0.8 * rotSpeed;
            cache.gyro1s[i].rotation.y += delta * 0.4 * rotSpeed;
        }
        for (let i = 0, len = cache.gyro2s.length; i < len; i++) {
            cache.gyro2s[i].rotation.y -= delta * 1.2 * rotSpeed;
            cache.gyro2s[i].rotation.z += delta * 0.6 * rotSpeed;
        }
        for (let i = 0, len = cache.gyroCores.length; i < len; i++) {
            cache.gyroCores[i].rotation.x -= delta * 0.3;
            cache.gyroCores[i].position.y = Math.sin(elapsedTime * 2.5) * 0.08;
        }
        for (let i = 0, len = cache.nodes.length; i < len; i++) {
            const node = cache.nodes[i];
            const angle = elapsedTime * 0.8 * rotSpeed + (node.index / 4) * Math.PI * 2;
            node.mesh.position.set(Math.cos(angle) * 1.5, Math.sin(elapsedTime * 2) * 0.15, Math.sin(angle) * 1.5);
        }
        for (let i = 0, len = cache.plasmaRing1s.length; i < len; i++) {
            cache.plasmaRing1s[i].rotation.x += delta * 1.4 * rotSpeed;
        }
        for (let i = 0, len = cache.plasmaRing2s.length; i < len; i++) {
            cache.plasmaRing2s[i].rotation.y -= delta * 1.2 * rotSpeed;
        }
        
        // Calculate organic oscillation float height
        let targetFloat = 0.15;
        if (state.isShowcaseMode && presentationStep === 2) {
            targetFloat = 0.95; // Float prototype much higher in step 2!
        }
        
        const curY = activeModelGroup.position.y;
        const osc = Math.sin(elapsedTime * 1.5) * 0.1;
        const targetY = targetFloat + osc;
        activeModelGroup.position.y += (targetY - curY) * 0.05; // Lerp floating heights!
    }
    
    // 3. Gyroscopic Targeting Reticles rotation & parallax lag (v7.0)
    if (reticleGroup && reticleGroup.visible) {
        reticleGroup.position.lerp(activeModelGroup.position, 0.12);
        
        // Performance Optimization: Use cached reticle nodes to avoid getObjectByName traversal (Phase F)
        const rOuter = reticleOuterCached || reticleGroup.getObjectByName("reticle-outer");
        const rMiddle = reticleMiddleCached || reticleGroup.getObjectByName("reticle-middle");
        const rInner = reticleInnerCached || reticleGroup.getObjectByName("reticle-inner");
        
        if (rOuter) rOuter.rotation.z += delta * 0.16 * state.rotationSpeed;
        if (rMiddle) {
            rMiddle.rotation.y = Math.sin(elapsedTime * 1.2) * 0.08;
            rMiddle.rotation.z -= delta * 0.24 * state.rotationSpeed;
        }
        if (rInner) {
            rInner.rotation.x = Math.PI / 2 + Math.cos(elapsedTime * 2.2) * 0.06;
            rInner.rotation.y += delta * 0.45 * state.rotationSpeed;
            rInner.material.opacity = 0.2 + Math.sin(elapsedTime * 4.0) * 0.1;
        }
    }
    
    // Volumetric Projector Laser beam ticks (v7.0)
    updateVolumetricLaserBeam(delta, elapsedTime);
    
    // 4. AI scanning laser plane sweeping (v3.4)
    if (scanningPlane) {
        if (state.isScanning) {
            // Sweep Y-axis organically
            const sweepHeight = Math.sin(elapsedTime * 3.8) * 1.1;
            scanningPlane.position.y = activeModelGroup.position.y + sweepHeight;
            scanningPlane.material.opacity = 0.65;
            
            // Fast chromatic cycle for core projection grid
            const scanColor = new THREE.Color();
            scanColor.setHSL((elapsedTime * 0.4) % 1.0, 0.95, 0.5);
            scanningPlane.material.color.copy(scanColor);
        } else {
            scanningPlane.material.opacity = 0.0;
        }
    }
    
    // 5. Holographic Scan Dome animations (v5.0)
    if (scanDomeGroup && scanDomeGroup.visible) {
        // Rotate rings in counter-directions
        if (scanRingOuter) {
            scanRingOuter.rotation.y += delta * 0.12 * state.rotationSpeed;
        }
        if (scanRingInner) {
            scanRingInner.rotation.y -= delta * 0.22 * state.rotationSpeed;
            scanRingInner.rotation.z += delta * 0.08 * state.rotationSpeed;
        }
        
        // Pulse scale of outer dome during AI SCANNING
        if (scanDomeCage) {
            if (state.isScanning) {
                scanDomePulseTime += delta * 5.0; // Faster pulse during active scan
                const scaleVal = 1.0 + Math.sin(scanDomePulseTime) * 0.06;
                scanDomeCage.scale.set(scaleVal, scaleVal, scaleVal);
                // Also slightly brighten/fade the opacity
                scanDomeCage.material.opacity = 0.12 + Math.sin(scanDomePulseTime) * 0.04;
            } else {
                // Gentle slow background pulse
                scanDomePulseTime += delta * 1.5;
                const scaleVal = 1.0 + Math.sin(scanDomePulseTime) * 0.02;
                scanDomeCage.scale.set(scaleVal, scaleVal, scaleVal);
                scanDomeCage.material.opacity = 0.10 + Math.sin(scanDomePulseTime) * 0.02;
            }
        }
    }
    
    // Dynamic thermal infrared vertex shading updates (v3.5)
    updateThermalShading(elapsedTime);
    
    // Smoothly interpolate gyroscope 3D perspective shift (Phase E)
    if (typeof currentGyroShift !== 'undefined' && typeof targetGyroShift !== 'undefined') {
        currentGyroShift.lerp(targetGyroShift, 0.1);
        if (activeModelGroup) {
            const floatY = state.floatHeight !== undefined ? state.floatHeight : 0.15;
            activeModelGroup.position.set(currentGyroShift.x, floatY + currentGyroShift.y, currentGyroShift.z);
            activeModelGroup.rotation.z = currentGyroShift.x * 0.3; // tilt roll
            activeModelGroup.rotation.x = currentGyroShift.y * 0.3; // tilt pitch
        }
    }

    processHologramStability(elapsedTime);
    updateTelemetryHUD();
    
    // v6.0 Premium Engineering Suite frame loop updates
    updateWindTunnelFlow(delta);
    updateAssemblyTween(delta);
    updateCalloutAnnotations();
    
    // Draw part annotation lines on viewport overlay (New v3.2)
    renderAnnotations();
    renderCaliperBadge();
    
    // Animate studio environment assets (v3.7)
    if (state.studioEnvironment === 'cyberpunk' && envParticles) {
        const pos = envParticles.geometry.attributes.position.array;
        for (let i = 1; i < pos.length; i += 3) {
            pos[i] += delta * 0.25;
            if (pos[i] > 2.2) pos[i] = -1.5;
        }
        envParticles.geometry.attributes.position.needsUpdate = true;
    }
    
    // Viewport render
    if (renderer && scene && camera && !state.isPyramidMode) {
        if (composer) {
            // V9.1 Polish: Cinematic Glow Pulse.
            // While projecting an image, raise the bloom threshold and soften strength
            // so complex images keep their detail (only true highlights bloom).
            if (bloomPass) {
                if (state.materialView === 'product') {
                    bloomPass.threshold = 0.64;
                    bloomPass.strength = state.visualQualityBoost ? 0.42 : 0.34;
                    bloomPass.radius = 0.32;
                } else if (state.materialView === 'hybrid') {
                    bloomPass.threshold = 0.42;
                    bloomPass.strength = state.visualQualityBoost ? 0.82 : 0.68;
                    bloomPass.radius = 0.44;
                } else if (state.imageUploaded) {
                    bloomPass.threshold = state.visualQualityBoost ? 0.68 : 0.72;
                    bloomPass.strength = (state.visualQualityBoost ? 0.68 : 0.55) + Math.sin(elapsedTime * 3.0) * 0.08;
                    bloomPass.radius = state.visualQualityBoost ? 0.48 : 0.5;
                } else {
                    bloomPass.threshold = state.visualQualityBoost ? 0.16 : 0.2;
                    bloomPass.strength = (state.visualQualityBoost ? 1.38 : 1.2) + Math.sin(elapsedTime * 3.0) * 0.15;
                    bloomPass.radius = state.visualQualityBoost ? 0.62 : 0.5;
                }
            }
            composer.render();
        } else {
            renderer.render(scene, camera);
        }
    }
    
    if (state.isPyramidMode) {
        renderPepperGhost(delta, elapsedTime);
    }
}

// Visual Glitch stability processor
function processHologramStability(time) {
    const isGlitchToggled = (state.glitchFrequency > 0 && Math.random() < (state.glitchFrequency / 1000));
    
    if (isGlitchToggled && !glitchActive) {
        glitchActive = true;
        glitchDuration = 0.05 + Math.random() * 0.15;
        lastGlitchTime = time;
        
        const centerStage = document.getElementById('hud-center-stage');
        if (centerStage) centerStage.classList.add('screen-glitch');
        playGlitchNoise();
    }
    
    if (glitchActive) {
        if (activeModelGroup) {
            const intensity = 0.06 * state.glowIntensity;
            activeModelGroup.position.x = (Math.random() - 0.5) * intensity;
            activeModelGroup.position.z = (Math.random() - 0.5) * intensity;
        }
        
        if (time - lastGlitchTime > glitchDuration) {
            glitchActive = false;
            const centerStage = document.getElementById('hud-center-stage');
            if (centerStage) centerStage.classList.remove('screen-glitch');
            
            if (activeModelGroup) {
                activeModelGroup.position.x = 0;
                activeModelGroup.position.z = 0;
            }
        }
    }
}

// ==========================================================================
// 8. PEPPER'S GHOST 4-WAY ROTATION RENDER ENGINE
// ==========================================================================
function initPyramidWebGL() {
    // Enable physical cinema dark mode & alignment calibration overlay (v4.0)
    document.body.classList.add('pyramid-cinema-active');
    const calibGrid = document.getElementById('pyramid-calibration-grid');
    if (calibGrid) {
        calibGrid.style.opacity = '0.8';
        // Auto-fade calibration guides after 5 seconds of stable pyramid placement
        setTimeout(() => {
            calibGrid.style.opacity = '0';
        }, 5000);
    }

    pyramidCanvas = document.createElement('canvas');
    pyramidCanvas.id = "pyramid-core-canvas";
    pyramidCanvas.style.width = "100%";
    pyramidCanvas.style.height = "100%";
    
    const quads = ['top', 'bottom', 'left', 'right'];
    quads.forEach(q => {
        const wrapper = document.getElementById(`canvas-quad-${q}`);
        if (wrapper) wrapper.innerHTML = '';
    });
    
    const containerGrid = document.querySelector('.pyramid-stage-grid');
    if (!containerGrid) return;
    
    pyramidRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    pyramidRenderer.setSize(containerGrid.clientWidth, containerGrid.clientHeight);
    pyramidRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    pyramidCanvas = pyramidRenderer.domElement;
    pyramidCanvas.style.position = "absolute";
    pyramidCanvas.style.top = "50%";
    pyramidCanvas.style.left = "50%";
    pyramidCanvas.style.transform = "translate(-50%, -50%)";
    pyramidCanvas.style.zIndex = "1005";
    
    containerGrid.appendChild(pyramidCanvas);
    
    const aspect = 1.0;
    const dist = 6.8;
    
    quadCameras.bottom = new THREE.PerspectiveCamera(40, aspect, 0.1, 50);
    quadCameras.bottom.position.set(0, 0.8, dist);
    quadCameras.bottom.lookAt(0, 0.1, 0);
    quadCameras.bottom.up.set(0, 1, 0);
    
    quadCameras.top = new THREE.PerspectiveCamera(40, aspect, 0.1, 50);
    quadCameras.top.position.set(0, 0.8, -dist);
    quadCameras.top.lookAt(0, 0.1, 0);
    quadCameras.top.up.set(0, -1, 0);
    
    quadCameras.left = new THREE.PerspectiveCamera(40, aspect, 0.1, 50);
    quadCameras.left.position.set(-dist, 0.8, 0);
    quadCameras.left.lookAt(0, 0.1, 0);
    quadCameras.left.up.set(1, 0, 0);
    
    quadCameras.right = new THREE.PerspectiveCamera(40, aspect, 0.1, 50);
    quadCameras.right.position.set(dist, 0.8, 0);
    quadCameras.right.lookAt(0, 0.1, 0);
    quadCameras.right.up.set(-1, 0, 0);
}

function renderPepperGhost(delta, time) {
    if (!pyramidRenderer || !scene) return;
    
    const size = Math.min(pyramidCanvas.clientWidth, pyramidCanvas.clientHeight);
    pyramidRenderer.setSize(size, size);
    
    pyramidRenderer.setClearColor(0x000000);
    pyramidRenderer.clear();
    
    const qSize = size / 3;
    
    if (activeModelGroup) {
        activeModelGroup.rotation.y += delta * 0.3 * state.rotationSpeed;
        activeModelGroup.position.y = Math.sin(time * 1.5) * 0.08 + 0.1;
    }
    
    renderQuadrant(0, qSize, quadCameras.bottom);
    renderQuadrant(qSize * 2, qSize, quadCameras.top);
    renderQuadrant(qSize, 0, quadCameras.left);
    renderQuadrant(qSize, qSize * 2, quadCameras.right);
}

function renderQuadrant(yOffset, xOffset, cam) {
    const size = Math.min(pyramidCanvas.clientWidth, pyramidCanvas.clientHeight);
    const qSize = size / 3;
    
    pyramidRenderer.setViewport(xOffset, yOffset, qSize, qSize);
    pyramidRenderer.setScissor(xOffset, yOffset, qSize, qSize);
    pyramidRenderer.setScissorTest(true);
    
    pyramidRenderer.render(scene, cam);
}

function exitPyramidMode() {
    state.isPyramidMode = false;
    
    // Disable physical cinema dark mode (v4.0)
    document.body.classList.remove('pyramid-cinema-active');
    
    const pyramidOverlay = document.getElementById('pyramid-overlay');
    if (pyramidOverlay) {
        pyramidOverlay.classList.add('hidden-stage');
        pyramidOverlay.classList.remove('active-stage');
    }
    
    const pyramidSwitch = document.getElementById('switch-pyramid');
    if (pyramidSwitch) pyramidSwitch.checked = false;
    
    if (pyramidRenderer) {
        pyramidRenderer.dispose();
        pyramidRenderer = null;
    }
    
    onWindowResize();
    playSynthSweep(600, 150, 0.4);
    if (state.language === 'ko') {
        addConsoleLog("[시스템] 피라미드 모드를 종료하고 메인 뷰포트로 복귀했습니다.", "info");
    } else {
        addConsoleLog("[SYS] EXITED PYRAMID REFLECTION ENGINE. HUD ACTIVE.", "info");
    }
}

// ==========================================================================
// 8.5. AUTOMATED CINEMATIC KEYNOTE SHOWCASE SEQUENCE CONTROLLER
// ==========================================================================
let presentationStep = 0;
let presentationInterval = null;
let explodedAnimationTimer = null;
let presentationPartScanWasActive = false;

function runPresentationStep() {
    if (!state.isShowcaseMode) {
        stopCinematicPresentation();
        return;
    }
    
    const maxSteps = 7;
    presentationStep = (presentationStep % maxSteps) + 1;
    
    if (state.language === 'ko') {
        addConsoleLog(`[시네마틱] 발표 단계 ${presentationStep}/${maxSteps} 진입 중...`, "info");
    } else {
        addConsoleLog(`[CINEMATIC] Entering showcase phase ${presentationStep}/${maxSteps}...`, "info");
    }
    
    switch (presentationStep) {
        case 1:
            // Phase 1: Zoom camera in on product front
            state.cameraMode = 'front';
            targetCameraPosition.set(0, 0.8, 7.5);
            targetCameraTarget.set(0, 0, 0);
            state.rotationSpeed = 0.15; // Slow down rotation
            
            showNotification(
                state.language === 'ko' ? "1단계: 전면 구조 기술 스캔" : "Phase 1: Front Detail Scan",
                state.language === 'ko' ? "외피 하우징과 주요 모듈 배치를 스튜디오 카메라 정면에서 투사합니다." : "Projecting original design schema and front interface layout."
            );
            break;
            
        case 2:
            // Phase 2: Slowly float product up
            state.cameraMode = 'front';
            
            showNotification(
                state.language === 'ko' ? "2단계: 중력 보정 자기 부유" : "Phase 2: Gravity Compensation",
                state.language === 'ko' ? "자기장 반발 계수를 조정하여 장치를 스튜디오 공중에 고고도 부유합니다." : "Elevating prototype via simulated magnetic suspension."
            );
            break;
            
        case 3:
            // Phase 3: Exploded view disassembly (state.explodedLevel slides to 0.7)
            animateExplodedLevel(0.7, 2200);
            
            showNotification(
                state.language === 'ko' ? "3단계: 3D 입체 분해도 레이아웃" : "Phase 3: Exploded Assembly",
                state.language === 'ko' ? "기기 핵심 모듈과 회전 로터 서브시스템 내부 구조를 전개합니다." : "Unveiling inner structural mechanics and sub-assemblies."
            );
            break;
            
        case 4:
            // Phase 4: Glide camera to topTechnical view ((0, 7.5, 0.01)), rotating 180 degrees
            state.cameraMode = 'top';
            targetCameraPosition.set(0, 7.5, 0.01);
            targetCameraTarget.set(0, 0, 0);
            
            showNotification(
                state.language === 'ko' ? "4단계: 평면 기하 도식 도면" : "Phase 4: Top Technical Schema",
                state.language === 'ko' ? "장치의 상단 면적 대칭성과 광학 분출 레이아웃을 180도 스캔합니다." : "Scanning aerial structural symmetry and center of mass."
            );
            break;
            
        case 5:
            // Phase 5: Re-assemble (state.explodedLevel slides back to 0.0)
            animateExplodedLevel(0.0, 2200);
            
            showNotification(
                state.language === 'ko' ? "5단계: 정밀 가상 결합 복구" : "Phase 5: Mechanical Assembly",
                state.language === 'ko' ? "외벽 알루미늄 프레임과 유닛 코어 조립체를 디폴트 락 위치로 복구합니다." : "Re-aligning exterior chassis elements to default lock state."
            );
            break;
            
        case 6:
            // Phase 6: Slide camera into close-up macro zoom focus ((0.8, 0.4, 2.5))
            state.cameraMode = 'macro';
            targetCameraPosition.set(0.8, 0.4, 2.5);
            targetCameraTarget.set(0.2, 0.1, 0.1);
            
            showNotification(
                state.language === 'ko' ? "6단계: 거치대 마이크로 접사" : "Phase 6: Macro Detail Spec",
                state.language === 'ko' ? "스펙타클 반사 하이라이트와 샌드블라스트 금속 기감면을 밀착 포커싱합니다." : "Inspecting downlight specular details of sandblasted surfaces."
            );
            break;
            
        case 7:
            // Phase 7: Glide camera back to default cinematic orbit rotation
            state.cameraMode = 'orbit';
            state.rotationSpeed = 1.0;
            
            showNotification(
                state.language === 'ko' ? "7단계: 자유 비행 자동 궤도 순회" : "Phase 7: Cinematic Auto Orbit",
                state.language === 'ko' ? "모든 프레젠테이션 단계가 완료되어 360도 스튜디오 순환 모드로 회귀합니다." : "Stabilization complete. Resuming ambient studio presentation."
            );
            break;
    }
}

function animateExplodedLevel(targetValue, durationMs) {
    const startTime = performance.now();
    const startValue = state.explodedLevel;
    
    if (explodedAnimationTimer) clearInterval(explodedAnimationTimer);
    
    explodedAnimationTimer = setInterval(() => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / durationMs, 1.0);
        
        // Easing: easeInOutQuad
        const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        state.explodedLevel = startValue + (targetValue - startValue) * ease;
        
        // Sync DOM inputs if they exist
        const tunerExploded = document.getElementById('tuner-exploded');
        const readoutExploded = document.getElementById('readout-exploded');
        if (tunerExploded) tunerExploded.value = state.explodedLevel;
        if (readoutExploded) readoutExploded.innerText = `${Math.round(state.explodedLevel * 100)}%`;
        
        // Update Three.js meshes
        if (activeModelGroup && activeModelGroup.children.length > 0) {
            updateExplodedTranslations(activeModelGroup.children[0]);
        }
        
        if (progress >= 1.0) {
            clearInterval(explodedAnimationTimer);
            explodedAnimationTimer = null;
            if (targetValue >= 0.15) {
                setWorkflowProgress('present', ['model', 'structure']);
            }
        }
    }, 16);
}

let gesturePilotFadeTimer = null;

function clampValue(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function syncRotationControlsFromState() {
    const speed = Number.isFinite(state.rotationSpeed) ? state.rotationSpeed : 0;
    const tuner = document.getElementById('tuner-rot-speed');
    const readout = document.getElementById('readout-rot-speed');
    const rotSwitch = document.getElementById('switch-rotate');
    if (tuner) tuner.value = speed.toFixed(2);
    if (readout) readout.innerText = speed.toFixed(1);
    if (rotSwitch) rotSwitch.checked = speed > 0;
}

function syncExplodedControlsFromState() {
    const tunerExploded = document.getElementById('tuner-exploded');
    const readoutExploded = document.getElementById('readout-exploded');
    if (tunerExploded) tunerExploded.value = state.explodedLevel.toFixed(2);
    if (readoutExploded) readoutExploded.innerText = `${Math.round(state.explodedLevel * 100)}%`;

    document.querySelectorAll('.snap-btn').forEach(btn => btn.classList.remove('active'));
    const activeSnapId = state.explodedLevel < 0.08
        ? 'btn-snap-0'
        : (Math.abs(state.explodedLevel - 0.5) < 0.08 ? 'btn-snap-50' : (state.explodedLevel > 0.92 ? 'btn-snap-100' : null));
    if (activeSnapId) {
        const activeSnap = document.getElementById(activeSnapId);
        if (activeSnap) activeSnap.classList.add('active');
    }

    if (activeModelGroup && activeModelGroup.children.length > 0) {
        updateExplodedTranslations(activeModelGroup.children[0]);
    }
    if (state.explodedLevel >= 0.15) {
        setWorkflowProgress('present', ['model', 'structure']);
    }
}

function setGestureExplodedLevel(value) {
    if (explodedAnimationTimer) {
        clearInterval(explodedAnimationTimer);
        explodedAnimationTimer = null;
    }
    state.explodedLevel = clampValue(value, 0, 1);
    syncExplodedControlsFromState();
}

function updateGesturePilotPanel(modeLabel = 'ORBIT READY', intensity = state.explodedLevel, active = false) {
    const panel = document.getElementById('gesture-pilot-panel');
    if (!panel) return;

    const modeEl = document.getElementById('gesture-pilot-mode');
    const fillEl = document.getElementById('gesture-pilot-fill');
    const spinEl = document.getElementById('gesture-pilot-spin');
    const explodeEl = document.getElementById('gesture-pilot-explode');

    if (modeEl) modeEl.textContent = modeLabel;
    if (fillEl) fillEl.style.width = `${Math.round(clampValue(intensity, 0, 1) * 100)}%`;
    if (spinEl) spinEl.textContent = `${(Number.isFinite(state.rotationSpeed) ? state.rotationSpeed : 0).toFixed(1)}x`;
    if (explodeEl) explodeEl.textContent = `${Math.round(state.explodedLevel * 100)}%`;

    if (active) {
        panel.classList.add('active');
        clearTimeout(gesturePilotFadeTimer);
        gesturePilotFadeTimer = setTimeout(() => panel.classList.remove('active'), 1500);
    }
}

function shouldUseGesturePilot() {
    return !!(
        state.engineBooted
        && activeModelGroup
        && activeModelGroup.children.length > 0
        && !state.isPyramidMode
        && !drawModeToggled
        && !isCaliperActive
    );
}

function getTouchDistance(touches) {
    if (!touches || touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

function initGesturePilotControls() {
    const vp = document.getElementById('hologram-viewport');
    if (!vp || vp.dataset.gesturePilotBound === 'true') return;
    vp.dataset.gesturePilotBound = 'true';

    updateGesturePilotPanel();

    const beginSwipe = (e) => {
        if ((e.button ?? 0) !== 0 || !shouldUseGesturePilot()) return;
        state.gesturePilot.pointerStart = {
            x: e.clientX,
            y: e.clientY,
            time: performance.now()
        };
    };

    const completeSwipe = (e) => {
        const start = state.gesturePilot.pointerStart;
        state.gesturePilot.pointerStart = null;
        if (!start || !shouldUseGesturePilot() || isDrawingActive) return;

        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        const horizontalSwipe = Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.2;
        if (!horizontalSwipe) return;

        state.rotationSpeed = Number((clampValue(Math.abs(dx) / 150, 0.15, 2.4)).toFixed(1));
        syncRotationControlsFromState();
        savePreferences();
        updateGesturePilotPanel('SPIN MOMENTUM', state.rotationSpeed / 2.4, true);
        addConsoleLog(`[GESTURE] Spin momentum set to ${state.rotationSpeed.toFixed(1)}x.`, 'info');
    };

    vp.addEventListener('pointerdown', beginSwipe);
    vp.addEventListener('pointerup', completeSwipe);
    vp.addEventListener('mousedown', (e) => {
        if (!state.gesturePilot.pointerStart) beginSwipe(e);
    });
    vp.addEventListener('mouseup', completeSwipe);

    vp.addEventListener('wheel', (e) => {
        if (!shouldUseGesturePilot()) return;
        e.preventDefault();
        const nextLevel = state.explodedLevel + (-e.deltaY * 0.0018);
        setGestureExplodedLevel(nextLevel);
        updateGesturePilotPanel((e.shiftKey || e.altKey) ? 'EXPLODE HOLD' : 'SCROLL EXPLODE', state.explodedLevel, true);
    }, { passive: false });

    vp.addEventListener('touchstart', (e) => {
        if (!shouldUseGesturePilot() || e.touches.length !== 2) return;
        state.gesturePilot.touchStartDistance = getTouchDistance(e.touches);
        state.gesturePilot.touchStartExplodedLevel = state.explodedLevel;
    }, { passive: true });

    vp.addEventListener('touchmove', (e) => {
        if (!shouldUseGesturePilot() || e.touches.length !== 2 || !state.gesturePilot.touchStartDistance) return;
        e.preventDefault();
        const distance = getTouchDistance(e.touches);
        const delta = (distance - state.gesturePilot.touchStartDistance) / 260;
        setGestureExplodedLevel(state.gesturePilot.touchStartExplodedLevel + delta);
        updateGesturePilotPanel('PINCH EXPLODE', state.explodedLevel, true);
    }, { passive: false });

    vp.addEventListener('touchend', (e) => {
        if (e.touches.length < 2) {
            state.gesturePilot.touchStartDistance = null;
            state.gesturePilot.touchStartExplodedLevel = state.explodedLevel;
        }
    });
}

function startCinematicPresentation(options = {}) {
    if (!options.preserveFlowTimers) {
        clearDemoFlowTimers();
    }
    state.isShowcaseMode = true;
    presentationPartScanWasActive = !!state.partScanActive;
    setWorkflowProgress('export', ['model', 'structure', 'present']);
    
    const containerLayout = document.getElementById('app-container');
    const presOverlay = document.getElementById('presentation-titles');
    const showcaseToggle = document.getElementById('btn-showcase-toggle');
    const playShowcaseBtn = document.getElementById('btn-play-showcase');
    
    if (containerLayout) containerLayout.classList.add('showcase-active');
    if (presOverlay) presOverlay.classList.remove('hidden-stage');
    if (showcaseToggle) showcaseToggle.classList.add('glow-btn');
    if (playShowcaseBtn) playShowcaseBtn.classList.add('active-dock');
    if (!state.partScanActive && getPartScanList().length > 0) {
        setPartScanActive(true, 0);
    }
    
    presentationStep = 0;
    runPresentationStep();
    
    if (presentationInterval) clearInterval(presentationInterval);
    presentationInterval = setInterval(runPresentationStep, 6000); // 6 seconds per phase
    
    setTimeout(onWindowResize, 550);
}

function stopCinematicPresentation() {
    state.isShowcaseMode = false;
    
    if (presentationInterval) {
        clearInterval(presentationInterval);
        presentationInterval = null;
    }
    if (explodedAnimationTimer) {
        clearInterval(explodedAnimationTimer);
        explodedAnimationTimer = null;
    }
    
    // Restore defaults
    state.rotationSpeed = 1.0;
    state.explodedLevel = 0.0;
    applyCameraView('orbit', false);
    
    const tunerExploded = document.getElementById('tuner-exploded');
    const readoutExploded = document.getElementById('readout-exploded');
    if (tunerExploded) tunerExploded.value = 0;
    if (readoutExploded) readoutExploded.innerText = "0%";
    
    if (activeModelGroup && activeModelGroup.children.length > 0) {
        updateExplodedTranslations(activeModelGroup.children[0]);
    }
    
    const containerLayout = document.getElementById('app-container');
    const presOverlay = document.getElementById('presentation-titles');
    const showcaseToggle = document.getElementById('btn-showcase-toggle');
    const playShowcaseBtn = document.getElementById('btn-play-showcase');
    
    if (containerLayout) containerLayout.classList.remove('showcase-active');
    if (presOverlay) presOverlay.classList.add('hidden-stage');
    if (showcaseToggle) showcaseToggle.classList.remove('glow-btn');
    if (playShowcaseBtn) playShowcaseBtn.classList.remove('active-dock');
    if (!presentationPartScanWasActive && state.partScanActive) {
        setPartScanActive(false);
    }
    
    // Re-apply Beginner/Pro sizing
    toggleUIMode(state.uiMode);
    setTimeout(onWindowResize, 550);
}

// Glitch logo easter egg handler (New v3.2)
function triggerLogoGlitchEasterEgg() {
    playSynthClick(180, 0.45);
    glitchActive = true;
    glitchDuration = 2.4; // Longer, heavier glitch for the easter egg!
    lastGlitchTime = clock.getElapsedTime();
    
    const centerStage = document.getElementById('hud-center-stage');
    if (centerStage) centerStage.classList.add('screen-glitch');
    
    // Play intense white noise sweeps
    playGlitchNoise();
    setTimeout(playGlitchNoise, 300);
    setTimeout(playGlitchNoise, 600);
    
    const tblStability = document.getElementById('tbl-stability');
    if (tblStability) {
        tblStability.innerText = `${(45 + Math.random() * 15).toFixed(2)}%`;
        tblStability.classList.add('text-error');
    }
    
    showNotification(
        state.language === 'ko' ? "[경고] 시스템 강제 오버클럭" : "[WARNING] SYSTEM OVERCLOCK",
        state.language === 'ko' ? "이스터에그 발동: 비정상 파형 강제 주입 성공." : "Easter egg triggered: Overclocking laser profile."
    );
    
    if (state.language === 'ko') {
        addConsoleLog("[경고] 비인가 로고 다중 트리거 감지. 디버그 오버라이드 모드 진입.", "error");
    } else {
        addConsoleLog("[WARNING] Unauthorized logo multi-trigger detected. Debug Override active.", "error");
    }
    
    setTimeout(() => {
        if (tblStability) {
            tblStability.innerText = "99.84%";
            tblStability.classList.remove('text-error');
        }
        if (state.language === 'ko') {
            addConsoleLog("[시스템] 파형 보정 센서 복구 완료. 코어가 다시 고정되었습니다.", "success");
        } else {
            addConsoleLog("[SYS] Waveform calibration restored. Laser lock locked.", "success");
        }
    }, 2800);
}

// ==========================================================================
// 9. INTERACTIVE HUD CONTROLLER (Binds, Sliders, and Diagnostics logs)
// ==========================================================================
function initUIControls() {
    // 0. Logo double/triple click easter egg (New v3.2)
    const logoGroup = document.querySelector('.logo-group');
    if (logoGroup) {
        logoGroup.style.cursor = 'pointer';
        let clickCount = 0;
        let clickTimer = null;
        logoGroup.addEventListener('click', () => {
            clickCount++;
            if (clickTimer) clearTimeout(clickTimer);
            
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 600);
            
            if (clickCount >= 3) {
                clickCount = 0;
                triggerLogoGlitchEasterEgg();
            }
        });
    }

    // 0.2. LANGUAGE TOGGLE BUTTON
    const langToggleBtn = document.getElementById('btn-lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const currentLang = state.language;
            const targetLang = currentLang === 'ko' ? 'en' : 'ko';
            
            playSynthClick(720, 0.06);
            playSynthSweep(180, 750, 0.35);
            
            updateLanguageHTML(targetLang);
            
            if (targetLang === 'ko') {
                addConsoleLog("시스템 조작 언어가 한국어로 설정되었습니다.", "info");
            } else {
                addConsoleLog("System interface language configured to ENGLISH.", "info");
            }
        });
    }

    // 0.5. BEGINNER / PRO SEGMENTED SWITCH BINDINGS
    const btnModeBeginner = document.getElementById('btn-mode-beginner');
    const btnModePro = document.getElementById('btn-mode-pro');
    
    if (btnModeBeginner && btnModePro) {
        btnModeBeginner.addEventListener('click', () => {
            playSynthClick(680, 0.05);
            playSynthSweep(200, 500, 0.3);
            toggleUIMode('beginner');
        });
        
        btnModePro.addEventListener('click', () => {
            playSynthClick(680, 0.05);
            playSynthSweep(150, 450, 0.3);
            toggleUIMode('pro');
        });
    }

    // 0.6. QUICK STYLE BUTTONS BINDINGS
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const styleName = e.currentTarget.getAttribute('data-style');
            
            document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active-style'));
            e.currentTarget.classList.add('active-style');
            
            applyQuickStyle(styleName);
        });
    });

    // 1. iOS SWITCH BINDINGS
    const soundSwitch = document.getElementById('switch-sound');
    if (soundSwitch) {
        soundSwitch.addEventListener('change', () => {
            toggleSound();
        });
    }
    
    const rotateSwitch = document.getElementById('switch-rotate');
    if (rotateSwitch) {
        rotateSwitch.addEventListener('change', (e) => {
            state.rotationSpeed = e.target.checked ? 1.0 : 0.0;
            
            const rotSpeedTuner = document.getElementById('tuner-rot-speed');
            const rotSpeedReadout = document.getElementById('readout-rot-speed');
            if (rotSpeedTuner) rotSpeedTuner.value = state.rotationSpeed;
            if (rotSpeedReadout) rotSpeedReadout.innerText = state.rotationSpeed.toFixed(1);
            updateGesturePilotPanel(e.target.checked ? 'ORBIT READY' : 'ORBIT PAUSED', state.rotationSpeed / 2.4, true);
            
            showNotification(
                state.language === 'ko' ? "자동 회전 설정 변경" : "Auto-Rotate Status Changed",
                e.target.checked ?
                    (state.language === 'ko' ? "3D 입체 제품의 자동 회전을 시작합니다." : "3D prototype auto-orbit rotation activated.") :
                    (state.language === 'ko' ? "3D 입체 제품의 자동 회전을 일시 정지합니다." : "3D prototype auto-orbit rotation paused.")
            );
        });
    }
    
    const spatialSwitch = document.getElementById('switch-spatial');
    if (spatialSwitch) {
        spatialSwitch.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('spatial-active');
                showNotification(
                    state.language === 'ko' ? "공간 컴퓨팅 패스스루 활성" : "Spatial Computing Pass-through Enabled",
                    state.language === 'ko' ? "공간형 프로스트 배경 레이어가 활성화되었습니다." : "Spatial frosted background layer is now fully active."
                );
            } else {
                document.body.classList.remove('spatial-active');
                showNotification(
                    state.language === 'ko' ? "공간 컴퓨팅 패스스루 해제" : "Spatial Computing Muted",
                    state.language === 'ko' ? "입체 공간 컴퓨팅 투명 배경 모드를 종료합니다." : "Spatial frosted blur background returned to default dark studio."
                );
            }
        });
    }
    
    const reticlesSwitch = document.getElementById('switch-reticles');
    if (reticlesSwitch) {
        reticlesSwitch.checked = state.targetingReticles;
        reticlesSwitch.addEventListener('change', (e) => {
            state.targetingReticles = e.target.checked;
            if (reticleGroup) {
                reticleGroup.visible = state.targetingReticles && state.materialView !== 'product';
            }
            playSynthClick(580, 0.05);
            
            showNotification(
                state.language === 'ko' ? "타겟팅 레티클 변경" : "Targeting Reticles Toggled",
                state.targetingReticles ?
                    (state.language === 'ko' ? "조준 및 격자 추적용 3D 자이로 링이 활성화되었습니다." : "3D gyroscopic tracking reticle rings are now active.") :
                    (state.language === 'ko' ? "조준용 3D 자이로 링이 숨겨졌습니다." : "3D gyroscopic targeting rings are now hidden.")
            );
        });
    }
    
    // Gyroscope Camera toggle setup (Phase E)
    const gyroRow = document.getElementById('gyro-switch-row');
    const gyroSwitch = document.getElementById('switch-gyro');
    if (gyroRow && gyroSwitch) {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || typeof DeviceOrientationEvent !== 'undefined') {
            gyroRow.style.display = 'flex';
        }
        
        gyroSwitch.checked = state.gyroActive || false;
        gyroSwitch.addEventListener('change', (e) => {
            const checked = e.target.checked;
            if (checked) {
                if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                    DeviceOrientationEvent.requestPermission()
                        .then(response => {
                            if (response === 'granted') {
                                state.gyroActive = true;
                                initGyroEvents();
                                showNotification(
                                    state.language === 'ko' ? "자이로 카메라 활성화" : "Gyro Camera Activated",
                                    state.language === 'ko' ? "기기 움직임에 따라 시차 입체 효과가 활성화됩니다." : "Gyroscope dynamic perspective parallax camera active."
                                );
                            } else {
                                gyroSwitch.checked = false;
                                state.gyroActive = false;
                                showNotification(
                                    state.language === 'ko' ? "자이로 권한 거부됨" : "Gyro Permission Denied",
                                    state.language === 'ko' ? "자이로 카메라 권한 요청이 거절되었습니다." : "Gyroscope camera sensor access was denied."
                                );
                            }
                        })
                        .catch(err => {
                            console.error('DeviceOrientation permission error:', err);
                            gyroSwitch.checked = false;
                            state.gyroActive = false;
                            showNotification("Gyro Sensor Error", err.message || "Failed to initialize sensors.");
                        });
                } else {
                    state.gyroActive = true;
                    initGyroEvents();
                    showNotification(
                        state.language === 'ko' ? "자이로 카메라 활성화" : "Gyro Camera Activated",
                        state.language === 'ko' ? "기기 움직임에 따라 시차 입체 효과가 활성화됩니다." : "Gyroscope dynamic perspective parallax camera active."
                    );
                }
            } else {
                state.gyroActive = false;
                targetGyroShift.set(0, 0, 0);
                showNotification(
                    state.language === 'ko' ? "자이로 카메라 꺼짐" : "Gyro Camera Deactivated",
                    state.language === 'ko' ? "공간 자이로 시차 카메라 기능이 꺼졌습니다." : "Perspective parallax camera disabled."
                );
            }
        });
    }

    const btnShockwave = document.getElementById('btn-trigger-shockwave');
    if (btnShockwave) {
        btnShockwave.addEventListener('click', () => {
            triggerQuantumShockwave();
        });
    }

    const btnAiScan = document.getElementById('btn-ai-scan');
    if (btnAiScan) {
        btnAiScan.addEventListener('click', () => {
            triggerAiScan();
        });
    }
    
    // V10 Premium Core: Cinematic DoF Toggle
    const dofSwitch = document.getElementById('switch-dof');
    if (dofSwitch) {
        dofSwitch.addEventListener('change', (e) => {
            if (window.bokehPass) {
                window.bokehPass.enabled = e.target.checked;
            }
            if (state.language === 'ko') {
                addConsoleLog(e.target.checked ? "[시스템] 시네마틱 피사계 심도(DoF) 활성화." : "[시스템] 피사계 심도 렌더링 종료.", "info");
            } else {
                addConsoleLog(e.target.checked ? "[SYSTEM] Cinematic Depth of Field engaged." : "[SYSTEM] DoF rendering terminated.", "info");
            }
        });
    }
    
    const pyramidSwitch = document.getElementById('switch-pyramid');
    if (pyramidSwitch) {
        pyramidSwitch.addEventListener('change', (e) => {
            if (e.target.checked) {
                state.isPyramidMode = true;
                const pyramidOverlay = document.getElementById('pyramid-overlay');
                if (pyramidOverlay) {
                    pyramidOverlay.classList.remove('hidden-stage');
                    setTimeout(() => {
                        pyramidOverlay.classList.add('active-stage');
                    }, 10);
                }
                
                initPyramidWebGL();
                playSynthSweep(150, 800, 0.8);
                if (state.language === 'ko') {
                    addConsoleLog("[시스템] 피라미드 모드를 초기화했습니다.", "success");
                } else {
                    addConsoleLog("[SYS] INITIATED 4-WAY PEPPER'S GHOST PROJECTIONS.", "success");
                }
            } else {
                exitPyramidMode();
            }
        });
    }

    // 1.5. PRESENTATION SHOWCASE MODE BUTTON
    const showcaseToggle = document.getElementById('btn-showcase-toggle');
    if (showcaseToggle) {
        showcaseToggle.addEventListener('click', () => {
            toggleShowcaseMode();
        });
    }
    
    // Play Show Cinematic Button in Dock
    const playShowcaseBtn = document.getElementById('btn-play-showcase');
    if (playShowcaseBtn) {
        playShowcaseBtn.addEventListener('click', () => {
            toggleShowcaseMode();
        });
    }
    
    const btnPyramidExit = document.getElementById('btn-pyramid-exit');
    if (btnPyramidExit) {
        btnPyramidExit.addEventListener('click', () => {
            exitPyramidMode();
        });
    }
    
    // 3. MODEL PRESETS SELECT BUTTONS
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget;
            const presetName = target.getAttribute('data-preset');
            
            if (presetName === 'custom' && !state.imageUploaded && !uploadedMeshGroup) {
                if (state.language === 'ko') {
                    addConsoleLog("[시스템] 3D 또는 이미지 데이터 주입이 필요합니다.", "error");
                } else {
                    addConsoleLog("[SYS] Custom model requires 3D or image upload first.", "error");
                }
                playSynthClick(300, 0.15);
                return;
            }
            
            playSynthClick(520, 0.08);
            
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            target.classList.add('active');
            
            state.activePreset = presetName;
            state.activeDemoPreset = null;
            state.handoffReady.demo = false;
            document.querySelectorAll('.demo-preset-btn').forEach(b => b.classList.remove('active'));
            const demoPresetStatus = document.getElementById('demo-preset-status');
            if (demoPresetStatus) demoPresetStatus.textContent = 'Manual';
            
            loadPresetModel(presetName);
        });
    });
    
    // 4. CUSTOM LOADERS DRAG AND DROP INJECTOR (Upgraded GLB/GLTF/OBJ v3.2)
    const dropZone = document.getElementById('drop-zone');
    const imgUpload = document.getElementById('image-upload');
    
    if (dropZone) {
        // Local highlight when hovering the dropzone itself (the window handler does the drop).
        dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    }

    if (imgUpload) {
        imgUpload.addEventListener('change', (e) => {
            handleUploadFiles(e.target.files);
            imgUpload.value = ''; // allow re-selecting the same file
        });
    }

    // Whole-window drag & drop: drop a model/image anywhere on the studio, not just the dropzone.
    initWindowDropUpload();
    
    // 5. PARAMETER TUNING RANGE SLIDERS
    bindTunerSlider('tuner-intensity', 'readout-intensity', (val) => {
        state.glowIntensity = parseFloat(val);
        updateHolographicMaterials();
    });
    
    // Bind Exploded Disassembly view slider
    bindTunerSlider('tuner-exploded', 'readout-exploded', (val) => {
        state.explodedLevel = parseFloat(val);
        
        // Remove snap highlights on manual drag
        document.querySelectorAll('.snap-btn').forEach(btn => btn.classList.remove('active'));
        
        if (state.explodedLevel === 0.0) {
            const b = document.getElementById('btn-snap-0');
            if (b) b.classList.add('active');
        } else if (state.explodedLevel === 0.5) {
            const b = document.getElementById('btn-snap-50');
            if (b) b.classList.add('active');
        } else if (state.explodedLevel === 1.0) {
            const b = document.getElementById('btn-snap-100');
            if (b) b.classList.add('active');
        }
        
        if (activeModelGroup && activeModelGroup.children.length > 0) {
            updateExplodedTranslations(activeModelGroup.children[0]);
        }

        if (state.explodedLevel >= 0.15) {
            setWorkflowProgress('present', ['model', 'structure']);
        }
        updateGesturePilotPanel('EXPLODE LEVEL', state.explodedLevel);
    }, "%", true);
    
    // Bind Exploded snaps step buttons (New v3.2)
    const btnSnap0 = document.getElementById('btn-snap-0');
    const btnSnap50 = document.getElementById('btn-snap-50');
    const btnSnap100 = document.getElementById('btn-snap-100');
    
    function setExplodedSnap(targetVal, activeBtn) {
        playSynthClick(720, 0.05);
        document.querySelectorAll('.snap-btn').forEach(btn => btn.classList.remove('active'));
        if (activeBtn) activeBtn.classList.add('active');
        animateExplodedLevel(targetVal, 800); // 800ms smooth snaps transition
    }
    
    if (btnSnap0) btnSnap0.addEventListener('click', () => setExplodedSnap(0.0, btnSnap0));
    if (btnSnap50) btnSnap50.addEventListener('click', () => setExplodedSnap(0.5, btnSnap50));
    if (btnSnap100) btnSnap100.addEventListener('click', () => setExplodedSnap(1.0, btnSnap100));

    bindTunerSlider('tuner-rot-speed', 'readout-rot-speed', (val) => {
        state.rotationSpeed = parseFloat(val);
        const rotSwitch = document.getElementById('switch-rotate');
        if (rotSwitch) {
            rotSwitch.checked = (state.rotationSpeed > 0);
        }
        updateGesturePilotPanel('ORBIT SPEED', state.rotationSpeed / 2.4);
        if (val === '0') {
            if (state.language === 'ko') {
                addConsoleLog("[시스템] 회전 궤도 자동 순회를 일시 중지합니다.", "warning");
            } else {
                addConsoleLog("[GRID] Rotational tracking paused.", "warning");
            }
        }
    });
    
    bindTunerSlider('tuner-flicker', 'readout-flicker', (val) => {
        state.scanlineDensity = parseFloat(val);
        document.documentElement.style.setProperty('--scanline-speed', `${6 / val}s`);
    });
    
    bindTunerSlider('tuner-glitch', 'readout-glitch', (val) => {
        state.glitchFrequency = parseInt(val);
    }, "%");
    
    bindTunerSlider('tuner-scale', 'readout-scale', (val) => {
        state.scale = parseFloat(val);
        if (activeModelGroup) {
            activeModelGroup.scale.set(val, val, val);
        }
    });
    
    bindTunerSlider('tuner-extrusion', 'readout-extrusion', (val) => {
        state.customImageExtrusion = parseFloat(val);
        if (state.activePreset === 'custom') {
            loadPresetModel('custom');
        }
    });
    
    // 6. COLOR THEME SWITCHER
    document.querySelectorAll('.color-select-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            playSynthClick(600, 0.05);
            
            document.querySelectorAll('.color-select-btn').forEach(b => b.classList.remove('active-color'));
            e.currentTarget.classList.add('active-color');
            
            const colorName = e.currentTarget.getAttribute('data-color');
            document.body.className = `theme-${colorName}`;
            
            const styles = getComputedStyle(document.body);
            const colorHex = styles.getPropertyValue(`--${colorName}`).trim();
            const colorGlow = styles.getPropertyValue(`--${colorName}-glow`).trim();
            state.themeColor = colorHex;
            state.themeColorGlow = colorGlow;
            savePreferences();
            
            updateHolographicMaterials();
            
            if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
                CollabManager.broadcast({
                    type: 'state_update',
                    key: 'themeColor',
                    value: colorHex
                });
            }
            
            if (state.language === 'ko') {
                addConsoleLog(`[스튜디오] 시제품 시각화 색상을 동기화했습니다: ${colorName.toUpperCase()}`, "info");
            } else {
                addConsoleLog(`[STUDIO] Pedestal light wavelength synced: ${colorName.toUpperCase()}`, "info");
            }
        });
    });
    
    document.querySelectorAll('.material-view-btn').forEach(btn => {
        btn.addEventListener('click', event => {
            playSynthClick(720, 0.05);
            setMaterialView(event.currentTarget.dataset.materialView);
        });
    });
    updateMaterialViewUi();

    // 7. RENDER SCHEMATIC MODE SELECTORS
    document.querySelectorAll('.render-mode-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            playSynthClick(750, 0.04);
            
            document.querySelectorAll('.render-mode-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            const mode = e.currentTarget.getAttribute('data-mode');
            state.renderMode = mode;
            if (mode !== 'solid') {
                state.materialView = 'hologram';
                updateMaterialViewUi();
            }
            savePreferences();
            
            toggleRenderVisibility();
            
            if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
                CollabManager.broadcast({
                    type: 'state_update',
                    key: 'renderMode',
                    value: mode
                });
            }
            
            const teleRender = document.getElementById('tele-render');
            if (teleRender) {
                teleRender.innerText = translations[state.language][mode] || mode.toUpperCase();
            }
        });
    });

    const qualityBoostBtn = document.getElementById('btn-quality-boost');
    if (qualityBoostBtn) {
        qualityBoostBtn.addEventListener('click', toggleQualityBoost);
        updateQualityBoostUi();
    }

    // 7.5. CINEMATIC CAMERA DOCK BTNS (studio camera panning)
    document.querySelectorAll('.camera-dock-btn[data-view]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetView = e.currentTarget.getAttribute('data-view');
            
            playSynthClick(800, 0.08);
            playSynthSweep(350, 150, 0.4);
            applyCameraView(targetView, true);
        });
    });
    
    // 8. INTERACTIVE PRODUCTS TELEMETRY SPEC INPUTS
    const specName = document.getElementById('spec-name');
    if (specName) {
        specName.addEventListener('input', (e) => {
            const val = e.target.value || "Hologram Unit";
            const presName = document.getElementById('pres-product-name');
            if (presName) presName.textContent = val;
            refreshPrototypeInsight();
            
            if (state.language === 'ko') {
                addConsoleLog(`[스튜디오] 제품 식별명칭 변경: "${val}"`, "info");
            } else {
                addConsoleLog(`[STUDIO] Product label changed: "${val}"`, "info");
            }
        });
    }
    
    const specCategory = document.getElementById('spec-category');
    if (specCategory) {
        specCategory.addEventListener('input', (e) => {
            const val = e.target.value || "UNIT PROTO";
            const presSub = document.getElementById('pres-product-sub');
            if (presSub) presSub.textContent = val;
            refreshPrototypeInsight();
        });
    }
    
    bindSpecFormSlider('spec-param-weight', 'readout-weight', 'kg', 'tbl-volume', (v) => {
        const volumeVal = (v * 0.038).toFixed(2);
        const tblVolume = document.getElementById('tbl-volume');
        if (tblVolume) tblVolume.innerText = `${volumeVal} m³`;
    });
    
    bindSpecFormSlider('spec-param-power', 'readout-power', 'W', 'tbl-discharge', (v) => {
        const dischargeVal = (v * 0.0028).toFixed(1);
        const tblDischarge = document.getElementById('tbl-discharge');
        if (tblDischarge) tblDischarge.innerText = `${dischargeVal} kWh`;
    });
    
    bindSpecFormSlider('spec-param-thermal', 'readout-thermal', '%', 'tbl-emission', (v) => {
        const emissionVal = (12 + v * 0.34).toFixed(1);
        const tblEmission = document.getElementById('tbl-emission');
        if (tblEmission) tblEmission.innerText = `${emissionVal}°`;
    });
    
    // 9. INSTANT GLITCH BUTTON
    const btnForceGlitch = document.getElementById('btn-force-glitch');
    if (btnForceGlitch) {
        btnForceGlitch.addEventListener('click', () => {
            playSynthClick(220, 0.25);
            glitchActive = true;
            glitchDuration = 0.45;
            lastGlitchTime = clock.getElapsedTime();
            
            const centerStage = document.getElementById('hud-center-stage');
            if (centerStage) centerStage.classList.add('screen-glitch');
            playGlitchNoise();
            
            const tblStability = document.getElementById('tbl-stability');
            if (tblStability) {
                tblStability.innerText = `${(90 + Math.random() * 8).toFixed(2)}%`;
                tblStability.classList.add('text-error');
            }
            
            if (state.language === 'ko') {
                addConsoleLog("[시스템] 공간 홀로그램 글리치 노이즈 효과가 작동되었습니다.", "warning");
            } else {
                addConsoleLog("[SYS] Spatial holographic glitch noise effect triggered.", "warning");
            }
            
            setTimeout(() => {
                if (tblStability) {
                    tblStability.innerText = "99.84%";
                    tblStability.classList.remove('text-error');
                }
                if (state.language === 'ko') {
                    addConsoleLog("[시스템] 시스템 전자기 파형 안정화 완료. 코어 복구됨.", "success");
                } else {
                    addConsoleLog("[SYS] System stabilized. Core integrity restored.", "success");
                }
            }, 1200);
        });
    }

    // 10. EXPORT SUITE BUTTON BINDINGS
    const btnExport3D = document.getElementById('btn-export-3d');
    if (btnExport3D) {
        btnExport3D.addEventListener('click', () => {
            exportGLTF();
        });
    }
    
    const btnExportSpec = document.getElementById('btn-export-spec');
    if (btnExportSpec) {
        btnExportSpec.addEventListener('click', () => {
            exportSpecsJSON();
        });
    }
    
    const btnExportPhoto = document.getElementById('btn-export-photo');
    if (btnExportPhoto) {
        btnExportPhoto.addEventListener('click', () => {
            exportSnapshotPNG();
        });
    }
}

function toggleShowcaseMode() {
    state.isShowcaseMode = !state.isShowcaseMode;
    if (state.isShowcaseMode) {
        startCinematicPresentation({ preserveFlowTimers: true });
    } else {
        stopCinematicPresentation();
    }
}

// Utility slider binders mapping ranges to labels
function bindTunerSlider(id, readoutId, callback, suffix = "", scalePercentage = false) {
    const slider = document.getElementById(id);
    const readout = document.getElementById(readoutId);
    if (!slider || !readout) return;
    
    slider.addEventListener('input', (e) => {
        const val = e.target.value;
        const displayVal = scalePercentage ? Math.round(val * 100) : val;
        readout.innerText = `${displayVal}${suffix}`;
        playSynthClick(800 + (val * 80), 0.02);
        callback(val);
        savePreferences(); // v3.8: Persist slider changes
        
        const idMap = {
            'tuner-intensity': 'glowIntensity',
            'tuner-exploded': 'explodedLevel',
            'tuner-rot-speed': 'rotationSpeed',
            'tuner-flicker': 'scanlineDensity',
            'tuner-glitch': 'glitchFrequency',
            'tuner-scale': 'scale'
        };
        const stateKey = idMap[id];
        if (stateKey && typeof CollabManager !== 'undefined' && CollabManager.isActive) {
            CollabManager.broadcast({
                type: 'state_update',
                key: stateKey,
                value: parseFloat(val)
            });
        }
    });
}

function bindSpecFormSlider(id, readoutId, suffix, tableCellId, callback) {
    const slider = document.getElementById(id);
    const readout = document.getElementById(readoutId);
    if (!slider || !readout) return;
    
    slider.addEventListener('input', (e) => {
        const val = e.target.value;
        readout.innerText = `${val} ${suffix}`;
        playSynthClick(700 + (val * 0.3), 0.02);
        callback(val);
    });
}

// Toggle Mesh Node Visibilities inside Three.js Group geometries
function toggleRenderVisibility() {
    if (!activeModelGroup) return;
    if (state.renderMode !== 'solid' && state.materialView !== 'hologram') {
        state.materialView = 'hologram';
        updateMaterialViewUi();
    }
    
    activeModelGroup.traverse(child => {
        // Custom 2D->3D volumetric mesh group render controls (v3.9)
        if (child instanceof THREE.Group && child.name === "custom") {
            const surface = child.getObjectByName("generic-1");
            const walls = child.getObjectByName("generic-1-walls");
            const bottom = child.getObjectByName("generic-1-bottomcap");
            const sparkles = child.getObjectByName("generic-1-sparkles");
            const base = child.getObjectByName("generic-2");
            const rays = child.getObjectByName("generic-rays");
            
            const isSolid = (state.renderMode === 'solid');
            const isWire = (state.renderMode === 'wireframe');
            const isPoints = (state.renderMode === 'points');
            const isXray = (state.renderMode === 'xray');
            const isThermal = (state.renderMode === 'thermal');
            
            // 1. Visibilities for mesh solids/lines
            if (surface) surface.visible = (isSolid || isWire || isXray || isThermal);
            if (walls) walls.visible = (isSolid || isWire || isXray || isThermal);
            if (bottom) bottom.visible = (isSolid || isXray || isThermal); // Bottom cap hidden in pure wireframe for neatness
            
            // 2. Visibilities for sparkles / point clouds
            if (sparkles) sparkles.visible = (isPoints || isWire || isXray);
            
            // 3. Emitter base and guide rays visibility
            if (base) base.visible = (isSolid || isWire || isXray);
            if (rays) rays.visible = (isSolid || isWire || isXray);
            
            // 4. Material dynamic styling overrides (X-ray, Thermal, Emissive)
            [surface, walls, bottom].forEach(m => {
                if (!m) return;
                if (!m.userData.originalMaterial) {
                    m.userData.originalMaterial = m.material;
                }
                
                if (isThermal) {
                    m.material = hologramMaterials.thermal;
                } else if (isXray) {
                    m.material = m.userData.originalMaterial.clone();
                    m.material.transparent = true;
                    m.material.opacity = 0.15;
                } else {
                    m.material = m.userData.originalMaterial;
                }
            });
            return; // Skip standard traversal child node check
        }
        
        if (child instanceof THREE.Group && child.children.length === 3) {
            const solid = child.children[0];
            const wire = child.children[1];
            const pts = child.children[2];
            
            // Backup original materials if not already done
            if (!solid.userData.originalMaterial) {
                solid.userData.originalMaterial = solid.material;
            }
            if (!wire.userData.originalMaterial) {
                wire.userData.originalMaterial = wire.material;
            }
            
            // Default restore
            solid.material = solid.userData.originalMaterial;
            wire.material = wire.userData.originalMaterial;
            
            if (state.renderMode === 'xray') {
                solid.visible = true;
                wire.visible = true;
                pts.visible = false;
                
                const isShell = isOuterShell(child);
                
                // Outer shell gets ghost look, inner core remains opaque and glows
                solid.material.transparent = true;
                solid.material.opacity = isShell ? 0.08 : 0.95;
                
                // Clone wire material for distinct opacity
                wire.material = wire.userData.originalMaterial.clone();
                wire.material.transparent = true;
                wire.material.opacity = isShell ? 0.18 : 1.0;
                
            } else if (state.renderMode === 'thermal') {
                solid.visible = true;
                wire.visible = false;
                pts.visible = false;
                solid.material = hologramMaterials.thermal;
            } else {
                // Standard modes
                if (child.userData && child.userData.solidMaterial) {
                    const baseOpacity = child.userData.isChrome ? 0.85 : 0.65;
                    child.userData.solidMaterial.opacity = baseOpacity * state.glowIntensity;
                }
                
                solid.visible = (state.renderMode === 'solid');
                wire.visible = (state.renderMode === 'wireframe' || state.renderMode === 'solid');
                pts.visible = (state.renderMode === 'points' || state.renderMode === 'wireframe');
            }
        }
    });
    
    // Toggle thermal analyzer panel display (v6.0)
    const thermalPanel = document.getElementById('thermal-control-panel');
    if (thermalPanel) {
        thermalPanel.style.display = (state.renderMode === 'thermal' && state.uiMode === 'pro') ? 'flex' : 'none';
    }
    applyPartScanVisuals();
}

// Update Specs Table fields when presets shift
function updateSpecsHUD(name, classification, data) {
    const specName = document.getElementById('spec-name');
    if (specName) specName.value = name;
    
    const specCategory = document.getElementById('spec-category');
    if (specCategory) specCategory.value = classification;
    
    // NaN-safe: readouts show the raw spec string (already carries its own unit),
    // sliders only move when the value parses to a real number. Prevents "NaN W"
    // for non-numeric specs like ST,AND's "PASSIVE" and keeps "12 g" from becoming "12 kg".
    const massVal = parseInt(data.weight);
    const powerVal = parseInt(data.power);
    const thermalVal = parseInt(data.thermal);

    const paramWeight = document.getElementById('spec-param-weight');
    if (paramWeight && !isNaN(massVal)) paramWeight.value = massVal;
    const readoutWeight = document.getElementById('readout-weight');
    if (readoutWeight) readoutWeight.innerText = data.weight;

    const paramPower = document.getElementById('spec-param-power');
    if (paramPower && !isNaN(powerVal)) paramPower.value = powerVal;
    const readoutPower = document.getElementById('readout-power');
    if (readoutPower) readoutPower.innerText = data.power;

    const paramThermal = document.getElementById('spec-param-thermal');
    if (paramThermal && !isNaN(thermalVal)) paramThermal.value = thermalVal;
    const readoutThermal = document.getElementById('readout-thermal');
    if (readoutThermal) readoutThermal.innerText = data.thermal;
    
    const tblUnitId = document.getElementById('tbl-unit-id');
    if (tblUnitId) tblUnitId.innerText = data.id;
    
    const tblVolume = document.getElementById('tbl-volume');
    if (tblVolume) tblVolume.innerText = data.volume;
    
    const tblStability = document.getElementById('tbl-stability');
    if (tblStability) tblStability.innerText = data.stability;
    
    const tblDischarge = document.getElementById('tbl-discharge');
    if (tblDischarge) tblDischarge.innerText = data.discharge;
    
    const tblEmission = document.getElementById('tbl-emission');
    if (tblEmission) tblEmission.innerText = data.emission;
}

// Push logs onto diagnostics console
function addConsoleLog(message, type = "info") {
    const scroller = document.getElementById('console-logs');
    if (!scroller) return;
    
    const line = document.createElement('div');
    line.className = `log-line text-${type}`;
    
    const now = new Date();
    const ts = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
    
    line.innerText = `${ts} ${message}`;
    state.diagnosticsLog.push({
        at: now.toISOString(),
        type,
        message
    });
    while (state.diagnosticsLog.length > 120) state.diagnosticsLog.shift();
    scroller.appendChild(line);
    scroller.scrollTop = scroller.scrollHeight;
    
    while (scroller.children.length > 35) {
        scroller.removeChild(scroller.firstChild);
    }
}

// Automated diagnostics generator
function triggerRandomDiagnosticLog() {
    if (state.isPyramidMode || state.uiMode === 'beginner') return; // Suppress logs loop in beginner
    const lang = state.language;
    const list = systemLogTemplates[lang] || systemLogTemplates['en'];
    const msg = list[Math.floor(Math.random() * list.length)];
    addConsoleLog(msg, "info");
    
    if (Math.random() < 0.2) {
        const factor = (99.5 + Math.random() * 0.49).toFixed(2);
        const tblStability = document.getElementById('tbl-stability');
        if (tblStability) tblStability.innerText = `${factor}%`;
    }
}

// Map Three.js camera rotation metrics back to floating HUD boxes
let prevAzimuth = null;
let prevElevation = null;
let prevZoom = null;

function updateTelemetryHUD() {
    if (!camera) return;
    
    const sphere = new THREE.Spherical();
    sphere.setFromVector3(camera.position);
    
    const azimuthDeg = Math.round(sphere.theta * (180 / Math.PI));
    const elevationDeg = Math.round((Math.PI / 2 - sphere.phi) * (180 / Math.PI));
    
    const maxDist = 20;
    const minDist = 3;
    const zoomPct = Math.round(100 * (1 - (sphere.radius - minDist) / (maxDist - minDist)));
    
    // Throttled DOM writes using dirty checks (v5.0 Optimization)
    if (azimuthDeg !== prevAzimuth) {
        if (DOM.teleAzimuth) DOM.teleAzimuth.innerText = `${azimuthDeg}°`;
        prevAzimuth = azimuthDeg;
    }
    if (elevationDeg !== prevElevation) {
        if (DOM.teleElevation) DOM.teleElevation.innerText = `${elevationDeg}°`;
        prevElevation = elevationDeg;
    }
    if (zoomPct !== prevZoom) {
        if (DOM.teleZoom) DOM.teleZoom.innerText = `${zoomPct}%`;
        prevZoom = zoomPct;
    }
}

// ==========================================================================
// 11. EXPORT SUITE SYSTEM BACKENDS (GLB Standard Binaries Exporter Upgraded v3.2)
// ==========================================================================
function triggerDownload(content, type, filename) {
    const blob = new Blob([content], { type: type });
    triggerBlobDownload(blob, filename);
}

function triggerBlobDownload(blob, filename) {
    const link = document.createElement('a');
    const objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

function copyTextToClipboard(text) {
    if (!text) return Promise.resolve(false);
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
    }

    return new Promise(resolve => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        let ok = false;
        try {
            ok = document.execCommand('copy');
        } catch (error) {
            ok = false;
        }
        textarea.remove();
        resolve(ok);
    });
}

function getCameraShareState() {
    if (!camera || !controls) return null;
    return {
        position: { x: camera.position.x, y: camera.position.y, z: camera.position.z },
        target: { x: controls.target.x, y: controls.target.y, z: controls.target.z },
        targetCameraPosition: targetCameraPosition ? { x: targetCameraPosition.x, y: targetCameraPosition.y, z: targetCameraPosition.z } : null,
        targetCameraTarget: targetCameraTarget ? { x: targetCameraTarget.x, y: targetCameraTarget.y, z: targetCameraTarget.z } : null,
        zoom: camera.zoom || 1
    };
}

function restoreCameraShareState(cameraState = {}) {
    if (!camera || !controls || !cameraState.position || !cameraState.target) return;
    const pos = cameraState.position;
    const target = cameraState.target;
    camera.position.set(Number(pos.x) || 0, Number(pos.y) || 0, Number(pos.z) || 10);
    controls.target.set(Number(target.x) || 0, Number(target.y) || 0, Number(target.z) || 0);
    if (cameraState.targetCameraPosition && targetCameraPosition) {
        targetCameraPosition.set(
            Number(cameraState.targetCameraPosition.x) || camera.position.x,
            Number(cameraState.targetCameraPosition.y) || camera.position.y,
            Number(cameraState.targetCameraPosition.z) || camera.position.z
        );
    } else if (targetCameraPosition) {
        targetCameraPosition.copy(camera.position);
    }
    if (cameraState.targetCameraTarget && targetCameraTarget) {
        targetCameraTarget.set(
            Number(cameraState.targetCameraTarget.x) || controls.target.x,
            Number(cameraState.targetCameraTarget.y) || controls.target.y,
            Number(cameraState.targetCameraTarget.z) || controls.target.z
        );
    } else if (targetCameraTarget) {
        targetCameraTarget.copy(controls.target);
    }
    if (Number.isFinite(cameraState.zoom)) {
        camera.zoom = cameraState.zoom;
        camera.updateProjectionMatrix();
    }
    controls.update();
}

function applyThemeColorFromHex(colorHex, colorGlow) {
    if (!colorHex) return;
    state.themeColor = colorHex;
    state.themeColorGlow = colorGlow || state.themeColorGlow || 'rgba(0, 122, 255, 0.22)';
    document.documentElement.style.setProperty('--theme-color', state.themeColor);
    document.documentElement.style.setProperty('--theme-glow', state.themeColorGlow);
    document.documentElement.style.setProperty('--theme-color-glow', state.themeColorGlow);
    document.querySelectorAll('.color-select-btn').forEach(btn => {
        const colorName = btn.getAttribute('data-color');
        const style = getComputedStyle(document.body);
        const btnColor = style.getPropertyValue(`--${colorName}`).trim();
        btn.classList.toggle('active-color', btnColor.toLowerCase() === String(colorHex).toLowerCase());
    });
    if (typeof updateHolographicMaterials === 'function') updateHolographicMaterials();
}

function updateLightingUi() {
    document.querySelectorAll('.light-mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-light') === state.lighting.mood);
    });
    const slider = document.getElementById('tuner-light-brightness');
    const readout = document.getElementById('readout-light-brightness');
    if (slider) slider.value = String(state.lighting.brightness);
    if (readout) readout.textContent = Number(state.lighting.brightness || 1).toFixed(1);
}

function encodeSharePayload(payload) {
    const json = JSON.stringify(payload);
    return btoa(unescape(encodeURIComponent(json)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function decodeSharePayload(encoded) {
    const normalized = String(encoded || '').replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(normalized.length + ((4 - normalized.length % 4) % 4), '=');
    return JSON.parse(decodeURIComponent(escape(atob(padded))));
}

function buildShareState() {
    const storedSnapshot = saveProjectSnapshot({ silent: true }) || buildProjectSnapshot();
    const projectSnapshot = buildCompactShareSnapshot(storedSnapshot);
    const shareState = {
        holosynShare: 'url-share-state-v1',
        exportedAt: new Date().toISOString(),
        projectSnapshot,
        warning: 'Custom GLB/image binaries are not embedded in the URL. Use a HOLOSYN portable project bundle when the model file must travel with the scene.'
    };
    state.shareStateLastBuilt = shareState.exportedAt;
    updateShareLinkPanel();
    return shareState;
}

function buildShareUrl() {
    const payload = buildShareState();
    const encoded = encodeSharePayload(payload);
    const url = new URL(window.location.href);
    url.hash = `hs=${encoded}`;
    return {
        url: url.toString(),
        encodedLength: encoded.length,
        payload
    };
}

async function copyShareLink() {
    const result = buildShareUrl();
    try {
        window.history.replaceState(null, '', result.url);
    } catch (error) {
        window.location.hash = new URL(result.url).hash;
    }
    markHandoffExportReady();
    const copied = await copyTextToClipboard(result.url);
    const detail = document.getElementById('share-link-detail');
    const status = document.getElementById('share-link-status');
    if (status) status.textContent = copied ? 'COPIED' : 'URL IN BAR';
    if (detail) {
        detail.textContent = copied
            ? `URL length ${result.url.length}. 링크를 열면 현재 발표 장면을 복원합니다.`
            : '클립보드 접근이 막혀 주소창에 공유 링크를 표시했습니다. 주소창 URL을 복사하세요.';
    }
    showNotification(
        state.language === 'ko' ? '공유 링크 준비' : 'Share Link Ready',
        copied
            ? (state.language === 'ko' ? '현재 발표 장면 URL을 클립보드에 복사했습니다.' : 'Copied the current scene URL to the clipboard.')
            : (state.language === 'ko' ? '클립보드가 막혀 주소창에 공유 URL을 표시했습니다.' : 'Clipboard was blocked, so the share URL is now in the address bar.')
    );
    addConsoleLog(`[SHARE] URL state packed (${result.url.length} chars).`, copied ? 'success' : 'warning');
}

function exportShareState() {
    const shareState = buildShareState();
    triggerDownload(
        JSON.stringify(shareState, null, 2),
        'application/json',
        `${getExportBaseName(getProductName())}_holosyn_share_state.json`
    );
    markHandoffExportReady();
    showNotification(
        state.language === 'ko' ? '공유 상태 저장' : 'Share State Saved',
        state.language === 'ko' ? 'URL 공유와 같은 상태 데이터를 JSON으로 저장했습니다.' : 'Saved the same state used by URL sharing as JSON.'
    );
    addConsoleLog('[SHARE] Share state JSON exported.', 'success');
}

function parseShareStateFromLocation() {
    const hash = window.location.hash ? window.location.hash.replace(/^#/, '') : '';
    if (!hash) return null;
    const params = new URLSearchParams(hash);
    const encoded = params.get('hs');
    if (!encoded) return null;
    try {
        const payload = decodeSharePayload(encoded);
        return payload?.holosynShare === 'url-share-state-v1' ? payload : null;
    } catch (error) {
        console.warn('Invalid HOLOSYN share state:', error);
        return null;
    }
}

function applyShareStateFromUrl() {
    const payload = parseShareStateFromLocation();
    if (!payload) return false;
    state.pendingShareState = payload;
    const status = document.getElementById('share-link-status');
    const detail = document.getElementById('share-link-detail');
    if (status) status.textContent = 'RESTORE READY';
    if (detail) detail.textContent = '공유 링크 감지됨. 엔진 기동 후 같은 장면을 복원합니다.';
    showNotification(
        state.language === 'ko' ? '공유 장면 감지' : 'Shared Scene Detected',
        state.language === 'ko' ? 'HOLOSYN 엔진을 기동해 공유된 시점과 발표 상태를 복원합니다.' : 'Booting HOLOSYN will restore the shared camera and presentation state.'
    );
    setTimeout(() => {
        if (state.engineBooted) {
            applyShareState(payload);
            return;
        }
        const bootBtn = document.getElementById('btn-boot-system');
        if (bootBtn && !bootBtn.disabled) bootBtn.click();
    }, 700);
    return true;
}

function applyShareState(payload) {
    if (!payload || payload.holosynShare !== 'url-share-state-v1') return false;
    const snapshot = payload.projectSnapshot;
    if (snapshot?.holosynSnapshot === 'project-snapshot-v1') {
        applyProjectSnapshot(snapshot);
    }
    if (payload.camera) {
        restoreCameraShareState(payload.camera);
    }
    state.pendingShareState = null;
    state.shareStateLastBuilt = payload.exportedAt || new Date().toISOString();
    updateShareLinkPanel();
    const status = document.getElementById('share-link-status');
    const detail = document.getElementById('share-link-detail');
    if (status) status.textContent = 'RESTORED';
    if (detail) detail.textContent = '공유 링크의 발표 장면을 이 브라우저에 복원했습니다.';
    showNotification(
        state.language === 'ko' ? '공유 장면 복원 완료' : 'Shared Scene Restored',
        state.language === 'ko' ? '링크에 담긴 모델, 조명, 카메라, 노트, 치수 상태를 복원했습니다.' : 'Restored the linked model, lighting, camera, notes, and measurements.'
    );
    addConsoleLog('[SHARE] Shared URL state restored.', 'success');
    return true;
}

function updateShareLinkPanel() {
    const status = document.getElementById('share-link-status');
    const detail = document.getElementById('share-link-detail');
    if (status) status.textContent = state.shareStateLastBuilt ? 'LINK BUILT' : 'URL READY';
    if (detail && state.shareStateLastBuilt) {
        detail.textContent = `Last packed ${new Date(state.shareStateLastBuilt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Use PORTABLE PROJECT when the model must be included.`;
    }
}

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

function limitSnapshotText(value, fallback = '', maxLength = 240) {
    if (typeof value !== 'string') return fallback;
    const text = value.trim();
    return (text || fallback).slice(0, maxLength);
}

function finiteSnapshotNumber(value, fallback = 0, limit = 1_000_000) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.max(-limit, Math.min(limit, number));
}

function normalizeSnapshotPoint(point) {
    return {
        x: finiteSnapshotNumber(point?.x),
        y: finiteSnapshotNumber(point?.y),
        z: finiteSnapshotNumber(point?.z)
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
    updatePresenterNotesPanel();
    showNotification(
        state.language === 'ko' ? '발표자 노트 저장' : 'Presenter Note Saved',
        state.language === 'ko' ? '현재 장면 메모를 공유 링크와 패키지에 포함합니다.' : 'This scene note will be included in share links and packages.'
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

/* ============================================================
   STAGE TOOLS — QR share, live pointer, pitch timer, TTS narration
   발표 현장에서 쓰는 정적 기능 (백엔드/외부 API 없음)
   ============================================================ */

// ---- QR share -------------------------------------------------
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
    let target = built.url;
    let note = state.language === 'ko'
        ? '공유 링크를 QR로 변환했습니다. 관객이 카메라로 스캔하면 같은 발표 장면이 폰에서 열립니다.'
        : 'Scan this to open the exact presentation scene on a phone.';
    let matrix = null;
    // 긴 씬 상태 URL은 QR로 담기 어렵다 → 배포 URL로 폴백
    matrix = tryBuildQr(target);
    if (!matrix) {
        const base = `${window.location.origin}${window.location.pathname}`;
        matrix = tryBuildQr(base);
        target = base;
        note = state.language === 'ko'
            ? '발표 장면 링크가 길어 QR에는 앱 주소만 담았습니다. 장면까지 전달하려면 "공유 링크 복사"의 URL을 쓰세요.'
            : 'The scene link was too long for a QR, so this opens the app itself. Use the copied link to carry the exact scene.';
    }
    const holder = document.getElementById('qr-canvas-holder');
    if (holder) {
        holder.innerHTML = matrix ? matrix.createImgTag(6, 8) : '';
    }
    const urlInput = document.getElementById('qr-share-url');
    if (urlInput) urlInput.value = target;
    const noteEl = document.getElementById('qr-share-note');
    if (noteEl) noteEl.textContent = note;
    modal.style.display = 'flex';
    try {
        window.history.replaceState(null, '', built.url);
    } catch (error) { /* ignore */ }
    markHandoffExportReady();
    addConsoleLog(`[SHARE] QR generated (${target.length} chars).`, 'success');
    verifyQrScannable(matrix, target);
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

// ---- Live pointer ---------------------------------------------
let stagePointerCanvas = null;
let stagePointerCtx = null;
let stagePointerStrokes = [];
let stagePointerCursor = null;
let stagePointerDrawing = false;
let stagePointerRaf = null;
let stagePointerArrowStart = null;

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

// ---- Pitch timer ----------------------------------------------
let pitchTimerInterval = null;
let pitchTimerStartStamp = 0;

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
        if (event.target && /^(INPUT|TEXTAREA)$/.test(event.target.tagName)) return;
        if (event.key === 'p' || event.key === 'P') toggleStagePointer();
        else if (event.key === 't' || event.key === 'T') toggleStageTimer();
        else if (event.key === 'Escape') { closeQrShareModal(); if (state.stageTools.pointerActive) toggleStagePointer(false); }
    });
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged === null) {
        speechSynthesis.onvoiceschanged = () => { /* preload voices */ };
    }
    updatePitchTimerDisplay();
    updateNarrationButtons();
}

function getVectorPlain(vector) {
    return { x: Number(vector.x), y: Number(vector.y), z: Number(vector.z) };
}

function vectorFromPlain(point) {
    return new THREE.Vector3(Number(point?.x) || 0, Number(point?.y) || 0, Number(point?.z) || 0);
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
    caliperStartPoint = null;
    removeRenderedCalipers();
    updateMeasurementsPanel();
    showNotification(
        state.language === 'ko' ? '치수 삭제' : 'Measurements Cleared',
        state.language === 'ko' ? '저장된 치수와 뷰포트 측정 표시를 지웠습니다.' : 'Cleared saved dimensions and viewport measurement marks.'
    );
    addConsoleLog('[MEASURE] Saved dimensions cleared.', 'info');
}

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
    const stream = renderer.domElement.captureStream(30);
    const preferred = 'video/webm;codecs=vp9';
    const mimeType = MediaRecorder.isTypeSupported(preferred) ? preferred : 'video/webm';
    const recorder = new MediaRecorder(stream, { mimeType });
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
        triggerBlobDownload(blob, `${getExportBaseName(getProductName())}_holosyn_clip_${Math.round(durationMs / 1000)}s.webm`);
        if (status) status.textContent = 'SAVED';
        showNotification(state.language === 'ko' ? '클립 저장 완료' : 'Clip Saved', state.language === 'ko' ? '회전·분해 WebM 클립을 저장했습니다.' : 'Saved the rotating/exploded WebM clip.');
        addConsoleLog(`[CLIP] Recorded ${Math.round(durationMs / 1000)}s viewport clip.`, 'success');
    };
    if (status) status.textContent = 'REC';
    state.rotationSpeed = Math.max(state.rotationSpeed, 0.9);
    applyCameraView('orbit', false);
    animateExplodedLevel(Math.max(state.explodedLevel, 0.62), 650);
    recorder.start();
    showNotification(state.language === 'ko' ? '클립 녹화 중' : 'Recording Clip', state.language === 'ko' ? `${Math.round(durationMs / 1000)}초 WebM 클립을 녹화합니다.` : `Recording a ${Math.round(durationMs / 1000)} second WebM clip.`);
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
    
    exporter.parse(activeModelGroup, function(result) {
        // Since we specify binary: true, result is a self-contained ArrayBuffer containing GLB
        triggerDownload(result, 'application/octet-stream', `${state.activePreset}_prototype.glb`);
        
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
    }, { binary: true }); // BINARY TRUE FOR GLB!
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

// AI Auto-Scan controller (v3.6)
function triggerAiScan() {
    if (state.isScanning) return; // Prevent duplicate scanning
    
    state.isScanning = true;
    speakAssistant(state.language === 'ko' ? "시제품 점검 리포트를 시작합니다." : "Starting prototype check report.");
    
    // Toggle Scan HUD Overlay
    const overlay = document.getElementById('ai-scan-overlay');
    if (overlay) overlay.classList.remove('hidden-stage');
    
    // Disable active button
    const btnScan = document.getElementById('btn-ai-scan');
    if (btnScan) {
        btnScan.disabled = true;
        btnScan.innerHTML = `<i class="blink-fast" data-lucide="clipboard-check"></i> <span>CHECKING...</span>`;
        if (window.lucide) window.lucide.createIcons();
    }
    
    // Play sound sweeps
    playAiSweep(1.8);
    
    // Diagnostics intervals
    const scanDuration = 4500; // 4.5 seconds scan cycle
    const startTime = Date.now();
    
    const aiPhrasesKo = [
        "모델 중심점과 바닥 기준점을 확인 중...",
        "파트 분리 가능 여부를 점검 중...",
        "프레젠테이션 조명과 윤곽선을 재정렬 중...",
        "분해도 표시 거리와 라벨 위치를 계산 중...",
        "스케일 기준 오차: 0.002mm [정상]",
        "3D 와이어프레임과 솔리드 레이어 동기화...",
        "시연 안정성 점수: 99.82%",
        "캡처 및 내보내기 준비 상태 확인 완료."
    ];
    
    const aiPhrasesEn = [
        "Checking model center and floor alignment...",
        "Inspecting part separation readiness...",
        "Rebalancing presentation lighting and outlines...",
        "Calculating exploded-view spacing and label positions...",
        "Scale reference drift: 0.002mm [OK]",
        "3D wireframe and solid layers synchronized...",
        "Presentation stability score: 99.82% [PASS]",
        "Capture and export readiness verified."
    ];
    
    // 1. Hyperspeed diagnostic logs timer
    const logInterval = setInterval(() => {
        const phrases = state.language === 'ko' ? aiPhrasesKo : aiPhrasesEn;
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        addConsoleLog(`[AI-DIAG] ${phrase}`, "info");
    }, 250);
    
    // 2. Play lock-on beeps & scan sweeps timer (v4.0)
    let sweepCounter = 0;
    const beepInterval = setInterval(() => {
        playAiBeep(Math.random() * 800 + 1000);
        
        sweepCounter++;
        if (sweepCounter % 3 === 0) {
            playAiSweep(1.2);
        }
    }, 450);
    
    // 3. Progress bar update timer
    const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const percent = Math.min(Math.round((elapsed / scanDuration) * 100), 100);
        
        const percentText = document.getElementById('ai-percentage');
        const fillBar = document.getElementById('ai-progress-fill');
        const subtext = document.getElementById('ai-scan-subtext');
        
        if (percentText) percentText.innerText = `${percent}%`;
        if (fillBar) fillBar.style.width = `${percent}%`;
        if (subtext) {
            const stepText = state.language === 'ko' ? 
                (percent < 30 ? "모델 정렬 기준 확인 중..." : percent < 70 ? "파트/라벨 표시 상태 점검 중..." : "캡처와 발표 준비 상태 확인 중...") :
                (percent < 30 ? "CHECKING MODEL ALIGNMENT..." : percent < 70 ? "VERIFYING PARTS AND LABELS..." : "CHECKING CAPTURE READINESS...");
            subtext.innerText = stepText;
        }
        
        if (percent >= 100) {
            clearInterval(progressInterval);
        }
    }, 100);
    
    // 4. Complete Scan cycle
    setTimeout(() => {
        // Clear all timers
        clearInterval(logInterval);
        clearInterval(beepInterval);
        
        state.isScanning = false;
        
        // Hide Scan overlay
        if (overlay) overlay.classList.add('hidden-stage');
        
        // Restore button state
        if (btnScan) {
            btnScan.disabled = false;
            btnScan.innerHTML = `<i data-lucide="scan"></i> <span data-i18n="ai_scan_btn">${state.language === 'ko' ? '시제품 체크 실행' : 'RUN PROTOTYPE CHECK'}</span>`;
            if (window.lucide) window.lucide.createIcons();
        }
        
        // Play triumphant finish sound
        playAiComplete();
        speakAssistant(state.language === 'ko' ? "점검이 완료되었습니다. 발표와 캡처에 필요한 상태가 정상입니다." : "Check complete. Presentation and capture readiness look good.");
        
        // Show complete notifications
        showNotification(
            state.language === 'ko' ? "시제품 점검 완료" : "Prototype Check Complete",
            state.language === 'ko' ? "모델 정렬, 파트 표시, 캡처 준비 상태를 확인했습니다." : "Model alignment, part display, and capture readiness were checked."
        );
        
        if (state.language === 'ko') {
            addConsoleLog("[성공] 시제품 점검 완료. 발표 준비 상태 양호.", "success");
        } else {
            addConsoleLog("[SUCCESS] PROTOTYPE CHECK COMPLETE. PRESENTATION READY.", "success");
        }
        
        // Temporarily highlight telemetry table and numbers
        const dischargeCell = document.getElementById('tbl-discharge');
        const stabilityCell = document.getElementById('tbl-stability');
        if (dischargeCell) {
            dischargeCell.innerText = "2.4 kWh [OPTIMAL]";
            dischargeCell.style.color = "var(--theme-color)";
        }
        if (stabilityCell) {
            stabilityCell.innerText = "99.98% [MAXIMUM]";
            stabilityCell.style.color = "var(--theme-color)";
        }
        
    }, scanDuration);
}

// ==========================================================================
// ULTIMATE UPGRADE v3.5 SUITE IMPLEMENTATIONS
// ==========================================================================

// Global tracking for v3.5 assets
let isDrawingActive = false;
let drawModeToggled = false;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let currentSketchLine = null;

// Bind viewport raycasting and spatial drawing mouse listeners (v3.5)
function initSpatialDrawingEngine() {
    const vp = document.getElementById('hologram-viewport');
    if (!vp) return;
    
    // v6.0 Premium Engineering Suite binders
    initCalloutEditorModal();
    
    // Bind reset heat button
    const btnResetHeat = document.getElementById('btn-reset-heatpoints');
    if (btnResetHeat) {
        btnResetHeat.addEventListener('click', () => {
            resetHeatSources();
        });
    }
    
    // Double click to add 3D Pin Callout (Pro mode only, drawing inactive)
    vp.addEventListener('dblclick', (e) => {
        if (state.uiMode !== 'pro' || drawModeToggled || isCaliperActive || !activeModelGroup || activeModelGroup.children.length === 0) return;
        
        updateMouseCoordinates(e);
        raycaster.setFromCamera(mouse, camera);
        
        const meshes = [];
        activeModelGroup.traverse(c => { if (c.isMesh) meshes.push(c); });
        const intersects = raycaster.intersectObjects(meshes);
        
        if (intersects.length > 0) {
            const hit = intersects[0].point;
            
            // Stash local coordinates inside activeModelGroup to preserve rotation binding
            const localHit = activeModelGroup.worldToLocal(hit.clone());
            activeCalloutClickPoint = localHit;
            
            // Open editor modal
            const modal = document.getElementById('label-editor-modal');
            if (modal) {
                modal.style.display = 'flex';
                playSynthClick(760, 0.05);
                
                // Focus input field
                const titleInput = document.getElementById('input-label-title');
                if (titleInput) titleInput.focus();
            }
        }
    });
    
    // Click / Touch viewport for In-World interactions
    const handleViewportInteraction = (e) => {
        if (!activeModelGroup || activeModelGroup.children.length === 0) return;
        if (isDrawingActive) return; // Don't interfere with drawing tools
        
        let clientX = e.clientX;
        let clientY = e.clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        
        const rect = vp.getBoundingClientRect();
        mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        
        const meshes = [];
        activeModelGroup.traverse(c => { if (c.isMesh) meshes.push(c); });
        const intersects = raycaster.intersectObjects(meshes);
        
        if (intersects.length > 0) {
            const hitMesh = intersects[0].object;
            const hitPoint = intersects[0].point;
            
            if (state.renderMode === 'thermal') {
                injectHeatSource(hitPoint);
            } else {
                // Flash highlight effect
                if (hitMesh.material && hitMesh.material.emissive) {
                    const originalEmissive = hitMesh.material.emissive.clone();
                    hitMesh.material.emissive.setHex(0x00ffff);
                    hitMesh.material.emissiveIntensity = 2.0;
                    
                    setTimeout(() => {
                        hitMesh.material.emissive.copy(originalEmissive);
                        hitMesh.material.emissiveIntensity = 0.8;
                    }, 400);
                }
                
                // Show HUD Callout
                const callout = document.getElementById('hud-part-callout');
                if (callout) {
                    callout.style.display = 'block';
                    callout.style.left = `${clientX}px`;
                    callout.style.top = `${clientY}px`;
                    
                    const title = document.getElementById('callout-title');
                    const coords = document.getElementById('callout-coords');
                    if (title) title.textContent = hitMesh.name || `PART_${hitMesh.id}`;
                    if (coords) coords.textContent = `X:${hitPoint.x.toFixed(2)} Y:${hitPoint.y.toFixed(2)} Z:${hitPoint.z.toFixed(2)}`;
                    
                    // Auto-hide after 3 seconds
                    clearTimeout(callout.hideTimer);
                    callout.hideTimer = setTimeout(() => {
                        callout.style.display = 'none';
                    }, 3000);
                }
            }
        }
    };
    
    vp.addEventListener('click', handleViewportInteraction);
    vp.addEventListener('touchstart', (e) => {
        // Prevent default only if it's a single tap to allow zooming
        if (e.touches.length === 1) handleViewportInteraction(e);
    });
    
    // Draw pencil active button toggle
    const btnPencil = document.getElementById('btn-draw-pencil');
    const btnCaliper = document.getElementById('btn-draw-caliper');
    const btnClear = document.getElementById('btn-draw-clear');
    
    if (btnPencil) {
        btnPencil.addEventListener('click', () => {
            drawModeToggled = !drawModeToggled;
            btnPencil.classList.toggle('active-pencil', drawModeToggled);
            vp.classList.toggle('drawing-active', drawModeToggled);
            
            // Turn off caliper measurements when drawing is toggled
            isCaliperActive = false;
            if (btnCaliper) btnCaliper.classList.remove('active-caliper');
            vp.classList.remove('caliper-active');
            
            if (btnClear) btnClear.style.display = (drawModeToggled || drawingsGroup.children.length > 0) ? 'inline-flex' : 'none';
            playSynthClick(720, 0.06);
            
            showNotification(
                state.language === 'ko' ? "3D 공간 스케치 설정" : "3D Drawing Pencil Status",
                drawModeToggled ?
                    (state.language === 'ko' ? "마우스 드래그(혹은 Shift+드래그)로 3D 표면에 스케치할 수 있습니다." : "Draw natively on 3D surfaces via cursor drag.") :
                    (state.language === 'ko' ? "공간 스케치 연출을 비활성화합니다." : "Spatial drawing pencil is now disabled.")
            );
        });
    }
    
    if (btnCaliper) {
        btnCaliper.addEventListener('click', () => {
            isCaliperActive = !isCaliperActive;
            btnCaliper.classList.toggle('active-caliper', isCaliperActive);
            
            // Turn off drawing pencil when caliper is toggled
            drawModeToggled = false;
            if (btnPencil) btnPencil.classList.remove('active-pencil');
            vp.classList.remove('drawing-active');
            vp.classList.toggle('caliper-active', isCaliperActive);
            
            if (btnClear) btnClear.style.display = (isCaliperActive || drawingsGroup.children.length > 0) ? 'inline-flex' : 'none';
            playSynthClick(740, 0.06);
            
            if (state.language === 'ko') {
                showNotification(
                    "3D 치수 측정 상태",
                    isCaliperActive ? "모델 표면을 클릭하여 거리 측정 지점 A, B를 설정하세요." : "3D 치수 측정을 비활성화합니다."
                );
            } else {
                showNotification(
                    "3D Caliper Status",
                    isCaliperActive ? "Click two points on the model surface to set coordinates A and B." : "3D caliper tool is now disabled."
                );
            }
        });
    }
    
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            if (drawingsGroup) drawingsGroup.clear();
            
            // Clear caliper badges & variables
            const container = document.getElementById('annotations-container');
            if (container) {
                container.querySelectorAll('.caliper-badge').forEach(badge => badge.remove());
            }
            caliperStartPoint = null;
            calipersList = [];
            state.savedMeasurements = [];
            updateMeasurementsPanel();
            
            btnClear.style.display = 'none';
            if (btnPencil) btnPencil.classList.remove('active-pencil');
            if (btnCaliper) btnCaliper.classList.remove('active-caliper');
            if (vp) {
                vp.classList.remove('drawing-active');
                vp.classList.remove('caliper-active');
            }
            drawModeToggled = false;
            isCaliperActive = false;
            
            playSynthClick(350, 0.15);
            
            if (state.language === 'ko') {
                addConsoleLog("[지우개] 3D 스케치 및 측정값을 모두 삭제했습니다.", "info");
                speakAssistant("측정치와 드로잉을 모두 지웠습니다.");
            } else {
                addConsoleLog("[ERASE] Cleared all 3D sketches and dimension measurements.", "info");
                speakAssistant("Erase completed.");
            }
        });
    }
    
    // Core cursor event bindings for 3D Drawing
    vp.addEventListener('pointerdown', (e) => {
        // Caliper active mode clicks (v3.7)
        if (isCaliperActive && activeModelGroup && activeModelGroup.children.length > 0) {
            updateMouseCoordinates(e);
            raycaster.setFromCamera(mouse, camera);
            
            const meshes = [];
            activeModelGroup.traverse(c => { if (c.isMesh) meshes.push(c); });
            const intersects = raycaster.intersectObjects(meshes);
            
            if (intersects.length > 0) {
                const hit = intersects[0].point;
                playSynthClick(680, 0.05);
                
                const container = document.getElementById('annotations-container');
                
                if (caliperStartPoint === null) {
                    // First click: anchor A
                    caliperStartPoint = hit.clone();
                    
                    const prevPendingStart = drawingsGroup.getObjectByName("caliper-pending-start-marker");
                    if (prevPendingStart) drawingsGroup.remove(prevPendingStart);
                    
                    const sphereGeo = new THREE.SphereGeometry(0.04, 16, 16);
                    const sphereMat = new THREE.MeshBasicMaterial({ color: themeColorObj() });
                    const startSphere = new THREE.Mesh(sphereGeo, sphereMat);
                    startSphere.position.copy(caliperStartPoint);
                    startSphere.name = "caliper-pending-start-marker";
                    drawingsGroup.add(startSphere);
                    
                    if (btnClear) btnClear.style.display = 'inline-flex';
                    playAiBeep(1200);
                    
                    if (state.language === 'ko') {
                        addConsoleLog("[측정] 시작 기준점 A를 설정했습니다. 끝 지점을 선택하세요.", "info");
                        speakAssistant("측정 시작점을 지정했습니다.");
                    } else {
                        addConsoleLog("[CALIPER] Anchor point A set. Click target B to lock dimension.", "info");
                        speakAssistant("Anchor point A set.");
                    }
                } else {
                    // Second click: anchor B
                    const caliperEndPoint = hit.clone();
                    const measurementIndex = state.savedMeasurements.length + 1;
                    const measurementId = `m-${Date.now()}-${measurementIndex}`;
                    const measurementLabel = `M${measurementIndex}`;
                    const pendingStart = drawingsGroup.getObjectByName("caliper-pending-start-marker");
                    if (pendingStart) pendingStart.name = `caliper-${measurementId}-start`;
                    
                    const sphereGeo = new THREE.SphereGeometry(0.04, 16, 16);
                    const sphereMat = new THREE.MeshBasicMaterial({ color: themeColorObj() });
                    const endSphere = new THREE.Mesh(sphereGeo, sphereMat);
                    endSphere.position.copy(caliperEndPoint);
                    endSphere.name = `caliper-${measurementId}-end`;
                    drawingsGroup.add(endSphere);
                    
                    // Measure in the preset model's base geometry space. The model carries
                    // two scale layers (preset group + activeModelGroup projection scale);
                    // converting via the preset root removes BOTH so the real-world dimension
                    // never drifts with zoom. ST,AND is modeled to true spec
                    // (panel 1.6u = 150mm → 93.75 mm/u); others use a generic factor.
                    const mmPerUnit = (state.activePreset === 'stand') ? 93.75 : 250;
                    const modelRoot = (activeModelGroup.children[0] || activeModelGroup);
                    modelRoot.updateMatrixWorld(true);
                    const localA = modelRoot.worldToLocal(caliperStartPoint.clone());
                    const localB = modelRoot.worldToLocal(caliperEndPoint.clone());
                    const baseUnits = localA.distanceTo(localB);
                    const distMM = (baseUnits * mmPerUnit).toFixed(1);
                    const distanceText = `${distMM} mm`;
                    
                    const lineGeo = new THREE.BufferGeometry().setFromPoints([caliperStartPoint, caliperEndPoint]);
                    const lineMat = new THREE.LineDashedMaterial({
                        color: themeColorObj(),
                        dashSize: 0.08,
                        gapSize: 0.04,
                        linewidth: 2,
                        transparent: true,
                        opacity: 0.95
                    });
                    const caliperLine = new THREE.Line(lineGeo, lineMat);
                    caliperLine.computeLineDistances();
                    caliperLine.name = `caliper-${measurementId}-line`;
                    drawingsGroup.add(caliperLine);
                    
                    const badge = createCaliperBadge(
                        container,
                        measurementId,
                        `${measurementLabel} · ${state.language === 'ko' ? '3D 프로젝션 치수' : '3D DIMENSION'}`,
                        distanceText
                    );
                    
                    playAiComplete();
                    
                    if (state.language === 'ko') {
                        addConsoleLog(`[성공] 3D 치수 측정 완료: L [${distMM} mm]`, "success");
                        speakAssistant(`측정 완료. 거리는 ${distMM} 밀리미터입니다.`);
                    } else {
                        addConsoleLog(`[SUCCESS] 3D Caliper locked: Distance L: [${distMM} mm]`, "success");
                        speakAssistant(`Measurement complete. Distance is ${distMM} millimeters.`);
                    }
                    
                    calipersList.push({
                        id: measurementId,
                        start: caliperStartPoint.clone(),
                        end: caliperEndPoint.clone(),
                        distance: distanceText,
                        line: caliperLine,
                        badgeEl: badge
                    });
                    saveMeasurementRecord({
                        id: measurementId,
                        label: measurementLabel,
                        createdAt: new Date().toISOString(),
                        preset: state.activePreset,
                        productName: getProductName(),
                        mmPerUnit,
                        baseUnits: Number(baseUnits.toFixed(4)),
                        distanceMm: Number(distMM),
                        distanceText,
                        points: {
                            start: getVectorPlain(caliperStartPoint),
                            end: getVectorPlain(caliperEndPoint)
                        },
                        localPoints: {
                            start: getVectorPlain(localA),
                            end: getVectorPlain(localB)
                        }
                    });
                    
                    caliperStartPoint = null;
                }
            }
            return; // Intercept drawing logic
        }

        // Active sketch drawing either by drawing pencil button or holding Shift key
        const shouldDraw = drawModeToggled || e.shiftKey;
        if (!shouldDraw || !activeModelGroup || activeModelGroup.children.length === 0) return;
        
        isDrawingActive = true;
        drawingPointsCache = [];
        
        // Disable camera controls during 3D sketch drawing
        if (controls) controls.enabled = false;
        
        updateMouseCoordinates(e);
        traceViewportIntersection();
    });
    
    vp.addEventListener('pointermove', (e) => {
        if (!activeModelGroup || activeModelGroup.children.length === 0) return;
        
        updateMouseCoordinates(e);
        
        // Always run raycast pointer laser look except in pure presentation Showcase
        if (!state.isShowcaseMode) {
            traceViewportIntersection();
        }
    });
    
    vp.addEventListener('pointerup', () => {
        if (isDrawingActive) {
            isDrawingActive = false;
            currentSketchLine = null;
            if (controls) controls.enabled = true;
            
            if (btnClear && drawingsGroup.children.length > 0) {
                btnClear.style.display = 'inline-flex';
            }
            playSynthClick(850, 0.03);
        }
        
        // Mute laser ray and sparks
        if (pointerRayLine) pointerRayLine.material.opacity = 0.0;
        if (sparkParticles) sparkParticles.material.opacity = 0.0;
    });
}

function updateMouseCoordinates(e) {
    const vp = document.getElementById('hologram-viewport');
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / vp.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / vp.clientHeight) * 2 + 1;
}

// Raycast tracing from lens to target surface
function traceViewportIntersection() {
    if (!renderer || !scene || !camera || !activeModelGroup) return;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(activeModelGroup.children, true);
    
    if (intersects.length > 0) {
        const hit = intersects[0].point;
        
        // 1. Show Pointer laser ray line starting from display base Y: -1.5
        if (pointerRayLine) {
            pointerRayLine.material.opacity = 0.65;
            const pos = pointerRayLine.geometry.attributes.position.array;
            pos[0] = 0; pos[1] = -1.5; pos[2] = 0; // Pedestal emission base
            pos[3] = hit.x; pos[4] = hit.y; pos[5] = hit.z; // Target hit point
            pointerRayLine.geometry.attributes.position.needsUpdate = true;
        }
        
        // 2. Animate glowing Spark particles around hit point
        if (sparkParticles && sparkGeometry) {
            sparkParticles.material.opacity = 0.95;
            const sparks = sparkGeometry.attributes.position.array;
            const time = clock.getElapsedTime();
            
            for (let i = 0; i < 30; i++) {
                const speed = sparkSpeeds[i];
                sparks[i * 3] = hit.x + Math.sin(time * 6.5 + i) * 0.12 * speed.x;
                sparks[i * 3 + 1] = hit.y + Math.cos(time * 6.5 + i) * 0.12 * speed.y;
                sparks[i * 3 + 2] = hit.z + Math.sin(time * 4.5 + i) * 0.12 * speed.z;
            }
            sparkGeometry.attributes.position.needsUpdate = true;
        }
        
        // 3. Accumulate 3D drawing lines if dragging
        if (isDrawingActive) {
            // Transform hit point into local drawingsGroup coordinates
            const localHit = drawingsGroup.worldToLocal(hit.clone());
            drawingPointsCache.push(localHit);
            
            if (drawingPointsCache.length > 1) {
                drawLiveSketchLine();
            }
        }
    } else {
        if (pointerRayLine) pointerRayLine.material.opacity = 0.0;
        if (sparkParticles) sparkParticles.material.opacity = 0.0;
    }
}

// Generate continuous glowing lines directly in 3D scene (v3.5)
function drawLiveSketchLine() {
    if (drawingPointsCache.length < 2) return;
    
    const activeColor = themeColorObj();
    
    if (!currentSketchLine) {
        const lineGeo = new THREE.BufferGeometry();
        const lineMat = new THREE.LineBasicMaterial({
            color: activeColor,
            linewidth: 2.5,
            transparent: true,
            opacity: 0.95 * state.glowIntensity,
            depthWrite: false // Avoid transparent clipping
        });
        
        currentSketchLine = new THREE.Line(lineGeo, lineMat);
        drawingsGroup.add(currentSketchLine);
    }
    
    const positions = [];
    drawingPointsCache.forEach(p => {
        positions.push(p.x, p.y, p.z);
    });
    
    currentSketchLine.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    currentSketchLine.geometry.attributes.position.needsUpdate = true;
}

// ==========================================================================
// AI Smart Voice Assistant & Studio Ambient Environment (v3.7)
// ==========================================================================

// Helper to determine if a node is part of the outer casing vs inner mechanical core
function isOuterShell(child) {
    const name = child.name || "";
    const parentName = (child.parent && child.parent.name) || "";
    
    // Explicit inner core names
    if (name === "rotor" || name === "gyro1" || name === "gyro2" || name === "gyro-core" || name === "core" || name.startsWith("node-") || name === "wheel" || name === "rod" || name === "ring1" || name === "ring2" || name === "generic-2" || name.startsWith("plasma-ring")) {
        return false;
    }
    
    // Explicit outer shell names
    if (name === "chassis" || name === "dome" || name === "camera" || name === "chassis-arm" || name === "body" || name === "cabin" || name === "spoiler" || name === "tube" || name === "cap" || name === "base" || name === "generic-1" || name === "outer" || name === "casing" || name === "shell") {
        return true;
    }
    
    // If inside chassis arm assembly
    if (parentName === "chassis-arm") {
        return true;
    }
    
    // Fallback: chrome meshes are inner mechanical cores, others are outer shells
    if (child.userData && child.userData.isChrome) {
        return false;
    }
    
    return true;
}

// Studio Environment Vignettes Builder
function updateStudioEnvironment() {
    // Clear existing children from environmentGroup
    while (environmentGroup.children.length > 0) {
        const obj = environmentGroup.children[0];
        environmentGroup.remove(obj);
    }
    envParticles = null;
    envLines = [];
    
    const activeColor = themeColorObj();
    
    if (state.studioEnvironment === 'cyberpunk') {
        const particleCount = 180;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const radius = Math.random() * 2.2;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;
            const y = Math.random() * 3.7 - 1.5;
            
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.PointsMaterial({
            color: activeColor,
            size: 0.045,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending
        });
        
        envParticles = new THREE.Points(geometry, material);
        environmentGroup.add(envParticles);
        
        addConsoleLog(state.language === 'ko' ? "[스튜디오] 사이버펑크 네온 입자 시뮬레이터 가동" : "[STUDIO] Activated Cyberpunk Neon Particle Simulator", "info");
        
    } else if (state.studioEnvironment === 'windtunnel') {
        initWindTunnelParticles();
        addConsoleLog(state.language === 'ko' ? "[스튜디오] 초고속 공기역학 풍동 기류 시뮬레이터 가동" : "[STUDIO] Activated High-Velocity Aerodynamic Windtunnel Airflow Streams", "info");
        
    } else if (state.studioEnvironment === 'cupertino') {
        const spotlight1 = new THREE.SpotLight(0xffffff, 4.0, 15, Math.PI / 4, 0.5, 1);
        spotlight1.position.set(4, 6, 4);
        spotlight1.target.position.set(0, 0.15, 0);
        environmentGroup.add(spotlight1);
        environmentGroup.add(spotlight1.target);
        
        const spotlight2 = new THREE.SpotLight(0xffffff, 4.0, 15, Math.PI / 4, 0.5, 1);
        spotlight2.position.set(-4, 6, -4);
        spotlight2.target.position.set(0, 0.15, 0);
        environmentGroup.add(spotlight2);
        environmentGroup.add(spotlight2.target);
        
        const cupertinoGrid = new THREE.GridHelper(8, 12, 0xffffff, 0xffffff);
        cupertinoGrid.position.y = -1.49;
        cupertinoGrid.material.transparent = true;
        cupertinoGrid.material.opacity = 0.15;
        environmentGroup.add(cupertinoGrid);
        
        addConsoleLog(state.language === 'ko' ? "[스튜디오] 큐퍼티노 고휘도 백색 스튜디오 조명 배치 완료" : "[STUDIO] Deployed Cupertino High-Specular Pristine Spotlights", "info");
    }
}

// Bind Environment selection panel UI buttons
function initStudioEnvironmentUi() {
    document.querySelectorAll('.env-mode-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const env = e.currentTarget.getAttribute('data-env');
            if (!env) return;
            
            playSynthClick(820, 0.05);
            
            document.querySelectorAll('.env-mode-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            state.studioEnvironment = env;
            savePreferences();
            updateStudioEnvironment();
            
            if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
                CollabManager.broadcast({
                    type: 'state_update',
                    key: 'studioEnvironment',
                    value: env
                });
            }
            
            let announceTextKo = "";
            let announceTextEn = "";
            
            if (env === 'cyberpunk') {
                announceTextKo = "사이버펑크 네온 입자 환경으로 전환되었습니다.";
                announceTextEn = "Switched to Cyberpunk neon particles laboratory environment.";
            } else if (env === 'cupertino') {
                announceTextKo = "백색 스튜디오 조명 환경으로 전환되었습니다.";
                announceTextEn = "Switched to Cupertino pristine white studio spotlights environment.";
            } else if (env === 'windtunnel') {
                announceTextKo = "실시간 풍동 흐름 모드가 활성화되었습니다.";
                announceTextEn = "Switched to Aerodynamic Windtunnel airflow streams environment.";
            }
            
            speakAssistant(state.language === 'ko' ? announceTextKo : announceTextEn);
        });
    });
}

// ==========================================================================
// 2. ROBOTIC STEP-BY-STEP ASSEMBLY PLAYBACK timelining (v3.5)
// ==========================================================================
function initAssemblySequenceUi() {
    document.querySelectorAll('.assembly-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const step = parseInt(e.currentTarget.getAttribute('data-step'));
            
            document.querySelectorAll('.assembly-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            triggerAssemblyStep(step);
        });
    });
}

function triggerAssemblyStep(step) {
    if (!activeModelGroup || activeModelGroup.children.length === 0) return;
    
    state.assemblyStep = step;
    playSynthClick(640, 0.08);
    
    // Trigger v6.0 Premium procedural interpolation tween blueprints!
    triggerAssemblyStepTween(step);
    
    // Setup snap sound arpeggios
    if (audioCtx && state.isSoundOn) {
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(440 + (step * 120), now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        osc.connect(gain);
        gain.connect(compressor || audioCtx.destination);
        osc.start();
        osc.stop(now + 0.15);
    }
    
    let targetExploded = 0.0;
    
    // Establish specific camera panning focus target coordinates
    if (step === 0) {
        targetExploded = 1.0;
        state.rotationSpeed = 0.5;
        
        targetCameraPosition.set(0, 4, 10);
        targetCameraTarget.set(0, 0, 0);
        
        addConsoleLog("[조립] 모든 시제품 결합 장치 Unloaded. 분해 구조 분석 중.", "warning");
    } 
    else if (step === 1) {
        targetExploded = 0.75;
        state.rotationSpeed = 0.3;
        // Focus on base foundation
        targetCameraPosition.set(-3, 1, 5);
        targetCameraTarget.set(0, -0.5, 0);
        
        addConsoleLog("[조립] STEP 1: 메인 섀시 프레임 Pedestal 결합 고정 완료.", "success");
    } 
    else if (step === 2) {
        targetExploded = 0.45;
        state.rotationSpeed = 0.6;
        // Focus on inner cores
        targetCameraPosition.set(2, 2.5, 4);
        targetCameraTarget.set(0, 0, 0);
        
        addConsoleLog("[조립] STEP 2: 핵심 에너지 융합 로드 및 파워 셸 결합 결속.", "success");
    } 
    else if (step === 3) {
        targetExploded = 0.2;
        state.rotationSpeed = 0.8;
        // Focus on upper dome sensors
        targetCameraPosition.set(0, 3.5, 3.8);
        targetCameraTarget.set(0, 0.4, 0);
        
        addConsoleLog("[조립] STEP 3: 상단 보호 돔 센서 및 자이로 락 추적 코일 장착.", "success");
    } 
    else if (step === 4) {
        targetExploded = 0.0;
        state.rotationSpeed = 1.4; // Spin fast when fully completed
        // Focus on all fully assembled
        targetCameraPosition.set(0, 2.5, 8);
        targetCameraTarget.set(0, 0.15, 0);
        
        addConsoleLog("[조립] STEP 4: 카본 로터 프로펠러 최종 체결. 전 전력 엔진 가동!", "success");
        
        // Spark effect
        showNotification(
            state.language === 'ko' ? "조립 및 점화 완료" : "Assembly Completed",
            state.language === 'ko' ? "시제품의 모든 장치가 체결되었습니다. 로터 구동을 개시합니다!" : "Nano-assembly completed. Initiating startup engines!"
        );
    }
    
    // Set slider and animate disassembly level
    const tuner = document.getElementById('tuner-exploded');
    if (tuner) tuner.value = targetExploded;
    const readout = document.getElementById('readout-exploded');
    if (readout) readout.innerText = `${Math.round(targetExploded * 100)}%`;
    
    // Trigger smooth lerping slide level animations
    let count = 0;
    const interval = setInterval(() => {
        state.explodedLevel += (targetExploded - state.explodedLevel) * 0.2;
        count++;
        if (count > 25 || Math.abs(state.explodedLevel - targetExploded) < 0.01) {
            state.explodedLevel = targetExploded;
            clearInterval(interval);
        }
    }, 30);
    
    // Sync assembly step buttons highlighting
    document.querySelectorAll('.assembly-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.getAttribute('data-step')) === step) {
            btn.classList.add('active');
        }
    });
    
    // Announce via AI Speech Assistant
    let announceText = "";
    if (state.language === 'ko') {
        if (step === 0) announceText = "분해 구조 분석 모드가 기동되었습니다.";
        else if (step === 1) announceText = "일단계, 섀시 결합 고정 완료.";
        else if (step === 2) announceText = "이단계, 에너지 융합 로드 결착 완료.";
        else if (step === 3) announceText = "삼단계, 돔 센서 및 자이로 락 고정 완료.";
        else if (step === 4) announceText = "시제품의 모든 조립 결합 장치가 완벽하게 가동되었습니다.";
    } else {
        if (step === 0) announceText = "Internal components exploded for structural check.";
        else if (step === 1) announceText = "Step one, main chassis frame locked.";
        else if (step === 2) announceText = "Step two, fusion rods and power core engaged.";
        else if (step === 3) announceText = "Step three, upper dome and gyro tracking locks active.";
        else if (step === 4) announceText = "Robotic assembly complete. Initiating power engines.";
    }
    speakAssistant(announceText);
}

// ==========================================================================
// 3. DYNAMIC THERMAL VERTEX SHADING SIMULATOR (v3.5)
// ==========================================================================
function updateThermalShading(time) {
    if (state.renderMode !== 'thermal' || !activeModelGroup) return;
    
    activeModelGroup.traverse(child => {
        if (child.isMesh && child.geometry) {
            const geo = child.geometry;
            const posAttr = geo.attributes.position;
            if (!posAttr) return;
            
            let colorAttr = geo.attributes.color;
            if (!colorAttr || colorAttr.count !== posAttr.count) {
                const colors = new Float32Array(posAttr.count * 3);
                geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
                colorAttr = geo.attributes.color;
            }
            
            const colorsArray = colorAttr.array;
            const hasHeatSources = state.heatSources && state.heatSources.length > 0;
            
            for (let i = 0; i < posAttr.count; i++) {
                const vx = posAttr.getX(i);
                const vy = posAttr.getY(i);
                const vz = posAttr.getZ(i);
                
                let heatSum = 0;
                
                if (hasHeatSources) {
                    const vWorld = new THREE.Vector3(vx, vy, vz).applyMatrix4(child.matrixWorld);
                    
                    state.heatSources.forEach(src => {
                        const dist = vWorld.distanceTo(src.point);
                        const radius = 2.4; // Thermal dispersion radius (meters)
                        if (dist < radius) {
                            heatSum += (1.0 - (dist / radius)) * 1.35;
                        }
                    });
                }
                
                const baseFriction = Math.sin(time * 3.0 + vy * 5.0 + vz * 3.0) * 0.15 + 0.15;
                const totalHeat = Math.min(baseFriction + heatSum, 1.0);
                
                const hue = 0.65 - (totalHeat * 0.65);
                
                const tempColor = new THREE.Color();
                tempColor.setHSL(hue, 0.95, 0.5);
                
                colorsArray[i * 3] = tempColor.r;
                colorsArray[i * 3 + 1] = tempColor.g;
                colorsArray[i * 3 + 2] = tempColor.b;
            }
            
            colorAttr.needsUpdate = true;
        }
    });
}

// ==========================================================================
// 4. CINEMATIC PITCH SEQUENCE KEYFRAME PANNING DIRECTOR (v3.5)
// ==========================================================================
function initCinematicDirector() {
    const btnDirector = document.getElementById('btn-play-director');
    if (btnDirector) {
        btnDirector.addEventListener('click', () => {
            triggerCinematicDirector();
        });
    }
}

function triggerCinematicDirector() {
    if (state.directorActive) return;
    
    state.directorActive = true;
    
    const btnDir = document.getElementById('btn-play-director');
    if (btnDir) btnDir.classList.add('active-dock');
    
    showNotification(
        state.language === 'ko' ? "시네마틱 발표 디렉터 가동" : "Cinematic Director Suite Active",
        state.language === 'ko' ? "마우스 조작 없는 자동 연출 시퀀스를 16초간 기동합니다." : "Initiating 16-second automated keynote presenter sequence."
    );
    
    addConsoleLog("[디렉터] 시네마틱 프레젠테이션 시퀀스 시작.", "warning");
    
    // Stage Timeline Steps sequence
    // Cut 1: Studio Long shot (0s - 4s)
    playSynthSweep(180, 520, 0.8);
    state.cameraMode = 'front';
    targetCameraPosition.set(8, 4, 12);
    targetCameraTarget.set(0, -0.5, 0);
    triggerAssemblyStep(4); // Fully assembled
    
    // Cut 2: Close-up Gimbal AI diagnostics scan (4s - 8s)
    setTimeout(() => {
        if (!state.directorActive) return;
        playSynthSweep(220, 680, 0.8);
        state.cameraMode = 'macro';
        targetCameraPosition.set(1.5, 0.5, 2.5);
        targetCameraTarget.set(0, -0.3, 0);
        triggerAiScan(); // Trigger auto-scan
    }, 4000);
    
    // Cut 3: Top-shot full exploded structural analysis (8s - 12s)
    setTimeout(() => {
        if (!state.directorActive) return;
        playSynthSweep(300, 720, 0.8);
        state.cameraMode = 'top';
        targetCameraPosition.set(0, 9, 0.1);
        targetCameraTarget.set(0, 0, 0);
        triggerAssemblyStep(0); // Fully disassembled
    }, 8000);
    
    // Cut 4: Multi-axes gyro targeting lock-on glide (12s - 16s)
    setTimeout(() => {
        if (!state.directorActive) return;
        playSynthSweep(200, 800, 0.8);
        state.cameraMode = 'orbit';
        targetCameraPosition.set(-4, 3, 7);
        targetCameraTarget.set(0, 0.15, 0);
        triggerAssemblyStep(4); // Reassembled
        
        // Active thermal for ultimate studio showcase!
        const thermalBtn = document.querySelector('.render-mode-btn[data-mode="thermal"]');
        if (thermalBtn) thermalBtn.click();
    }, 12000);
    
    // Finish Sequence and return variables
    setTimeout(() => {
        if (!state.directorActive) return;
        state.directorActive = false;
        if (btnDir) btnDir.classList.remove('active-dock');
        
        // Return to standard wireframe style
        const wireframeBtn = document.querySelector('.render-mode-btn[data-mode="wireframe"]');
        if (wireframeBtn) wireframeBtn.click();
        
        showNotification(
            state.language === 'ko' ? "시네마틱 연출 시퀀스 완료" : "Sequence Director Finished",
            state.language === 'ko' ? "모든 시네마틱 앵글 투사가 정상 조율되었습니다." : "Cinematic director loop completed successfully."
        );
        
        addConsoleLog("[성공] 시네마틱 발표 디렉터 연출 완료. SYSTEM STATUS: OPTIMAL.", "success");
    }, 16000);
}

// Ensure DOM engine starters bind correctly (v3.5)
document.addEventListener('DOMContentLoaded', () => {
    cacheDOMElements(); // Cache frequent DOM nodes on load (v5.0 Optimization)
    
    // Warm up speech synthesis voices early
    if (window.speechSynthesis) {
        window.speechSynthesis.getVoices();
    }
    
    // Add delayed starter bindings to sync with index.html loaders
    setTimeout(() => {
        initSpatialDrawingEngine();
        initAssemblySequenceUi();
        initCinematicDirector();
        initStudioEnvironmentUi();
        initKeyboardShortcuts();  // v3.8
        initMobileUi();           // v3.8
        initGesturePilotControls(); // v10.1 — viewport gesture pilot
        initSpatialInteractiveCallouts(); // v4.0
        initVoiceRecognition();   // v5.0
        initArchiveSystem();      // v5.0
        initPowerCoreEasterEgg(); // v9.0 — secret personal-fun mode (Konami code)
        initStandControlsUi();    // v10.0 — ST,AND fold + lineup controls
        initLightingControls();   // v10.x — studio lighting moods + brightness

        // v7.0 Premium visual elements (Fluid aurora & interactive glass tilts)
        initDynamicFluidAurora();
        initInteractiveTiltCards();
        
        // v8.0 Timeline Keyframe Presenter
        if (typeof initTimelineEditor === 'function') {
            initTimelineEditor();
        }
        
        // v8.0 P2P Collaboration System
        if (typeof CollabManager !== 'undefined' && typeof CollabManager.init === 'function') {
            CollabManager.init();
        }
        
        // v8.0 AI Assistant Engine
        if (typeof AiAssistantManager !== 'undefined' && typeof AiAssistantManager.init === 'function') {
            AiAssistantManager.init();
        }
    }, 500);
});

// ==========================================================================
// HOLOSYN v3.8 "PRODUCTION GRADE" — KEYBOARD, MOBILE, PERFORMANCE
// ==========================================================================

// Keyboard Shortcuts System (v3.8)
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Skip if user is typing in an input/textarea
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        
        const key = e.key.toLowerCase();
        
        switch (key) {
            case '1': // Wireframe
                e.preventDefault();
                setRenderModeByKey('wireframe');
                break;
            case '2': // Solid
                e.preventDefault();
                setRenderModeByKey('solid');
                break;
            case '3': // Points
                e.preventDefault();
                setRenderModeByKey('points');
                break;
            case '4': // Thermal
                e.preventDefault();
                setRenderModeByKey('thermal');
                break;
            case '5': // X-Ray
                e.preventDefault();
                setRenderModeByKey('xray');
                break;
            case ' ': // Space - toggle rotation pause
                e.preventDefault();
                if (state.rotationSpeed > 0) {
                    state._savedRotSpeed = state.rotationSpeed;
                    state.rotationSpeed = 0;
                    showNotification(
                        state.language === 'ko' ? "회전 일시정지" : "Rotation Paused",
                        state.language === 'ko' ? "Space 키로 재개합니다." : "Press Space to resume."
                    );
                } else {
                    state.rotationSpeed = state._savedRotSpeed || 1.0;
                    showNotification(
                        state.language === 'ko' ? "회전 재개" : "Rotation Resumed",
                        state.language === 'ko' ? "자동 회전이 다시 시작됩니다." : "Auto-rotation resumed."
                    );
                }
                savePreferences();
                break;
            case 'r': // Reset camera
                e.preventDefault();
                targetCameraPosition.set(0, 4, 10);
                targetCameraTarget.set(0, 0, 0);
                state.cameraMode = 'orbit';
                showNotification(
                    state.language === 'ko' ? "카메라 리셋" : "Camera Reset",
                    state.language === 'ko' ? "기본 궤도 위치로 복원되었습니다." : "Default orbit position restored."
                );
                break;
            case 'f': // Fullscreen toggle
                e.preventDefault();
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => {});
                } else {
                    document.exitFullscreen().catch(() => {});
                }
                break;
            case 's': // AI Scan
                e.preventDefault();
                if (typeof triggerAiScan === 'function') triggerAiScan();
                break;
            case 'e': // Exploded view toggle
                e.preventDefault();
                if (state.explodedLevel > 0.5) {
                    if (typeof triggerAssemblyStep === 'function') triggerAssemblyStep(4);
                } else {
                    if (typeof triggerAssemblyStep === 'function') triggerAssemblyStep(0);
                }
                break;
            case 'm': // Sound toggle
                e.preventDefault();
                if (typeof toggleSound === 'function') toggleSound();
                break;
            case 'l': // Language toggle
                e.preventDefault();
                const newLang = state.language === 'ko' ? 'en' : 'ko';
                updateLanguageHTML(newLang);
                break;
            case 'p': // Showcase mode
                e.preventDefault();
                const showcaseBtn = document.getElementById('btn-showcase-toggle');
                if (showcaseBtn) showcaseBtn.click();
                break;
            case 'escape': // Close modals/overlays
                e.preventDefault();
                // Close mobile drawers
                closeMobileDrawers();
                // Close scanning overlay
                const scanOverlay = document.getElementById('ai-scan-overlay');
                if (scanOverlay && !scanOverlay.classList.contains('hidden-stage')) {
                    scanOverlay.classList.add('hidden-stage');
                }
                break;
        }
    });
}

// Helper to set render mode from keyboard
function setRenderModeByKey(mode) {
    const btn = document.querySelector(`.render-mode-btn[data-mode="${mode}"]`);
    if (btn) {
        btn.click();
    } else {
        state.renderMode = mode;
        savePreferences();
        toggleRenderVisibility();
    }
}

// Mobile UI System (v3.8)
function initMobileUi() {
    const btnMenu = document.getElementById('btn-mobile-menu');
    const leftPanel = document.getElementById('hud-left-panel');
    const rightPanel = document.getElementById('hud-right-panel');
    const backdrop = document.getElementById('drawer-backdrop');
    
    // Hamburger menu toggles left drawer
    if (btnMenu) {
        btnMenu.addEventListener('click', () => {
            if (leftPanel) leftPanel.classList.toggle('drawer-open');
            if (rightPanel) rightPanel.classList.remove('drawer-open');
            if (backdrop) backdrop.classList.toggle('active', leftPanel && leftPanel.classList.contains('drawer-open'));
            playSynthClick(600, 0.04);
        });
    }
    
    // Backdrop click closes all drawers
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            closeMobileDrawers();
        });
    }
    
    // Close drawers on window resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileDrawers();
        }
    });
    
    // Mobile toolbar button handlers
    document.querySelectorAll('.mobile-tool-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.currentTarget.getAttribute('data-action');
            playSynthClick(700, 0.04);
            
            switch (action) {
                case 'menu-left':
                    if (leftPanel) leftPanel.classList.toggle('drawer-open');
                    if (rightPanel) rightPanel.classList.remove('drawer-open');
                    if (backdrop) backdrop.classList.toggle('active', leftPanel && leftPanel.classList.contains('drawer-open'));
                    break;
                case 'render-cycle':
                    // Cycle through render modes
                    const modes = ['wireframe', 'solid', 'points', 'thermal', 'xray'];
                    const curIdx = modes.indexOf(state.renderMode);
                    const nextMode = modes[(curIdx + 1) % modes.length];
                    setRenderModeByKey(nextMode);
                    showNotification(
                        state.language === 'ko' ? "렌더 모드 전환" : "Render Mode Changed",
                        nextMode.toUpperCase()
                    );
                    break;
                case 'ai-scan':
                    if (typeof triggerAiScan === 'function') triggerAiScan();
                    break;
                case 'timeline':
                    closeMobileDrawers();
                    if (typeof setTimelinePanelOpen === 'function') {
                        setTimelinePanelOpen(!state.timelineOpen);
                    }
                    showNotification(
                        state.language === 'ko' ? "타임라인 디렉터" : "Timeline Director",
                        state.timelineOpen
                            ? (state.language === 'ko' ? "키프레임 발표 패널을 열었습니다." : "Keyframe presenter panel opened.")
                            : (state.language === 'ko' ? "키프레임 발표 패널을 닫았습니다." : "Keyframe presenter panel closed.")
                    );
                    break;
                case 'sound-toggle':
                    if (typeof toggleSound === 'function') toggleSound();
                    break;
                case 'menu-right':
                    if (rightPanel) rightPanel.classList.toggle('drawer-open');
                    if (leftPanel) leftPanel.classList.remove('drawer-open');
                    if (backdrop) backdrop.classList.toggle('active', rightPanel && rightPanel.classList.contains('drawer-open'));
                    break;
            }
        });
    });
    
    // Double-tap on viewport to reset camera (mobile)
    let lastTapTime = 0;
    const viewport = document.getElementById('hologram-viewport');
    if (viewport) {
        viewport.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTapTime < 300) {
                // Double tap detected
                e.preventDefault();
                targetCameraPosition.set(0, 4, 10);
                targetCameraTarget.set(0, 0, 0);
                state.cameraMode = 'orbit';
                showNotification(
                    state.language === 'ko' ? "카메라 리셋" : "Camera Reset",
                    state.language === 'ko' ? "더블탭: 기본 위치로 복원" : "Double-tap: Default position restored."
                );
            }
            lastTapTime = now;
        }, { passive: false });
    }
}

// Close all mobile drawers
function closeMobileDrawers() {
    const leftPanel = document.getElementById('hud-left-panel');
    const rightPanel = document.getElementById('hud-right-panel');
    const backdrop = document.getElementById('drawer-backdrop');
    if (leftPanel) leftPanel.classList.remove('drawer-open');
    if (rightPanel) rightPanel.classList.remove('drawer-open');
    if (backdrop) backdrop.classList.remove('active');
}

// FPS Counter (v3.8) — updates every second, shown in Pro mode console
function updateFpsCounter() {
    fpsFrameCount++;
    const now = performance.now();
    if (now - fpsLastTime >= 1000) {
        fpsDisplay = fpsFrameCount;
        fpsFrameCount = 0;
        fpsLastTime = now;
        
        // Update Pro mode console with FPS (v5.0 Optimization)
        if (state.uiMode === 'pro' && DOM.fpsCounter) {
            DOM.fpsCounter.textContent = `${fpsDisplay} FPS`;
            DOM.fpsCounter.style.color = fpsDisplay >= 50 ? 'var(--green)' : fpsDisplay >= 30 ? 'var(--orange)' : 'var(--crimson)';
        }
        updateLaunchReadinessPanel();
    }
}

// ==========================================================================
// HOLOSYN v4.0 — INTERACTIVE PART ANNONTATION CALLOUTS WITH RAYCASTING
// ==========================================================================
let hoveredPart = null;
let hoveredPartOriginalMaterial = null;

function initSpatialInteractiveCallouts() {
    const vp = document.getElementById('hologram-viewport');
    const svgOverlay = document.getElementById('callout-svg-overlay');
    const calloutTooltip = document.getElementById('hud-part-callout');
    
    if (!vp || !svgOverlay || !calloutTooltip) return;
    
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    vp.addEventListener('pointermove', (e) => {
        // Only run interactive annotations in PRO mode & when not in pyramid mode
        if (state.uiMode === 'beginner' || state.isPyramidMode || !activeModelGroup) {
            hideCallout();
            return;
        }
        
        const rect = vp.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / vp.clientWidth) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / vp.clientHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        
        // Find intersections within active models
        const intersects = raycaster.intersectObjects(activeModelGroup.children, true);
        
        // Filter out sparkles, helpers, base mesh, or rays
        const validIntersections = intersects.filter(intersect => {
            const name = intersect.object.name || "";
            return !name.includes("sparkles") && !name.includes("base") && !name.includes("rays") && !name.includes("generic-2");
        });
        
        if (validIntersections.length > 0) {
            const hit = validIntersections[0].object;
            
            if (hoveredPart !== hit) {
                restoreHoveredPart();
                
                hoveredPart = hit;
                if (hit.material) {
                    hoveredPartOriginalMaterial = hit.material;
                    
                    // Create glowing hover highlights
                    hit.material = hit.material.clone();
                    hit.material.emissive = themeColorObj();
                    hit.material.emissiveIntensity = 0.85;
                }
                
                // Play cybernetic beep sound if enabled
                if (state.isSoundOn) {
                    playSynthClick(1100, 0.012);
                }
            }
            
            // 2. Project 3D Part center into 2D screen coordinates
            const centerV = new THREE.Vector3();
            if (hit.geometry) {
                if (!hit.geometry.boundingBox) hit.geometry.computeBoundingBox();
                hit.geometry.boundingBox.getCenter(centerV);
            }
            hit.localToWorld(centerV);
            
            const tempV = centerV.clone();
            tempV.project(camera);
            
            // Do not show if behind frustum
            if (tempV.z > 1.0) {
                hideCallout();
                return;
            }
            
            const screenX = (tempV.x * 0.5 + 0.5) * vp.clientWidth + rect.left;
            const screenY = (tempV.y * -0.5 + 0.5) * vp.clientHeight + rect.top;
            
            // 3. Render floating callout panel positioning
            calloutTooltip.style.display = 'block';
            
            // Offset tooltip from direct cursor pointer
            const tooltipX = screenX + 70;
            const tooltipY = screenY - 45;
            
            calloutTooltip.style.left = `${tooltipX}px`;
            calloutTooltip.style.top = `${tooltipY}px`;
            
            // 4. Update metrics readouts dynamically
            const partName = hit.name || "INTEGRATED NODE";
            if (DOM.calloutPartName) DOM.calloutPartName.innerText = partName.replace(/[_\-]/g, ' ').toUpperCase();
            
            // Cyber sweeps random diagnostic values
            const tempVal = (32.4 + Math.sin(Date.now() * 0.003) * 4.2).toFixed(1);
            const stabVal = (98.5 + Math.cos(Date.now() * 0.005) * 1.4).toFixed(1);
            if (DOM.calloutPartTemp) DOM.calloutPartTemp.innerText = `${tempVal}°C`;
            if (DOM.calloutPartStab) DOM.calloutPartStab.innerText = `${stabVal}%`;
            
            const isCritical = tempVal > 35;
            if (DOM.calloutPartStatus) {
                DOM.calloutPartStatus.innerText = isCritical ? "THERMAL WARNING" : "NOMINAL // SECURE";
                DOM.calloutPartStatus.style.color = isCritical ? "#ff1e27" : "#00ff77";
            }
            
            // 5. Draw neon vector lines in SVG
            svgOverlay.innerHTML = `
                <line x1="${screenX}" y1="${screenY}" x2="${tooltipX}" y2="${tooltipY + 25}"></line>
                <circle cx="${screenX}" cy="${screenY}" r="3" fill="${state.themeColor}"></circle>
            `;
        } else {
            hideCallout();
        }
    });
    
    vp.addEventListener('pointerleave', () => {
        hideCallout();
    });
    
    function restoreHoveredPart() {
        if (hoveredPart && hoveredPartOriginalMaterial) {
            hoveredPart.material = hoveredPartOriginalMaterial;
        }
        hoveredPart = null;
        hoveredPartOriginalMaterial = null;
    }
    
    function hideCallout() {
        restoreHoveredPart();
        calloutTooltip.style.display = 'none';
        svgOverlay.innerHTML = '';
    }
}

// ==========================================================================
// HOLOSYN v5.0 — AI VOICE COMMAND INTENT PARSER SYSTEM (speech-to-intent)
// ==========================================================================
let recognition = null;
let isVoiceListening = false;

// Dynamic Web Speech Text-to-Speech (TTS) synthesizer helper (v5.0)
function speakAssistant(text) {
    if (!window.speechSynthesis) return;
    
    window.speechSynthesis.cancel(); // Cancel queue overlaps
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = state.language === 'ko' ? 'ko-KR' : 'en-US';
    utterance.volume = 0.85;
    utterance.pitch = state.language === 'ko' ? 1.0 : 0.95;
    utterance.rate = state.language === 'ko' ? 1.05 : 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        const matched = voices.find(v => v.lang.includes(state.language === 'ko' ? 'KR' : 'US')) ||
                        voices.find(v => v.lang.startsWith(state.language === 'ko' ? 'ko' : 'en'));
        if (matched) utterance.voice = matched;
    }
    
    window.speechSynthesis.speak(utterance);
}

function initVoiceRecognition() {
    const btnVoice = document.getElementById('btn-voice-command');
    const indicator = document.getElementById('voice-listening-indicator');
    
    if (!btnVoice) return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        btnVoice.title = "음성 인식이 지원되지 않는 브라우저입니다.";
        return;
    }
    
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = (e) => {
        const text = e.results[0][0].transcript.toLowerCase().trim();
        addConsoleLog(`[VOICE-CMD] Detected input phrase: "${text}"`, "info");
        
        parseVoiceIntent(text);
        stopVoiceListening();
    };
    
    recognition.onerror = (e) => {
        // 'aborted' (user stopped) and 'no-speech' (silence) are expected — stay quiet.
        const benign = e.error === 'aborted' || e.error === 'no-speech';
        if (e.error === 'not-allowed') {
            console.warn("Speech recognition: microphone access denied.");
            addConsoleLog(state.language === 'ko' ? "[경고] 마이크 권한이 거부되었습니다. 주소창 설정에서 마이크를 허용해 주세요." : "[WARNING] Microphone access denied. Please allow microphone in settings.", "warning");
            showNotification(
                state.language === 'ko' ? "마이크 권한 거부됨" : "Mic Access Denied",
                state.language === 'ko' ? "브라우저 주소창의 마이크 잠금을 해제해 주세요." : "Please enable microphone permission in browser."
            );
        } else if (!benign) {
            console.warn("Speech recognition error:", e.error);
            addConsoleLog(state.language === 'ko' ? `[음성인식 경고] 음성 입력 처리 불가: ${e.error}` : `[Speech Warning] Audio processing failed: ${e.error}`, "warning");
        }
        stopVoiceListening();
    };
    
    // V9.2 Polish: No match fallback handling
    recognition.onnomatch = () => {
        addConsoleLog(state.language === 'ko' ? "[안내] 음성을 인식하지 못했습니다. 다시 시도해주세요." : "[INFO] Speech not recognized. Please try again.", "warning");
        stopVoiceListening();
    };
    
    recognition.onend = () => {
        stopVoiceListening();
    };
    
    btnVoice.addEventListener('click', () => {
        if (!isVoiceListening) {
            startVoiceListening();
        } else {
            stopVoiceListening();
        }
    });
    
    // Bind Voice Guide help button & close button (v5.0 Priority 3)
    if (DOM.btnVoiceHelp && DOM.voiceHelpModal) {
        DOM.btnVoiceHelp.addEventListener('click', () => {
            playSynthClick(700, 0.05);
            DOM.voiceHelpModal.style.display = 'flex';
        });
    }
    if (DOM.btnCloseVoiceHelp && DOM.voiceHelpModal) {
        DOM.btnCloseVoiceHelp.addEventListener('click', () => {
            playSynthClick(600, 0.05);
            DOM.voiceHelpModal.style.display = 'none';
        });
    }
    
    function startVoiceListening() {
        if (!recognition || isVoiceListening) return; // guard against double-start (InvalidStateError)
        try {
            recognition.lang = state.language === 'ko' ? 'ko-KR' : 'en-US';
            recognition.start();
            isVoiceListening = true;
            
            btnVoice.classList.add('active-voice-btn');
            btnVoice.style.backgroundColor = 'var(--theme-color-glow)';
            btnVoice.style.boxShadow = '0 0 12px var(--theme-color)';
            
            if (indicator) indicator.style.display = 'flex';
            
            if (state.isSoundOn) {
                playSynthClick(980, 0.05);
                playSynthClick(1380, 0.04);
            }
        } catch (err) {
            console.warn("Speech recognition could not start:", err.message || err);
            isVoiceListening = false;
        }
    }

    function stopVoiceListening() {
        if (!recognition) return;
        try {
            recognition.stop();
        } catch(e) {}
        
        isVoiceListening = false;
        btnVoice.classList.remove('active-voice-btn');
        btnVoice.style.backgroundColor = 'transparent';
        btnVoice.style.boxShadow = 'none';
        
        if (indicator) indicator.style.display = 'none';
    }
}

// Intent Classifier NLP mapping rules
function parseVoiceIntent(phrase) {
    let triggered = false;
    
    const intentMatches = (keywords) => {
        return keywords.some(keyword => phrase.includes(keyword));
    };
    
    // 1. AI Scan command
    if (intentMatches(['스캔', 'scan', '진단', '검사', '체크'])) {
        triggerAiScan();
        triggered = true;
    }
    // 2. Export composite spec card command
    else if (intentMatches(['캡처', '저장', '내보내', 'capture', 'save', 'snapshot'])) {
        exportSnapshotPNG();
        triggered = true;
    }
    // V9.2 Polish: 2.5. Clear Scene Command
    else if (intentMatches(['초기화', '지워', '삭제', '리셋', 'clear', 'reset', 'delete'])) {
        clearActiveScene();
        speakAssistant(state.language === 'ko' ? "작업 공간 메모리를 안전하게 비웠습니다." : "Workspace memory successfully flushed.");
        triggered = true;
    }
    // 3. Render Solid Mode change
    else if (intentMatches(['솔리드', 'solid', '표면'])) {
        const btn = document.querySelector('.render-mode-btn[data-mode="solid"]');
        if (btn) btn.click();
        speakAssistant(state.language === 'ko' ? "솔리드 모드로 투영합니다." : "Projecting solid surface layer.");
        triggered = true;
    }
    // 4. Render Wireframe Mode
    else if (intentMatches(['와이어', '그물', 'wireframe', 'wire'])) {
        const btn = document.querySelector('.render-mode-btn[data-mode="wireframe"]');
        if (btn) btn.click();
        speakAssistant(state.language === 'ko' ? "와이어프레임 격자를 가동합니다." : "Activating technical wireframe mesh.");
        triggered = true;
    }
    // 5. Render Points Mode
    else if (intentMatches(['포인트', '입자', '점', 'points'])) {
        const btn = document.querySelector('.render-mode-btn[data-mode="points"]');
        if (btn) btn.click();
        speakAssistant(state.language === 'ko' ? "양자 파티클 구름으로 분해합니다." : "Scattering into quantum particle cloud.");
        triggered = true;
    }
    // 6. Render Thermal Mode
    else if (intentMatches(['열화상', '열감지', 'thermal'])) {
        const btn = document.querySelector('.render-mode-btn[data-mode="thermal"]');
        if (btn) btn.click();
        speakAssistant(state.language === 'ko' ? "열 에너지 적외선 방출을 조율합니다." : "Calibrating thermal infrared emission.");
        triggered = true;
    }
    // 7. Render X-Ray Mode
    else if (intentMatches(['엑스레이', '투과', 'xray', 'x-ray'])) {
        const btn = document.querySelector('.render-mode-btn[data-mode="xray"]');
        if (btn) btn.click();
        speakAssistant(state.language === 'ko' ? "내부 골격층을 투과합니다." : "Exposing structural xray shell.");
        triggered = true;
    }
    // 8. Auto-Rotate switch
    else if (intentMatches(['회전', '도안', 'rotate', 'rotation'])) {
        const switchRotate = document.getElementById('switch-rotate');
        if (switchRotate) {
            switchRotate.click();
        }
        triggered = true;
    }
    // 9. Pyramid mode toggle
    else if (intentMatches(['피라미드', 'pyramid'])) {
        const switchPyramid = document.getElementById('switch-pyramid');
        if (switchPyramid) {
            switchPyramid.click();
        }
        triggered = true;
    }
    // 10. Exploded View spring shockwave command (v5.0!)
    else if (intentMatches(['충격파', '폭발', '분해', 'shockwave', 'explode'])) {
        triggerQuantumShockwave();
        triggered = true;
    }
    // 11. Color Theme shift commands
    else if (intentMatches(['블루', 'blue', '파란색'])) {
        const btn = document.querySelector('.color-select-btn[data-color="blue"]');
        if (btn) btn.click();
        triggered = true;
    }
    else if (intentMatches(['그린', 'green', '초록색', '매트릭스'])) {
        const btn = document.querySelector('.color-select-btn[data-color="green"]');
        if (btn) btn.click();
        triggered = true;
    }
    else if (intentMatches(['실버', 'silver', '회색', '하얀색'])) {
        const btn = document.querySelector('.color-select-btn[data-color="silver"]');
        if (btn) btn.click();
        triggered = true;
    }
    else if (intentMatches(['오렌지', 'orange', '주황색', '에너지'])) {
        const btn = document.querySelector('.color-select-btn[data-color="orange"]');
        if (btn) btn.click();
        triggered = true;
    }
    else if (intentMatches(['크림슨', '레드', 'crimson', '빨간색'])) {
        const btn = document.querySelector('.color-select-btn[data-color="crimson"]');
        if (btn) btn.click();
        triggered = true;
    }
}

// ==========================================================================
// HOLOSYN v5.0 — QUANTUM EXPLODED SHOCKWAVE & SPRING PHYSICS (탄성 분해 충격파)
// ==========================================================================
// Elastic spring out easing for high-tech physical momentum sfx (v5.0)
function easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;
    return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

let shockwaveParticlesMesh = null;
let shockwaveParticlesData = []; // Velocities and lifetimes of sparks

function triggerQuantumShockwave() {
    if (!activeModelGroup) return;
    
    // Play sci-fi mechanical explosion sound sweeps
    if (state.isSoundOn) {
        playSynthSweep(100, 1900, 1.4);
        playSynthClick(220, 0.6);
        setTimeout(() => { playSynthSweep(800, 100, 0.8); }, 550); // Spring back whoosh
    }
    
    if (state.language === 'ko') {
        addConsoleLog("[양자] 분해 충격파 가동. 양자 상태 탄성 붕괴 시작...", "warning");
    } else {
        addConsoleLog("[QUANTUM] Initiating physical spring shockwave collapse...", "warning");
    }
    
    // Create and inject sparkling particles burst
    createShockwaveParticles();
    
    const slider = document.getElementById('tuner-exploded');
    const readout = document.getElementById('readout-exploded');
    
    // Animate exploded level using requestAnimationFrame timeline
    const duration = 1500; // 1.5s total sequence
    const startTime = performance.now();
    
    function animateShockwave() {
        const now = performance.now();
        const elapsed = now - startTime;
        
        if (elapsed < duration) {
            // Timeline split: 
            // 0 - 550ms: Rapid elastic explosion spring out
            // 550 - 1500ms: Smooth damp decay back to 0.0
            if (elapsed < 550) {
                const t = elapsed / 550;
                // Bounce up to 1.35x maximum over-extension
                state.explodedLevel = easeOutElastic(t) * 1.35;
            } else {
                const t = (elapsed - 550) / (duration - 550);
                // Ease out quad decay back to 0.0 flat
                state.explodedLevel = 1.35 * (1.0 - t * t);
            }
            
            // Sync slider UI controls
            if (slider) slider.value = state.explodedLevel;
            if (readout) readout.innerText = `${Math.round(state.explodedLevel * 100)}%`;
            
            // Re-apply translated offsets to active meshes
            updateExplodedTranslations(compoundMesh || activeModelGroup.children[0]);
            
            requestAnimationFrame(animateShockwave);
        } else {
            // Restore stable flat state
            state.explodedLevel = 0.0;
            if (slider) slider.value = 0.0;
            if (readout) readout.innerText = "0%";
            updateExplodedTranslations(compoundMesh || activeModelGroup.children[0]);
            
            if (state.language === 'ko') {
                addConsoleLog("[양자] 분해 충격파 시퀀스 종료. 안정적인 기하 궤도를 수립했습니다.", "success");
            } else {
                addConsoleLog("[QUANTUM] Shockwave sequence finished. Restored cohesive structural geometry.", "success");
            }
        }
    }
    
    animateShockwave();
}

function createShockwaveParticles() {
    if (!activeModelGroup) return;
    
    // Cleanup any orphaned particles
    cleanupShockwaveParticles();
    
    const count = 300;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    shockwaveParticlesData = [];
    const activeColor = themeColorObj();
    
    // Spawn particles in a tight sphere ring at center pedestal
    for (let i = 0; i < count; i++) {
        positions[i*3] = 0;
        positions[i*3+1] = 0.2; // Float above pedestal center
        positions[i*3+2] = 0;
        
        // Random velocity direction (expanding ring disk)
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.06 + Math.random() * 0.15;
        const vx = Math.cos(angle) * speed;
        const vy = (Math.random() - 0.2) * 0.06; // Expands outward and slightly upward
        const vz = Math.sin(angle) * speed;
        
        shockwaveParticlesData.push({
            vx: vx,
            vy: vy,
            vz: vz,
            life: 1.0,
            decay: 0.012 + Math.random() * 0.018 // Fade out speed
        });
        
        colors[i*3] = activeColor.r;
        colors[i*3+1] = activeColor.g;
        colors[i*3+2] = activeColor.b;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const mat = new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    shockwaveParticlesMesh = new THREE.Points(geo, mat);
    shockwaveParticlesMesh.name = "shockwave-sparks";
    activeModelGroup.add(shockwaveParticlesMesh);
}

function updateShockwaveParticlesPhysics(delta) {
    if (!shockwaveParticlesMesh) return;
    
    const posAttr = shockwaveParticlesMesh.geometry.attributes.position;
    const mat = shockwaveParticlesMesh.material;
    
    let allDead = true;
    
    for (let i = 0; i < shockwaveParticlesData.length; i++) {
        const p = shockwaveParticlesData[i];
        if (p.life <= 0) continue;
        
        allDead = false;
        
        // Dynamic velocity expansion
        let x = posAttr.getX(i);
        let y = posAttr.getY(i);
        let z = posAttr.getZ(i);
        
        // Drag physics slowing expansion
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.vz *= 0.94;
        
        x += p.vx;
        y += p.vy;
        z += p.vz;
        
        posAttr.setXYZ(i, x, y, z);
        
        // Decay lifetime
        p.life -= p.decay;
    }
    
    posAttr.needsUpdate = true;
    
    // Smoothly fade out material opacity
    const avgLife = shockwaveParticlesData.reduce((acc, p) => acc + Math.max(0, p.life), 0) / shockwaveParticlesData.length;
    mat.opacity = avgLife;
    
    // Auto dispose if all sparks faded out
    if (allDead || avgLife <= 0.01) {
        cleanupShockwaveParticles();
    }
}

function cleanupShockwaveParticles() {
    if (shockwaveParticlesMesh) {
        activeModelGroup.remove(shockwaveParticlesMesh);
        if (shockwaveParticlesMesh.geometry) shockwaveParticlesMesh.geometry.dispose();
        if (shockwaveParticlesMesh.material) shockwaveParticlesMesh.material.dispose();
        shockwaveParticlesMesh = null;
    }
    shockwaveParticlesData = [];
}

// ==========================================================================
// HOLOSYN v5.0 — HOLOGRAPHIC SCAN GRID DOME & ORBIT RINGS
// ==========================================================================
function createHolographicScanDome() {
    if (scanDomeGroup) {
        disposeHierarchy(scanDomeGroup); // Clean GPU resources
        scene.remove(scanDomeGroup);
        scanDomeGroup = null;
    }

    scanDomeGroup = new THREE.Group();
    scanDomeGroup.name = "holographic-scan-dome";
    
    const themeColor = themeColorObj();
    
    // 1. Hemispherical Grid Cage
    // Radius = 2.8, widthSegments = 24, heightSegments = 12
    const scanDomeGeo = new THREE.SphereGeometry(2.8, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const scanDomeMat = new THREE.MeshBasicMaterial({
        color: themeColor,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide
    });
    scanDomeCage = new THREE.Mesh(scanDomeGeo, scanDomeMat);
    scanDomeCage.position.y = -1.5; // Rise from grid level
    scanDomeGroup.add(scanDomeCage);
    
    // 2. Orbital Dotted Rings (Outer: radius = 3.2, Inner: radius = 2.4)
    scanRingOuter = createDottedRing(3.2, 72, themeColor);
    scanRingOuter.position.y = 0.15; // pedestal level
    scanRingOuter.rotation.x = Math.PI / 6; // tilted
    scanDomeGroup.add(scanRingOuter);
    
    scanRingInner = createDottedRing(2.4, 48, themeColor);
    scanRingInner.position.y = 0.5; // slightly higher
    scanRingInner.rotation.x = -Math.PI / 8; // tilted opposite
    scanRingInner.rotation.z = Math.PI / 10;
    scanDomeGroup.add(scanRingInner);
    
    // Dynamic visibility check
    scanDomeGroup.visible = (state.uiMode === 'pro');
    
    scene.add(scanDomeGroup);
}

function createDottedRing(radius, dotCount, color) {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount; i++) {
        const angle = (i / dotCount) * Math.PI * 2;
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
        color: color,
        size: 0.05,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    return new THREE.Points(geo, mat);
}

// ==========================================================================
// HOLOSYN v5.0 — INDEXEDDB HISTORY ARCHIVE MANAGER (ArchiveDBManager)
// ==========================================================================
const ArchiveDBManager = {
    dbName: "HolosynArchiveDB",
    dbVersion: 1,
    storeName: "prototypes",
    db: null,

    init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = (event) => {
                console.error("IndexedDB open error:", event);
                reject(event);
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });
                }
            };
        });
    },

    savePrototype(proto) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject("Database not initialized");
                return;
            }
            const transaction = this.db.transaction([this.storeName], "readwrite");
            const store = transaction.objectStore(this.storeName);
            const request = store.add(proto);

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    },

    getAllPrototypes() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject("Database not initialized");
                return;
            }
            const transaction = this.db.transaction([this.storeName], "readonly");
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    },

    deletePrototype(id) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject("Database not initialized");
                return;
            }
            const transaction = this.db.transaction([this.storeName], "readwrite");
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(id);

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
};

window.loadedArchiveId = null;

function initArchiveSystem() {
    ArchiveDBManager.init().then(() => {
        loadArchiveSlots();
    }).catch(err => {
        console.error("Archive DB initialization failed", err);
    });
    
    // Bind buttons
    const btnSave = document.getElementById('btn-save-archive');
    if (btnSave) {
        btnSave.addEventListener('click', () => {
            saveCurrentToArchive();
        });
    }
    
    const btnToggle = document.getElementById('btn-toggle-archive-drawer');
    const drawer = document.getElementById('hud-archive-drawer');
    
    if (btnToggle && drawer) {
        btnToggle.addEventListener('click', () => {
            playSynthClick(700, 0.05);
            drawer.style.bottom = '0px';
        });
    }
    
    const btnClose = document.getElementById('btn-close-archive');
    if (btnClose && drawer) {
        btnClose.addEventListener('click', () => {
            playSynthClick(600, 0.05);
            drawer.style.bottom = '-280px';
        });
    }
}

function loadArchiveSlots() {
    const container = document.getElementById('archive-slots-container');
    if (!container) return;
    
    ArchiveDBManager.getAllPrototypes().then(prototypes => {
        container.innerHTML = '';
        
        if (prototypes.length === 0) {
            container.innerHTML = `
                <div style="font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); width: 100%; text-align: center;" data-i18n="archive_empty">
                    ${state.language === 'ko' ? '보관함에 저장된 시제품이 없습니다. [보관함에 시제품 저장] 단추를 눌러 첫 요소를 보관해 보세요.' : 'No prototypes saved. Click [Save to Archive] to store your first masterpiece.'}
                </div>
            `;
            return;
        }
        
        prototypes.forEach(proto => {
            const card = document.createElement('div');
            card.className = 'archive-card';
            card.setAttribute('data-id', proto.id);
            if (state.activePreset === 'custom' && window.loadedArchiveId === proto.id) {
                card.classList.add('active-card');
            }
            
            let thumbnailHtml = '';
            if (proto.activePreset === 'custom' && proto.customImageBase64) {
                thumbnailHtml = `<img src="${proto.customImageBase64}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 4px;" />`;
            } else {
                let iconName = 'plane';
                if (proto.activePreset === 'ring') iconName = 'circle-dot';
                if (proto.activePreset === 'car') iconName = 'car';
                if (proto.activePreset === 'battery') iconName = 'battery-charging';
                if (proto.activePreset === 'exosuit') iconName = 'shield';
                thumbnailHtml = `<i data-lucide="${iconName}" style="width: 28px; height: 28px; color: var(--theme-color);"></i>`;
            }
            
            card.innerHTML = `
                <div style="font-family: var(--font-mono); font-size: 8px; color: var(--text-muted); text-transform: uppercase;">${proto.category}</div>
                <div style="flex-grow: 1; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); border-radius: 8px; overflow: hidden; border: 1px dashed rgba(255,255,255,0.05); min-height: 80px;">
                    ${thumbnailHtml}
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px; margin-top: 4px;">
                    <div style="font-family: var(--font-ui); font-size: 10px; font-weight: bold; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 100px;">${proto.name}</div>
                    <button class="btn-delete-archive hud-btn icon-btn" data-id="${proto.id}" style="min-height: 22px; min-width: 22px; width: 22px; height: 22px; padding: 0; background: transparent; border: none; color: var(--crimson);" title="시제품 삭제">
                        <i data-lucide="trash-2" style="width: 12px; height: 12px; pointer-events: none;"></i>
                    </button>
                </div>
            `;
            
            card.addEventListener('click', (e) => {
                if (e.target.closest('.btn-delete-archive')) return;
                
                playSynthClick(700, 0.05);
                playSynthSweep(200, 800, 0.3);
                
                window.loadedArchiveId = proto.id;
                
                document.getElementById('spec-name').value = proto.name;
                document.getElementById('spec-category').value = proto.category;
                document.getElementById('spec-param-weight').value = proto.weight;
                document.getElementById('spec-param-power').value = proto.power;
                document.getElementById('spec-param-thermal').value = proto.thermal;
                
                const wRead = document.getElementById('readout-weight');
                if (wRead) wRead.innerText = `${proto.weight} kg`;
                const pRead = document.getElementById('readout-power');
                if (pRead) pRead.innerText = `${proto.power} W`;
                const tRead = document.getElementById('readout-thermal');
                if (tRead) tRead.innerText = `${proto.thermal}%`;
                
                state.themeColor = proto.themeColor || '#007aff';
                state.renderMode = proto.renderMode || 'wireframe';
                state.materialView = ['hologram', 'product', 'hybrid'].includes(proto.materialView) ? proto.materialView : 'hologram';
                state.customImageExtrusion = proto.customImageExtrusion !== undefined ? proto.customImageExtrusion : 0.75;
                state.activePreset = proto.activePreset || 'custom';
                
                // Reapply UI render mode button highlight
                document.querySelectorAll('.render-mode-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-mode') === state.renderMode);
                });
                updateMaterialViewUi();
                
                if (proto.activePreset === 'custom' && proto.customImageBase64) {
                    const img = new Image();
                    img.src = proto.customImageBase64;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        const maxDim = 80;
                        let w = img.width, h = img.height;
                        if (w > h) {
                            if (w > maxDim) { h = Math.round(h * maxDim / w); w = maxDim; }
                        } else {
                            if (h > maxDim) { w = Math.round(w * maxDim / h); h = maxDim; }
                        }
                        canvas.width = w; canvas.height = h;
                        ctx.drawImage(img, 0, 0, w, h);
                        const imgData = ctx.getImageData(0, 0, w, h);
                        const data = imgData.data;
                        const pointsList = [];
                        const luminances = [];
                        const colorsList = [];
                        
                        for (let y = 0; y < h; y++) {
                            for (let x = 0; x < w; x++) {
                                const idx = (y * w + x) * 4;
                                const r = data[idx], g = data[idx+1], b = data[idx+2], alpha = data[idx+3];
                                let luminance = 0;
                                if (alpha > 40) {
                                    luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
                                }
                                luminances.push(luminance);
                                colorsList.push(r / 255, g / 255, b / 255);
                                if (alpha > 40 && (r + g + b) > 50) {
                                    const posX = ((x / w) - 0.5) * 2.2;
                                    const posY = (0.5 - (y / h)) * 2.2;
                                    const posZ = (luminance - 0.5) * 0.25;
                                    pointsList.push(new THREE.Vector3(posX, posY, posZ));
                                }
                            }
                        }
                        
                        state.customImageParticles = pointsList;
                        state.customImageLuminances = luminances;
                        state.customImageColors = colorsList;
                        state.customImageGridSize = { w: w, h: h };
                        state.customImageBase64 = proto.customImageBase64;
                        state.customImageTexture = new THREE.TextureLoader().load(proto.customImageBase64);
                        state.customImageTexture.minFilter = THREE.LinearFilter;
                        state.customImageTexture.encoding = THREE.sRGBEncoding;
                        
                        uploadedMeshGroup = null;
                        state.imageUploaded = true;
                        
                        loadPresetModel('custom');
                        updateHolographicMaterials();
                        loadArchiveSlots();
                        
                        if (state.language === 'ko') {
                            addConsoleLog(`[아카이브] 복원 완료: [${proto.name}]을 입체 배치했습니다.`, "success");
                        } else {
                            addConsoleLog(`[ARCHIVE] Dynamic restoration successful for prototype [${proto.name}].`, "success");
                        }
                    };
                } else {
                    state.imageUploaded = false;
                    uploadedMeshGroup = null;
                    state.customImageParticles = null;
                    state.customImageBase64 = null;
                    
                    loadPresetModel(proto.activePreset);
                    updateHolographicMaterials();
                    loadArchiveSlots();
                    
                    if (state.language === 'ko') {
                        addConsoleLog(`[아카이브] 복원 완료: 프리셋 [${proto.name}]을 투사했습니다.`, "success");
                    } else {
                        addConsoleLog(`[ARCHIVE] Preset restoration successful for [${proto.name}].`, "success");
                    }
                }
            });
            
            const delBtn = card.querySelector('.btn-delete-archive');
            if (delBtn) {
                delBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    if (state.isSoundOn) playSynthClick(400, 0.08);
                    
                    const idToDelete = parseInt(e.currentTarget.getAttribute('data-id'));
                    ArchiveDBManager.deletePrototype(idToDelete).then(() => {
                        if (window.loadedArchiveId === idToDelete) {
                            window.loadedArchiveId = null;
                        }
                        
                        loadArchiveSlots();
                        
                        if (state.language === 'ko') {
                            addConsoleLog("[아카이브] 시제품 사양을 안전하게 폐기했습니다.", "warning");
                        } else {
                            addConsoleLog("[ARCHIVE] Prototype record deleted from local IndexedDB.", "warning");
                        }
                    });
                });
            }
            
            container.appendChild(card);
        });
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });
}

function saveCurrentToArchive() {
    const name = document.getElementById('spec-name').value;
    const category = document.getElementById('spec-category').value;
    const weight = parseInt(document.getElementById('spec-param-weight').value);
    const power = parseInt(document.getElementById('spec-param-power').value);
    const thermal = parseInt(document.getElementById('spec-param-thermal').value);
    
    const prototypeRecord = {
        name: name,
        category: category,
        weight: weight,
        power: power,
        thermal: thermal,
        themeColor: state.themeColor,
        renderMode: state.renderMode,
        materialView: state.materialView,
        customImageExtrusion: state.customImageExtrusion,
        activePreset: state.activePreset,
        customImageBase64: state.activePreset === 'custom' ? state.customImageBase64 : null,
        date: new Date().toISOString()
    };
    
    ArchiveDBManager.savePrototype(prototypeRecord).then((id) => {
        window.loadedArchiveId = id;
        loadArchiveSlots();
        
        if (state.isSoundOn) {
            playSynthClick(900, 0.06);
            playSynthClick(1300, 0.05);
        }
        
        showNotification(
            state.language === 'ko' ? "보관 완료" : "Prototype Saved",
            state.language === 'ko' ? `[${name}] 시제품을 IndexedDB 아카이브에 영구 저장했습니다.` : `Saved [${name}] to persistent local IndexedDB archive.`
        );
        
        if (state.language === 'ko') {
            addConsoleLog(`[아카이브] 시제품 양자 스냅샷 저장 완료: [${name}] (ID: ${id})`, "success");
        } else {
            addConsoleLog(`[ARCHIVE] Saved snapshot [${name}] to local database with ID: ${id}`, "success");
        }
    }).catch(err => {
        console.error("Save archive failed", err);
    });
}

// ==========================================================================
// HOLOSYN v5.0 — THREE.JS RECURSIVE GPU MEMORY DISPOSAL SYSTEM
// ==========================================================================
function disposeHierarchy(obj) {
    if (!obj) return;
    obj.traverse(child => {
        if (child.isMesh || child.isPoints || child.isLine) {
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(mat => disposeMaterial(mat));
                } else {
                    disposeMaterial(child.material);
                }
            }
        }
        ['productMaterial', 'hologramMaterial'].forEach(key => {
            const stored = child.userData?.[key];
            if (!stored || stored === child.material) return;
            visitMaterialSet(stored, mat => disposeMaterial(mat));
        });
    });
}

// V9.2 Polish: Safe memory clearance for active models
function clearActiveScene() {
    if (!activeModelGroup) return;
    while (activeModelGroup.children.length > 0) {
        const obj = activeModelGroup.children[0];
        disposeHierarchy(obj);
        activeModelGroup.remove(obj);
    }
    
    // Clear out any uploaded mesh reference
    uploadedMeshGroup = null;
    
    // Clear HUD UI elements
    updateSpecsHUD("", "", {});
    const presName = document.getElementById('pres-product-name');
    const presSub = document.getElementById('pres-product-sub');
    if (presName) presName.textContent = "HOLOSYN VIEW";
    if (presSub) presSub.textContent = "AWAITING NEW DATA INJECTION";
    
    addConsoleLog("[시스템] 장면 초기화 완료. 메모리 캐시 삭제.", "info");
}

function disposeMaterial(mat) {
    if (!mat) return;
    mat.dispose();
    
    // Dispose of textures as well to prevent GPU VRAM leaks
    for (const key in mat) {
        if (mat[key] && typeof mat[key].dispose === 'function') {
            mat[key].dispose();
        }
    }
}

// ==========================================================================
// HOLOSYN v5.0 — GLOBAL DOM SELECTOR CACHE INITIALIZER
// ==========================================================================
function cacheDOMElements() {
    DOM.teleAzimuth = document.getElementById('tele-azimuth');
    DOM.teleElevation = document.getElementById('tele-elevation');
    DOM.teleZoom = document.getElementById('tele-zoom');
    
    DOM.calloutTooltip = document.getElementById('hud-part-callout');
    DOM.calloutPartName = document.getElementById('callout-part-name');
    DOM.calloutPartTemp = document.getElementById('callout-part-temp');
    DOM.calloutPartStab = document.getElementById('callout-part-stab');
    DOM.calloutPartStatus = document.getElementById('callout-part-status');
    DOM.calloutSvgOverlay = document.getElementById('callout-svg-overlay');
    
    DOM.fpsCounter = document.getElementById('fps-counter');
    DOM.btnVoiceCommand = document.getElementById('btn-voice-command');
    DOM.voiceListeningIndicator = document.getElementById('voice-listening-indicator');
    DOM.btnVoiceHelp = document.getElementById('btn-voice-help');
    DOM.voiceHelpModal = document.getElementById('voice-help-modal');
    DOM.btnCloseVoiceHelp = document.getElementById('btn-close-voice-help');
    
    DOM.tunerExploded = document.getElementById('tuner-exploded');
    DOM.readoutExploded = document.getElementById('readout-exploded');
    DOM.archiveSlotsContainer = document.getElementById('archive-slots-container');
    DOM.hudArchiveDrawer = document.getElementById('hud-archive-drawer');
    DOM.btnToggleArchiveDrawer = document.getElementById('btn-toggle-archive-drawer');
}

// ==========================================================================
// v6.0 Ultimate Engineering Suite Premium Implementation Functions
// ==========================================================================

// --- Phase 2: Aerodynamics Wind Tunnel Stream ---
function initWindTunnelParticles() {
    if (windTunnelParticles) {
        scene.remove(windTunnelParticles);
        windTunnelParticles.geometry.dispose();
        windTunnelParticles.material.dispose();
    }
    
    const count = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    
    windTunnelSpeeds = [];
    windTunnelOriginalPositions = [];
    
    for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 4.8;
        const y = -1.2 + Math.random() * 3.2;
        const z = -6.0 - Math.random() * 5.0; // spawn far behind along Z
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        
        windTunnelOriginalPositions.push(new THREE.Vector3(x, y, z));
        windTunnelSpeeds.push(3.5 + Math.random() * 3.0);
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        color: themeColorObj(),
        size: 0.075,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    windTunnelParticles = new THREE.Points(geometry, material);
    scene.add(windTunnelParticles);
}

function updateWindTunnelFlow(delta) {
    if (!windTunnelParticles || state.studioEnvironment !== 'windtunnel' || state.isPyramidMode) {
        if (windTunnelParticles && windTunnelParticles.visible) {
            windTunnelParticles.visible = false;
        }
        return;
    }
    
    if (!windTunnelParticles.visible) {
        windTunnelParticles.visible = true;
    }
    
    windTunnelParticles.material.color.set(state.themeColor);
    
    const positions = windTunnelParticles.geometry.attributes.position.array;
    const count = positions.length / 3;
    
    const scanDetailInput = document.getElementById('spec-param-thermal');
    const airVelocity = scanDetailInput ? parseFloat(scanDetailInput.value) / 78.0 : 1.0;
    const speedMultiplier = 1.0 + (airVelocity - 1.0) * 0.8;
    
    let boundingRadius = 1.5;
    
    for (let i = 0; i < count; i++) {
        let x = positions[i * 3];
        let y = positions[i * 3 + 1];
        let z = positions[i * 3 + 2];
        const orig = windTunnelOriginalPositions[i];
        
        z += windTunnelSpeeds[i] * speedMultiplier * delta;
        
        if (z > -2.0 && z < 2.0) {
            const dist = Math.sqrt(x*x + y*y || 0.001);
            if (dist < boundingRadius) {
                const force = (boundingRadius - dist) / boundingRadius;
                const angle = Math.atan2(y, x);
                x += Math.cos(angle) * force * 1.6 * delta;
                y += Math.sin(angle) * force * 1.6 * delta;
            }
        }
        
        if (z > 6.0) {
            x = orig.x;
            y = orig.y;
            z = -6.0 - Math.random() * 2.0;
        }
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    
    windTunnelParticles.geometry.attributes.position.needsUpdate = true;
}

// --- Phase 3: Real-Time Thermal Heat Injector ---
function injectHeatSource(point) {
    if (state.heatSources.length >= 3) {
        const oldest = state.heatSources.shift();
        if (oldest && oldest.pinMesh) {
            scene.remove(oldest.pinMesh);
            oldest.pinMesh.geometry.dispose();
            oldest.pinMesh.material.dispose();
        }
    }
    
    const geometry = new THREE.SphereGeometry(0.08, 16, 16);
    const material = new THREE.MeshBasicMaterial({
        color: 0xff3b30,
        transparent: true,
        opacity: 0.85
    });
    const pin = new THREE.Mesh(geometry, material);
    pin.position.copy(point);
    scene.add(pin);
    
    state.heatSources.push({
        point: point.clone(),
        pinMesh: pin,
        pulseTime: 0
    });
    
    playSynthClick(380, 0.15);
    playSynthSweep(100, 300, 0.3);
    
    addConsoleLog(state.language === 'ko' ? `[시뮬레이터] 3D 발열점 주입 성공 (Heat Source #${state.heatSources.length})` : `[SIMULATOR] Thermal heat source injected at boundary coords (Source #${state.heatSources.length})`, "warning");
}

function resetHeatSources() {
    if (state.heatSources && state.heatSources.length > 0) {
        state.heatSources.forEach(src => {
            if (src.pinMesh) {
                scene.remove(src.pinMesh);
                src.pinMesh.geometry.dispose();
                src.pinMesh.material.dispose();
            }
        });
        state.heatSources = [];
        playSynthClick(580, 0.08);
        addConsoleLog(state.language === 'ko' ? "[시뮬레이터] 모든 시제품 발열 분포가 정상 대역으로 리셋되었습니다." : "[SIMULATOR] Injected thermal gradients normalized to baseline ambient.", "success");
    }
}

// --- Phase 4: Procedural Tween Assembly blue prints ---
function updateAssemblyTween(delta) {
    if (assemblyTweensList.length === 0) return;
    
    for (let i = assemblyTweensList.length - 1; i >= 0; i--) {
        const tw = assemblyTweensList[i];
        tw.elapsed += delta;
        const t = Math.min(tw.elapsed / tw.duration, 1.0);
        
        const ease = 1.0 - Math.pow(1.0 - t, 3);
        
        tw.object.position.lerpVectors(tw.startPos, tw.targetPos, ease);
        
        if (t >= 1.0) {
            tw.object.position.copy(tw.targetPos);
            assemblyTweensList.splice(i, 1);
            
            if (state.isSoundOn) {
                playSynthClick(980, 0.02);
            }
        }
    }
}

function triggerAssemblyStepTween(step) {
    if (!activeModelGroup) return;
    
    assemblyTweensList = [];
    
    activeModelGroup.traverse(child => {
        if (!child.isMesh) return;
        
        if (child.userData.basePosition === undefined) {
            child.userData.basePosition = child.position.clone();
        }
        
        const base = child.userData.basePosition;
        let offset = new THREE.Vector3(0, 0, 0);
        const name = child.name.toLowerCase();
        
        if (step === 0) {
            if (name.includes("rotor") || name.includes("blade")) {
                offset.set(0, 1.8, 0);
            } else if (name.includes("battery") || name.includes("core")) {
                offset.set(0, -1.5, 0);
            } else if (name.includes("arm") || name.includes("wing")) {
                const angle = Math.atan2(base.z, base.x);
                offset.set(Math.cos(angle) * 1.2, 0.2, Math.sin(angle) * 1.2);
            } else if (name.includes("shell") || name.includes("canopy")) {
                offset.set(0, 1.2, 0.8);
            }
        } else if (step === 1) {
            if (name.includes("rotor") || name.includes("blade") || name.includes("gyro") || name.includes("plasma")) {
                offset.set(0, 3.5, 0);
            }
        } else if (step === 2) {
            if (name.includes("gyro") || name.includes("plasma")) {
                offset.set(0, 3.5, 0);
            }
        } else if (step === 3) {
            if (name.includes("gyro")) {
                offset.set(0, 2.5, 0);
            }
        } else if (step === 4) {
            offset.set(0, 0, 0);
        }
        
        const targetPos = base.clone().add(offset);
        
        assemblyTweensList.push({
            object: child,
            startPos: child.position.clone(),
            targetPos: targetPos,
            elapsed: 0,
            duration: 0.85
        });
    });
}

// --- Phase 5: Interactive 3D Label & Anchor Editor ---
function initCalloutEditorModal() {
    const modal = document.getElementById('label-editor-modal');
    const submitBtn = document.getElementById('btn-submit-label');
    const cancelBtn = document.getElementById('btn-cancel-label');
    
    if (cancelBtn && modal) {
        cancelBtn.addEventListener('click', () => {
            playSynthClick(520, 0.05);
            modal.style.display = 'none';
            activeCalloutClickPoint = null;
        });
    }
    
    if (submitBtn && modal) {
        submitBtn.addEventListener('click', () => {
            const titleInput = document.getElementById('input-label-title');
            const descInput = document.getElementById('input-label-desc');
            
            const title = titleInput.value.trim() || "CUSTOM ANNOTATION";
            const desc = descInput.value.trim() || "NOMINAL STATUS // SECURE";
            
            if (activeCalloutClickPoint) {
                addNewCalloutAnchor(activeCalloutClickPoint, title, desc);
                
                titleInput.value = "";
                descInput.value = "";
                modal.style.display = 'none';
                activeCalloutClickPoint = null;
                playSynthClick(680, 0.1);
                playSynthSweep(200, 600, 0.4);
            }
        });
    }
}

function addNewCalloutAnchor(point, title, desc) {
    const id = "custom-pin-" + Date.now();
    
    // Cone indicator point
    const geo = new THREE.ConeGeometry(0.04, 0.16, 8);
    geo.rotateX(Math.PI);
    geo.translate(0, 0.08, 0);
    const mat = new THREE.MeshBasicMaterial({
        color: themeColorObj(),
        transparent: true,
        opacity: 0.9
    });
    const pin = new THREE.Mesh(geo, mat);
    pin.position.copy(point);
    
    activeModelGroup.add(pin);
    
    const badge = document.createElement('div');
    badge.className = 'custom-anchor-badge';
    badge.id = `badge-${id}`;

    // Build via DOM + textContent so user/peer-supplied title/desc can never
    // inject markup. Critical now that callouts can arrive over P2P collaboration.
    const tagRow = document.createElement('div');
    tagRow.className = 'badge-tag';
    const tagLabel = document.createElement('span');
    tagLabel.textContent = 'ENGINEERING PIN';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'badge-close-btn';
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', () => deleteCalloutAnchor(id));
    tagRow.appendChild(tagLabel);
    tagRow.appendChild(closeBtn);

    const titleEl = document.createElement('div');
    titleEl.className = 'badge-title';
    titleEl.textContent = title;

    const descEl = document.createElement('div');
    descEl.className = 'badge-desc';
    descEl.textContent = desc;

    badge.appendChild(tagRow);
    badge.appendChild(titleEl);
    badge.appendChild(descEl);

    // Append custom badges to document.body to allow fixed screen positioning matching callout-svg-overlay
    document.body.appendChild(badge);
    
    customCalloutAnchors.push({
        id: id,
        point: point.clone(),
        pinMesh: pin,
        title: title,
        desc: desc,
        badgeEl: badge
    });
    
    saveCustomAnchorsToStorage();
}

function deleteCalloutAnchor(id) {
    const idx = customCalloutAnchors.findIndex(a => a.id === id);
    if (idx === -1) return;
    
    const item = customCalloutAnchors[idx];
    
    if (activeModelGroup && item.pinMesh) {
        activeModelGroup.remove(item.pinMesh);
        item.pinMesh.geometry.dispose();
        item.pinMesh.material.dispose();
    }
    
    if (item.badgeEl && item.badgeEl.parentNode) {
        item.badgeEl.parentNode.removeChild(item.badgeEl);
    }
    
    customCalloutAnchors.splice(idx, 1);
    playSynthClick(320, 0.08);
    
    saveCustomAnchorsToStorage();
}

function updateCalloutAnnotations() {
    if (!renderer || !camera || !activeModelGroup) return;
    
    const svg = document.getElementById('callout-svg-overlay');
    if (!svg) return;
    
    svg.innerHTML = "";
    
    const widthHalf = renderer.domElement.clientWidth / 2;
    const heightHalf = renderer.domElement.clientHeight / 2;
    const themeCol = state.themeColor;
    
    customCalloutAnchors.forEach(anchor => {
        const worldPos = anchor.point.clone().applyMatrix4(activeModelGroup.matrixWorld);
        const screenPos = worldPos.clone().project(camera);
        const isBehind = screenPos.z > 1.0;
        
        if (isBehind || state.isPyramidMode || state.isShowcaseMode) {
            anchor.badgeEl.style.opacity = '0';
            anchor.badgeEl.style.pointerEvents = 'none';
            return;
        }
        
        const sx = (screenPos.x * widthHalf) + widthHalf;
        const sy = -(screenPos.y * heightHalf) + heightHalf;
        
        const bounds = renderer.domElement.getBoundingClientRect();
        const px = sx + bounds.left;
        const py = sy + bounds.top;
        
        anchor.badgeEl.style.opacity = '1';
        anchor.badgeEl.style.pointerEvents = 'auto';
        
        const offsetX = 50;
        const offsetY = -60;
        
        let badgeX = px + offsetX;
        let badgeY = py + offsetY;
        
        // Dynamically constrain badge coordinates to stay within the Three.js viewport canvas
        const badgeWidth = anchor.badgeEl.offsetWidth || 180;
        const badgeHeight = anchor.badgeEl.offsetHeight || 80;
        
        const minLeft = bounds.left + 10;
        const maxLeft = bounds.right - badgeWidth - 10;
        const minTop = bounds.top + 10;
        const maxTop = bounds.bottom - badgeHeight - 10;
        
        if (badgeX < minLeft) badgeX = minLeft;
        if (badgeX > maxLeft) badgeX = maxLeft;
        if (badgeY < minTop) badgeY = minTop;
        if (badgeY > maxTop) badgeY = maxTop;
        
        anchor.badgeEl.style.left = `${badgeX}px`;
        anchor.badgeEl.style.top = `${badgeY}px`;
        anchor.badgeEl.style.setProperty('--theme-color', themeCol);
        anchor.badgeEl.style.setProperty('--theme-glow', state.themeColorGlow);
        
        // Align connection lines in screen coordinates
        const svgPinX = px;
        const svgPinY = py;
        const svgBadgeX = badgeX;
        const svgBadgeY = badgeY + 24; // Connect dynamically to the text area middle
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = `M ${svgPinX} ${svgPinY} L ${svgBadgeX - 8} ${svgBadgeY} L ${svgBadgeX} ${svgBadgeY}`;
        
        path.setAttribute('d', d);
        path.setAttribute('stroke', themeCol);
        path.setAttribute('stroke-width', '1.2');
        path.setAttribute('fill', 'none');
        path.setAttribute('opacity', '0.65');
        
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', svgPinX);
        dot.setAttribute('cy', svgPinY);
        dot.setAttribute('r', '2.5');
        dot.setAttribute('fill', themeCol);
        
        svg.appendChild(path);
        svg.appendChild(dot);
    });
}

function saveCustomAnchorsToStorage() {
    try {
        const data = customCalloutAnchors.map(a => ({
            point: { x: a.point.x, y: a.point.y, z: a.point.z },
            title: a.title,
            desc: a.desc
        }));
        localStorage.setItem(`holosyn_custom_pins_${state.activePreset}`, JSON.stringify(data));
    } catch (e) {
        console.error("Save custom pins failed", e);
    }
}

function restoreCustomAnchorsFromStorage() {
    try {
        customCalloutAnchors.forEach(a => {
            if (a.badgeEl && a.badgeEl.parentNode) {
                a.badgeEl.parentNode.removeChild(a.badgeEl);
            }
        });
        customCalloutAnchors = [];
        
        const raw = localStorage.getItem(`holosyn_custom_pins_${state.activePreset}`);
        if (!raw) return;
        
        const data = JSON.parse(raw);
        data.forEach(item => {
            const vec = new THREE.Vector3(item.point.x, item.point.y, item.point.z);
            addNewCalloutAnchor(vec, item.title, item.desc);
        });
    } catch (e) {
        console.error("Restore custom pins failed", e);
    }
}

// ==========================================================================
// v7.0 Ultimate Visual Masterpiece Implementation Functions
// ==========================================================================

// --- Phase 2: Dynamic Fluid Aurora Parallax Background ---
function initDynamicFluidAurora() {
    document.addEventListener('mousemove', (e) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        
        const mx = (e.clientX / w) - 0.5;
        const my = (e.clientY / h) - 0.5;
        
        const root = document.documentElement;
        if (root) {
            root.style.setProperty('--mx-1', `${mx * 32}px`);
            root.style.setProperty('--my-1', `${my * 24}px`);
            
            root.style.setProperty('--mx-2', `${mx * -48}px`);
            root.style.setProperty('--my-2', `${my * -38}px`);
            
            root.style.setProperty('--mx-3', `${mx * 64}px`);
            root.style.setProperty('--my-3', `${my * 48}px`);
        }
    });
}

// --- Phase 3: Premium Glare & 3D Tilt UI Cards ---
function initInteractiveTiltCards() {
    const panels = document.querySelectorAll('.glass-panel:not(.tutorial-card):not(.tutorial-prompt-content)');
    
    panels.forEach(card => {
        if (!card.querySelector('.glass-panel-glare')) {
            const glare = document.createElement('div');
            glare.className = 'glass-panel-glare';
            card.appendChild(glare);
        }
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const w = rect.width;
            const h = rect.height;
            
            const xPct = (x / w) - 0.5;
            const yPct = (y / h) - 0.5;
            
            // Limit to elegant 8 degrees of rotation
            const rotX = -yPct * 12;
            const rotY = xPct * 12;
            
            card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
            card.style.boxShadow = `
                0 25px 50px rgba(0,0,0,0.55),
                0 0 15px var(--theme-glow),
                inset 0 1px 1px rgba(255,255,255,0.15)
            `;
            card.style.borderColor = 'var(--theme-color)';
            
            card.style.setProperty('--glare-x', `${(x / w) * 100}%`);
            card.style.setProperty('--glare-y', `${(y / h) * 100}%`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            card.style.boxShadow = '';
            card.style.borderColor = '';
        });
    });
}

// --- Phase 4: SF Gyroscopic HUD Orbit Reticles ---
function createSpatialReticleRings() {
    if (!scene) return;
    
    if (reticleGroup) {
        scene.remove(reticleGroup);
        // Safely dispose old meshes
        disposeHierarchy(reticleGroup);
    }
    
    reticleGroup = new THREE.Group();
    reticleGroup.name = "targeting-hud-group";
    
    const mat = new THREE.LineBasicMaterial({
        color: themeColorObj(),
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
    });
    
    // Outer Ticking Ring (radius 2.3)
    const segments = 24;
    const ringGeo = new THREE.RingGeometry(2.28, 2.32, segments);
    const ringMesh = new THREE.LineSegments(new THREE.EdgesGeometry(ringGeo), mat);
    ringMesh.name = "reticle-outer";
    ringMesh.rotation.x = Math.PI / 2;
    reticleGroup.add(ringMesh);
    
    // Middle Crosshair Ring (radius 1.7)
    const crossGroup = new THREE.Group();
    crossGroup.name = "reticle-middle";
    const circGeo = new THREE.RingGeometry(1.68, 1.72, 48);
    const circ = new THREE.LineLoop(circGeo, mat);
    circ.rotation.x = Math.PI / 2;
    crossGroup.add(circ);
    
    // Cross ticks geometry
    const ticksMat = new THREE.LineBasicMaterial({ color: themeColorObj(), transparent: true, opacity: 0.45 });
    const ticksGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, -1.8), new THREE.Vector3(0, 0, -1.6),
        new THREE.Vector3(0, 0, 1.6), new THREE.Vector3(0, 0, 1.8),
        new THREE.Vector3(-1.8, 0, 0), new THREE.Vector3(-1.6, 0, 0),
        new THREE.Vector3(1.6, 0, 0), new THREE.Vector3(1.8, 0, 0)
    ]);
    const ticks = new THREE.LineSegments(ticksGeo, ticksMat);
    crossGroup.add(ticks);
    reticleGroup.add(crossGroup);
    
    // Inner Torus Ring (radius 1.15)
    const innerRingGeo = new THREE.TorusGeometry(1.15, 0.015, 8, 36);
    const innerRing = new THREE.Mesh(innerRingGeo, new THREE.MeshBasicMaterial({
        color: themeColorObj(),
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending
    }));
    innerRing.name = "reticle-inner";
    innerRing.rotation.x = Math.PI / 2;
    reticleGroup.add(innerRing);
    reticleGroup.visible = state.targetingReticles && state.materialView !== 'product';
    
    scene.add(reticleGroup);
    
    // Performance Optimization: Cache reticle HUD nodes to avoid per-frame tree search (Phase F)
    reticleOuterCached = reticleGroup.getObjectByName("reticle-outer");
    reticleMiddleCached = reticleGroup.getObjectByName("reticle-middle");
    reticleInnerCached = reticleGroup.getObjectByName("reticle-inner");
}

// --- Phase 5: Hologram Projection Volumetric Cone Beams ---
let volumetricLaserBeam = null;

function initVolumetricLaserBeam() {
    if (!scene) return;
    
    if (volumetricLaserBeam) {
        scene.remove(volumetricLaserBeam);
        volumetricLaserBeam.geometry.dispose();
        volumetricLaserBeam.material.dispose();
    }
    
    // Conical beam: Top 1.25 radius, bottom 0.15 radius, height 1.65
    const geometry = new THREE.CylinderGeometry(1.25, 0.15, 1.65, 32, 1, true);
    geometry.translate(0, 0.825, 0); // Translate origin to bottom base
    
    const material = new THREE.MeshBasicMaterial({
        color: themeColorObj(),
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    
    volumetricLaserBeam = new THREE.Mesh(geometry, material);
    volumetricLaserBeam.position.set(0, -1.48, 0); // Ground position matching customGrid
    scene.add(volumetricLaserBeam);
}

function updateVolumetricLaserBeam(delta, elapsedTime) {
    if (!volumetricLaserBeam || state.isPyramidMode || state.materialView === 'product') {
        if (volumetricLaserBeam && volumetricLaserBeam.visible) volumetricLaserBeam.visible = false;
        return;
    }
    
    if (!volumetricLaserBeam.visible) volumetricLaserBeam.visible = true;
    
    volumetricLaserBeam.material.color.set(state.themeColor);
    
    // High-frequency flickery lights simulation
    const flicker = Math.sin(elapsedTime * 14.0) * 0.025 + Math.random() * 0.015;
    const baseOpacity = 0.12 + (state.glowIntensity - 1.5) * 0.03;
    volumetricLaserBeam.material.opacity = Math.max(0.04, baseOpacity + flicker);
    
    // Pulse scale
    const scaleVal = 1.0 + Math.sin(elapsedTime * 3.8) * 0.02;
    volumetricLaserBeam.scale.set(scaleVal, 1.0, scaleVal);
}

// ==========================================================================
// HOLOSYN v8.0 — TIMELINE KEYFRAME PRESENTER ENGINE
// ==========================================================================
// Timeline playback/editing now lives in scripts/holosyn-timeline.js so the
// core renderer can stay focused on model, viewport, import, and export work.

// ==========================================================================
// 8.5. PRO INTERACTION MANAGERS
// ==========================================================================
// Collaboration, AI assistant, and tutorial managers live in
// scripts/holosyn-pro-managers.js to keep the core rendering engine readable.

// ==========================================================================
// 8.6. GYROSCOPE SENOSOR & SUBTITLES HELPER FUNCTIONS (Phase E)
// ==========================================================================
// Performance Optimization: Global cache structures for animation and HUD nodes (Phase F)
let animatedNodesCache = {
    rotors: [],
    gyro1s: [],
    gyro2s: [],
    gyroCores: [],
    nodes: [],
    plasmaRing1s: [],
    plasmaRing2s: []
};

let reticleOuterCached = null;
let reticleMiddleCached = null;
let reticleInnerCached = null;

function rebuildAnimatedNodesCache(model) {
    animatedNodesCache.rotors = [];
    animatedNodesCache.gyro1s = [];
    animatedNodesCache.gyro2s = [];
    animatedNodesCache.gyroCores = [];
    animatedNodesCache.nodes = [];
    animatedNodesCache.plasmaRing1s = [];
    animatedNodesCache.plasmaRing2s = [];
    
    if (!model) return;
    
    model.traverse(child => {
        if (!child.name) return;
        if (child.name === "rotor") {
            animatedNodesCache.rotors.push(child);
        } else if (child.name === "gyro1") {
            animatedNodesCache.gyro1s.push(child);
        } else if (child.name === "gyro2") {
            animatedNodesCache.gyro2s.push(child);
        } else if (child.name === "gyro-core") {
            animatedNodesCache.gyroCores.push(child);
        } else if (child.name.startsWith("node-")) {
            const parts = child.name.split("-");
            if (parts.length > 1) {
                const idx = parseInt(parts[1]);
                if (!isNaN(idx)) {
                    animatedNodesCache.nodes.push({ mesh: child, index: idx });
                }
            }
        } else if (child.name === "plasma-ring-1") {
            animatedNodesCache.plasmaRing1s.push(child);
        } else if (child.name === "plasma-ring-2") {
            animatedNodesCache.plasmaRing2s.push(child);
        }
    });
}

let targetGyroShift = new THREE.Vector3();
let currentGyroShift = new THREE.Vector3();
let gyroEventsInitialized = false;
let initialBetaAngle = null;
let initialGammaAngle = null;

function initGyroEvents() {
    if (gyroEventsInitialized) return;
    gyroEventsInitialized = true;
    
    window.addEventListener('deviceorientation', (e) => {
        if (!state.gyroActive) return;
        
        const beta = e.beta;   // -180 to 180 (pitch tilt)
        const gamma = e.gamma; // -90 to 90 (roll tilt)
        
        if (beta === null || gamma === null) return;
        
        if (initialBetaAngle === null) {
            initialBetaAngle = beta;
            initialGammaAngle = gamma;
        }
        
        let dBeta = beta - initialBetaAngle;
        let dGamma = gamma - initialGammaAngle;
        
        // Clamp to avoid extreme movements
        dBeta = Math.max(-25, Math.min(25, dBeta));
        dGamma = Math.max(-25, Math.min(25, dGamma));
        
        // Map to THREE.js activeModelGroup coordinate offsets
        targetGyroShift.x = dGamma * 0.015;
        targetGyroShift.y = -dBeta * 0.015;
        targetGyroShift.z = Math.abs(dGamma) * 0.005;
    });
}

function updatePresenterSubtitles(time) {
    const kfs = state.timelineKeyframes;
    const overlay = document.getElementById('timeline-subtitle-overlay');
    const textEl = document.getElementById('timeline-subtitle-text');
    if (!overlay || !textEl) return;
    
    if (kfs.length === 0) {
        overlay.classList.remove('visible');
        setTimeout(() => {
            if (!overlay.classList.contains('visible')) {
                overlay.style.display = 'none';
            }
        }, 300);
        return;
    }

    let subtitleText = '';
    if (time <= kfs[0].time) {
        subtitleText = kfs[0].subtitle || '';
    } else if (time >= kfs[kfs.length - 1].time) {
        subtitleText = kfs[kfs.length - 1].subtitle || '';
    } else {
        for (let i = 0; i < kfs.length - 1; i++) {
            if (time >= kfs[i].time && time <= kfs[i + 1].time) {
                subtitleText = kfs[i].subtitle || '';
                break;
            }
        }
    }

    if (subtitleText.trim() !== '') {
        textEl.textContent = subtitleText;
        overlay.style.display = 'block';
        overlay.classList.add('visible');
    } else {
        overlay.classList.remove('visible');
        setTimeout(() => {
            if (!overlay.classList.contains('visible')) {
                overlay.style.display = 'none';
            }
        }, 300);
    }
}

// ==========================================================================
// v9.0 — POWER CORE MODE (secret personal-fun easter egg)
// Konami code (↑ ↑ ↓ ↓ ← → ← → B A) flips HOLOSYN into an engineering-workshop
// mode: assistant boot voice, hot-rod gold + cyan core, full HUD, pulsing reactor.
// PRIVATE LOCAL EXPERIMENT — keep generic before any public screenshot/share.
// ==========================================================================
let powerCoreActive = false;
let powerCoreMesh = null;
let powerCoreRAF = null;
let powerCorePrevTheme = null;

function initPowerCoreEasterEgg() {
    const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let pos = 0;
    document.addEventListener('keydown', (e) => {
        // Ignore while typing in inputs
        const tag = (e.target && e.target.tagName) || '';
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;

        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        if (key === SEQ[pos]) {
            pos++;
            if (pos === SEQ.length) {
                pos = 0;
                togglePowerCoreMode();
            }
        } else {
            // Allow restart if the wrong key is actually the first key
            pos = (key === SEQ[0]) ? 1 : 0;
        }
    });
}

function togglePowerCoreMode() {
    if (powerCoreActive) {
        deactivatePowerCoreMode();
    } else {
        activatePowerCoreMode();
    }
}

function activatePowerCoreMode() {
    powerCoreActive = true;
    document.body.classList.add('power-core-active');

    // 1. assistant boot voice (private fun only)
    speakAssistant(state.language === 'ko' ? "파워 코어 온라인. 환영합니다." : "Power core online.");

    // 2. Layered boot audio
    if (typeof playAiSweep === 'function') playAiSweep(1.4);
    if (typeof playAiBeep === 'function') {
        setTimeout(() => playAiBeep(880), 300);
        setTimeout(() => playAiBeep(1320), 600);
    }
    if (typeof playAiComplete === 'function') setTimeout(() => playAiComplete(), 1100);

    // 3. Flip theme to hot-rod gold
    powerCorePrevTheme = state.themeColor;
    state.themeColor = '#ffb300';
    if (typeof state.themeColorGlow !== 'undefined') state.themeColorGlow = 'rgba(255, 179, 0, 0.6)';
    document.documentElement.style.setProperty('--theme-color', state.themeColor);
    document.documentElement.style.setProperty('--theme-glow', 'rgba(255, 179, 0, 0.55)');

    // 4. Spawn pulsing power-core core at scene center
    spawnPowerCoreCore();

    // 5. Big reveal toast + log
    showNotification(
        state.language === 'ko' ? "◆ 파워 코어 온라인" : "◆ POWER CORE ONLINE",
        state.language === 'ko' ? "MARK 모드 가동. 작업실에 오신 걸 환영합니다." : "MARK mode engaged. Welcome to the workshop."
    );
    addConsoleLog(state.language === 'ko'
        ? "[★] 파워 코어 점화. 출력 3 기가줄. 모든 시스템 온라인."
        : "[★] Power core ignited. 3 gigajoules. All systems online.", "success");
}

function deactivatePowerCoreMode() {
    powerCoreActive = false;
    document.body.classList.remove('power-core-active');

    // Restore previous theme
    if (powerCorePrevTheme) {
        state.themeColor = powerCorePrevTheme;
        document.documentElement.style.setProperty('--theme-color', state.themeColor);
    }

    // Remove core + stop its loop
    if (powerCoreRAF) { cancelAnimationFrame(powerCoreRAF); powerCoreRAF = null; }
    if (powerCoreMesh && scene) {
        scene.remove(powerCoreMesh);
        powerCoreMesh.traverse(c => {
            if (c.geometry) c.geometry.dispose();
            if (c.material) { if (Array.isArray(c.material)) c.material.forEach(m => m.dispose()); else c.material.dispose(); }
        });
        powerCoreMesh = null;
    }

    showNotification(
        state.language === 'ko' ? "파워 코어 대기" : "POWER CORE STANDBY",
        state.language === 'ko' ? "정상 모드로 복귀합니다." : "Returning to standard mode."
    );
}

function spawnPowerCoreCore() {
    if (!scene || typeof THREE === 'undefined') return;
    if (powerCoreMesh) return;

    const group = new THREE.Group();
    const CYAN = new THREE.Color('#7df9ff');

    // Glowing core sphere
    const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 24, 24),
        new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending })
    );
    group.add(core);

    // Outer halo sphere
    const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.34, 24, 24),
        new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending })
    );
    group.add(halo);

    // Triangular coil ring (the classic power-core look)
    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.46, 0.03, 3, 48),
        new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending })
    );
    group.add(ring);

    // Position at model center (or origin), float slightly above pedestal
    group.position.set(0, 0.2, 0);
    scene.add(group);
    powerCoreMesh = group;

    // Self-contained pulse animation loop
    let t = 0;
    const animate = () => {
        if (!powerCoreActive || !powerCoreMesh) return;
        t += 0.05;
        const pulse = 1 + Math.sin(t) * 0.12;
        core.scale.setScalar(pulse);
        halo.scale.setScalar(1 + Math.sin(t * 0.7) * 0.18);
        core.material.opacity = 0.85 + Math.sin(t * 1.3) * 0.12;
        ring.rotation.z += 0.01;
        ring.rotation.x = Math.PI / 2;
        powerCoreRAF = requestAnimationFrame(animate);
    };
    animate();
}
