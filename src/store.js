import { writable } from "svelte/store";

function songHandler() {
    const songState = {
        currentPlaylist: "default",
        currentPlayingIndex: 0
    };
    const { subscribe, set, update } = writable(songState);

    return {
        subscribe,
        stopSong: () => console.log("stop song"),
        playSong: (songId, playlistName) => console.log("play song", songId, playlistName)
    }
}
// const foundIndex = songs.findIndex(song => song.id === Number(event.target.id));
// console.log(foundIndex);
// currentlyPlayingIndex = foundIndex;
// playSong(songs[foundIndex]);

function playlistHandler() {
    // todo remove fakeSongs .. used for debugging drag and drop
    const fakeSongs = [{ title: 1 }, { title: 2 }, { title: 3 }]
    const loadedPlaylists = [{ name: "default", songs: [...fakeSongs] }];
    const { subscribe, set, update } = writable(loadedPlaylists);

    return {
        subscribe,
        updatePlaylistSongs: (playlistName, newSongList) => { console.log(playlistName, newSongList) },
        updatePlaylistName: (oldName, newName) => {}
    };

}

export const songs = songHandler();
export const playlists = playlistHandler();




