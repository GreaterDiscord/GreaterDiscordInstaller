<script>
    import {tooltip} from "./tooltip";
    
    const githubUrl = "http://github.com/foxypiratecove37350/GreaterDiscord";
    const donateUrl = "https://github.com/sponsors/foxypiratecove37350/";
</script>

<div class="social-links">
    <a use:tooltip={{text: "GitHub"}} aria-label="GitHub" class="social" id="github" target="_blank" href={githubUrl}>
        <svg tabindex="-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
            <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
    </a>
    <a use:tooltip={{text: "Donate"}} aria-label="Donate" class="social" id="donate" target="_blank" href={donateUrl}>
        <svg tabindex="-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12.8199 5.57912L11.9992 6.40163L11.1759 5.57838C9.07688 3.47931 5.67361 3.47931 3.57455 5.57838C1.47548 7.67744 1.47548 11.0807 3.57455 13.1798L11.4699 21.0751C11.7628 21.368 12.2377 21.368 12.5306 21.0751L20.432 13.1783C22.5264 11.0723 22.53 7.67857 20.4306 5.57912C18.3277 3.47623 14.9228 3.47623 12.8199 5.57912Z"/>
        </svg>
    </a>
</div>

<style>
    .social-links {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: -5px;
        margin-right: -5px;
    }

    .social {
        width: 28px;
        height: 28px;
        margin-top: 5px;
        margin-right: 5px;
        background-color: var(--bg3-alt);
        border-radius: 50%;
        color: var(--text-muted);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 150ms ease;
        outline: none;
    }

    .social:hover {
        color: var(--text-normal);
    }

    .social:active {
        background-color: var(--bg4);
    }

    .social svg {
        width: 14px;
        height: auto;
        fill: currentColor;
    }
</style>
