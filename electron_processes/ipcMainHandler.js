const { ipcMain } = require("electron");
const { getMetaData } = require("./metadata.js");

// electron.remote.getCurrentWindow()

function init(window, playlist) {
    ipcMain.on("toMain", (event, args) => {
        window.webContents.send("initializePlaylist", playlist);
    });

    ipcMain.on("toMainMetadata", async (event, path) => {
        const metadata = await getMetaData(path);
        window.webContents.send("fromMainMetadata", metadata);
    });
}

module.exports = {
    init
};
