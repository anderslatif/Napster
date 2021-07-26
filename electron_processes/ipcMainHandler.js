const { BrowserWindow, ipcMain } = require("electron");
const { playlistHandler } = require("./filerHandler/playlistHandler.js");
const storage = require("./db/storage.js");

function init(window, playlists) {
    ipcMain.on("toMain", (event, args) => {
        // assignment do I need the line below?
        window.webContents.send("fromMain", playlists);
        window.webContents.send("initializePlaylists", playlists);
    });

    ipcMain.on("toMainDroppedFilePaths", async (event, { _id, filePaths }) => {
        const playlist = await playlistHandler(filePaths);

        const currentPlaylist = await storage.findOne({ _id });
        storage.update({ _id }, { $set: { items:  currentPlaylist.items.concat(playlist) } });

        window.webContents.send("fromMainDroppedFilePaths", { _id, playlistReadyDroppedFiles: playlist });
    });

    ipcMain.on("toMainSetSongList", (event, { _id, newItemList }) => {
        storage.update({ _id }, { $set: { items: newItemList } });
    });

    ipcMain.on("toMainChangePlaylistName", (event, { _id, name }) => {
        window.window.title = name;
        storage.update({ _id }, { $set: { name } });
    });

}

module.exports = {
    init,
};
