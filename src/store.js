import { writable } from "svelte/store";

function songHandler() {
    const { subscribe, set, update } = writable(0);

    return {
        subscribe,
        stopSong: () => console.log("stop song"),
        playSong: () => console.log("play song")
    }
}


function playlistHandler() {
    const loadedPlaylists = [{ name: "default", songs: [] }];
    const { subscribe, set, update } = writable(loadedPlaylists);

    return {
        subscribe,
        updatePlaylistSongs: (playlistName, newSongList) => { console.log(playlistName, newSongList) },
        updatePlaylistName: (oldName, newName) => {}
    };

}

export const songs = songHandler();
export const playlists = playlistHandler();




