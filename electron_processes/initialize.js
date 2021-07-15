const { BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const ipcMainHandler = require("./ipcMainHandler.js");

function createWindow({ title }) {
    // Create the browser window with node integration
    const window = new BrowserWindow({
        title,
        width: 1000,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "preload.js")
            // backgroundThrottling: false
        }
    });

    window.loadFile(path.join(__dirname, '/../public/index.html'));

    // Open the DevTools only if app is in development
    if (process.env.NODE_ENV === "dev") window.webContents.openDevTools()

    return window;
}

async function initializeWindowsWithPlaylists(storage) {
    // load the playlist from the database when the app starts
    const playlists = await storage.find();
    
        playlists.map((playlist) => {

            const windowOptions = {
                title: playlist.name
            };
            const window = createWindow(windowOptions);

            ipcMainHandler.init(window, playlist);

        });

    
}

module.exports = {
    createWindow,
    initializeWindowsWithPlaylists
};
