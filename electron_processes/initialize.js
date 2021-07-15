const { BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

function createWindow({ title }) {
    // Create the browser window with node integration
    const window = new BrowserWindow({
        title,
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            // enableRemoteModule: true,
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

            // send to the renderer process so that it can call the method below:
            // playlist.initializePlaylist();

                // https://stackoverflow.com/questions/43486438/electron-ipc-sending-data-between-windows#43486549
                // todo change to setTimeout
            setInterval(() => {
                window.webContents.send("initializePlaylist", playlist);
            }, 2000);
        });
    
}

module.exports = {
    createWindow,
    initializeWindowsWithPlaylists
};
