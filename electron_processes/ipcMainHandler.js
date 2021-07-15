const { ipcMain } = require("electron");


// electron.remote.getCurrentWindow()

function init(window, playlist) {
    ipcMain.on("toMain", (event, args) => {
        window.webContents.send("fromMain", "test");
    });

    setInterval(() => {
        window.webContents.send("initializePlaylist", playlist);
    }, 2000);
    
}

module.exports = {
    init
};
