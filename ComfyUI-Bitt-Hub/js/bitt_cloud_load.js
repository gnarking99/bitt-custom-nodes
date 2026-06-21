(function() {
    const createModalStyles = () => {
        if (document.getElementById('bitt-modal-styles')) return;
        const style = document.createElement('style');
        style.id = 'bitt-modal-styles';
        style.innerHTML = `
            @import url('https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&f[]=satoshi@400,500,700&display=swap');
            
            .bitt-modal-overlay {
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(30, 30, 30, 0.4);
                backdrop-filter: blur(4px);
                z-index: 99999999;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Satoshi', sans-serif;
                color: #1E1E1E;
            }
            .bitt-modal-content {
                background: #ECE6DE;
                border: 3px solid #1E1E1E;
                width: 900px;
                max-width: 95vw;
                height: 700px;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
                box-shadow: 16px 16px 0 var(--accent-orange, #F8A348);
            }
            .bitt-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 24px;
                border-bottom: 3px solid #1E1E1E;
                background: #fff;
            }
            .bitt-modal-header h2 {
                margin: 0;
                font-family: 'Clash Display', sans-serif;
                font-size: 2rem;
                text-transform: uppercase;
                letter-spacing: -0.02em;
            }
            .bitt-modal-close {
                background: transparent;
                border: none;
                color: #1E1E1E;
                font-size: 2rem;
                cursor: pointer;
                transition: transform 0.2s;
                line-height: 1;
            }
            .bitt-modal-close:hover { transform: scale(1.2) rotate(90deg); }
            
            .bitt-tabs {
                display: flex;
                border-bottom: 3px solid #1E1E1E;
                background: #fff;
            }
            .bitt-tab {
                padding: 16px 32px;
                cursor: pointer;
                font-family: 'Clash Display', sans-serif;
                font-weight: 600;
                font-size: 1.1rem;
                text-transform: uppercase;
                border-right: 3px solid #1E1E1E;
                color: #444;
                transition: all 0.2s;
            }
            .bitt-tab.active {
                background: #1E1E1E;
                color: #ECE6DE;
            }
            .bitt-tab:hover:not(.active) { background: #f5f5f5; color: #1E1E1E; }
            
            .bitt-tab-content {
                flex: 1;
                overflow-y: auto;
                padding: 32px;
                background: #ECE6DE;
            }
            
            .bitt-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 24px;
            }
            .bitt-grid-item {
                aspect-ratio: 1;
                background: #fff;
                border: 3px solid #1E1E1E;
                cursor: pointer;
                position: relative;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .bitt-grid-item img, .bitt-grid-item video {
                width: 100%; height: 100%;
                object-fit: cover;
                display: block;
            }
            .bitt-grid-item:hover {
                transform: translate(-4px, -4px);
                box-shadow: 8px 8px 0 var(--accent-orange, #F8A348);
            }
            .bitt-grid-item-label {
                position: absolute;
                bottom: 0; left: 0; right: 0;
                background: #1E1E1E;
                color: #fff;
                padding: 8px 12px;
                font-size: 0.85rem;
                font-weight: 500;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                border-top: 3px solid #1E1E1E;
            }
            
            .bitt-btn {
                background: var(--accent-red, #DB4A2B);
                color: white;
                border: 3px solid #1E1E1E;
                padding: 16px 32px;
                font-family: 'Clash Display', sans-serif;
                font-size: 1.2rem;
                font-weight: 600;
                text-transform: uppercase;
                cursor: pointer;
                transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                box-shadow: 6px 6px 0 #1E1E1E;
            }
            .bitt-btn:hover {
                transform: translate(-2px, -2px);
                box-shadow: 8px 8px 0 #1E1E1E;
            }
            .bitt-btn:active {
                transform: translate(4px, 4px);
                box-shadow: 2px 2px 0 #1E1E1E;
            }
            .bitt-loading {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                font-family: 'Clash Display', sans-serif;
                font-size: 1.5rem;
                color: #1E1E1E;
                text-transform: uppercase;
            }
        `;
        document.head.appendChild(style);
    };

    const openImagePicker = (node, appObj) => {
        createModalStyles();

        const overlay = document.createElement('div');
        overlay.className = 'bitt-modal-overlay';
        
        const closeModal = () => { document.body.removeChild(overlay); };

        overlay.innerHTML = `
            <div class="bitt-modal-content">
                <div class="bitt-modal-header">
                    <h2>Select Media</h2>
                    <button class="bitt-modal-close">&times;</button>
                </div>
                <div class="bitt-tabs">
                    <div class="bitt-tab active" data-tab="pc">Local PC</div>
                    <div class="bitt-tab" data-tab="gallery">Local Gallery</div>
                    <div class="bitt-tab" data-tab="cloud">Cloud R2</div>
                </div>
                <div class="bitt-tab-content" id="bitt-modal-body">
                </div>
            </div>
        `;
        
        overlay.querySelector('.bitt-modal-close').onclick = closeModal;
        
        const tabs = overlay.querySelectorAll('.bitt-tab');
        const body = overlay.querySelector('#bitt-modal-body');

        const renderGrid = (items, onSelect) => {
            if (!items || items.length === 0) {
                body.innerHTML = '<div class="bitt-loading">No media found.</div>';
                return;
            }
            let html = '<div class="bitt-grid">';
            items.forEach(item => {
                const name = item.name || item.key || '';
                const isVideo = name.toLowerCase().match(/\.(mp4|mov|webm|avi)$/);
                html += `
                    <div class="bitt-grid-item" data-key="${item.key || name}">
                        ${isVideo ? `<video src="${item.url}" muted loop onmouseover="this.play()" onmouseout="this.pause()"></video>` : `<img src="${item.url}" />`}
                        <div class="bitt-grid-item-label">${name.split('/').pop()}</div>
                    </div>
                `;
            });
            html += '</div>';
            body.innerHTML = html;
            
            body.querySelectorAll('.bitt-grid-item').forEach(el => {
                el.onclick = () => {
                    onSelect(el.getAttribute('data-key'));
                };
            });
        };

        const handleSelectImage = async (filename) => {
            const imageWidget = node.widgets.find(w => w.name === "image");
            if (imageWidget) {
                imageWidget.value = filename;
                if (node.onResize) node.onResize(node.size);
                if (appObj && appObj.graph) appObj.graph.setDirtyCanvas(true);
            }
            closeModal();
        };

        const loadLocalGallery = async () => {
            body.innerHTML = '<div class="bitt-loading">Loading local gallery...</div>';
            try {
                // localListDir is what the frontend hub uses
                const items = await window.electronAPI.localListDir("");
                const mediaItems = items.filter(i => !i.isDir && i.name.match(/\.(png|jpg|jpeg|mp4|mov|webm)$/i));
                
                renderGrid(mediaItems, async (key) => {
                    body.innerHTML = '<div class="bitt-loading">Syncing to Cloud...</div>';
                    // Since copyToInput expects the filename, let's pass the relative path
                    const res = await window.electronAPI.copyToInput(key, 'local');
                    if (res.success) handleSelectImage(res.filename);
                    else { alert("Error syncing: " + res.error); loadLocalGallery(); }
                });
            } catch (e) { 
                console.error(e);
                body.innerHTML = '<div class="bitt-loading">Error loading gallery. Check console.</div>'; 
            }
        };

        const loadCloudGallery = async () => {
            body.innerHTML = '<div class="bitt-loading">Loading cloud gallery...</div>';
            try {
                const user = await window.electronAPI.getCurrentUser();
                if (!user) {
                    body.innerHTML = '<div class="bitt-loading">Please login to access cloud.</div>';
                    return;
                }
                const items = await window.electronAPI.getR2Gallery(user.username);
                renderGrid(items, async (key) => {
                    body.innerHTML = '<div class="bitt-loading">Downloading & Syncing...</div>';
                    const res = await window.electronAPI.copyToInput(key, 'r2');
                    if (res.success) handleSelectImage(res.filename);
                    else { alert("Error syncing: " + res.error); loadCloudGallery(); }
                });
            } catch (e) { 
                console.error(e);
                body.innerHTML = '<div class="bitt-loading">Error loading cloud. Check console.</div>'; 
            }
        };

        const initPcTab = () => {
            body.innerHTML = `
                <div style="display:flex; height:100%; align-items:center; justify-content:center; flex-direction: column; gap: 32px;">
                    <div style="font-family: 'Satoshi', sans-serif; font-size: 1.2rem; color: #444; text-align: center; max-width: 400px; line-height: 1.5;">
                        Choose a file from your device.<br/>It will be auto-synced with the Hub<br/>for Cloud Serverless rendering.
                    </div>
                    <button class="bitt-btn" id="bitt-upload-pc">Browse Files</button>
                </div>
            `;
            body.querySelector('#bitt-upload-pc').onclick = async () => {
                const btn = body.querySelector('#bitt-upload-pc');
                btn.innerText = "Uploading...";
                btn.disabled = true;
                try {
                    const res = await window.electronAPI.openFileDialog();
                    if (res.success) {
                        handleSelectImage(res.filename);
                    } else if (res.error) {
                        alert("Error uploading: " + res.error);
                        initPcTab();
                    } else {
                        initPcTab();
                    }
                } catch (e) {
                    alert("Upload failed.");
                    initPcTab();
                }
            };
        };

        tabs.forEach(tab => {
            tab.onclick = () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const target = tab.getAttribute('data-tab');
                if (target === 'pc') initPcTab();
                else if (target === 'gallery') loadLocalGallery();
                else if (target === 'cloud') loadCloudGallery();
            };
        });

        initPcTab();

        document.body.appendChild(overlay);
    };

    const initExtension = () => {
        const appObj = window.app || (window.comfyAPI ? window.comfyAPI.app.app : null);
        if (!appObj) {
            setTimeout(initExtension, 100);
            return;
        }

        console.log("[BittCloudLoad] Extension loading...");

        appObj.registerExtension({
            name: "Bitt.CloudLoad",
            nodeCreated(node) {
                if (node.comfyClass === "BittCloudLoad" || node.type === "BittCloudLoad") {
                    console.log("[BittCloudLoad] Node created, adding button...");
                    if (!node.widgets || !node.widgets.find(w => w.name === "Select Image / Media")) {
                        node.addWidget("button", "Select Image / Media", "Select Image", () => {
                            openImagePicker(node, appObj);
                        });
                        setTimeout(() => {
                            if (node.computeSize) {
                                node.size = node.computeSize();
                                if (appObj.graph) appObj.graph.setDirtyCanvas(true, true);
                            }
                        }, 50);
                    }
                }
            }
        });
        
        console.log("[BittCloudLoad] Extension registered!");
    };

    initExtension();
})();
