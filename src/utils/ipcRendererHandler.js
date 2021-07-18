import { playlist } from "../store.js";

window.electron.send("toMain", "Rerendered"); 

window.electron.receive("initializePlaylist", (initializedPlaylist) => {
	playlist.initializePlaylist(initializedPlaylist);
});

window.electron.receive("fromMainPlaylistFromDroppedFilePaths", (playlistReadyDroppedFiles) => {
    playlist.addPlaylistSongs(playlistReadyDroppedFiles);
});



/* export function getMetaData(path) {
    return new Promise((resolve, reject) => {
        window.api.send("toMainMetadata", path);

        const metadataCallback = (metadata) => {
            resolve(metadata);
            window.api.ipcRendererRemoveListener("fromMainMetadata", metadataCallback)
        };

        window.api.receive("fromMainMetadata", metadataCallback);
    });
}
 */
