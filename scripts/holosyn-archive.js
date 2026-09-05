// HOLOSYN — prototype archive
//
// The presenter's own saved work. Records live in IndexedDB and carry the
// imported model as a binary GLB, a thumbnail of the stage as it was saved,
// and the date — so a talk prepared months ago is still recognisable.
//
// Split out of app.js. Loaded as a classic script and shares the same global
// scope, so nothing here is imported or exported.

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
            drawer.style.bottom = '-380px';
        });
    }

    // The archive lives in this browser and nowhere else. The way out is the
    // portable project bundle, which was buried in a grid of 34 export
    // buttons. It belongs next to the work it protects.
    const btnBackup = document.getElementById('btn-archive-backup');
    if (btnBackup) {
        btnBackup.addEventListener('click', () => {
            playSynthClick(760, 0.06);
            exportPortableProjectBundle();
        });
    }
    applyArchiveDrawerCopy();
}

function applyArchiveDrawerCopy() {
    const note = document.getElementById('archive-storage-note');
    const label = document.getElementById('btn-archive-backup-label');
    if (note) {
        note.textContent = state.language === 'ko'
            ? '이 보관함은 지금 이 브라우저 안에만 있습니다. 브라우저 데이터를 지우거나 다른 기기에서 열면 보이지 않습니다.'
            : 'This archive lives in this browser only. Clearing browser data, or opening on another device, will not show it.';
    }
    if (label) {
        label.textContent = state.language === 'ko' ? '파일로 빼두기' : 'Save to a file';
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
            if (proto.thumbnail) {
                thumbnailHtml = `<img src="${proto.thumbnail}" alt="" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;" />`;
            } else if (proto.activePreset === 'custom' && proto.customImageBase64) {
                thumbnailHtml = `<img src="${proto.customImageBase64}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 4px;" />`;
            } else {
                let iconName = proto.modelGlb ? 'box' : 'plane';
                if (proto.activePreset === 'ring') iconName = 'circle-dot';
                if (proto.activePreset === 'car') iconName = 'car';
                if (proto.activePreset === 'battery') iconName = 'battery-charging';
                if (proto.activePreset === 'exosuit') iconName = 'shield';
                thumbnailHtml = `<i data-lucide="${iconName}" style="width: 28px; height: 28px; color: var(--theme-color);"></i>`;
            }
            
            card.innerHTML = `
                <div style="font-family: var(--font-mono); font-size: 8px; color: var(--text-muted); text-transform: uppercase;">${escapeHtmlText(proto.category)}</div>
                <div style="flex-grow: 1; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); border-radius: 8px; overflow: hidden; border: 1px dashed rgba(255,255,255,0.05); min-height: 80px;">
                    ${thumbnailHtml}
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px; margin-top: 4px;">
                    <div style="min-width: 0;">
                        <div style="font-family: var(--font-ui); font-size: 10px; font-weight: bold; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 100px;">${escapeHtmlText(proto.name)}</div>
                        <div style="font-family: var(--font-mono); font-size: 8px; color: var(--text-muted); white-space: nowrap;" title="${escapeHtmlText(formatArchiveDateFull(proto.date))}">${formatArchiveDate(proto.date)}</div>
                    </div>
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
                
                if (proto.modelGlb) {
                    // The imported model travels with the record now, so a
                    // restore rebuilds the real geometry instead of leaving
                    // whatever happened to be on stage.
                    parsePortableGlb(proto.modelGlb.slice(0)).then(group => {
                        uploadedMeshGroup = group;
                        applyWorkspaceMaterialsToLoadedMesh(uploadedMeshGroup);
                        state.imageUploaded = false;
                        state.customImageParticles = null;
                        state.customImageBase64 = null;
                        state.activePreset = 'custom';
                        updatePresetButtonSelection('custom');
                        loadPresetModel('custom');
                        updateHolographicMaterials();
                        loadArchiveSlots();
                        addConsoleLog(
                            state.language === 'ko'
                                ? `[아카이브] 복원 완료: [${proto.name}] 모델을 다시 세웠습니다.`
                                : `[ARCHIVE] Restored model [${proto.name}].`,
                            'success'
                        );
                    }).catch(err => {
                        console.error('Archive model restore failed', err);
                        showNotification(
                            state.language === 'ko' ? '복원하지 못했습니다' : 'Restore Failed',
                            state.language === 'ko'
                                ? '보관된 모델을 읽지 못했습니다. 무대는 그대로 두었습니다.'
                                : 'The archived model could not be read. The stage was left as it was.'
                        );
                        addConsoleLog(`[ARCHIVE] Restore failed: ${err?.message || err}`, 'error');
                    });
                } else if (proto.activePreset === 'custom' && !proto.customImageBase64) {
                    // Records saved before the archive carried geometry. Saying
                    // "restored" here would hand the presenter a demo preset
                    // under their own product name.
                    showNotification(
                        state.language === 'ko' ? '모델이 없는 기록입니다' : 'Record Has No Model',
                        state.language === 'ko'
                            ? '이 기록은 설정만 저장된 예전 항목이라 모델이 들어 있지 않습니다. 파일을 다시 불러온 뒤 저장하면 모델까지 보관됩니다.'
                            : 'This is an older record that stored settings only, with no model in it. Load the file again and save to archive the model too.'
                    );
                    addConsoleLog(
                        state.language === 'ko'
                            ? `[아카이브] [${proto.name}]에는 모델이 없어 설정만 적용했습니다.`
                            : `[ARCHIVE] [${proto.name}] carries no model; settings only were applied.`,
                        'warning'
                    );
                    updateHolographicMaterials();
                    loadArchiveSlots();
                } else if (proto.activePreset === 'custom' && proto.customImageBase64) {
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

// Every imported model used to file under the same generic icon, so an
// archive of five prototypes was five identical boxes. Three months later
// that is unreadable. The renderer keeps its drawing buffer, so the stage as
// the presenter left it can be stored with the record.
function getModelScreenRect(canvasWidth, canvasHeight) {
    // A full-frame grab makes every prototype look the same: a small glow in a
    // large black rectangle. Project the model's bounds so the thumbnail is
    // actually of the model.
    if (!activeModelGroup || !camera || activeModelGroup.children.length === 0) return null;
    const box = new THREE.Box3().setFromObject(activeModelGroup);
    if (box.isEmpty()) return null;
    const min = box.min, max = box.max;
    let left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity;
    for (let bit = 0; bit < 8; bit++) {
        const corner = new THREE.Vector3(
            bit & 1 ? max.x : min.x,
            bit & 2 ? max.y : min.y,
            bit & 4 ? max.z : min.z
        ).project(camera);
        const x = (corner.x * 0.5 + 0.5) * canvasWidth;
        const y = (-corner.y * 0.5 + 0.5) * canvasHeight;
        left = Math.min(left, x); right = Math.max(right, x);
        top = Math.min(top, y); bottom = Math.max(bottom, y);
    }
    if (!Number.isFinite(left) || right <= left || bottom <= top) return null;

    // Pad so the model is not flush against the edges, then force 4:3 so the
    // crop matches the card without squashing.
    const padX = (right - left) * 0.18;
    const padY = (bottom - top) * 0.18;
    left -= padX; right += padX; top -= padY; bottom += padY;
    let width = right - left;
    let height = bottom - top;
    const targetAspect = 4 / 3;
    if (width / height < targetAspect) {
        const grow = (height * targetAspect - width) / 2;
        left -= grow; width = height * targetAspect;
    } else {
        const grow = (width / targetAspect - height) / 2;
        top -= grow; height = width / targetAspect;
    }
    left = Math.max(0, Math.min(left, canvasWidth - 1));
    top = Math.max(0, Math.min(top, canvasHeight - 1));
    width = Math.min(width, canvasWidth - left);
    height = Math.min(height, canvasHeight - top);
    if (width < 8 || height < 8) return null;
    return { left, top, width, height };
}

function captureArchiveThumbnail() {
    try {
        const canvas = renderer?.domElement;
        if (!canvas || !canvas.width || !canvas.height) return null;
        const crop = getModelScreenRect(canvas.width, canvas.height) || {
            left: 0, top: 0, width: canvas.width, height: canvas.height
        };
        const out = document.createElement('canvas');
        out.width = 240;
        out.height = 180;
        const ctx = out.getContext('2d');
        ctx.fillStyle = '#0c0e12';
        ctx.fillRect(0, 0, out.width, out.height);
        ctx.drawImage(canvas, crop.left, crop.top, crop.width, crop.height, 0, 0, out.width, out.height);
        return out.toDataURL('image/jpeg', 0.72);
    } catch (err) {
        console.warn('Archive thumbnail capture skipped', err);
        return null;
    }
}

function escapeHtmlText(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
}

function formatArchiveDate(iso) {
    const then = new Date(iso);
    if (Number.isNaN(then.getTime())) return '';
    const ko = state.language === 'ko';
    const days = Math.floor((Date.now() - then.getTime()) / 86400000);
    if (days <= 0) return ko ? '오늘' : 'today';
    if (days === 1) return ko ? '어제' : 'yesterday';
    if (days < 30) return ko ? `${days}일 전` : `${days} days ago`;
    const months = Math.floor(days / 30);
    if (days < 365) return ko ? `${months}개월 전` : `${months} month${months > 1 ? 's' : ''} ago`;
    const years = Math.floor(days / 365);
    return ko ? `${years}년 전` : `${years} year${years > 1 ? 's' : ''} ago`;
}

function formatArchiveDateFull(iso) {
    const then = new Date(iso);
    if (Number.isNaN(then.getTime())) return '';
    return then.toLocaleString(state.language === 'ko' ? 'ko-KR' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
}

async function saveCurrentToArchive() {
    const name = document.getElementById('spec-name').value;
    const category = document.getElementById('spec-category').value;
    const weight = parseInt(document.getElementById('spec-param-weight').value);
    const power = parseInt(document.getElementById('spec-param-power').value);
    const thermal = parseInt(document.getElementById('spec-param-thermal').value);

    const isImportedModel = state.activePreset === 'custom' && !state.imageUploaded && !!uploadedMeshGroup;

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
        // Only an actual image projection owns customImageBase64. Without the
        // imageUploaded check a stale image from an earlier upload gets filed
        // under a 3D model and comes back instead of the model.
        customImageBase64: state.imageUploaded ? state.customImageBase64 : null,
        modelGlb: null,
        thumbnail: captureArchiveThumbnail(),
        date: new Date().toISOString()
    };

    // The archive used to store settings only. For a preset that is enough --
    // the geometry is in the app. For an imported model it is not: the one
    // thing the presenter actually saved was thrown away, and the restore
    // silently showed whatever was already on stage.
    if (isImportedModel) {
        try {
            const glb = await exportActiveModelGlb();
            if (glb.byteLength > PORTABLE_PROJECT_MAX_BYTES) {
                throw new Error(`Model is ${Math.round(glb.byteLength / 1024 / 1024)}MB, over the ${Math.round(PORTABLE_PROJECT_MAX_BYTES / 1024 / 1024)}MB archive limit.`);
            }
            prototypeRecord.modelGlb = glb;
            prototypeRecord.modelBytes = glb.byteLength;
        } catch (err) {
            console.error('Archive model packing failed', err);
            showNotification(
                state.language === 'ko' ? '보관하지 못했습니다' : 'Not Saved',
                state.language === 'ko'
                    ? '모델을 보관함에 담지 못했습니다. 설정만 저장하면 다시 열었을 때 모델이 비어 있어서 저장을 멈췄습니다. 대신 [휴대용 프로젝트]로 파일을 내려받아 두세요.'
                    : 'The model could not be packed into the archive. Saving settings alone would restore an empty stage, so nothing was saved. Download a portable project file instead.'
            );
            addConsoleLog(`[ARCHIVE] Save aborted: ${err.message || err}`, 'error');
            return;
        }
    }

    ArchiveDBManager.savePrototype(prototypeRecord).then((id) => {
        window.loadedArchiveId = id;
        loadArchiveSlots();

        if (state.isSoundOn) {
            playSynthClick(900, 0.06);
            playSynthClick(1300, 0.05);
        }

        const sizeNote = prototypeRecord.modelBytes
            ? ` (${(prototypeRecord.modelBytes / 1024 / 1024).toFixed(1)}MB)`
            : '';
        showNotification(
            state.language === 'ko' ? "보관 완료" : "Prototype Saved",
            state.language === 'ko'
                ? `[${name}] 시제품을 이 브라우저의 보관함에 저장했습니다${sizeNote}.`
                : `Saved [${name}] to this browser's archive${sizeNote}.`
        );

        if (state.language === 'ko') {
            addConsoleLog(`[아카이브] 저장 완료: [${name}] (ID: ${id})${prototypeRecord.modelGlb ? ' · 모델 포함' : ''}`, "success");
        } else {
            addConsoleLog(`[ARCHIVE] Saved [${name}] with ID: ${id}${prototypeRecord.modelGlb ? ' (model included)' : ''}`, "success");
        }
    }).catch(err => {
        console.error("Save archive failed", err);
        showNotification(
            state.language === 'ko' ? '보관하지 못했습니다' : 'Not Saved',
            state.language === 'ko'
                ? '이 브라우저의 저장 공간이 부족하거나 시크릿 모드일 수 있습니다. [휴대용 프로젝트]로 파일을 내려받아 두세요.'
                : "This browser's storage may be full or in private mode. Download a portable project file instead."
        );
        addConsoleLog(`[ARCHIVE] Save failed: ${err?.message || err}`, 'error');
    });
}
