const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["toMain", "toMainMetadata"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain", "initializePlaylist", "fromMainMetadata"];
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
