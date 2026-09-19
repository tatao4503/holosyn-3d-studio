// HOLOSYN — voice
//
// Speech-to-intent for hands-free presenting (Web Speech API) and the
// assistant voice. Korean and English phrase tables live in parseVoiceIntent.
//
// Split out of app.js. Classic script, shared global scope.

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
