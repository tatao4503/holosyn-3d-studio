/**
 * HOLOSYN pro interaction managers.
 *
 * Loaded after app.js so these managers can reuse the shared viewport,
 * timeline, audio, notification, and translation helpers without turning the
 * static prototype into a bundled app.
 */

// ==========================================================================
// HOLOSYN v8.0 — MULTI-VIEWER COLLABORATION SYSTEM (WebRTC P2P)
// ==========================================================================
const CollabManager = {
    peer: null,
    conn: null,
    connections: [],
    isHost: false,
    isActive: false,
    roomId: null,
    peerCursors: {},
    peerColors: {},
    cursorContainer: null,
    lastCursorUpdate: 0,
    isApplyingSync: false,
    localStream: null,
    activeCalls: {},
    voiceChatActive: false,
    moduleReady: false,
    
    init() {
        this.cursorContainer = document.body;
        this.moduleReady = typeof Peer !== 'undefined';
        this.bindEvents();
        this.updateModuleStatus();
        this.checkUrlForRoom();
    },
    
    bindEvents() {
        const btnToggle = document.getElementById('btn-collab-toggle');
        const modal = document.getElementById('collab-modal');
        const btnClose = document.getElementById('btn-collab-close');
        const btnCreate = document.getElementById('btn-collab-create');
        const btnJoin = document.getElementById('btn-collab-join');
        const btnDisconnect = document.getElementById('btn-collab-disconnect');
        const inputCode = document.getElementById('collab-code-input');
        const roomCodeDisplay = document.getElementById('collab-room-code');
        
        if (btnToggle) {
            btnToggle.addEventListener('click', () => {
                playSynthClick(500, 0.05);
                if (typeof TutorialManager !== 'undefined' && typeof TutorialManager.dismissPrompt === 'function') {
                    TutorialManager.dismissPrompt();
                }
                this.updateModuleStatus();
                modal.style.display = 'flex';
                if (this.isPeerAvailable()) {
                    this.updateUI();
                }
            });
        }
        
        if (btnClose) {
            btnClose.addEventListener('click', () => {
                playSynthClick(500, 0.05);
                modal.style.display = 'none';
            });
        }
        
        if (btnCreate) {
            btnCreate.addEventListener('click', () => {
                playSynthClick(600, 0.06);
                this.createRoom();
            });
        }
        
        if (btnJoin) {
            btnJoin.addEventListener('click', () => {
                playSynthClick(600, 0.06);
                const code = inputCode.value.trim().toUpperCase();
                if (code.length === 6) {
                    this.joinRoom(code);
                } else {
                    alert(state.language === 'ko' ? '6자리 참여 코드를 입력하세요.' : 'Please enter a 6-digit room code.');
                }
            });
        }
        
        const btnVoice = document.getElementById('btn-collab-voice');
        if (btnVoice) {
            btnVoice.addEventListener('click', () => {
                playSynthClick(500, 0.05);
                this.toggleVoiceChat();
            });
        }

        if (btnDisconnect) {
            btnDisconnect.addEventListener('click', () => {
                playSynthClick(400, 0.08);
                this.disconnect();
            });
        }
        
        if (roomCodeDisplay) {
            roomCodeDisplay.addEventListener('click', () => {
                navigator.clipboard.writeText(roomCodeDisplay.innerText)
                    .then(() => {
                        playSynthClick(800, 0.05);
                        addConsoleLog(state.language === 'ko' ? "[시스템] 방 코드가 클립보드에 복사되었습니다." : "[SYS] Room code copied to clipboard.", "success");
                        roomCodeDisplay.style.borderColor = '#30d158';
                        setTimeout(() => {
                            roomCodeDisplay.style.borderColor = '';
                        }, 1000);
                    });
            });
        }
        
        const canvasContainer = document.getElementById('canvas-container') || document.body;
        canvasContainer.addEventListener('mousemove', (e) => {
            if (!this.isActive || !this.peer) return;
            const now = Date.now();
            if (now - this.lastCursorUpdate < 50) return;
            this.lastCursorUpdate = now;
            
            const rect = canvasContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            this.broadcast({
                type: 'cursor',
                x: x,
                y: y
            });
        });
        
        canvasContainer.addEventListener('mouseleave', () => {
            if (!this.isActive) return;
            this.broadcast({
                type: 'cursor_leave'
            });
        });
    },
    
    checkUrlForRoom() {
        if (!this.isPeerAvailable()) return;
        const params = new URLSearchParams(window.location.search);
        const joinCode = params.get('join') || params.get('collab');
        if (joinCode && joinCode.length === 6) {
            setTimeout(() => {
                addConsoleLog(state.language === 'ko' ? `[시스템] URL에서 참여 코드 감지: ${joinCode}` : `[SYS] Detected room code from URL: ${joinCode}`, "info");
                const modal = document.getElementById('collab-modal');
                if (modal) modal.style.display = 'flex';
                const inputCode = document.getElementById('collab-code-input');
                if (inputCode) inputCode.value = joinCode;
                this.joinRoom(joinCode);
            }, 1500);
        }
    },
    
    generateRandomCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    },

    isPeerAvailable() {
        this.moduleReady = typeof window !== 'undefined' && typeof window.Peer !== 'undefined';
        return this.moduleReady;
    },

    updateModuleStatus() {
        const status = document.getElementById('collab-module-status');
        const btnCreate = document.getElementById('btn-collab-create');
        const btnJoin = document.getElementById('btn-collab-join');
        const isReady = this.isPeerAvailable();

        if (status) {
            status.classList.toggle('unavailable', !isReady);
            status.innerText = isReady
                ? (state.language === 'ko' ? 'P2P 모듈 준비됨' : 'P2P MODULE READY')
                : (state.language === 'ko' ? 'P2P 모듈 오프라인' : 'P2P MODULE OFFLINE');
        }

        [btnCreate, btnJoin].forEach(btn => {
            if (!btn) return;
            btn.disabled = !isReady;
            btn.style.opacity = isReady ? '' : '0.48';
            btn.style.cursor = isReady ? '' : 'not-allowed';
        });
    },

    showPeerUnavailable() {
        this.updateModuleStatus();
        addConsoleLog(
            state.language === 'ko'
                ? "[협업] PeerJS 모듈이 로드되지 않아 협업을 시작할 수 없습니다. 인터넷 연결 또는 CDN 접근을 확인하세요."
                : "[COLLAB] PeerJS is not loaded. Check internet access or CDN availability.",
            "warning"
        );
        showNotification(
            state.language === 'ko' ? "협업 모듈 오프라인" : "Collaboration Offline",
            state.language === 'ko' ? "현재는 로컬 발표 기능만 사용할 수 있습니다." : "Local presentation features remain available."
        );
    },
    
    createRoom() {
        if (!this.isPeerAvailable()) {
            this.showPeerUnavailable();
            return;
        }
        const code = this.generateRandomCode();
        this.isHost = true;
        this.roomId = code;
        this.initPeer(code);
    },
    
    joinRoom(code) {
        if (!this.isPeerAvailable()) {
            this.showPeerUnavailable();
            return;
        }
        this.isHost = false;
        this.roomId = code;
        const clientPeerId = this.generateRandomCode();
        this.initPeer(clientPeerId, code);
    },
    
    initPeer(myId, targetRoomId = null) {
        if (!this.isPeerAvailable()) {
            this.showPeerUnavailable();
            return;
        }
        if (this.peer) {
            this.peer.destroy();
        }
        
        const hostId = targetRoomId ? `HOLOSYN-${targetRoomId}` : `HOLOSYN-${myId}`;
        const peerId = targetRoomId ? `HOLOSYN-PEER-${myId}` : hostId;
        
        addConsoleLog(state.language === 'ko' ? `[네트워크] P2P 노드 초기화 중...` : `[NET] Initializing P2P connection node...`, "info");
        
        this.peer = new window.Peer(peerId, {
            debug: 1
        });
        
        this.peer.on('open', (id) => {
            this.isActive = true;
            const toggleBtn = document.getElementById('btn-collab-toggle');
            if (toggleBtn) toggleBtn.classList.add('collab-active');
            
            this.updateUI();
            
            if (this.isHost) {
                addConsoleLog(state.language === 'ko' ? `[협업] 방이 생성되었습니다. 코드: ${this.roomId}` : `[COLLAB] Room created successfully. Code: ${this.roomId}`, "success");
                
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set('join', this.roomId);
                window.history.pushState({}, '', newUrl);
            } else {
                addConsoleLog(state.language === 'ko' ? `[협업] 방(${targetRoomId}) 호스트에 연결 중...` : `[COLLAB] Connecting to host of room ${targetRoomId}...`, "info");
                const conn = this.peer.connect(hostId);
                this.setupConnection(conn);
            }
        });
        
        this.peer.on('connection', (conn) => {
            this.setupConnection(conn);
        });

        this.peer.on('call', (call) => {
            addConsoleLog(state.language === 'ko' ? "[협업] 피어로부터 음성 전화가 왔습니다. 연결 중..." : "[COLLAB] Receiving call from peer. Answering...", "info");
            
            if (this.localStream) {
                call.answer(this.localStream);
                this.setupCall(call);
            } else {
                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(stream => {
                        this.localStream = stream;
                        this.voiceChatActive = true;
                        this.updateVoiceUI(true);
                        call.answer(stream);
                        this.setupCall(call);
                        addConsoleLog(state.language === 'ko' ? "[협업] 음성 통화가 연결되었습니다." : "[COLLAB] Voice call established.", "success");
                    })
                    .catch(err => {
                        console.error('Incoming call mic permission denied:', err);
                        call.close();
                    });
            }
        });
        
        this.peer.on('error', (err) => {
            console.error('PeerJS error:', err);
            addConsoleLog(state.language === 'ko' ? `[에러] 연결 오류: ${err.type}` : `[ERROR] Connection error: ${err.type}`, "error");
            
            if (err.type === 'peer-unavailable') {
                addConsoleLog(state.language === 'ko' ? `[에러] 방을 찾을 수 없거나 호스트가 존재하지 않습니다.` : `[ERROR] Room not found or host offline.`, "error");
            }
            this.disconnect();
        });
        
        this.peer.on('close', () => {
            this.disconnect();
        });
    },
    
    setupConnection(conn) {
        conn.on('open', () => {
            if (this.isHost) {
                this.connections.push(conn);
                addConsoleLog(state.language === 'ko' ? `[협업] 새로운 참가자가 입장했습니다.` : `[COLLAB] A new peer has joined the room.`, "success");
                this.syncFullStateTo(conn);
            } else {
                this.conn = conn;
                addConsoleLog(state.language === 'ko' ? `[협업] 세션에 성공적으로 연결되었습니다.` : `[COLLAB] Successfully joined the room session!`, "success");
            }
            
            this.peerColors[conn.peer] = this.getRandomColor();
            this.updateUI();
            playSynthSweep(200, 600, 0.3);
        });
        
        conn.on('data', (data) => {
            this.handleMessage(conn.peer, data);
        });
        
        conn.on('close', () => {
            this.handlePeerDisconnect(conn.peer);
        });
        
        conn.on('error', (err) => {
            this.handlePeerDisconnect(conn.peer);
        });
    },
    
    getRandomColor() {
        const colors = ['#007aff', '#30d158', '#af52de', '#ff9500', '#ff3b30', '#5ac8fa', '#ffcc00'];
        return colors[Math.floor(Math.random() * colors.length)];
    },
    
    handlePeerDisconnect(peerId) {
        addConsoleLog(state.language === 'ko' ? `[협업] 피어 연결이 끊어졌습니다.` : `[COLLAB] Peer disconnected.`, "warning");
        
        if (this.handleCallEnd) {
            this.handleCallEnd(peerId);
        }
        
        if (this.isHost) {
            this.connections = this.connections.filter(c => c.peer !== peerId);
        } else {
            this.conn = null;
        }
        
        if (this.peerCursors[peerId]) {
            this.peerCursors[peerId].remove();
            delete this.peerCursors[peerId];
        }
        delete this.peerColors[peerId];
        this.updateUI();
    },
    
    disconnect() {
        this.stopVoiceChat();

        if (this.peer) {
            this.peer.destroy();
        }
        
        Object.values(this.peerCursors).forEach(c => c.remove());
        this.peerCursors = {};
        this.peerColors = {};
        this.peer = null;
        this.conn = null;
        this.connections = [];
        this.isHost = false;
        this.isActive = false;
        this.roomId = null;
        
        const toggleBtn = document.getElementById('btn-collab-toggle');
        if (toggleBtn) toggleBtn.classList.remove('collab-active');
        
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('join');
        newUrl.searchParams.delete('collab');
        window.history.pushState({}, '', newUrl);
        
        this.updateUI();
        addConsoleLog(state.language === 'ko' ? `[협업] 협업 세션 연결이 종료되었습니다.` : `[COLLAB] Collaboration session disconnected.`, "info");
    },
    
    updateUI() {
        const roomDisplay = document.getElementById('collab-room-display');
        const joinSection = document.getElementById('collab-join-section');
        const btnCreate = document.getElementById('btn-collab-create');
        const btnJoin = document.getElementById('btn-collab-join');
        const btnDisconnect = document.getElementById('btn-collab-disconnect');
        const roomCode = document.getElementById('collab-room-code');
        const statusBadge = document.getElementById('collab-status');
        
        if (this.isActive) {
            if (roomDisplay) roomDisplay.style.display = 'block';
            if (joinSection) joinSection.style.display = 'none';
            if (btnCreate) btnCreate.style.display = 'none';
            if (btnJoin) btnJoin.style.display = 'none';
            if (btnDisconnect) btnDisconnect.style.display = 'block';
            const btnVoice = document.getElementById('btn-collab-voice');
            if (btnVoice) btnVoice.style.display = 'block';
            
            if (roomCode) roomCode.innerText = this.roomId || '';
            
            if (statusBadge) {
                statusBadge.className = 'collab-status-badge connected';
                const count = this.isHost ? this.connections.length : 1;
                const text = this.isHost ? 
                    (state.language === 'ko' ? `연결됨 — 참가자 ${count}명 대기 중` : `CONNECTED — ${count} PEER(S) ACTIVE`) :
                    (state.language === 'ko' ? `연결됨 — 호스트 세션 제어 중` : `CONNECTED — CONTROLLING HOST SESSION`);
                statusBadge.querySelector('span:last-child').innerText = text;
            }
        } else {
            if (roomDisplay) roomDisplay.style.display = 'none';
            if (joinSection) joinSection.style.display = 'block';
            if (btnCreate) btnCreate.style.display = 'block';
            if (btnJoin) btnJoin.style.display = 'block';
            if (btnDisconnect) btnDisconnect.style.display = 'none';
            const btnVoice = document.getElementById('btn-collab-voice');
            if (btnVoice) btnVoice.style.display = 'none';
        }
    },
    
    broadcast(msg) {
        if (!this.isActive || this.isApplyingSync) return;
        const serialized = JSON.stringify(msg);
        if (this.isHost) {
            this.connections.forEach(conn => {
                if (conn.open) conn.send(serialized);
            });
        } else if (this.conn && this.conn.open) {
            this.conn.send(serialized);
        }
    },
    
    syncFullStateTo(conn) {
        if (!conn.open) return;
        conn.send(JSON.stringify({
            type: 'full_sync',
            state: {
                activePreset: state.activePreset,
                renderMode: state.renderMode,
                explodedLevel: state.explodedLevel,
                themeColor: state.themeColor,
                themeColorGlow: state.themeColorGlow,
                studioEnvironment: state.studioEnvironment,
                scale: state.scale,
                glowIntensity: state.glowIntensity,
                rotationSpeed: state.rotationSpeed,
                scanlineDensity: state.scanlineDensity,
                glitchFrequency: state.glitchFrequency
            }
        }));
        
        if (state.timelineKeyframes.length > 0) {
            conn.send(JSON.stringify({
                type: 'timeline_keyframes',
                keyframes: state.timelineKeyframes
            }));
        }
    },
    
    handleMessage(peerId, serializedData) {
        let msg;
        try {
            msg = JSON.parse(serializedData);
        } catch(e) {
            console.error('Failed to parse P2P data', e);
            return;
        }
        
        this.isApplyingSync = true;
        
        switch (msg.type) {
            case 'full_sync':
                this.applySyncedState(msg.state);
                break;
            case 'state_update':
                this.applyStateUpdate(msg.key, msg.value);
                break;
            case 'cursor':
                this.updatePeerCursor(peerId, msg.x, msg.y);
                break;
            case 'cursor_leave':
                this.hidePeerCursor(peerId);
                break;
            case 'camera':
                this.applySyncedCamera(msg.position, msg.target);
                break;
            case 'glitch':
                triggerRemoteGlitch();
                break;
            case 'timeline_control':
                handleRemoteTimeline(msg.action, msg.time);
                break;
            case 'timeline_keyframes':
                handleRemoteKeyframes(msg.keyframes);
                break;
        }
        
        this.isApplyingSync = false;
        
        if (this.isHost && msg.type !== 'cursor' && msg.type !== 'cursor_leave') {
            this.connections.forEach(conn => {
                if (conn.peer !== peerId && conn.open) {
                    conn.send(serializedData);
                }
            });
        }
    },
    
    applySyncedState(syncedState) {
        if (syncedState.activePreset !== state.activePreset) {
            loadPresetModel(syncedState.activePreset);
            updatePresetUISelection(syncedState.activePreset);
        }
        
        if (syncedState.renderMode !== state.renderMode) {
            state.renderMode = syncedState.renderMode;
            toggleRenderVisibility();
            updateRenderModeUISelection(syncedState.renderMode);
        }
        
        if (syncedState.themeColor !== state.themeColor) {
            updateThemeUIColors(syncedState.themeColor);
        }
        
        if (syncedState.studioEnvironment !== state.studioEnvironment) {
            state.studioEnvironment = syncedState.studioEnvironment;
            updateStudioEnvironment();
            updateStudioEnvUISelection(syncedState.studioEnvironment);
        }
        
        if (syncedState.explodedLevel !== state.explodedLevel) {
            updateExplodedSliders(syncedState.explodedLevel);
        }
        
        state.scale = syncedState.scale;
        state.glowIntensity = syncedState.glowIntensity;
        state.rotationSpeed = syncedState.rotationSpeed;
        state.scanlineDensity = syncedState.scanlineDensity;
        state.glitchFrequency = syncedState.glitchFrequency;
        
        updateTunerUIValues();
    },
    
    applyStateUpdate(key, value) {
        switch (key) {
            case 'activePreset':
                if (value !== state.activePreset) {
                    loadPresetModel(value);
                    updatePresetUISelection(value);
                }
                break;
            case 'renderMode':
                if (value !== state.renderMode) {
                    state.renderMode = value;
                    toggleRenderVisibility();
                    updateRenderModeUISelection(value);
                }
                break;
            case 'themeColor':
                updateThemeUIColors(value);
                break;
            case 'studioEnvironment':
                if (value !== state.studioEnvironment) {
                    state.studioEnvironment = value;
                    updateStudioEnvironment();
                    updateStudioEnvUISelection(value);
                }
                break;
            case 'explodedLevel':
                updateExplodedSliders(value);
                break;
            case 'scale':
                state.scale = value;
                if (activeModelGroup) activeModelGroup.scale.set(value, value, value);
                updateSliderUI('tuner-scale', value);
                break;
            case 'glowIntensity':
                state.glowIntensity = value;
                updateHolographicMaterials();
                updateSliderUI('tuner-intensity', value);
                break;
            case 'rotationSpeed':
                state.rotationSpeed = value;
                const rotSwitch = document.getElementById('switch-rotate');
                if (rotSwitch) rotSwitch.checked = (value > 0);
                updateSliderUI('tuner-rot-speed', value);
                break;
            case 'scanlineDensity':
                state.scanlineDensity = value;
                document.documentElement.style.setProperty('--scanline-speed', `${6 / value}s`);
                updateSliderUI('tuner-flicker', value);
                break;
            case 'glitchFrequency':
                state.glitchFrequency = value;
                updateSliderUI('tuner-glitch', value);
                break;
        }
    },
    
    applySyncedCamera(position, target) {
        if (!camera || !controls) return;
        state.cameraMode = 'manual';
        document.querySelectorAll('.camera-dock-btn[data-view]').forEach(btn => {
            btn.classList.remove('active-dock');
        });
        
        targetCameraPosition.set(position.x, position.y, position.z);
        targetCameraTarget.set(target.x, target.y, target.z);
        
        camera.position.copy(targetCameraPosition);
        controls.target.copy(targetCameraTarget);
    },
    
    updatePeerCursor(peerId, x, y) {
        let cursor = this.peerCursors[peerId];
        const canvasContainer = document.getElementById('canvas-container') || document.body;
        
        if (!cursor) {
            cursor = document.createElement('div');
            cursor.className = 'collab-remote-cursor';
            
            const peerShortId = peerId.replace('HOLOSYN-', '').replace('PEER-', '').substring(0, 4);
            const color = this.peerColors[peerId] || '#007aff';
            cursor.style.color = color;
            
            const nameLabel = document.createElement('span');
            nameLabel.className = 'cursor-name';
            nameLabel.innerText = `PEER ${peerShortId}`;
            cursor.appendChild(nameLabel);
            
            canvasContainer.appendChild(cursor);
            this.peerCursors[peerId] = cursor;
        }
        
        cursor.style.display = 'block';
        const rect = canvasContainer.getBoundingClientRect();
        cursor.style.left = `${x * rect.width}px`;
        cursor.style.top = `${y * rect.height}px`;
    },
    
    hidePeerCursor(peerId) {
        const cursor = this.peerCursors[peerId];
        if (cursor) {
            cursor.style.display = 'none';
        }
    },
    
    toggleVoiceChat() {
        if (this.voiceChatActive) {
            this.stopVoiceChat();
        } else {
            if (!this.isActive || !this.peer) {
                alert(state.language === 'ko' ? '협업 세션이 활성화되지 않았습니다.' : 'Collaboration session is not active.');
                return;
            }
            
            addConsoleLog(state.language === 'ko' ? "[협업] 마이크 권한을 요청하는 중..." : "[COLLAB] Requesting microphone permission...", "info");
            
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    this.localStream = stream;
                    this.voiceChatActive = true;
                    this.updateVoiceUI(true);
                    
                    addConsoleLog(state.language === 'ko' ? "[협업] 음성 송출이 활성화되었습니다. 피어에 연결합니다..." : "[COLLAB] Voice transmission active. Calling peers...", "success");
                    
                    if (this.isHost) {
                        this.connections.forEach(conn => {
                            if (conn.open) {
                                addConsoleLog(state.language === 'ko' ? `[협업] 참가자(${conn.peer.substring(0, 8)})에게 전화 거는 중...` : `[COLLAB] Calling peer (${conn.peer.substring(0, 8)})...`, "info");
                                const call = this.peer.call(conn.peer, stream);
                                this.setupCall(call);
                            }
                        });
                    } else if (this.conn && this.conn.open) {
                        addConsoleLog(state.language === 'ko' ? `[협업] 호스트(${this.conn.peer.substring(0, 8)})에게 전화 거는 중...` : `[COLLAB] Calling host (${this.conn.peer.substring(0, 8)})...`, "info");
                        const call = this.peer.call(this.conn.peer, stream);
                        this.setupCall(call);
                    }
                })
                .catch(err => {
                    console.error('Microphone access denied:', err);
                    addConsoleLog(state.language === 'ko' ? "[에러] 마이크 권한 요청 실패" : "[ERROR] Failed to obtain microphone access", "error");
                    alert(state.language === 'ko' ? '마이크 권한 획득에 실패했습니다.' : 'Failed to obtain microphone permission.');
                    this.stopVoiceChat();
                });
        }
    },
    
    stopVoiceChat() {
        this.voiceChatActive = false;
        
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => {
                track.stop();
            });
            this.localStream = null;
        }
        
        Object.keys(this.activeCalls).forEach(peerId => {
            this.handleCallEnd(peerId);
        });
        this.activeCalls = {};
        
        this.updateVoiceUI(false);
        addConsoleLog(state.language === 'ko' ? "[협업] 음성 통화가 비활성화되었습니다." : "[COLLAB] Voice chat has been disabled.", "info");
    },
    
    setupCall(call) {
        const peerId = call.peer;
        
        if (this.activeCalls[peerId]) {
            this.handleCallEnd(peerId);
        }
        
        this.activeCalls[peerId] = {
            call: call,
            audioElement: null
        };
        
        call.on('stream', (remoteStream) => {
            addConsoleLog(state.language === 'ko' ? `[협업] 피어(${peerId.substring(0, 8)})로부터 오디오 스트림을 수신했습니다.` : `[COLLAB] Received audio stream from peer (${peerId.substring(0, 8)}).`, "info");
            
            if (this.activeCalls[peerId] && this.activeCalls[peerId].audioElement) {
                this.activeCalls[peerId].audioElement.srcObject = remoteStream;
                return;
            }
            
            const audio = document.createElement('audio');
            audio.srcObject = remoteStream;
            audio.autoplay = true;
            audio.style.display = 'none';
            document.body.appendChild(audio);
            
            if (this.activeCalls[peerId]) {
                this.activeCalls[peerId].audioElement = audio;
            }
        });
        
        call.on('close', () => {
            this.handleCallEnd(peerId);
        });
        
        call.on('error', (err) => {
            console.error('Call error for peer:', peerId, err);
            this.handleCallEnd(peerId);
        });
    },
    
    handleCallEnd(peerId) {
        const activeCall = this.activeCalls[peerId];
        if (activeCall) {
            if (activeCall.audioElement) {
                activeCall.audioElement.pause();
                activeCall.audioElement.srcObject = null;
                activeCall.audioElement.remove();
            }
            try {
                activeCall.call.close();
            } catch(e) {}
            delete this.activeCalls[peerId];
            addConsoleLog(state.language === 'ko' ? `[협업] 피어(${peerId.substring(0, 8)})와의 음성 세션이 종료되었습니다.` : `[COLLAB] Voice session with peer (${peerId.substring(0, 8)}) ended.`, "info");
        }
    },
    
    updateVoiceUI(active) {
        const btnVoice = document.getElementById('btn-collab-voice');
        if (!btnVoice) return;
        
        if (active) {
            btnVoice.classList.add('collab-voice-active');
            const span = btnVoice.querySelector('span');
            if (span) {
                span.innerText = state.language === 'ko' ? '음성 통화 (VOICE): 켜짐' : 'VOICE CHAT: ON';
            }
        } else {
            btnVoice.classList.remove('collab-voice-active');
            const span = btnVoice.querySelector('span');
            if (span) {
                span.innerText = state.language === 'ko' ? '음성 통화 (VOICE): 꺼짐' : 'VOICE CHAT: OFF';
            }
        }
    }
};

