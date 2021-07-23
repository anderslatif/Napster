const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
    "electron", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["toMain", "toMainDroppedFilePaths", "toMainSetSongList", "toMainChangePlaylistName"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain", "initializePlaylist", "fromMainPlaylistFromDroppedFilePaths"];
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
