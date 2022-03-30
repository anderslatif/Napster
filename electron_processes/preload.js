const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
    "electron", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["toMain",
                "toMainDroppedFilePaths", "toMainSetSongList", 
                "toMainChangePlaylistName", "toMainCreatePlaylist", "toMainDeletePlaylist",
                "enlargeAlbumCover", "closeAlbumCoverWindow", "openFiles", 
                "rearrangePlaylistsOrder", "undoDeletePlaylist",
                "debugWindowOn", "quit", "toMainPlayNext"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain", "setOSFileSeparator", 
                "initializePlaylists", "fromMainDroppedFilePaths", 
                "newPlaylist", "sendAlbumCover", "sendUndoneDeletedPlaylist", "fromMainplayNext"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }, 
        ipcRendererRemoveListener: (channel, listener) => {
            ipcRenderer.removeListener(channel, listener);
        }
    }
);
