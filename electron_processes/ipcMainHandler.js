const { BrowserWindow, ipcMain } = require("electron");
const { playlistHandler } = require("./filerHandler/playlistHandler.js");
const storage = require("./db/storage.js");

function init(window, playlists) {
    ipcMain.on("toMain", async () => {

        if (process.env.NODE_ENV === "dev") {
            // to main is called when the the app is (re)rendered
            // rerendering happens in development 
            // since the playlist is loaded only once on app start
            // I overwrite the playlist in development every time it is rerendered
            // so that it reflects the newest state of the database and not what it was when the app was started
            playlists = await storage.find();
        }
        window.webContents.send("initializePlaylists", playlists);
    });

    ipcMain.on("toMainDroppedFilePaths", async (event, { _id, filePaths }) => {
        handlePathsToPlaylist(window, { _id, filePaths })
    });

    ipcMain.on("toMainSetSongList", (event, { _id, newItemList }) => {
        storage.update({ _id }, { $set: { items: newItemList } });
    });

    ipcMain.on("toMainCreatePlaylist", async (event, args) => {
        const newPlaylist = { name: "New Playlist", items: [] };
        const playlist = await storage.insert(newPlaylist);

        window.webContents.send("newPlaylist", playlist);
    });

    ipcMain.on("toMainDeletePlaylist", (event, { _id }) => {
        storage.removeOne({ _id });
    });

    ipcMain.on("toMainChangePlaylistName", (event, { _id, name }) => {
        storage.update({ _id }, { $set: { name } });
    });
 }

async function handlePathsToPlaylist(window, { _id, filePaths }) {
    const playlist = await playlistHandler(filePaths);

    const currentPlaylist = await storage.findOne({ _id });
    storage.update({ _id }, { $set: { items: currentPlaylist.items.concat(playlist) } });

    window.webContents.send("fromMainDroppedFilePaths", { _id, playlistReadyDroppedFiles: playlist });
}

async function handleNewPaths(path) {
    console.log("path ", path);
    const playlist = await storage.findOne({});
    console.log("playlist ", playlist);
    handlePathsToPlaylist({ _id: playlist._id, filePaths: [path] });
}

module.exports = {
    init,
    handleNewPaths
};
