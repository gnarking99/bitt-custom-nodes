import { app } from "../../../scripts/app.js";

// Modal CSS limits and styles matching our global app style
const createModalStyles = () => {
    if (document.getElementById('bitt-modal-styles')) return;
    const style = document.createElement('style');
    style.id = 'bitt-modal-styles';
    style.innerHTML = `
        .bitt-modal-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            z-index: 99999999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Inter, sans-serif;
            color: #fff;
        }
        .bitt-modal-content {
            background: rgba(15, 15, 15, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            width: 800px;
            max-width: 90vw;
            height: 600px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            overflow: hidden;
        }
        .bitt-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 24px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .bitt-modal-header h2 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 600;
        }
        .bitt-modal-close {
            background: transparent;
            border: none;
            color: #aaa;
            font-size: 1.5rem;
            cursor: pointer;
            transition: color 0.2s;
        }
        .bitt-modal-close:hover { color: #fff; }
        .bitt-tabs {
            display: flex;
            background: rgba(255, 255, 255, 0.03);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .bitt-tab {
            padding: 12px 24px;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            color: #aaa;
            font-weight: 500;
            transition: all 0.2s;
        }
        .bitt-tab.active {
            color: var(--accent-red, #dc2626);
            border-bottom-color: var(--accent-red, #dc2626);
            background: rgba(255, 255, 255, 0.05);
        }
        .bitt-tab:hover:not(.active) { color: #fff; }
        .bitt-tab-content {
            flex: 1;
            overflow-y: auto;
            padding: 24px;
        }
        .bitt-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 16px;
        }
        .bitt-grid-item {
            aspect-ratio: 1;
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
            position: relative;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.2s;
        }
        .bitt-grid-item img, .bitt-grid-item video {
            width: 100%; height: 100%;
            object-fit: cover;
        }
        .bitt-grid-item:hover {
            transform: scale(1.05);
            border-color: var(--accent-red, #dc2626);
            box-shadow: 0 0 15px rgba(220, 38, 38, 0.3);
        }
        .bitt-grid-item-label {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            background: rgba(0,0,0,0.7);
            padding: 4px 8px;
            font-size: 0.75rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .bitt-btn {
            background: var(--accent-red, #dc2626);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s;
            font-family: inherit;
        }
        .bitt-btn:hover {
            background: #b91c1c;
            transform: translateY(-2px);
        }
        .bitt-loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            color: #aaa;
        }
    `;
    document.head.appendChild(style);
};

const openImagePicker = (node) => {
    createModalStyles();

    const overlay = document.createElement('div');
    overlay.className = 'bitt-modal-overlay';
    
    const closeModal = () => { document.body.removeChild(overlay); };

    overlay.innerHTML = `
        <div class="bitt-modal-content">
            <div class="bitt-modal-header">
                <h2>Select Image/Video</h2>
                <button class="bitt-modal-close">&times;</button>
            </div>
            <div class="bitt-tabs">
                <div class="bitt-tab active" data-tab="pc">Local PC</div>
                <div class="bitt-tab" data-tab="gallery">Local Gallery</div>
                <div class="bitt-tab" data-tab="cloud">Cloud R2</div>
            </div>
            <div class="bitt-tab-content" id="bitt-modal-body">
                <div style="display:flex; height:100%; align-items:center; justify-content:center;">
                    <button class="bitt-btn" id="bitt-upload-pc">Select File from Computer</button>
                </div>
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
            const isVideo = item.name.endsWith('.mp4');
            html += \`
                <div class="bitt-grid-item" data-key="\${item.key || item.name}">
                    \${isVideo ? \`<video src="\${item.url}"></video>\` : \`<img src="\${item.url}" />\`}
                    <div class="bitt-grid-item-label">\${item.name}</div>
                </div>
            \`;
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
        // Find the image widget and set it
        const imageWidget = node.widgets.find(w => w.name === "image");
        if (imageWidget) {
            imageWidget.value = filename;
            // Desencadenar el refresco del nodo
            if (node.onResize) node.onResize(node.size);
            app.graph.setDirtyCanvas(true);
        }
        closeModal();
    };

    const loadLocalGallery = async () => {
        body.innerHTML = '<div class="bitt-loading">Loading local gallery...</div>';
        try {
            const items = await window.electronAPI.getLocalGallery();
            renderGrid(items, async (name) => {
                body.innerHTML = '<div class="bitt-loading">Syncing to Cloud...</div>';
                const res = await window.electronAPI.copyToInput(name, 'local');
                if (res.success) handleSelectImage(res.filename);
                else alert("Error syncing: " + res.error);
            });
        } catch (e) { body.innerHTML = '<div class="bitt-loading">Error loading gallery</div>'; }
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
                else alert("Error syncing: " + res.error);
            });
        } catch (e) { body.innerHTML = '<div class="bitt-loading">Error loading cloud</div>'; }
    };

    const initPcTab = () => {
        body.innerHTML = \`
            <div style="display:flex; height:100%; align-items:center; justify-content:center; flex-direction: column; gap: 16px;">
                <p style="color: #aaa; text-align: center;">Select a file from your computer.<br/>It will be synced automatically for cloud rendering.</p>
                <button class="bitt-btn" id="bitt-upload-pc">Browse Files</button>
            </div>
        \`;
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
                    btn.innerText = "Browse Files";
                    btn.disabled = false;
                } else {
                    // canceled
                    btn.innerText = "Browse Files";
                    btn.disabled = false;
                }
            } catch (e) {
                alert("Upload failed.");
                btn.innerText = "Browse Files";
                btn.disabled = false;
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

app.registerExtension({
    name: "Bitt.CloudLoad",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === "BittCloudLoad") {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                const r = onNodeCreated ? onNodeCreated.apply(this, arguments) : undefined;
                
                // Add the custom Select Image button
                this.addWidget("button", "Select Image / Media", "Select Image", () => {
                    openImagePicker(this);
                });

                return r;
            };
        }
    }
});
