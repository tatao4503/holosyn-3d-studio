// HOLOSYN — portable project (.holosyn)
//
// The one way the presenter's work leaves this browser as a file: the model
// re-exported as a binary GLB (materials restored, exploded parts re-seated),
// SHA-256 checked on the way back in, plus the presentation snapshot. The
// archive module reuses exportActiveModelGlb / parsePortableGlb from here.
//
// Split out of app.js. Classic script, shared global scope.

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

// GLTFExporter.parse gained an onError argument after r128. The vendored build
// is r128, whose signature is (input, onDone, options) — passing the newer
// 4-argument form silently lands { binary: true } in the callback slot, so the
// exporter returns glTF JSON and every "GLB" it produces is not a GLB at all.
function parseGltfExport(exporter, input, onDone, onError, options) {
    if (exporter.parse.length >= 4) {
        exporter.parse(input, onDone, onError, options);
    } else {
        exporter.parse(input, onDone, options);
    }
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
        parseGltfExport(exporter, activeModelGroup, result => {
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
