import {progress, status} from "../stores/installation";
import {remote, shell} from "electron";
import * as originalFs from "original-fs";
import * as fsExtra from "fs-extra";
import {promises as fs} from "fs";
import path from "path";
import phin from "phin";

import {log, lognewline} from "./utils/log";
import succeed from "./utils/succeed";
import fail from "./utils/fail";
import exists from "./utils/exists";
import reset from "./utils/reset";
import killProcesses from "./utils/kill";
import {showRestartNotice} from "./utils/notices";
import doSanityCheck from "./utils/sanity";

const MAKE_DIR_PROGRESS = 30;
const DOWNLOAD_PACKAGE_PROGRESS = 45;
const COPY_BD_DATA_PROGRESS = 65;
const INJECT_SHIM_PROGRESS = 90;
const RESTART_DISCORD_PROGRESS = 100;

const RELEASE_API = "https://api.github.com/repos/foxypiratecove37350/GreaterDiscord/releases";

const gdFolder = path.join(remote.app.getPath("appData"), "GreaterDiscord");
const bdFolder = path.join(remote.app.getPath("appData"), "BetterDiscord"); // Retro-compatibility with BetterDiscord
const gdDataFolder = path.join(gdFolder, "data");
const gdPluginsFolder = path.join(gdFolder, "plugins");
const gdThemesFolder = path.join(gdFolder, "themes");

const PLUGINS_LIST = [
    {
        name: "LaTeX Renderer",
        author: "quantumsoul",
        id: 1048
    },
    {
        name: "SplitLargeMessages",
        author: "DevilBro",
        id: 98
    },
    {
        name: "ReadAllNotificationsButton",
        author: "DevilBro",
        id: 94
    }
];


async function makeDirectories(...folders) {
    const progressPerLoop = (MAKE_DIR_PROGRESS - progress.value) / folders.length;
    for (const folder of folders) {
        if (await exists(folder)) {
            log(`✅ Directory exists: ${folder}`);
            progress.set(progress.value + progressPerLoop);
            continue;
        }
        try {
            await fs.mkdir(folder);
            progress.set(progress.value + progressPerLoop);
            log(`✅ Directory created: ${folder}`);
        }
        catch (err) {
            log(`❌ Failed to create directory: ${folder}`);
            log(`❌ ${err.message}`);
            return err;
        }
    }
}

const getJSON = phin.defaults({method: "GET", parse: "json", followRedirects: true, headers: {"User-Agent": "GreaterDiscord Installer"}});
const downloadFile = phin.defaults({method: "GET", followRedirects: true, headers: {"User-Agent": "GreaterDiscord Installer", "Accept": "application/octet-stream"}});
async function downloadAsar() {
    let assetUrl;
    let gdVersion;
    try {
        const response = await getJSON(RELEASE_API);
        const releases = response.body;
        const asset = releases && releases.length && releases[0].assets && releases[0].assets.find(a => a.name.toLowerCase() === "greaterdiscord.asar");
        assetUrl = asset && asset.url;
        gdVersion = asset && releases[0].tag_name;
        if (!assetUrl) {
            let errMessage = "Could not get the asset url";
            if (!asset) errMessage = "Could not get asset object";
            if (!releases) errMessage = "Could not get response body";
            if (!response) errMessage = "Could not get any response";
            throw new Error(errMessage);
        }
    }
    catch (error) {
        log(`❌ Failed to get asset url from ${RELEASE_API}`);
        log(`❌ ${error.message}`);
        throw error;
    }
    try {
        const response = await downloadFile(assetUrl);
        if (response.statusCode >= 200 && response.statusCode < 300) {
            log(`✅ Downloaded GreaterDiscord version ${gdVersion} from GitHub`);
            return response.body;
        }
        throw new Error(`Status code did not indicate success: ${response.statusCode}`);
    }
    catch (error) {
        log(`❌ Failed to download package from ${assetUrl}`);
        log(`❌ ${error.message}`);
        throw error;
    }
}

const asarPath = path.join(gdDataFolder, "greaterdiscord.asar");
async function installAsar(fileContent) {
    try {
        await originalFs.promises.writeFile(asarPath, fileContent);
    }
    catch (error) {
        log(`❌ Failed to write package to disk: ${asarPath}`);
        log(`❌ ${error.message}`);
        throw error;
    }
}

async function downloadAndInstallAsar() {
    try {
        const fileContent = await downloadAsar();
        await installAsar(fileContent);
    } 
    catch (error) {
        return error;
    }
}

