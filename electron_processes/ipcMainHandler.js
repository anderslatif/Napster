const { BrowserWindow, ipcMain } = require("electron");
const { playlistHandler } = require("./filerHandler/playlistHandler.js");
const storage = require("./db/storage.js");

function init(window, playlist) {
    ipcMain.on("toMain", (event, args) => {
        window.webContents.send("fromMain", playlist);
        window.webContents.send("initializePlaylist", playlist);
    });

    ipcMain.on("toMainDroppedFilePaths", async (event, { _id, filePaths }) => {
        const playlist = await playlistHandler(filePaths);

        const currentPlaylist = await storage.findOne({ _id }, { $concatArrays: { songs: playlist } });
        storage.update({ _id }, { $set: { songs:  currentPlaylist.songs.concat(playlist) } });

        window.webContents.send("fromMainPlaylistFromDroppedFilePaths", playlist);
    });

    ipcMain.on("toMainSetSongList", (event, { _id, newSongList }) => {
        storage.update({ _id }, { $set: { songs: newSongList } });
    });
}

module.exports = {
    init
};
