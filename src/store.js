import { writable } from "svelte/store";
import { updatePlaylistSongs, playSong, playOrPauseSong, stopSong, updateCurrentPlaylist } from "./howler.js";

let thisWindowsPlaylistId;

function songHandler() {
    const songState = {
        currentPlaylist: "default",
        sound: undefined,
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
                    sound,
                }; 
            });
        },
        playOrPauseSong: (playlistName = "default") => {

            const playlist = getPlaylistByName(playlistName);
            const song = playlist.songs[0];

            playOrPauseSong(song, playlist);

            update(songState => { return { ...songState } })
        },
        stopSong: stopSong()
    }
}

function playlistHandler() {
    const { subscribe, set, update } = writable({ name: "", songs: [] });

    return {
        subscribe,
        initializePlaylist: (newPlaylist) => {

            updatePlaylistSongs(newPlaylist.songs);
            thisWindowsPlaylistId = newPlaylist._id;
            set(newPlaylist);
        },
        updatePlaylistSongs: (newSongList) => {
            // assignment storageUpdate({ _id: thisWindowsPlaylistId }, { $set: { songs: newSongList } });

            update(playlist => {
                updateCurrentPlaylist(newSongList);
                return { ...playlist, songs: newSongList };
            });
        },
        addPlaylistSongs: (newSongList) => {
            update(playlist => {
                return { ...playlist, songs: playlist.songs.concat(newSongList) };
            });
        },
        updatePlaylistName: (oldName, newName) => {},
        deletePlaylistSongs: (ids) => {
            
            update(playlist => {
                const newSongList = playlist.songs.filter(song => !ids.includes(song.id));
                // assignment storageUpdate({ _id: thisWindowsPlaylistId }, { $set: { songs: newSongList } });

                return { ...playlist, songs: newSongList }; 
            });
        }
    };
}



export function getPlaylistByName(playlistName) {
    let $playlist;

    const unsubscribe = playlist.subscribe(value => {
        $playlist = value;
    });
    unsubscribe();
    return $playlist;
}


export const song = songHandler();
export const playlist = playlistHandler();
