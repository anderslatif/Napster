const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const ipcMainHandler = require("./ipcMainHandler.js");
const storage = require("./db/storage.js");

async function createWindow(playlists) {
    
    // Create the browser window with node integration
    const window = new BrowserWindow({
        title: "Napster",
        width: 1000,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "preload.js")
        }
    });

    window.loadFile(path.join(__dirname, '/../public/index.html'));

    ipcMainHandler.init(window, playlists);


    // Open the DevTools only if app is in development
    if (process.env.NODE_ENV === "dev") window.webContents.openDevTools();

    return window;
}

async function initializeWindowsWithPlaylists(files) {
    console.log("FILES in initialize", files);
    // load the playlist from the database when the app starts
    let playlists = await storage.find();
    
    if (playlists.length === 0) {
        const newPlaylist = { name: "Napster", items: [] };
        playlists = await storage.insert(newPlaylist);
        
    }

    createWindow(playlists);            
}

module.exports = {
    createWindow,
    initializeWindowsWithPlaylists,
};
