<script>
    import {remote} from "electron";
    import quit from "../actions/quit";
    import {version} from "../../../package.json";

    export let macButtons;

    function minimize() {
        remote.BrowserWindow.getFocusedWindow().minimize();
    }

</script>

<header class="titlebar {macButtons === true ? "type-mac" : "type-standard"}">
    <svg
        class="wordmark"
        width="20"
        height="20"
        viewBox="0 0 135.46666 135.46667"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs
            id="defs29309" />
        <g
            id="layer1">
            <path
            d="m 43.391657,27.506421 h 37.602097 c 9.066764,0 16.72645,1.891871 23.010296,5.65817 6.26702,3.764712 10.96608,9.016914 14.08038,15.740748 3.1119,6.723833 4.68225,14.418182 4.68225,23.086219 0,8.484077 -1.62558,16.181605 -4.87674,23.067186 -3.25117,6.904656 -8.19755,12.359856 -14.85115,16.384636 -6.653628,4.02479 -14.894394,6.04194 -24.731929,6.04194 H 43.394059 Z m 34.528618,67.111466 c 6.103738,0 10.802799,-2.038708 14.080376,-6.099017 3.279979,-4.078706 4.919968,-9.622696 4.919968,-16.657349 0,-6.52085 -1.462304,-11.719134 -4.382109,-15.610711 -2.919805,-3.894749 -7.342734,-5.857982 -13.254379,-5.857982 h -11.76564 l -2.2e-5,44.212379 z"
            style="fill:#ed4245;fill-opacity:1;stroke-width:0.645811"
            id="path22" />
            <path
            id="path21"
            d="m 54.472627,17.981343 c -9.066763,0 -16.726137,1.891763 -23.009962,5.658052 -6.267016,3.764703 -10.965981,9.017342 -14.08028,15.741157 -3.111898,6.723814 -4.682398,14.417913 -4.682398,23.08593 0,8.484054 1.625535,16.181759 4.876699,23.067326 3.251165,6.904597 8.19769,12.359753 14.851292,16.384532 4.857177,2.93811 10.569911,4.79365 17.122472,5.58829 0.271643,0.0321 0.53954,0.0701 0.813392,0.0987 0.755523,0.0805 1.530737,0.13657 2.308375,0.18912 0.363631,0.0244 0.720971,0.0586 1.0883,0.077 1.054419,0.0528 2.127976,0.0815 3.222038,0.0842 0.06843,1.9e-4 0.133985,0.005 0.202658,0.005 8.484075,0 16.181796,-1.62555 23.067325,-4.8767 6.904619,-3.251159 12.359761,-8.197708 16.384538,-14.851293 4.024764,-6.653576 6.042004,-14.894316 6.042004,-24.731824 v -9.45265 H 93.080186 79.798816 67.518491 V 76.92844 h 9.200411 c -0.83822,1.192513 -1.826847,2.279681 -3.007039,3.232359 -4.078675,3.279969 -9.622752,4.919598 -16.657393,4.919598 l -0.214423,-0.01744 C 51.085941,84.907248 46.613573,82.892892 43.466186,78.993871 40.186208,74.915188 38.546074,69.37164 38.546074,62.337007 c 0,-6.520831 1.462352,-11.719366 4.382157,-15.610933 2.919806,-3.89473 7.342854,-5.858039 13.254499,-5.858039 H 77.195915 V 17.981577 Z"
            style="fill:#ffffff;fill-opacity:1;stroke-width:0.645811" />
        </g>
    </svg>
    <span class="title">GreaterDiscord Installer v{version}</span>
    <div class="window-controls">
        {#if macButtons === true}
            <button tabindex="-1" on:click={quit} id="close">
                <svg width="12" height="12" viewBox="0 0 12 12">
                    <path stroke="#4c0000" fill="none" d="M8.5,3.5 L6,6 L3.5,3.5 L6,6 L3.5,8.5 L6,6 L8.5,8.5 L6,6 L8.5,3.5 Z"></path>
                </svg>
            </button>
            <button tabindex="-1" on:click={minimize} id="minimize">
                <svg width="12" height="12" viewBox="0 0 12 12">
                    <rect fill="#975500" width="6" height="1" x="3" y="5.5" fill-rule="evenodd"></rect>
                </svg>
            </button>
            <button id="maximize" disabled></button>
        {:else}
            <button tabindex="-1" on:click={minimize} id="minimize">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M2 9.75C2 9.33579 2.33579 9 2.75 9H17.25C17.6642 9 18 9.33579 18 9.75C18 10.1642 17.6642 10.5 17.25 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75Z"/>
                </svg>
            </button>
            <button tabindex="-1" on:click={quit} id="close">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M3.52499 3.71761L3.61612 3.61612C4.07173 3.1605 4.79155 3.13013 5.28239 3.52499L5.38388 3.61612L14 12.233L22.6161 3.61612C23.1043 3.12796 23.8957 3.12796 24.3839 3.61612C24.872 4.10427 24.872 4.89573 24.3839 5.38388L15.767 14L24.3839 22.6161C24.8395 23.0717 24.8699 23.7915 24.475 24.2824L24.3839 24.3839C23.9283 24.8395 23.2085 24.8699 22.7176 24.475L22.6161 24.3839L14 15.767L5.38388 24.3839C4.89573 24.872 4.10427 24.872 3.61612 24.3839C3.12796 23.8957 3.12796 23.1043 3.61612 22.6161L12.233 14L3.61612 5.38388C3.1605 4.92827 3.13013 4.20845 3.52499 3.71761L3.61612 3.61612L3.52499 3.71761Z"/>
                </svg>
            </button>
        {/if}
    </div>
</header>

<style>
    .titlebar {
        background-color: var(--bg2);
        color: white;
        height: 28px;
        display: flex;
        align-items: center;
        -webkit-app-region: drag;
    }

    .wordmark {
        width: 15px;
        height: auto;
        margin: 0 8px;
        fill: var(--text-muted);
        opacity: .5;
    }

    .title {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        color: var(--text-muted);
        font-size: 14px;
    }

    .window-controls {
        display: flex;
        align-items: center;
        margin-left: auto;
        -webkit-app-region: no-drag;
    }

    .window-controls button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: none;
    }

    /* Standard Titlebar */

    .type-standard button {
        height: 28px;
        width: 40px;
        transition: 50ms ease;
        background-color: transparent;
        color: var(--text-muted);
    }

    .type-standard button svg {
        width: 12px;
        height: 12px;
        fill: currentColor;
    }

    .type-standard button:hover {
        background-color: var(--bg3);
    }

    .type-standard button:active {
        background-color: var(--bg3-alt);
    }

    .type-standard button#close:hover {
        background-color: #d13d3d;
        color: #fff;
    }

    .type-standard button#close:active {
        background-color: #b12a2a;
        color: #fff;
    }

    /* Mac Titlebar */

    .type-mac {
        justify-content: space-between;
    }

    .type-mac .window-controls {
        order: -1;
        margin: 0 3px;
    }

    .type-mac .window-controls button {
        margin: 0 4px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-size: auto 12px;
        box-shadow: inset 0 0 0 1px rgba(0,0,0,0.12);
    }

    .type-mac .window-controls svg {
        visibility: hidden;
        width: 12px;
        height: 12px;
    }

    .type-mac .window-controls:hover svg {
        visibility: visible;
    }

    .type-mac .window-controls button:not([disabled]):active {
        box-shadow: inset 0 0 0 1px rgba(0,0,0,0.12), inset 0 0 0 12px rgba(0,0,0,0.25);
    }

    .type-mac .window-controls #close {
        margin-left: 6px;
        background-color: #ff5e57;
    }

    .type-mac .window-controls #minimize {
        background-color: #ffbb2e;
    }

    .type-mac .window-controls button[disabled] {
        background-color: var(--bg3-alt);
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.012);
    }
</style>