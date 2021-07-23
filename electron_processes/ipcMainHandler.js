const { BrowserWindow, ipcMain } = require("electron");
const { playlistHandler } = require("./filerHandler/playlistHandler.js");
const storage = require("./db/storage.js");

let windows = [];

function addWindow(window) {
    windows.push(window);
}

function removeWindowById(id) {
    windows = windows.filter(window => window._id !== id);
}


function init(window, playlist) {
    ipcMain.on("toMain", (event, args) => {
        window.webContents.send("fromMain", playlist);
        window.webContents.send("initializePlaylist", playlist);
    });

    ipcMain.on("toMainDroppedFilePaths", async (event, { _id, filePaths }) => {
        const playlist = await playlistHandler(filePaths);

        const currentPlaylist = await storage.findOne({ _id }, { $concatArrays: { songs: playlist } });
        storage.update({ _id }, { $set: { songs:  currentPlaylist.songs.concat(playlist) } });

        const foundWindow = windows.find(window => window._id === _id);
        foundWindow.window.webContents.send("fromMainPlaylistFromDroppedFilePaths", playlist);
    });

    ipcMain.on("toMainSetSongList", (event, { _id, newSongList }) => {
        storage.update({ _id }, { $set: { songs: newSongList } });
    });

    ipcMain.on("toMainChangePlaylistName", (event, { _id, name }) => {
        const foundWindow = windows.find(window => window._id === _id);
        foundWindow.window.title = name;
        storage.update({ _id }, { $set: { name } });
    });

}

module.exports = {
    init,
    addWindow,
    removeWindowById
};