function updateThemeUIColors(colorHex) {
    const colorMap = {
        '#007aff': 'blue', '#34c759': 'green', '#ff9500': 'orange',
        '#af52de': 'purple', '#e5e5ea': 'silver', '#ff1e27': 'crimson',
        '#ffca28': 'gold', '#8e8e93': 'silver'
    };
    const colorName = colorMap[colorHex] || 'blue';
    document.body.className = `theme-${colorName}`;
    
    const styles = getComputedStyle(document.body);
    state.themeColor = styles.getPropertyValue(`--${colorName}`).trim() || colorHex;
    state.themeColorGlow = styles.getPropertyValue(`--${colorName}-glow`).trim();
    
    document.querySelectorAll('.color-select-btn').forEach(btn => {
        if (btn.getAttribute('data-color') === colorName) {
            btn.classList.add('active-color');
        } else {
            btn.classList.remove('active-color');
        }
    });
    
    updateHolographicMaterials();
}

function updatePresetUISelection(presetName) {
    document.querySelectorAll('.preset-btn').forEach(btn => {
        if (btn.getAttribute('data-preset') === presetName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function updateRenderModeUISelection(renderMode) {
    document.querySelectorAll('.render-mode-btn').forEach(btn => {
        if (btn.getAttribute('data-mode') === renderMode) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    const teleRender = document.getElementById('tele-render');
    if (teleRender) {
        teleRender.innerText = translations[state.language][renderMode] || renderMode.toUpperCase();
    }
}

function updateStudioEnvUISelection(studioEnv) {
    document.querySelectorAll('.env-mode-btn').forEach(btn => {
        if (btn.getAttribute('data-env') === studioEnv) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function updateExplodedSliders(val) {
    state.explodedLevel = parseFloat(val);
    
    const input = document.getElementById('tuner-exploded');
    if (input) {
        input.value = val;
        const readout = document.getElementById('readout-exploded');
        if (readout) readout.innerText = `${Math.round(val * 100)}%`;
    }
    
    document.querySelectorAll('.snap-btn').forEach(btn => btn.classList.remove('active'));
    if (val === 0.0) {
        const b = document.getElementById('btn-snap-0');
        if (b) b.classList.add('active');
    } else if (val === 0.5) {
        const b = document.getElementById('btn-snap-50');
        if (b) b.classList.add('active');
    } else if (val === 1.0) {
        const b = document.getElementById('btn-snap-100');
        if (b) b.classList.add('active');
    }
    
    if (activeModelGroup && activeModelGroup.children.length > 0) {
        updateExplodedTranslations(activeModelGroup.children[0]);
    }
}

function updateSliderUI(sliderId, value) {
    const slider = document.getElementById(sliderId);
    if (slider) {
        slider.value = value;
        const readoutId = sliderId.replace('tuner-', 'readout-');
        const readout = document.getElementById(readoutId);
        if (readout) {
            if (sliderId === 'tuner-glitch') {
                readout.innerText = `${Math.round(value)}%`;
            } else if (sliderId === 'tuner-intensity') {
                readout.innerText = parseFloat(value).toFixed(2);
            } else if (sliderId === 'tuner-rot-speed') {
                readout.innerText = parseFloat(value).toFixed(1);
            } else if (sliderId === 'tuner-flicker') {
                readout.innerText = parseFloat(value).toFixed(1);
            } else if (sliderId === 'tuner-scale') {
                readout.innerText = parseFloat(value).toFixed(2);
            } else {
                readout.innerText = value;
            }
        }
    }
}

function updateTunerUIValues() {
    updateSliderUI('tuner-intensity', state.glowIntensity);
    updateSliderUI('tuner-rot-speed', state.rotationSpeed);
    updateSliderUI('tuner-flicker', state.scanlineDensity);
    updateSliderUI('tuner-glitch', state.glitchFrequency);
    updateSliderUI('tuner-scale', state.scale);
}

function triggerRemoteGlitch() {
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
    
    setTimeout(() => {
        if (tblStability) {
            tblStability.innerText = "99.84%";
            tblStability.classList.remove('text-error');
        }
    }, 1200);
}

// ==========================================================================
// HOLOSYN v8.0 — AI ASSISTANT ENGINE (Gemini API Integration)
// ==========================================================================
const AiAssistantManager = {
    apiKey: null,
    isOpen: false,
    keyMode: 'missing',
    storedKeyName: 'holosyn_gemini_api_key',
    sessionKeyName: 'holosyn_gemini_api_key_session',
    
    init() {
        const sessionKey = this.readStorage('session', this.sessionKeyName);
        const storedKey = this.readStorage('local', this.storedKeyName);
        this.apiKey = sessionKey || storedKey || '';
        this.keyMode = sessionKey
            ? 'session'
            : (storedKey ? 'stored' : 'missing');
        this.bindEvents();
        
        const keyInput = document.getElementById('ai-api-key-input');
        if (keyInput && this.apiKey) {
            keyInput.value = this.apiKey;
        }
        this.updateKeyStatus();
    },
    
    bindEvents() {
        const btnToggle = document.getElementById('btn-ai-chat-toggle');
        const panel = document.getElementById('ai-chat-panel');
        const btnClose = document.getElementById('btn-ai-chat-close');
        const btnSaveKey = document.getElementById('btn-save-api-key');
        const btnUseSessionKey = document.getElementById('btn-use-api-key-session');
        const btnClearKey = document.getElementById('btn-clear-api-key');
        const keyInput = document.getElementById('ai-api-key-input');
        const chatInput = document.getElementById('ai-chat-input');
        const btnSend = document.getElementById('btn-ai-chat-send');
        
        if (btnToggle && panel) {
            btnToggle.addEventListener('click', () => {
                playSynthClick(500, 0.05);
                if (typeof TutorialManager !== 'undefined' && typeof TutorialManager.dismissPrompt === 'function') {
                    TutorialManager.dismissPrompt();
                }
                this.isOpen = !this.isOpen;
                panel.style.display = this.isOpen ? 'flex' : 'none';
                if (this.isOpen) {
                    chatInput.focus();
                }
            });
        }
        
        if (btnClose && panel) {
            btnClose.addEventListener('click', () => {
                playSynthClick(500, 0.05);
                this.isOpen = false;
                panel.style.display = 'none';
            });
        }
        
        if (btnSaveKey && keyInput) {
            btnSaveKey.addEventListener('click', () => {
                playSynthClick(600, 0.05);
                const key = keyInput.value.trim();
                if (key) {
                    this.apiKey = key;
                    this.removeStorage('session', this.sessionKeyName);
                    this.writeStorage('local', this.storedKeyName, key);
                    this.keyMode = 'stored';
                    this.updateKeyStatus();
                    addConsoleLog(state.language === 'ko' ? "[AI] Gemini API 키가 저장되었습니다." : "[AI] Gemini API Key saved.", "success");
                    showNotification(
                        state.language === 'ko' ? "AI 키 등록 완료" : "AI API Key Saved",
                        state.language === 'ko' ? "이 기기 브라우저에 저장되었습니다. 인계 전 CLEAR를 권장합니다." : "Stored in this browser. Use CLEAR before handoff."
                    );
                }
            });
        }

        if (btnUseSessionKey && keyInput) {
            btnUseSessionKey.addEventListener('click', () => {
                playSynthClick(540, 0.05);
                const key = keyInput.value.trim();
                if (!key) {
                    this.appendMessage(state.language === 'ko'
                        ? "세션 키로 사용할 Gemini API 키를 먼저 입력해주세요."
                        : "Enter a Gemini API key first to use it for this session.", "error");
                    return;
                }
                this.apiKey = key;
                this.keyMode = 'session';
                this.writeStorage('session', this.sessionKeyName, key);
                this.updateKeyStatus();
                addConsoleLog(state.language === 'ko' ? "[AI] Gemini API 키가 현재 세션에만 적용되었습니다." : "[AI] Gemini API Key is active for this session only.", "success");
                showNotification(
                    state.language === 'ko' ? "세션 AI 키 적용" : "Session AI Key Active",
                    state.language === 'ko' ? "브라우저 탭을 닫으면 세션 키가 사라집니다." : "The session key clears when this tab session ends."
                );
            });
        }

        if (btnClearKey && keyInput) {
            btnClearKey.addEventListener('click', () => {
                playSynthClick(360, 0.06);
                this.apiKey = '';
                this.keyMode = 'missing';
                keyInput.value = '';
                this.removeStorage('local', this.storedKeyName);
                this.removeStorage('session', this.sessionKeyName);
                this.updateKeyStatus();
                addConsoleLog(state.language === 'ko' ? "[AI] 저장된 Gemini API 키를 삭제했습니다." : "[AI] Gemini API Key cleared.", "warning");
                showNotification(
                    state.language === 'ko' ? "AI 키 삭제 완료" : "AI Key Cleared",
                    state.language === 'ko' ? "인계용 데모 상태로 돌아왔습니다." : "Ready for a clean handoff demo."
                );
            });
        }
        
        if (btnSend && chatInput) {
            btnSend.addEventListener('click', () => this.sendMessage());
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    },

    readStorage(scope, key) {
        try {
            const storage = scope === 'session' ? window.sessionStorage : window.localStorage;
            return storage?.getItem(key) || '';
        } catch (err) {
            return '';
        }
    },

    writeStorage(scope, key, value) {
        try {
            const storage = scope === 'session' ? window.sessionStorage : window.localStorage;
            storage?.setItem(key, value);
            return true;
        } catch (err) {
            return false;
        }
    },

    removeStorage(scope, key) {
        try {
            const storage = scope === 'session' ? window.sessionStorage : window.localStorage;
            storage?.removeItem(key);
        } catch (err) {
            // Browser storage can be unavailable in restricted contexts.
        }
    },
    
    updateKeyStatus() {
        const status = document.getElementById('ai-key-status');
        if (!status) return;

        status.classList.remove('ready', 'session');
        if (this.keyMode === 'stored') {
            status.classList.add('ready');
            status.innerText = state.language === 'ko'
                ? "Gemini 키가 이 브라우저에 저장됨. 다른 사람에게 넘기기 전 CLEAR를 누르세요."
                : "Gemini key is saved in this browser. Press CLEAR before handing this device off.";
        } else if (this.keyMode === 'session') {
            status.classList.add('session');
            status.innerText = state.language === 'ko'
                ? "Gemini 키가 현재 세션에만 적용됨. 데모용으로 가장 안전한 방식입니다."
                : "Gemini key is active for this session only. Best for demos.";
        } else {
            status.innerText = state.language === 'ko'
                ? "AI 키는 이 브라우저에서만 사용됩니다. 데모에는 SESSION, 이 기기 저장은 SAVE, 인계 전에는 CLEAR."
                : "API key is used only in this browser. Use SESSION for demos, SAVE for this device, CLEAR before handoff.";
        }
    },
    
    appendMessage(text, type) {
        const container = document.getElementById('ai-chat-messages');
        if (!container) return;
        
        const msg = document.createElement('div');
        msg.className = `chat-msg ${type}`;
        msg.innerText = text;
        container.appendChild(msg);
        
        container.scrollTop = container.scrollHeight;
    },
    
    async sendMessage() {
        const input = document.getElementById('ai-chat-input');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;
        
        input.value = '';
        this.appendMessage(text, 'user');
        
        if (!this.apiKey) {
            this.appendMessage(state.language === 'ko' ? 
                "오류: API 키가 등록되지 않았습니다. 상단 입력창에 Gemini API 키를 입력하고 SAVE를 눌러주세요." : 
                "Error: API Key is missing. Please enter your Gemini API key in the top field and click SAVE.", "error");
            playSynthClick(300, 0.15);
            return;
        }
        
        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'chat-msg assistant typing';
        loadingMsg.innerText = state.language === 'ko' ? "공간 모델 해석 중..." : "Interpreting spatial commands...";
        const container = document.getElementById('ai-chat-messages');
        container.appendChild(loadingMsg);
        container.scrollTop = container.scrollHeight;
        
        try {
            const systemPrompt = `You are the AI Spatial Assistant for HOLOSYN, a premium 3D prototype presentation suite.
The user will command you in natural language to control the 3D viewport, styles, configurations, and animations.
Your task is to analyze the user's intent and return a JSON object with two fields:
1. "explanation": A concise, professional response to display to the user in English (or Korean if the user types in Korean) explaining what actions you are taking.
2. "actions": An array of action objects to be executed. If no actions match, return an empty array.

Available actions:
- { "command": "setTheme", "value": "blue" | "green" | "orange" | "purple" | "silver" | "crimson" | "gold" }
- { "command": "setRenderMode", "value": "points" | "wireframe" | "solid" }
- { "command": "setExplodeLevel", "value": number (between 0.0 and 1.0) }
- { "command": "setRotationSpeed", "value": number (between 0.0 and 5.0) }
- { "command": "setStudioEnvironment", "value": "cyberpunk" | "cupertino" | "windtunnel" }
- { "command": "setScale", "value": number (between 0.1 and 3.0) }
- { "command": "setGlowIntensity", "value": number (between 0.0 and 4.0) }
- { "command": "triggerGlitch" }
- { "command": "cameraView", "value": "orbit" | "front" | "top" | "macro" }
- { "command": "timelineControl", "value": "play" | "pause" }
- { "command": "addKeyframe" }

Important:
- Return ONLY valid JSON. Do not include markdown code block syntax (like \`\`\`json) or additional text outside the JSON.
- If multiple commands are requested, include them all in the "actions" array.
- For example, if the user says "폭발 뷰 50%로 하고 테마 은색으로 바꾼 다음 자동 회전 속도 2배로 올려줘", the response should be:
{
  "explanation": "구조 분해 수준을 50%로 설정하고, 테마를 실버로 변경하며 회전 속도를 2.0으로 높입니다.",
  "actions": [
    { "command": "setExplodeLevel", "value": 0.5 },
    { "command": "setTheme", "value": "silver" },
    { "command": "setRotationSpeed", "value": 2.0 }
  ]
}`;
            
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: 'user',
                            parts: [
                                { text: systemPrompt },
                                { text: `User request: ${text}` }
                            ]
                        }
                    ],
                    generationConfig: {
                        responseMimeType: "application/json"
                    }
                })
            });
            
            loadingMsg.remove();
            
            if (!response.ok) {
                throw new Error(`API response status: ${response.status}`);
            }
            
            const data = await response.json();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!textResponse) {
                throw new Error("Empty response from AI engine.");
            }
            
            const result = JSON.parse(textResponse);
            this.appendMessage(result.explanation || "Commands processed.", 'assistant');
            
            if (result.actions && Array.isArray(result.actions)) {
                this.executeActions(result.actions);
            }
            
            playSynthClick(900, 0.05);
            
        } catch (error) {
            console.error('AI assistant error:', error);
            loadingMsg.remove();
            this.appendMessage(state.language === 'ko' ? 
                `API 호출 오류: ${error.message}. API 키가 올바른지 확인해주세요.` : 
                `API Call Error: ${error.message}. Please verify your API Key value.`, 'error');
            playSynthClick(300, 0.15);
        }
    },
    
    executeActions(actions) {
        actions.forEach(act => {
            const cmd = act.command;
            const val = act.value;
            
            addConsoleLog(`[AI 피드] 자연어 구문 해석 명령 수행: ${cmd.toUpperCase()}` + (val !== undefined ? ` (${val})` : ''), "success");
            
            switch (cmd) {
                case 'setTheme':
                    updateThemeUIColorsByThemeName(val);
                    if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
                        CollabManager.broadcast({
                            type: 'state_update',
                            key: 'themeColor',
                            value: state.themeColor
                        });
                    }
                    break;
                case 'setRenderMode':
                    state.renderMode = val;
                    savePreferences();
                    toggleRenderVisibility();
                    updateRenderModeUISelection(val);
                    if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
                        CollabManager.broadcast({
                            type: 'state_update',
                            key: 'renderMode',
                            value: val
                        });
                    }
                    break;
                case 'setExplodeLevel':
                    updateExplodedSliders(val);
                    if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
                        CollabManager.broadcast({
                            type: 'state_update',
                            key: 'explodedLevel',
                            value: val
                        });
                    }
                    break;
                case 'setRotationSpeed':
                    state.rotationSpeed = parseFloat(val);
                    updateSliderUI('tuner-rot-speed', val);
                    const rotSwitch = document.getElementById('switch-rotate');
                    if (rotSwitch) rotSwitch.checked = (val > 0);
                    if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
                        CollabManager.broadcast({
                            type: 'state_update',
                            key: 'rotationSpeed',
                            value: parseFloat(val)
                        });
                    }
                    break;
                case 'setStudioEnvironment':
                    state.studioEnvironment = val;
                    updateStudioEnvironment();
                    updateStudioEnvUISelection(val);
                    if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
                        CollabManager.broadcast({
                            type: 'state_update',
                            key: 'studioEnvironment',
                            value: val
                        });
                    }
                    break;
                case 'setScale':
                    state.scale = parseFloat(val);
                    if (activeModelGroup) activeModelGroup.scale.set(val, val, val);
                    updateSliderUI('tuner-scale', val);
                    if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
                        CollabManager.broadcast({
                            type: 'state_update',
                            key: 'scale',
                            value: parseFloat(val)
                        });
                    }
                    break;
                case 'setGlowIntensity':
                    state.glowIntensity = parseFloat(val);
                    updateHolographicMaterials();
                    updateSliderUI('tuner-intensity', val);
                    if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
                        CollabManager.broadcast({
                            type: 'state_update',
                            key: 'glowIntensity',
                            value: parseFloat(val)
                        });
                    }
                    break;
                case 'triggerGlitch':
                    triggerRemoteGlitch();
                    if (typeof CollabManager !== 'undefined' && CollabManager.isActive) {
                        CollabManager.broadcast({
                            type: 'glitch'
                        });
                    }
                    break;
                case 'cameraView':
                    applyCameraView(val, true);
                    break;
                case 'timelineControl':
                    if (val === 'play') {
                        playTimeline();
                    } else if (val === 'pause') {
                        pauseTimeline();
                    }
                    break;
                case 'addKeyframe':
                    captureKeyframe();
                    break;
            }
        });
    }
};

