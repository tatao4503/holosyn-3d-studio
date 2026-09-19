// HOLOSYN — audio
//
// Web Audio synthesiser: ambient hum, UI clicks and sweeps, the boot chime.
// Everything is generated — there are no audio files. Owns the AudioContext
// and its graph; other modules call playSynthClick() etc. at runtime.
//
// Split out of app.js. Classic script, shared global scope.

// Web Audio API Synthesizer Context
let audioCtx = null;

let ambientGain = null;

let compressor = null;

let ambientOsc = null;

let filterNode = null;

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
