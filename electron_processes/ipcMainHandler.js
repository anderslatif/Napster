const { ipcMain } = require("electron");
const { playlistHandler } = require("./filerHandler/playlistHandler.js");

// electron.remote.getCurrentWindow()

function init(window, playlist) {
    ipcMain.on("toMain", (event, args) => {
        window.webContents.send("fromMain", playlist);
        window.webContents.send("initializePlaylist", playlist);
    });

    ipcMain.on("toMainDroppedFilePaths", async (event, filePaths) => {
        const playlist = await playlistHandler(filePaths);
        window.webContents.send("fromMainPlaylistFromDroppedFilePaths", playlist);
    });
}

module.exports = {
    init
};
