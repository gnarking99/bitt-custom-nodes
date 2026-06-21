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
            
            .bitt-toolbar {
                display: flex;
                align-items: center;
                gap: 16px;
                margin-bottom: 24px;
            }
            
            .bitt-back-btn {
                background: #fff;
                border: 2px solid #1E1E1E;
                padding: 8px 16px;
                font-family: 'Clash Display', sans-serif;
                font-size: 1rem;
                font-weight: 600;
                text-transform: uppercase;
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 4px 4px 0 var(--accent-orange, #F8A348);
            }
            .bitt-back-btn:hover {
                transform: translate(-2px, -2px);
                box-shadow: 6px 6px 0 var(--accent-orange, #F8A348);
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
            .bitt-grid-item.folder {
                background: #1E1E1E;
                color: #ECE6DE;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Clash Display', sans-serif;
                font-size: 1.5rem;
                text-transform: uppercase;
                padding: 16px;
                text-align: center;
                word-break: break-word;
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

    
    const ensureLottie = () => {
        return new Promise((resolve) => {
            if (window.lottie) return resolve();
            const script = document.createElement('script');
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";
            script.onload = resolve;
            document.head.appendChild(script);
        });
    };
    
    const showLoader = async (container, text="Downloading & Syncing...") => {
        container.innerHTML = `<div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%;">
            <div id="bitt-lottie-container" style="width:150px; height:150px;"></div>
            <div style="font-family:'Clash Display', sans-serif; font-size:1.5rem; color:#1E1E1E; margin-top:16px;">${text}</div>
        </div>`;
        await ensureLottie();
        lottie.loadAnimation({
            container: container.querySelector('#bitt-lottie-container'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: JSON.parse(`
{"v":"5.5.8","fr":25,"ip":0,"op":54,"w":250,"h":250,"nm":"Bitt_Burguer_F","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":3,"nm":"Eyes","sr":1,"ks":{"o":{"a":0,"k":0,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":125,"ix":3},"y":{"a":0,"k":125,"ix":4}},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[50,50,100],"ix":6}},"ao":0,"ef":[{"ty":5,"nm":"Opacity","np":3,"mn":"ADBE Slider Control","ix":1,"en":1,"ef":[{"ty":0,"nm":"Slider","mn":"ADBE Slider Control-0001","ix":1,"v":{"a":0,"k":100,"ix":1}}]}],"ip":0,"op":54,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"O","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11,"x":"var $bm_rt;\n$bm_rt = thisComp.layer('Eyes').effect('Opacity')('Slider');"},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":-120,"ix":3},"y":{"a":1,"k":[{"i":{"x":[0.868],"y":[0.719]},"o":{"x":[0.834],"y":[0]},"t":0,"s":[-121]},{"i":{"x":[0.436],"y":[0.856]},"o":{"x":[0.293],"y":[0.492]},"t":6,"s":[169]},{"i":{"x":[0.611],"y":[1]},"o":{"x":[0.142],"y":[0.618]},"t":11,"s":[-87.896]},{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.167],"y":[0]},"t":24,"s":[-121]},{"i":{"x":[0.868],"y":[0.719]},"o":{"x":[0.834],"y":[0]},"t":27,"s":[-121]},{"i":{"x":[0.436],"y":[0.856]},"o":{"x":[0.293],"y":[0.492]},"t":33,"s":[169]},{"i":{"x":[0.611],"y":[1]},"o":{"x":[0.142],"y":[0.618]},"t":38,"s":[-87.896]},{"t":51,"s":[-121]}],"ix":4}},"a":{"a":0,"k":[40.25,40.25,0],"ix":1},"s":{"a":0,"k":[200,200,100],"ix":6}},"ao":0,"ef":[{"ty":21,"nm":"Fill","np":9,"mn":"ADBE Fill","ix":1,"en":1,"ef":[{"ty":10,"nm":"Fill Mask","mn":"ADBE Fill-0001","ix":1,"v":{"a":0,"k":0,"ix":1}},{"ty":7,"nm":"All Masks","mn":"ADBE Fill-0007","ix":2,"v":{"a":0,"k":0,"ix":2}},{"ty":2,"nm":"Color","mn":"ADBE Fill-0002","ix":3,"v":{"a":0,"k":[0.929411768913,0.913725495338,0.890196084976,1],"ix":3}},{"ty":7,"nm":"Invert","mn":"ADBE Fill-0006","ix":4,"v":{"a":0,"k":0,"ix":4}},{"ty":0,"nm":"Horizontal Feather","mn":"ADBE Fill-0003","ix":5,"v":{"a":0,"k":0,"ix":5}},{"ty":0,"nm":"Vertical Feather","mn":"ADBE Fill-0004","ix":6,"v":{"a":0,"k":0,"ix":6}},{"ty":0,"nm":"Opacity","mn":"ADBE Fill-0005","ix":7,"v":{"a":0,"k":1,"ix":7}}]}],"shapes":[{"ty":"gr","it":[{"ind":1,"ty":"sh","ix":2,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":2,"s":[{"i":[[22.091,0],[0,22.091],[-4.153,6.306],[-13.975,0],[-7.213,-10.476],[0,-8.411]],"o":[[-22.091,0],[0,-8.116],[7.152,-10.86],[13.68,0],[4.435,6.441],[0,22.091]],"v":[[0,40],[-40,0],[-33.43,-21.973],[0,-40],[32.969,-22.657],[40,0]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":4,"s":[{"i":[[22.091,0],[0,22.091],[-0.477,9.715],[-26.417,-0.115],[-0.255,-14.373],[0,-8.389]],"o":[[-22.091,0],[0,-8.108],[-0.602,-15.285],[27.586,0.12],[-0.255,11.127],[0,22.091]],"v":[[0,40],[-40,0],[-39.893,-20.831],[-0.083,-57],[40.01,-21.743],[40,0]],"c":true}]},{"t":5,"s":[{"i":[[22.091,0],[0,22.091],[-0.042,15.561],[-24.5,-0.169],[-0.007,-15.498],[0,-8.345]],"o":[[-22.091,0],[0,-8.092],[0.042,-15.561],[25.25,0.174],[0.007,15.498],[0,22.091]],"v":[[0,40],[-40,0],[-40.084,-53.047],[-0.25,-91],[40.201,-54.414],[40,0]],"c":true}]}],"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[40.25,40.25],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":6,"st":-11,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"X","parent":2,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11,"x":"var $bm_rt;\n$bm_rt = thisComp.layer('Eyes').effect('Opacity')('Slider');"},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[40.25,40.25,0],"ix":2},"a":{"a":0,"k":[35.954,35.955,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[7.615,-3.852],[0,0],[0,0],[3.852,7.614],[0,0],[0,0],[-2.987,2.988],[0,0],[-3.807,1.925],[0,0],[0,0],[-2.987,-2.986],[0,0],[-1.926,-3.806],[0,0]],"o":[[-3.852,7.614],[0,0],[0,0],[-7.615,-3.852],[0,0],[0,0],[1.925,-3.805],[0,0],[2.986,-2.987],[0,0],[0,0],[3.807,1.925],[0,0],[2.986,2.988],[0,0],[0,0]],"v":[[35.704,18.026],[18.026,35.704],[-0.001,17.677],[-18.027,35.704],[-35.704,18.026],[-17.678,0.001],[-35.704,-18.027],[-28.287,-28.283],[-28.282,-28.286],[-18.027,-35.704],[-0.001,-17.677],[18.026,-35.704],[28.283,-28.286],[28.285,-28.284],[35.704,-18.027],[17.677,0.001]],"c":true},"ix":2,"x":"var $bm_rt;\n$bm_rt = thisComp.layer('X').content('Group 1').content('Path 1').path;"},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411764706,0.913725490196,0.890196078431,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[35.954,35.955],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":6,"op":33,"st":-11,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"O 2","parent":2,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11,"x":"var $bm_rt;\n$bm_rt = thisComp.layer('Eyes').effect('Opacity')('Slider');"},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":40.25,"ix":3},"y":{"a":0,"k":40.25,"ix":4}},"a":{"a":0,"k":[40.25,40.25,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"ef":[{"ty":21,"nm":"Fill","np":9,"mn":"ADBE Fill","ix":1,"en":1,"ef":[{"ty":10,"nm":"Fill Mask","mn":"ADBE Fill-0001","ix":1,"v":{"a":0,"k":0,"ix":1}},{"ty":7,"nm":"All Masks","mn":"ADBE Fill-0007","ix":2,"v":{"a":0,"k":0,"ix":2}},{"ty":2,"nm":"Color","mn":"ADBE Fill-0002","ix":3,"v":{"a":0,"k":[0.929411768913,0.913725495338,0.890196084976,1],"ix":3}},{"ty":7,"nm":"Invert","mn":"ADBE Fill-0006","ix":4,"v":{"a":0,"k":0,"ix":4}},{"ty":0,"nm":"Horizontal Feather","mn":"ADBE Fill-0003","ix":5,"v":{"a":0,"k":0,"ix":5}},{"ty":0,"nm":"Vertical Feather","mn":"ADBE Fill-0004","ix":6,"v":{"a":0,"k":0,"ix":6}},{"ty":0,"nm":"Opacity","mn":"ADBE Fill-0005","ix":7,"v":{"a":0,"k":1,"ix":7}}]}],"shapes":[{"ty":"gr","it":[{"ind":1,"ty":"sh","ix":2,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":33,"s":[{"i":[[22.091,0],[0,22.091],[-4.153,6.306],[-13.975,0],[-7.213,-10.476],[0,-8.411]],"o":[[-22.091,0],[0,-8.116],[7.152,-10.86],[13.68,0],[4.435,6.441],[0,22.091]],"v":[[0,40],[-40,0],[-33.43,-21.973],[0,-40],[32.969,-22.657],[40,0]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":35,"s":[{"i":[[22.091,0],[0,22.091],[-0.042,15.561],[-24.5,-0.169],[-0.007,-15.498],[0,-8.345]],"o":[[-22.091,0],[0,-8.092],[0.042,-15.561],[25.25,0.174],[0.007,15.498],[0,22.091]],"v":[[0,40],[-40,0],[-40.084,-53.047],[-0.25,-91],[40.201,-54.414],[40,0]],"c":true}]},{"t":39,"s":[{"i":[[22.091,0],[0,22.091],[-4.153,6.306],[-13.975,0],[-7.213,-10.476],[0,-8.411]],"o":[[-22.091,0],[0,-8.116],[7.152,-10.86],[13.68,0],[4.435,6.441],[0,22.091]],"v":[[0,40],[-40,0],[-33.43,-21.973],[0,-40],[32.969,-22.657],[40,0]],"c":true}]}],"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[40.25,40.25],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":180,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":33,"op":54,"st":33,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"O ","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11,"x":"var $bm_rt;\n$bm_rt = thisComp.layer('Eyes').effect('Opacity')('Slider');"},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":120,"ix":3},"y":{"a":1,"k":[{"i":{"x":[0.914],"y":[0.645]},"o":{"x":[0.834],"y":[0]},"t":2,"s":[-121]},{"i":{"x":[0.436],"y":[0.856]},"o":{"x":[0.293],"y":[0.492]},"t":8,"s":[169]},{"i":{"x":[0.611],"y":[1]},"o":{"x":[0.142],"y":[0.618]},"t":13,"s":[-87.896]},{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.167],"y":[0]},"t":26,"s":[-121]},{"i":{"x":[0.914],"y":[0.645]},"o":{"x":[0.834],"y":[0]},"t":29,"s":[-121]},{"i":{"x":[0.436],"y":[0.856]},"o":{"x":[0.293],"y":[0.492]},"t":35,"s":[169]},{"i":{"x":[0.611],"y":[1]},"o":{"x":[0.142],"y":[0.618]},"t":40,"s":[-87.896]},{"t":53,"s":[-121]}],"ix":4}},"a":{"a":0,"k":[40.25,40.25,0],"ix":1},"s":{"a":0,"k":[200,200,100],"ix":6}},"ao":0,"ef":[{"ty":21,"nm":"Fill","np":9,"mn":"ADBE Fill","ix":1,"en":1,"ef":[{"ty":10,"nm":"Fill Mask","mn":"ADBE Fill-0001","ix":1,"v":{"a":0,"k":0,"ix":1}},{"ty":7,"nm":"All Masks","mn":"ADBE Fill-0007","ix":2,"v":{"a":0,"k":0,"ix":2}},{"ty":2,"nm":"Color","mn":"ADBE Fill-0002","ix":3,"v":{"a":0,"k":[0.929411768913,0.913725495338,0.890196084976,1],"ix":3}},{"ty":7,"nm":"Invert","mn":"ADBE Fill-0006","ix":4,"v":{"a":0,"k":0,"ix":4}},{"ty":0,"nm":"Horizontal Feather","mn":"ADBE Fill-0003","ix":5,"v":{"a":0,"k":0,"ix":5}},{"ty":0,"nm":"Vertical Feather","mn":"ADBE Fill-0004","ix":6,"v":{"a":0,"k":0,"ix":6}},{"ty":0,"nm":"Opacity","mn":"ADBE Fill-0005","ix":7,"v":{"a":0,"k":1,"ix":7}}]}],"shapes":[{"ty":"gr","it":[{"ind":1,"ty":"sh","ix":2,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":4,"s":[{"i":[[22.091,0],[0,22.091],[-4.153,6.306],[-13.975,0],[-7.213,-10.476],[0,-8.411]],"o":[[-22.091,0],[0,-8.116],[7.152,-10.86],[13.68,0],[4.435,6.441],[0,22.091]],"v":[[0,40],[-40,0],[-33.43,-21.973],[0,-40],[32.969,-22.657],[40,0]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":6,"s":[{"i":[[22.091,0],[0,22.091],[-0.477,9.715],[-26.417,-0.115],[-0.255,-14.373],[0,-8.389]],"o":[[-22.091,0],[0,-8.108],[-0.602,-15.285],[27.586,0.12],[-0.255,11.127],[0,22.091]],"v":[[0,40],[-40,0],[-39.893,-20.831],[-0.083,-57],[40.01,-21.743],[40,0]],"c":true}]},{"t":8,"s":[{"i":[[22.091,0],[0,22.091],[-0.042,15.561],[-24.5,-0.169],[-0.007,-15.498],[0,-8.345]],"o":[[-22.091,0],[0,-8.092],[0.042,-15.561],[25.25,0.174],[0.007,15.498],[0,22.091]],"v":[[0,40],[-40,0],[-40.084,-53.047],[-0.25,-91],[40.201,-54.414],[40,0]],"c":true}]}],"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[40.25,40.25],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":8,"st":-9,"bm":0},{"ddd":0,"ind":6,"ty":4,"nm":"X","parent":5,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11,"x":"var $bm_rt;\n$bm_rt = thisComp.layer('Eyes').effect('Opacity')('Slider');"},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[40.25,40.25,0],"ix":2},"a":{"a":0,"k":[35.955,35.955,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[7.614,-3.852],[0,0],[0,0],[3.852,7.614],[0,0],[0,0],[-2.987,2.988],[0,0],[-3.807,1.925],[0,0],[0,0],[-2.986,-2.987],[0,0],[-1.926,-3.805],[0,0]],"o":[[-3.853,7.614],[0,0],[0,0],[-7.614,-3.852],[0,0],[0,0],[1.926,-3.806],[0,0],[2.987,-2.986],[0,0],[0,0],[3.806,1.925],[0,0],[2.986,2.988],[0,0],[0,0]],"v":[[35.705,18.026],[18.027,35.704],[0,17.677],[-18.027,35.704],[-35.705,18.026],[-17.678,0.001],[-35.705,-18.027],[-28.285,-28.284],[-28.283,-28.286],[-18.027,-35.704],[0,-17.677],[18.027,-35.704],[28.281,-28.286],[28.287,-28.283],[35.705,-18.027],[17.678,0.001]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411764706,0.913725490196,0.890196078431,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[35.955,35.955],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":8,"op":35,"st":-9,"bm":0},{"ddd":0,"ind":7,"ty":4,"nm":"O 3","parent":5,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11,"x":"var $bm_rt;\n$bm_rt = thisComp.layer('Eyes').effect('Opacity')('Slider');"},"r":{"a":0,"k":180,"ix":10},"p":{"s":true,"x":{"a":0,"k":40.25,"ix":3},"y":{"a":0,"k":40.25,"ix":4}},"a":{"a":0,"k":[40.25,40.25,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"ef":[{"ty":21,"nm":"Fill","np":9,"mn":"ADBE Fill","ix":1,"en":1,"ef":[{"ty":10,"nm":"Fill Mask","mn":"ADBE Fill-0001","ix":1,"v":{"a":0,"k":0,"ix":1}},{"ty":7,"nm":"All Masks","mn":"ADBE Fill-0007","ix":2,"v":{"a":0,"k":0,"ix":2}},{"ty":2,"nm":"Color","mn":"ADBE Fill-0002","ix":3,"v":{"a":0,"k":[0.929411768913,0.913725495338,0.890196084976,1],"ix":3}},{"ty":7,"nm":"Invert","mn":"ADBE Fill-0006","ix":4,"v":{"a":0,"k":0,"ix":4}},{"ty":0,"nm":"Horizontal Feather","mn":"ADBE Fill-0003","ix":5,"v":{"a":0,"k":0,"ix":5}},{"ty":0,"nm":"Vertical Feather","mn":"ADBE Fill-0004","ix":6,"v":{"a":0,"k":0,"ix":6}},{"ty":0,"nm":"Opacity","mn":"ADBE Fill-0005","ix":7,"v":{"a":0,"k":1,"ix":7}}]}],"shapes":[{"ty":"gr","it":[{"ind":1,"ty":"sh","ix":2,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":35,"s":[{"i":[[22.091,0],[0,22.091],[-4.153,6.306],[-13.975,0],[-7.213,-10.476],[0,-8.411]],"o":[[-22.091,0],[0,-8.116],[7.152,-10.86],[13.68,0],[4.435,6.441],[0,22.091]],"v":[[0,40],[-40,0],[-33.43,-21.973],[0,-40],[32.969,-22.657],[40,0]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":37,"s":[{"i":[[22.091,0],[0,22.091],[-0.042,15.561],[-24.5,-0.169],[-0.007,-15.498],[0,-8.345]],"o":[[-22.091,0],[0,-8.092],[0.042,-15.561],[25.25,0.174],[0.007,15.498],[0,22.091]],"v":[[0,40],[-40,0],[-40.084,-53.047],[-0.25,-91],[40.201,-54.414],[40,0]],"c":true}]},{"t":41,"s":[{"i":[[22.091,0],[0,22.091],[-4.153,6.306],[-13.975,0],[-7.213,-10.476],[0,-8.411]],"o":[[-22.091,0],[0,-8.116],[7.152,-10.86],[13.68,0],[4.435,6.441],[0,22.091]],"v":[[0,40],[-40,0],[-33.43,-21.973],[0,-40],[32.969,-22.657],[40,0]],"c":true}]}],"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[40.25,40.25],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":35,"op":54,"st":39,"bm":0},{"ddd":0,"ind":8,"ty":4,"nm":"Bitt","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[125,124.5,0],"ix":2},"a":{"a":0,"k":[125.25,125.25,0],"ix":1},"s":{"a":0,"k":[112,112,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-125,125],[125,125],[125,-125],[-125,-125]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.102000000898,0.097999999102,0.093999997307,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[125.25,125.25],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":54,"st":-11,"bm":0}],"markers":[]}
`)
        });
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

        
        const handleSelectImage = async (filename) => {
            const imageWidget = node.widgets.find(w => w.name === "image");
            if (imageWidget) {
                imageWidget.value = filename;
                
                const img = new Image();
                img.onload = () => {
                    node.imgs = [img];
                    appObj.graph.setDirtyCanvas(true);
                    if (node.computeSize) {
                        node.size = node.computeSize();
                    }
                };
                img.src = `/view?filename=${encodeURIComponent(filename)}&type=input&subfolder=`;
                
                if (node.onResize) node.onResize(node.size);
                if (appObj && appObj.graph) appObj.graph.setDirtyCanvas(true);
            }
            closeModal();
        };


        const renderItems = (items, onSelect, onBack, currentPath) => {
            let html = '';
            if (currentPath) {
                html += `
                <div class="bitt-toolbar">
                    <button class="bitt-back-btn" id="bitt-back-btn">← Back</button>
                    <div style="font-family:'Clash Display'; font-size:1.2rem; font-weight:600;">${currentPath}</div>
                </div>`;
            }
            html += '<div class="bitt-grid">';
            
            if (!items || items.length === 0) {
                html += '<div style="grid-column: 1 / -1; font-family: Clash Display; text-align: center; margin-top: 48px;">No media found.</div>';
            } else {
                items.forEach(item => {
                    if (item.isDir) {
                        html += `
                            <div class="bitt-grid-item folder" data-action="dir" data-path="${item.key}">
                                📁<br/>${item.name || item.key}
                            </div>
                        `;
                    } else {
                        const name = item.name || item.key || '';
                        const isVideo = name.toLowerCase().match(/\.(mp4|mov|webm|avi)$/);
                        html += `
                            <div class="bitt-grid-item" data-action="file" data-key="${item.key || name}">
                                ${isVideo ? `<video src="${item.url}" muted loop onmouseover="this.play()" onmouseout="this.pause()"></video>` : `<img src="${item.url}" />`}
                                <div class="bitt-grid-item-label">${name.split('/').pop()}</div>
                            </div>
                        `;
                    }
                });
            }
            html += '</div>';
            body.innerHTML = html;
            
            if (currentPath) {
                body.querySelector('#bitt-back-btn').onclick = onBack;
            }

            body.querySelectorAll('.bitt-grid-item').forEach(el => {
                el.onclick = () => {
                    const action = el.getAttribute('data-action');
                    if (action === 'dir') {
                        onSelect({ type: 'dir', path: el.getAttribute('data-path') });
                    } else {
                        onSelect({ type: 'file', key: el.getAttribute('data-key') });
                    }
                };
            });
        };

        const loadLocalGallery = async (prefix = "") => {
            await showLoader(body, 'Loading local gallery...');
            try {
                const items = await window.electronAPI.localListDir(prefix);
                const filteredItems = items.filter(i => i.isDir || i.name.match(/\.(png|jpg|jpeg|mp4|mov|webm)$/i));
                
                renderItems(filteredItems, async (selection) => {
                    if (selection.type === 'dir') {
                        loadLocalGallery(selection.path);
                    } else {
                        await showLoader(body, 'Syncing to Cloud...');
                        const res = await window.electronAPI.copyToInput(selection.key, 'local');
                        if (res.success) handleSelectImage(res.filename);
                        else { alert("Error syncing: " + res.error); loadLocalGallery(prefix); }
                    }
                }, () => {
                    const parts = prefix.split('/').filter(Boolean);
                    parts.pop();
                    loadLocalGallery(parts.length > 0 ? parts.join('/') : "");
                }, prefix || "Root");
            } catch (e) { 
                console.error(e);
                body.innerHTML = '<div class="bitt-loading">Error loading gallery. Check console.</div>'; 
            }
        };

        
        const loadCloudGallery = async (prefix = "") => {
            await showLoader(body, 'Loading cloud gallery...');
            try {
                const user = await window.electronAPI.getCurrentUser();
                if (!user) {
                    body.innerHTML = '<div class="bitt-loading">Please login to access cloud.</div>';
                    return;
                }
                
                // Usar el sistema de archivos (API) real del hub
                const url = `http://127.0.0.1:8188/api/r2-list-dir?prefix=${encodeURIComponent(prefix)}&forceRefresh=false`;
                const res = await fetch(url);
                const data = await res.json();
                
                if (data.error) throw new Error(data.error);

                const items = [];
                // Agregar carpetas
                if (data.folders) {
                    data.folders.forEach(f => {
                        items.push({
                            isDir: true,
                            key: f.path,
                            name: f.name
                        });
                    });
                }
                // Agregar archivos
                if (data.files) {
                    data.files.forEach(f => {
                        if (f.path.match(/\.(png|jpg|jpeg|mp4|mov|webm)$/i)) {
                            items.push({
                                isDir: false,
                                key: f.path,
                                name: f.name || f.path.split('/').pop(),
                                url: `http://127.0.0.1:8188/api/r2-asset?key=${encodeURIComponent(f.path)}`
                            });
                        }
                    });
                }
                
                renderItems(items, async (selection) => {
                    if (selection.type === 'dir') {
                        loadCloudGallery(selection.path);
                    } else {
                        await showLoader(body, 'Downloading & Syncing...');
                        const copyRes = await window.electronAPI.copyToInput(selection.key, 'r2');
                        if (copyRes.success) handleSelectImage(copyRes.filename);
                        else { alert("Error syncing: " + copyRes.error); loadCloudGallery(prefix); }
                    }
                }, () => {
                    const parts = prefix.split('/').filter(Boolean);
                    parts.pop();
                    loadCloudGallery(parts.length > 0 ? parts.join('/') + '/' : "");
                }, prefix || "Root");
                
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
                else if (target === 'gallery') loadLocalGallery("");
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
                        
                        const origOnConfigure = node.onConfigure;
                        node.onConfigure = function() {
                            if (origOnConfigure) origOnConfigure.apply(this, arguments);
                            const imgW = this.widgets.find(w => w.name === "image");
                            if (imgW && imgW.value) {
                                const img = new Image();
                                img.onload = () => {
                                    this.imgs = [img];
                                    if(appObj.graph) appObj.graph.setDirtyCanvas(true);
                                };
                                img.src = `/view?filename=${encodeURIComponent(imgW.value)}&type=input&subfolder=`;
                            }
                        };

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
