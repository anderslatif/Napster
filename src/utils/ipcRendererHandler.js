import { playlist, playlists } from "../store.js";

window.electron.send("toMain", "Rerendered"); 

window.electron.receive("initializePlaylists", (initializedPlaylists) => {
    if (initializedPlaylists.length > 0) playlist.changePlaylist(initializedPlaylists[0]);
	playlists.initializePlaylists(initializedPlaylists);
});

window.electron.receive("fromMainFromDroppedFilePaths", (playlistReadyDroppedFiles) => {
    playlist.addPlaylistSongs(playlistReadyDroppedFiles);
});

