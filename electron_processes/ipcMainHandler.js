const { BrowserWindow, ipcMain, screen, shell } = require("electron");
const { playlistHandler } = require("./fileHandler/playlistHandler.js");
const storage = require("./db/storage.js");
const path = require("path");
const os = require("os");

let albumCoverWindow;
let initializedWindow;

const deletedPlaylists = [];

function init(window, playlists) {
    initializedWindow = window;

    ipcMain.on("toMain", async () => {

        const fileSeparator = os.platform() === "win32" ? "\\" : "/"
        window.webContents.send("setOSFileSeparator", fileSeparator);

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

    ipcMain.on("toMainCreatePlaylist", async (event, { order }) => {
        const newPlaylist = { name: "New Playlist", items: [], order };
        const playlist = await storage.insert(newPlaylist);

        window.webContents.send("newPlaylist", playlist);
    });

    ipcMain.on("toMainDeletePlaylist", (event, { playlist }) => {
        deletedPlaylists.push(playlist);
        storage.removeOne({ _id: playlist._id });
    });

    ipcMain.on("toMainChangePlaylistName", (event, { _id, name }) => {
        storage.update({ _id }, { $set: { name } });
    });

    ipcMain.on("enlargeAlbumCover", (event, url) => {
        if (!albumCoverWindow) {
            const { height } = screen.getPrimaryDisplay().workAreaSize;

            albumCoverWindow = new BrowserWindow({
                height,
                width: height,
                frame: false,
                webPreferences: {
                    contextIsolation: true,
                    enableRemoteModule: false,
                    preload: path.join(__dirname, "preload.js")
                }
            });
            albumCoverWindow.loadFile(path.join(__dirname, '/../public/albumcover.html'));
            albumCoverWindow.webContents.send("sendAlbumCover", url);
        }
    });

    ipcMain.on("closeAlbumCoverWindow", (event) => {
        albumCoverWindow.close();
        albumCoverWindow = undefined;
    });

    ipcMain.on("openFiles", (event, paths) => {
        paths.forEach(path => shell.showItemInFolder(path));
    });

    ipcMain.on("rearrangePlaylistsOrder", (event, newOrderedPlaylist) => {
        newOrderedPlaylist.map(playlist => {
            storage.update({ _id: playlist._id }, { $set: {order: playlist.order } });
        });
    });

    ipcMain.on("undoDeletePlaylist", () => {
        handleUndoDeletePlaylist(window);
    });

    ipcMain.on("debugWindowOn", () => {
        window.webContents.openDevTools();
    });

    ipcMain.on("quit", () => {
        const { quitApplication } = require("../main.js");
        quitApplication();
    });

 }

async function handlePathsToPlaylist(window, { _id, filePaths }) {
    const playlist = await playlistHandler(filePaths);

    const currentPlaylist = await storage.findOne({ _id });
    storage.update({ _id }, { $set: { items: currentPlaylist.items.concat(playlist) } });

    window.webContents.send("fromMainDroppedFilePaths", { _id, playlistReadyDroppedFiles: playlist });
}

async function handleNewPaths(path) {
    const playlist = await storage.findOne({});
    handlePathsToPlaylist(initializedWindow, { _id: playlist._id, filePaths: [path] });
}

async function handleUndoDeletePlaylist(window) {
    const playlistToReAdd = deletedPlaylists.pop();
    if (playlistToReAdd) {
        delete playlistToReAdd._id;
        const newPlaylist = await storage.insert(playlistToReAdd);

        window.webContents.send("sendUndoneDeletedPlaylist", newPlaylist);
    }
}

module.exports = {
    init,
    handleNewPaths,
    handleUndoDeletePlaylist
};
