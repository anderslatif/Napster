const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const ipcMainHandler = require("./ipcMainHandler.js");
const storage = require("./db/storage.js");
let isQuitting = false;

async function createWindow(options) {
    
    if (options.newWindow) {
        const newPlaylist = { name: "Napster", songs: [] };
        const playlist = await storage.insert(newPlaylist);
        options.playlist = playlist;
    }

    // Create the browser window with node integration
    const window = new BrowserWindow({
        title: options?.title || "Napster",
        width: 1000,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "preload.js")
        }
    });

    window.loadFile(path.join(__dirname, '/../public/index.html'));

    ipcMainHandler.init(window, options.playlist);

    window.on("close", (event) => {
        const openWindows = BrowserWindow.getAllWindows();

        if (isQuitting) return;

        if (openWindows.length > 1) {
            ipcMainHandler.removeWindowById(options.playlist._id);
            storage.removeOne({ _id: options.playlist._id });  
        } 
    });

    // Open the DevTools only if app is in development
    if (process.env.NODE_ENV === "dev") window.webContents.openDevTools();

    ipcMainHandler.addWindow({ window, _id: options.playlist._id });

    return window;
}

async function initializeWindowsWithPlaylists() {
    // load the playlist from the database when the app starts
    const playlists = await storage.find();
    
    if (playlists.length === 0) {
        createWindow({ newWindow: true }); 
    } else {

        playlists.map((playlist) => {

            const windowOptions = {
                title: playlist.name,
                playlist 
            };
            createWindow(windowOptions);            
        });

    } 
}

function quit() {
    isQuitting = true;
}

module.exports = {
    createWindow,
    initializeWindowsWithPlaylists,
    quit
};
