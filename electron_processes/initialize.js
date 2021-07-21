const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const ipcMainHandler = require("./ipcMainHandler.js");

function createWindow(options) {
    // Create the browser window with node integration
    const window = new BrowserWindow({
        title: options?.title,
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
    if (process.env.NODE_ENV === "dev") window.webContents.openDevTools();

    return window;
}

async function initializeWindowsWithPlaylists(storage) {
    // load the playlist from the database when the app starts
    const playlists = await storage.find();
    
    if (playlists.length === 0) {

        storage.insert({ name: "Napster", songs: [] });
        createWindow({ title: "Napster" }); 

    } else {

        playlists.map((playlist) => {

            const windowOptions = {
                title: playlist.name 
            };
            const window = createWindow(windowOptions);
    
            ipcMainHandler.init(window, playlist);
            
        });

    } 
}

module.exports = {
    createWindow,
    initializeWindowsWithPlaylists
};
