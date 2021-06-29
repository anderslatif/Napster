import { writable } from "svelte/store";
import { playSong, playOrPauseSong, stopSong } from "./howler.js";

function songHandler() {
    const songState = {
        currentPlaylist: "default",
        isPlaying: false,
        sound: undefined,
        durationString: undefined
    };
    const { subscribe, set, update } = writable(songState);

    return {
        subscribe,
        playSong: (song, playlistName = "default") => {

            const playlist = getPlaylistByName(playlistName);
            const playlistIndex = playlist.songs.findIndex(playlistSong => playlistSong.id === song?.id);
            const nextSong = song || playlist.songs[0];
                    
            const sound = playSong(nextSong, playlist, playlistIndex);

            update(songState => { 
                return { 
                    ...songState, 
                    isPlaying: true, 
                    sound,
                    durationString: nextSong.metadata.common.durationString 
                }; 
            });
        },
        playOrPauseSong: (playlistName = "default") => {

            const playlist = getPlaylistByName(playlistName);
            const song = playlist.songs[0];


            const isPlaying = playOrPauseSong(song, playlist);

            update(songState => { return { ...songState, isPlaying } })
        },
        stopSong: stopSong()
    }
}
// const foundIndex = songs.findIndex(song => song.id === Number(event.target.id));
// console.log(foundIndex);
// currentlyPlayingIndex = foundIndex;
// playSong(songs[foundIndex]);

function playlistHandler() {
    // todo remove fakeSongs .. used for debugging drag and drop
    const loadedPlaylists = [{ name: "default", songs: [] }];
    const { subscribe, set, update } = writable(loadedPlaylists);

    return {
        subscribe,
        updatePlaylistSongs: (playlistName, newSongList) => {
            update(playlists => {
                
                return playlists.map(playlist => {
                    if (playlist.name === playlistName) {
                        return { ...playlist, songs: newSongList };
                    }
                    return playlist;
                });
            });
        },
        updatePlaylistName: (oldName, newName) => {}
    };
}

export function getPlaylistByName(playlistName) {
    let $playlists;

    const unsubscribe = playlists.subscribe(value => {
        $playlists = value;
    });
    unsubscribe();
    return $playlists.find(playlist => playlist.name === playlistName);
}

export const song = songHandler();
export const playlists = playlistHandler();





