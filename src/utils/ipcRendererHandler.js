import { playlist } from "../store.js";

window.api.send("toMain", "Rerendered"); 

window.api.receive("initializePlaylist", (initializedPlaylist) => {
	playlist.initializePlaylist(initializedPlaylist);
});


export function getMetaData(path) {
    return new Promise((resolve, reject) => {
        window.api.send("toMainMetadata", path);

        const metadataCallback = (metadata) => {
            resolve(metadata);
            window.api.ipcRendererRemoveListener("fromMainMetadata", metadataCallback)
        };

        window.api.receive("fromMainMetadata", metadataCallback);
    });

}