async function copyBdData() {
    try {
        fsExtra.copy(bdFolder, gdFolder, {recursive: true});
        fsExtra.remove(path.join(gdFolder, "data/betterdiscord.asar"));
        fsExtra.remove(bdFolder, {recursive: true, force: true});
    }
    catch (error) {
        log(`❌ Failed to copy BetterDiscord data`);
        log(`❌ ${error.message}`);
        return error;
    }
}

async function installDefaultPlugins() {
    try {
        for (const plugin of PLUGINS_LIST) {
            const response = await downloadFile(`https://betterdiscord.app/gh-redirect?id=${plugin.id}`);
            if (response.statusCode >= 200 && response.statusCode < 300) {
                await originalFs.promises.writeFile(path.join(gdFolder, `plugins/${plugin.name}.plugin.js`), response.body);
                log(`✅ Downloaded plugin ${plugin.name}`);
            }
            else {
                throw new Error(`Status code did not indicate success for ${plugin.name} plugin: ${response.statusCode}`);
            }
        }
    }
    catch (error) {
        log(`❌ Failed to install defaut plugins`);
        log(`❌ ${error.message}`);
        return error;
    }
}

async function injectShims(paths) {
    const progressPerLoop = (INJECT_SHIM_PROGRESS - progress.value) / paths.length;
    for (const discordPath of paths) {
        log("Injecting into: " + discordPath);
        try {
            await fs.writeFile(path.join(discordPath, "index.js"), `require("${asarPath.replace(/\\/g, "\\\\").replace(/"/g, "\\\"")}");\nmodule.exports = require("./core.asar");`);
            log("✅ Injection successful");
            progress.set(progress.value + progressPerLoop);
        }
        catch (err) {
            log(`❌ Could not inject shims to ${discordPath}`);
            log(`❌ ${err.message}`);
            return err;
        }
    }
}


export default async function(config) {
    await reset();
    const sane = doSanityCheck(config);
    if (!sane) return fail();


    const channels = Object.keys(config);
    const paths = Object.values(config);


    lognewline("Creating required directories...");
    const makeDirErr = await makeDirectories(gdFolder, gdDataFolder, gdThemesFolder, gdPluginsFolder);
    if (makeDirErr) return fail();
    log("✅ Directories created");
    progress.set(MAKE_DIR_PROGRESS);
    

    lognewline("Downloading asar file");
    const downloadErr = await downloadAndInstallAsar();
    if (downloadErr) return fail();
    log("✅ Package downloaded");
    progress.set(DOWNLOAD_PACKAGE_PROGRESS);


    if (exists(bdFolder)) {
        const copyBdDataConfirm = await remote.dialog.showMessageBox(remote.BrowserWindow.getFocusedWindow(), {
            type: "question",
            title: "Copy BetterDiscord data?",
            message: "Do you want to move your installed plugins/themes and your settings from BetterDiscord to GreaterDiscord?",
            noLink: true,
            cancelId: 1,
            buttons: ["Yes", "No"]
        });

        if (copyBdDataConfirm.response === 0) {
            lognewline("Copying BetterDiscord data");
            const retrocompatErr = await copyBdData();
            if (retrocompatErr) return fail();
            log("✅ Data copied");
            progress.set(COPY_BD_DATA_PROGRESS);
        }
    }


    const installDefaultPluginsConfirm = await remote.dialog.showMessageBox(remote.BrowserWindow.getFocusedWindow(), {
        type: "question",
        title: "Install default plugins?",
        message: `Do you want to the default plugins: ${PLUGINS_LIST.map(elem => `\n- ${elem.name} by ${elem.author}`).join("")}`,
        noLink: true,
        cancelId: 1,
        buttons: ["Yes", "No"]
    });

    if (installDefaultPluginsConfirm.response === 0) {
        lognewline("Installing default plugins");
        const defaultPluginsInstallationErr = await installDefaultPlugins();
        if (defaultPluginsInstallationErr) return fail();
        log("✅ Plugins installed");
        progress.set(COPY_BD_DATA_PROGRESS);
    }


    lognewline("Injecting shims...");
    const injectErr = await injectShims(paths);
    if (injectErr) return fail();
    log("✅ Shims injected");
    progress.set(INJECT_SHIM_PROGRESS);


    lognewline("Restarting Discord...");
    const killErr = await killProcesses(channels, (RESTART_DISCORD_PROGRESS - progress.value) / channels.length);
    if (killErr) showRestartNotice(); // No need to bail out and show failed
    else log("✅ Discord restarted");
    progress.set(RESTART_DISCORD_PROGRESS);


    succeed();
};
