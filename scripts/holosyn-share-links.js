// HOLOSYN — share links
//
// The presentation state packed into a URL hash: camera, colour, lighting,
// render mode, notes, dimensions, comparison scenes. Viewer, exhibition and
// reveal links are the same payload with different flags. The QR module
// calls buildShareUrl(); boot calls applyShareStateFromUrl().
//
// Split out of app.js. Classic script, shared global scope.

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

function buildShareState(options = {}) {
    const { includeComparison = false } = options;
    const storedSnapshot = saveProjectSnapshot({ silent: true }) || buildProjectSnapshot();
    const projectSnapshot = buildCompactShareSnapshot(storedSnapshot);
    const comparison = includeComparison
        ? normalizeComparisonPayload({
            holosynComparison: 'scene-comparison-v1',
            activeSlot: 'a',
            scenes: state.comparison.scenes
        })
        : null;
    const shareState = {
        holosynShare: 'url-share-state-v1',
        exportedAt: new Date().toISOString(),
        projectSnapshot,
        ...(comparison ? { comparison } : {}),
        warning: 'Custom GLB/image binaries are not embedded in the URL. Use a HOLOSYN portable project bundle when the model file must travel with the scene.'
    };
    state.shareStateLastBuilt = shareState.exportedAt;
    updateShareLinkPanel();
    return shareState;
}

function buildShareUrl(options = {}) {
    const { viewer = true, includeComparison = false, exhibit = false, reveal = false } = options;
    const payload = buildShareState({ includeComparison });
    const encoded = encodeSharePayload(payload);
    const url = new URL(window.location.href);
    url.searchParams.delete('test');
    url.searchParams.delete('compare');
    url.searchParams.delete('stage');
    url.searchParams.delete('bench');
    if (viewer) url.searchParams.set('viewer', '1');
    else url.searchParams.delete('viewer');
    if (viewer && exhibit) url.searchParams.set('exhibit', '1');
    else url.searchParams.delete('exhibit');
    if (viewer && reveal && !exhibit) url.searchParams.set('reveal', '1');
    else url.searchParams.delete('reveal');
    url.hash = `hs=${encoded}`;
    return {
        url: url.toString(),
        encodedLength: encoded.length,
        payload
    };
}

async function copyShareLink() {
    const result = buildShareUrl();
    markHandoffExportReady();
    const copied = await copyTextToClipboard(result.url);
    if (!copied) {
        try {
            window.history.replaceState(null, '', result.url);
        } catch (error) {
            window.location.hash = new URL(result.url).hash;
        }
    }
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

async function copyExhibitionLink() {
    const result = buildShareUrl({
        viewer: true,
        exhibit: true,
        includeComparison: hasCompleteComparison()
    });
    markHandoffExportReady();
    const copied = await copyTextToClipboard(result.url);
    if (!copied) {
        try {
            window.history.replaceState(null, '', result.url);
        } catch (error) {
            window.location.hash = new URL(result.url).hash;
        }
    }
    const detail = document.getElementById('share-link-detail');
    const status = document.getElementById('share-link-status');
    if (status) status.textContent = copied ? 'EXHIBIT COPIED' : 'URL IN BAR';
    if (detail) {
        detail.textContent = copied
            ? `전시 링크 ${result.url.length}자 · 로컬 실행 시 네트워크 없이 자동 반복됩니다.`
            : '클립보드가 막혀 주소창에 전시 링크를 표시했습니다.';
    }
    showNotification(
        state.language === 'ko' ? '전시 링크 준비' : 'Exhibition Link Ready',
        copied
            ? (state.language === 'ko' ? '오프라인 전시용 자동 반복 링크를 복사했습니다.' : 'Copied the offline-ready exhibition loop link.')
            : (state.language === 'ko' ? '주소창에 전시 링크를 표시했습니다.' : 'Placed the exhibition link in the address bar.')
    );
    addConsoleLog(`[EXHIBIT] Exhibition URL packed (${result.url.length} chars).`, copied ? 'success' : 'warning');
}

async function copyRevealLink() {
    const result = buildShareUrl({
        viewer: true,
        reveal: true,
        includeComparison: false
    });
    markHandoffExportReady();
    const copied = await copyTextToClipboard(result.url);
    if (!copied) {
        try {
            window.history.replaceState(null, '', result.url);
        } catch (error) {
            window.location.hash = new URL(result.url).hash;
        }
    }
    const detail = document.getElementById('share-link-detail');
    const status = document.getElementById('share-link-status');
    if (status) status.textContent = copied ? 'REVEAL COPIED' : 'URL IN BAR';
    if (detail) {
        detail.textContent = copied
            ? `리빌 링크 ${result.url.length}자 · 관객 화면에서 18초 제품 공개 시퀀스가 자동 시작됩니다.`
            : '클립보드가 막혀 주소창에 리빌 링크를 표시했습니다.';
    }
    showNotification(
        state.language === 'ko' ? '리빌 링크 준비' : 'Reveal Link Ready',
        copied
            ? (state.language === 'ko' ? '관객용 HOLOSYN 리빌 링크를 복사했습니다.' : 'Copied the audience HOLOSYN reveal link.')
            : (state.language === 'ko' ? '주소창에 리빌 링크를 표시했습니다.' : 'Placed the reveal link in the address bar.')
    );
    addConsoleLog(`[REVEAL] Reveal URL packed (${result.url.length} chars).`, copied ? 'success' : 'warning');
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
            if (state.pendingShareState) applyShareState(state.pendingShareState);
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
    const comparison = normalizeComparisonPayload(payload.comparison);
    if (comparison) {
        state.comparison = comparison;
        const requestedSlot = new URL(window.location.href).searchParams.get('compare');
        const slot = ['a', 'b'].includes(requestedSlot) ? requestedSlot : comparison.activeSlot;
        if (state.viewerMode || ['a', 'b'].includes(requestedSlot)) {
            applyComparisonScene(slot, { notify: false });
        }
    }
    state.pendingShareState = null;
    state.shareStateLastBuilt = payload.exportedAt || new Date().toISOString();
    updateShareLinkPanel();
    updateComparisonPanel();
    const status = document.getElementById('share-link-status');
    const detail = document.getElementById('share-link-detail');
    if (status) status.textContent = 'RESTORED';
    if (detail) detail.textContent = '공유 링크의 발표 장면을 이 브라우저에 복원했습니다.';
    refreshViewerModeUi();
    if (state.exhibitionMode) startExhibitionMode();
    else if (state.revealMode) startRevealExperience();
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
