// HOLOSYN — "무대만" (stage only)
//
// One laptop plugged into a projector. Hides the studio chrome so the audience
// sees the product instead of an import dropzone, without taking the camera
// away, and Esc brings the controls back.
//
// Split out of app.js. Classic script, shared global scope.

let stageOnlyIdleTimer = null;

function setStageOnly(on) {
    state.stageOnly = !!on;
    document.body.classList.toggle('stage-only', state.stageOnly);
    const btn = document.getElementById('btn-stage-only');
    if (btn) btn.setAttribute('aria-pressed', String(state.stageOnly));
    applyStageOnlyCopy();
    nudgeStageOnlyHint();
    // The viewport changes size when the panels go, so the framing has to be
    // recomputed or the model sits off-centre for the whole talk.
    setTimeout(onWindowResize, 60);
    if (!state.stageOnly && stageOnlyIdleTimer) {
        clearTimeout(stageOnlyIdleTimer);
        stageOnlyIdleTimer = null;
    }
    addConsoleLog(
        state.stageOnly
            ? '[STAGE] Controls hidden — press Esc to bring them back.'
            : '[STAGE] Controls restored.',
        'info'
    );
}

function nudgeStageOnlyHint() {
    const hint = document.getElementById('stage-only-exit');
    if (!hint) return;
    hint.classList.remove('is-idle');
    if (stageOnlyIdleTimer) clearTimeout(stageOnlyIdleTimer);
    if (!state.stageOnly) return;
    stageOnlyIdleTimer = setTimeout(() => hint.classList.add('is-idle'), 4000);
}

function applyStageOnlyCopy() {
    const label = document.getElementById('btn-stage-only-label');
    const exit = document.getElementById('stage-only-exit-text');
    const ko = state.language === 'ko';
    if (label) label.textContent = state.stageOnly ? (ko ? '조작 화면' : 'Controls') : (ko ? '무대만' : 'Stage only');
    if (exit) exit.textContent = ko ? 'Esc — 조작 화면으로' : 'Esc — back to controls';
}

function initStageOnlyMode() {
    const btn = document.getElementById('btn-stage-only');
    if (btn) {
        btn.addEventListener('click', () => {
            playSynthClick(state.stageOnly ? 520 : 820, 0.06);
            setStageOnly(!state.stageOnly);
        });
    }
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && state.stageOnly) {
            event.preventDefault();
            setStageOnly(false);
        }
    });
    document.addEventListener('mousemove', () => {
        if (state.stageOnly) nudgeStageOnlyHint();
    }, { passive: true });
    applyStageOnlyCopy();
}