function updateThemeUIColorsByThemeName(colorName) {
    document.body.className = `theme-${colorName}`;
    const styles = getComputedStyle(document.body);
    state.themeColor = styles.getPropertyValue(`--${colorName}`).trim();
    state.themeColorGlow = styles.getPropertyValue(`--${colorName}-glow`).trim();
    
    document.querySelectorAll('.color-select-btn').forEach(btn => {
        if (btn.getAttribute('data-color') === colorName) {
            btn.classList.add('active-color');
        } else {
            btn.classList.remove('active-color');
        }
    });
    
    updateHolographicMaterials();
}

// ==========================================================================
// 8.5. INTERACTIVE TUTORIAL SYSTEM (Phase D)
// ==========================================================================
const TutorialManager = {
    isActive: false,
    currentStep: 0,
    savedUiMode: 'beginner',
    resizeListener: null,
    scrollListener: null,
    activeSteps: null,   // set at start() based on UI mode

    // ----- BEGINNER tour: core workflow, stays in beginner mode -----
    beginnerSteps: [
        {
            target: '.presets-grid.mini-presets',
            title: { ko: '1. 모델 고르기', en: '1. Pick a Model' },
            desc: {
                ko: '샘플 모델을 누르거나, 위쪽 영역에 내 3D 파일(.glb/.gltf/.obj)이나 이미지를 드롭하세요. ST,AND처럼 실제 시제품도 바로 띄울 수 있어요.',
                en: 'Tap a sample model, or drop your own 3D file (.glb/.gltf/.obj) or image above. Real prototypes like ST,AND load instantly.'
            }
        },
        {
            target: '#tuner-exploded',
            title: { ko: '2. 분해도로 구조 보여주기', en: '2. Show Structure with Exploded View' },
            desc: {
                ko: '슬라이더를 움직이면 부품이 분리되며 내부 구조와 부품 라벨이 드러납니다. 발표할 때 가장 강력한 기능이에요.',
                en: 'Drag the slider to separate parts and reveal the inner structure with labels — the most powerful feature for a pitch.'
            },
            onShow: () => {
                const slider = document.getElementById('tuner-exploded');
                if (slider) {
                    slider.style.transition = 'all 0.5s ease';
                    slider.value = 0.5;
                    slider.dispatchEvent(new Event('input'));
                    setTimeout(() => { slider.style.transition = ''; }, 500);
                }
            }
        },
        {
            target: '.quick-styles-grid',
            title: { ko: '3. 색과 스타일 바꾸기', en: '3. Change Color & Style' },
            desc: {
                ko: '퀵 스타일과 색상으로 분위기를 바꿔보세요. ST,AND라면 BASIC·CLEAR·CUSTOM 라인업으로 재질도 비교할 수 있어요.',
                en: 'Switch the mood with quick styles and colors. For ST,AND you can also compare BASIC/CLEAR/CUSTOM material lineups.'
            }
        },
        {
            target: '#btn-showcase-toggle',
            title: { ko: '4. 발표 모드 (Showcase)', en: '4. Showcase Mode' },
            desc: {
                ko: 'HUD를 모두 숨기고 제품만 깔끔하게 띄우는 발표 모드입니다. 하단 도크의 ▶ Play Show로 자동 시연도 됩니다.',
                en: 'Hides all the HUD and shows just the product. Use ▶ Play Show in the dock for an automatic walkthrough.'
            }
        },
        {
            target: '.export-buttons-grid',
            title: { ko: '5. 내보내기 & 다음 단계', en: '5. Export & Next' },
            desc: {
                ko: 'PNG 캡처·GLB 모델·사양 JSON으로 내보내 사업계획서나 SNS에 바로 쓰세요. 상단 [프로] 모드로 바꾸면 타임라인·협업·AI 고급 튜토리얼이 열립니다.',
                en: 'Export a PNG, GLB model, or spec JSON for your deck or socials. Switch to [Pro] mode up top to unlock the Timeline/Collab/AI tutorial.'
            }
        }
    ],

    // ----- PRO tour: advanced features, forces pro mode -----
    proSteps: [
        {
            target: '.render-mode-selector',
            title: { ko: '1. 렌더 모드', en: '1. Render Modes' },
            desc: {
                ko: '와이어프레임·솔리드·포인트 클라우드·엑스레이·열화상까지. 같은 모델을 용도에 맞게 다르게 보여줍니다.',
                en: 'Wireframe, solid, point cloud, X-ray, and thermal — present the same model in the mode that fits your story.'
            },
            onShow: () => { if (state.uiMode !== 'pro') toggleUIMode('pro'); }
        },
        {
            target: '#btn-toggle-timeline',
            title: { ko: '2. 타임라인 디렉터', en: '2. Timeline Director' },
            desc: {
                ko: '키프레임으로 카메라·분해도·자막을 시간축에 배치해 Keynote 같은 자동 발표 시퀀스를 연출합니다.',
                en: 'Place camera, exploded level, and subtitles on a keyframe timeline to direct a Keynote-style auto presentation.'
            },
            onShow: () => {
                if (state.uiMode !== 'pro') toggleUIMode('pro');
                if (typeof setTimelinePanelOpen === 'function' && !state.timelineOpen) setTimelinePanelOpen(true);
            }
        },
        {
            target: '#btn-collab-toggle',
            title: { ko: '3. 실시간 협업', en: '3. Live Collaboration' },
            desc: {
                ko: '코드를 공유하면 다른 사람이 같은 3D 무대를 함께 보고 조작합니다. 원격 미팅·심사에서 화면을 같이 돌려볼 수 있어요.',
                en: 'Share a code so others view and control the same 3D stage live — great for remote meetings and reviews.'
            },
            onShow: () => {
                if (state.uiMode !== 'pro') toggleUIMode('pro');
                if (typeof setTimelinePanelOpen === 'function' && state.timelineOpen) setTimelinePanelOpen(false);
            }
        },
        {
            target: '#btn-ai-chat-toggle',
            title: { ko: '4. AI 어시스턴트', en: '4. AI Assistant' },
            desc: {
                ko: '내 Gemini 키를 넣으면 제품 설명·발표 카피·사양 정리를 AI가 도와줍니다. 키는 SESSION/SAVE/CLEAR로 안전하게 관리돼요.',
                en: 'Add your Gemini key and the AI helps with product copy, descriptions, and spec drafting. Keys are managed safely via SESSION/SAVE/CLEAR.'
            },
            onShow: () => {
                if (state.uiMode !== 'pro') toggleUIMode('pro');
                const chatPanel = document.getElementById('ai-chat-panel');
                if (chatPanel && typeof AiAssistantManager !== 'undefined' && !AiAssistantManager.isOpen) {
                    AiAssistantManager.isOpen = true;
                    chatPanel.style.display = 'flex';
                }
            }
        },
        {
            target: '#btn-play-showcase',
            title: { ko: '5. 자동 시네마틱 발표', en: '5. Auto Cinematic Show' },
            desc: {
                ko: 'Play Show / Director가 카메라를 알아서 돌리며 제품을 시네마틱하게 시연합니다. 음성 명령(상단 마이크)으로 핸즈프리 제어도 가능해요.',
                en: 'Play Show / Director auto-orbits the camera for a cinematic walkthrough. Voice command (mic up top) gives hands-free control too.'
            }
        }
    ],

    init() {
        const btnStart = document.getElementById('btn-tutorial-prompt-start');
        const btnPromptSkip = document.getElementById('btn-tutorial-prompt-skip');
        const btnCardSkip = document.getElementById('btn-tutorial-card-skip');
        const btnBack = document.getElementById('btn-tutorial-back');
        const btnNext = document.getElementById('btn-tutorial-next');
        
        if (btnStart) btnStart.addEventListener('click', () => this.start());
        if (btnPromptSkip) btnPromptSkip.addEventListener('click', () => this.skipPrompt());
        if (btnCardSkip) btnCardSkip.addEventListener('click', () => this.skip());
        if (btnBack) btnBack.addEventListener('click', () => this.back());
        if (btnNext) btnNext.addEventListener('click', () => this.next());

        // Header help button — re-open the mode-appropriate tour anytime
        const btnHelp = document.getElementById('btn-help-tour');
        if (btnHelp) btnHelp.addEventListener('click', () => {
            if (this.isActive) { this.skip(); return; }
            this.showPrompt();
        });
    },

    showPrompt() {
        const promptModal = document.getElementById('tutorial-prompt-modal');
        if (promptModal) {
            // Make the prompt describe the tour that matches the current mode
            const isPro = state.uiMode === 'pro';
            const lang = state.language === 'ko' ? 'ko' : 'en';
            const titleEl = document.getElementById('tutorial-prompt-title');
            const descEl = document.getElementById('tutorial-prompt-desc');
            const copy = isPro ? {
                ko: { t: 'HOLOSYN 프로 가이드 투어', d: '프로 전용 기능(렌더 모드, 타임라인 디렉터, 실시간 협업, AI 어시스턴트, 자동 시네마틱)을 둘러보는 가이드 투어를 시작할까요?' },
                en: { t: 'HOLOSYN Pro Guide Tour', d: 'Tour the Pro-only features — render modes, timeline director, live collaboration, AI assistant, and auto cinematic. Start now?' }
            } : {
                ko: { t: 'HOLOSYN 비기너 가이드 투어', d: '핵심 5단계(모델 고르기 → 분해도 → 색·스타일 → 발표 모드 → 내보내기)를 둘러보는 가이드 투어를 시작할까요?' },
                en: { t: 'HOLOSYN Beginner Guide Tour', d: 'Walk through the 5 essentials — pick a model, exploded view, color & style, showcase, and export. Start now?' }
            };
            if (titleEl) titleEl.textContent = copy[lang].t;
            if (descEl) descEl.textContent = copy[lang].d;

            promptModal.style.display = 'flex';
            if (state.isSoundOn) playSynthSweep(200, 800, 0.4);
        }
    },

    skipPrompt() {
        const promptModal = document.getElementById('tutorial-prompt-modal');
        if (promptModal) {
            promptModal.style.display = 'none';
        }
        showNotification(
            state.language === 'ko' ? "가이드 건너뜀" : "Guide Skipped",
            state.language === 'ko' ? "상단 메뉴 및 사이드바에서 모든 기능을 자유롭게 사용해 보세요." : "Feel free to explore all features using the menus and sidebars."
        );
    },

    dismissPrompt() {
        const promptModal = document.getElementById('tutorial-prompt-modal');
        if (promptModal) {
            promptModal.style.display = 'none';
        }
    },

    start() {
        this.isActive = true;
        this.currentStep = 0;
        this.savedUiMode = state.uiMode;
        // Pick the tour that matches the current UI mode (Beginner vs Pro)
        this.activeSteps = (state.uiMode === 'pro') ? this.proSteps : this.beginnerSteps;
        
        // Disable showcase presentation mode if active
        if (state.isShowcaseMode) {
            if (typeof toggleShowcaseMode === 'function') {
                toggleShowcaseMode();
            } else if (typeof stopCinematicPresentation === 'function') {
                stopCinematicPresentation();
            }
        }

        const promptModal = document.getElementById('tutorial-prompt-modal');
        if (promptModal) promptModal.style.display = 'none';

        const card = document.getElementById('tutorial-card');
        if (card) {
            card.style.display = 'flex';
            setTimeout(() => card.classList.add('active'), 50);
        }

        this.resizeListener = () => this.alignSpotlight();
        this.scrollListener = () => this.alignSpotlight();
        window.addEventListener('resize', this.resizeListener);
        window.addEventListener('scroll', this.scrollListener);

        this.showStep(0);
        if (state.isSoundOn) playSynthSweep(400, 1000, 0.5);
    },

    showStep(index) {
        document.querySelectorAll('.tutorial-highlighted').forEach(el => {
            el.classList.remove('tutorial-highlighted');
        });

        this.currentStep = index;
        const steps = this.activeSteps || this.beginnerSteps;
        const step = steps[index];
        if (!step) return;

        if (step.onShow) step.onShow();

        const titleEl = document.getElementById('tutorial-title');
        const descEl = document.getElementById('tutorial-desc');
        const stepNumEl = document.getElementById('tutorial-current-step');
        const stepTotalEl = document.getElementById('tutorial-total-step');
        const lang = state.language === 'ko' ? 'ko' : 'en';

        // Inline bilingual text (new) with fallback to i18n keys (legacy)
        const titleText = step.title ? step.title[lang] : (translations[state.language][step.titleKey] || step.titleKey);
        const descText = step.desc ? step.desc[lang] : (translations[state.language][step.descKey] || step.descKey);

        if (titleEl) titleEl.textContent = titleText;
        if (descEl) descEl.textContent = descText;
        if (stepNumEl) stepNumEl.textContent = index + 1;
        if (stepTotalEl) stepTotalEl.textContent = steps.length;

        const btnBack = document.getElementById('btn-tutorial-back');
        const btnNext = document.getElementById('btn-tutorial-next');

        if (btnBack) {
            btnBack.style.visibility = (index === 0) ? 'hidden' : 'visible';
        }

        if (btnNext) {
            const nextTextEl = btnNext.querySelector('span');
            const targetText = (index === steps.length - 1)
                ? (translations[state.language]['tutorial_finish'] || 'Finish')
                : (translations[state.language]['tutorial_next'] || 'Next');
                
            if (nextTextEl) {
                nextTextEl.textContent = targetText;
            } else {
                btnNext.textContent = targetText;
            }
        }

        // Adjust card position based on timeline panel visibility
        const card = document.getElementById('tutorial-card');
        if (card) {
            card.style.bottom = state.timelineOpen ? '250px' : '220px';
        }

        setTimeout(() => this.alignSpotlight(), 100);
        if (state.isSoundOn) playSynthClick(600 + (index * 80), 0.05);
    },

    next() {
        if (this.currentStep < (this.activeSteps || this.beginnerSteps).length - 1) {
            this.showStep(this.currentStep + 1);
        } else {
            this.finish();
        }
    },

    back() {
        if (this.currentStep > 0) {
            this.showStep(this.currentStep - 1);
        }
    },

    alignSpotlight() {
        if (!this.isActive) return;

        const step = (this.activeSteps || this.beginnerSteps)[this.currentStep];
        if (!step) return;

        const el = document.querySelector(step.target);
        const spotlight = document.getElementById('tutorial-spotlight');

        if (el && spotlight) {
            el.classList.add('tutorial-highlighted');
            const rect = el.getBoundingClientRect();
            const padding = 6;
            
            spotlight.style.display = 'block';
            spotlight.style.top = `${rect.top - padding}px`;
            spotlight.style.left = `${rect.left - padding}px`;
            spotlight.style.width = `${rect.width + (padding * 2)}px`;
            spotlight.style.height = `${rect.height + (padding * 2)}px`;
            
            const computedStyle = window.getComputedStyle(el);
            spotlight.style.borderRadius = computedStyle.borderRadius || '8px';
        } else if (spotlight) {
            spotlight.style.display = 'none';
        }
    },

    cleanup() {
        this.isActive = false;
        
        const card = document.getElementById('tutorial-card');
        if (card) {
            card.classList.remove('active');
            setTimeout(() => card.style.display = 'none', 300);
        }

        const spotlight = document.getElementById('tutorial-spotlight');
        if (spotlight) spotlight.style.display = 'none';

        if (this.resizeListener) window.removeEventListener('resize', this.resizeListener);
        if (this.scrollListener) window.removeEventListener('scroll', this.scrollListener);

        document.querySelectorAll('.tutorial-highlighted').forEach(el => {
            el.classList.remove('tutorial-highlighted');
        });

        // Close panels if open
        if (typeof setTimelinePanelOpen === 'function' && state.timelineOpen) {
            setTimelinePanelOpen(false);
        }

        const chatPanel = document.getElementById('ai-chat-panel');
        if (chatPanel && typeof AiAssistantManager !== 'undefined' && AiAssistantManager.isOpen) {
            AiAssistantManager.isOpen = false;
            chatPanel.style.display = 'none';
        }
    },

    skip() {
        this.cleanup();
        
        // Restore saved UI Mode
        if (state.uiMode !== this.savedUiMode) {
            toggleUIMode(this.savedUiMode);
        }

        showNotification(
            state.language === 'ko' ? "가이드 투어 종료" : "Guide Tour Ended",
            state.language === 'ko' ? "언제든 메뉴에서 도움말을 참고해 보실 수 있습니다." : "You can check the documentation anytime."
        );
        if (state.isSoundOn) playSynthSweep(600, 300, 0.3);
    },

    finish() {
        this.cleanup();
        
        // Restore saved UI Mode
        if (state.uiMode !== this.savedUiMode) {
            toggleUIMode(this.savedUiMode);
        }

        showNotification(
            state.language === 'ko' ? "튜토리얼 완료!" : "Tutorial Completed!",
            state.language === 'ko' ? "HOLOSYN의 모든 준비가 끝났습니다. 나만의 3D 시제품을 업로드해 보세요!" : "All set! Try uploading your own 3D prototypes now!"
        );
        
        if (state.isSoundOn) {
            playSynthSweep(300, 900, 0.6);
            setTimeout(() => {
                playSynthClick(1200, 0.1);
            }, 150);
        }
    }
};

window.CollabManager = CollabManager;
window.AiAssistantManager = AiAssistantManager;
window.TutorialManager = TutorialManager;
