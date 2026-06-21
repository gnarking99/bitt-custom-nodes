import { app } from "../../scripts/app.js";

app.registerExtension({
    name: "Bitt.HubIntegration",
    async setup() {
        const createBackBtn = (isSidebar) => {
            const btn = document.createElement("button");
            btn.id = 'bitt-back-btn';
            btn.textContent = "✕ BACK TO HUB";
            
            if (isSidebar) {
                btn.style.cssText = "background:#1A1918 !important; color:#ECE6DE !important; font-family:'Syncopate', sans-serif; font-size:12px; margin: 10px; border: 1px solid #333 !important; cursor: pointer !important; text-transform: uppercase; padding: 10px; border-radius: 4px; width: calc(100% - 20px); font-weight: bold; display: block;";
            } else {
                btn.style.cssText = "background:#1A1918 !important; color:#ECE6DE !important; font-family:'Syncopate', sans-serif; font-size:11px; margin-right: 8px; margin-left: 8px; border: 1px solid #333 !important; cursor: pointer !important; text-transform: uppercase; padding: 4px 12px; height: 32px; border-radius: 4px; display: inline-flex; align-items: center; font-weight: bold;";
            }
            
            btn.onclick = () => { 
                if (window.electronAPI) window.electronAPI.goBack(); 
            };
            return btn;
        };

        // 1. Integración con UI Clásica
        if (app.ui && app.ui.menuContainer) {
            app.ui.menuContainer.prepend(createBackBtn(true));
            return;
        }

        // 2. Integración con API de menú de nueva UI (si está disponible)
        if (app.menu && app.menu.addAction) {
            app.menu.addAction({
                id: "bitt.backToHub",
                title: "✕ BACK TO HUB",
                action: () => { if (window.electronAPI) window.electronAPI.goBack(); }
            });
        }

        // 3. Fallback: Inyección directa en Navbar o Sidebar con MutationObserver
        const injectDOM = () => {
            if (document.getElementById('bitt-back-btn')) return;

            // Intentar barra superior primero
            const topMenuEnd = document.querySelector('[data-testid="action-bar-buttons"]') || document.querySelector('.actionbar-container');
            if (topMenuEnd) {
                topMenuEnd.prepend(createBackBtn(false));
                return;
            }

            // Si no hay topbar, buscar Sidebar (sugerido por usuario)
            const sidebar = document.querySelector('[data-testid="side-toolbar"]') || document.querySelector('.side-tool-bar-container');
            if (sidebar) {
                sidebar.prepend(createBackBtn(true));
                return;
            }
            
            // Fallback extremo: al lado de queue
            const queueBtn = Array.from(document.querySelectorAll('button')).find(b => 
                b.textContent.toLowerCase().includes('queue') || 
                b.textContent.toLowerCase().includes('ejecutar') ||
                b.id === 'queue-button'
            );
            if (queueBtn && queueBtn.parentElement) {
                queueBtn.parentElement.insertBefore(createBackBtn(false), queueBtn);
            }
        };

        const observer = new MutationObserver(() => { injectDOM(); });
        observer.observe(document.body, { childList: true, subtree: true });
        
        setInterval(injectDOM, 1000);

        // 4. Integración dinámica de Proyectos en el Nodo BittCloudSave
        const updateProjects = async () => {
            try {
                const res = await fetch('/api/projects');
                if (!res.ok) return;
                const projects = await res.json();
                const projectNames = projects.map(p => p.name);
                if (projectNames.length === 0) projectNames.push("Default");

                // Actualizar la definición del nodo para futuros nodos creados
                const nodeDef = LiteGraph.registered_node_types["BittCloudSave"];
                if (nodeDef && nodeDef.nodeData && nodeDef.nodeData.input && nodeDef.nodeData.input.required) {
                    if (nodeDef.nodeData.input.required.project_name) {
                        nodeDef.nodeData.input.required.project_name[0] = projectNames;
                    }
                }

                // Actualizar nodos ya existentes en el canvas
                if (app.graph) {
                    const nodes = app.graph.findNodesByType("BittCloudSave");
                    if (nodes) {
                        for (const node of nodes) {
                            const widget = node.widgets?.find(w => w.name === "project_name");
                            if (widget) {
                                widget.options.values = projectNames;
                                if (!projectNames.includes(widget.value)) {
                                    widget.value = projectNames[0];
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                console.error("BittHub: Error fetching projects", err);
            }
        };

        // Ejecutar inmediatamente y luego sondear para mantenerlo actualizado
        setTimeout(updateProjects, 1000); // Esperar a que el Grafo cargue
        setInterval(updateProjects, 5000);
    }
});
