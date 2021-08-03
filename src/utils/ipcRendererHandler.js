import { playlist, playlists, OSFileSeparator } from "../store.js";

window.electron.send("toMain", "Rerendered");

window.electron.receive("setOSFileSeparator", (fileSeparator) => {
    OSFileSeparator.set(fileSeparator);
});

window.electron.receive("initializePlaylists", (initializedPlaylists) => {
    if (initializedPlaylists.length > 0) playlist.changePlaylist(initializedPlaylists[0]);
	playlists.initializePlaylists(initializedPlaylists);
});

window.electron.receive("fromMainDroppedFilePaths", ({ _id, playlistReadyDroppedFiles }) => {
    playlists.addPlaylistItems(_id, playlistReadyDroppedFiles);
});

window.electron.receive("newPlaylist", playlist => {
    playlists.createPlaylist(playlist);
});