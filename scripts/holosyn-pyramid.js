// HOLOSYN — Pepper's Ghost
//
// The four-way split render for a physical acrylic pyramid on a flat screen:
// one quadrant per side, each from its own camera, on a second renderer.
//
// Split out of app.js. Classic script, shared global scope.

// Three.js Symmetrical 4-Way Emitter Variables (Pepper's Ghost)
let pyramidRenderer = null;

let pyramidCanvas = null;

let quadCameras = {
    top: null,
    bottom: null,
    left: null,
    right: null
};

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
