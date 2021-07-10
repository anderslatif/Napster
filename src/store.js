import { writable } from "svelte/store";
import { playSong, playOrPauseSong, stopSong, updateCurrentPlaylist } from "./howler.js";
import { insert as storageInsert, update as storageUpdate } from "./storage.js";

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
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        initializePlaylist: (newPlaylist) => {
            storageInsert(newPlaylist);
            set([newPlaylist]);
        },
        setPlaylists: (newPlaylist) => {
            set(newPlaylist);
        },
        updatePlaylistSongs: (playlistName, newSongList) => {
            const currentPlaylist = getCurrentPlaylist();
            storageUpdate({ name: playlistName }, { $set: { songs: newSongList } });

            update(playlists => {
                const newPlaylists = playlists.map(playlist => {
                    if (playlist.name === playlistName) {
                        if (playlist.name === currentPlaylist) {
                            updateCurrentPlaylist(newSongList);
                        }
                        return { ...playlist, songs: newSongList };
                    }
                    return playlist;
                });
                return newPlaylists;
            });
        },
        updatePlaylistName: (oldName, newName) => {},
        deleteSongFromPlaylist: (id, playlistName) => {
            const deleteIndex = player.playlist.findIndex((song) => song.id == id);
            // todo test this
            if (deleteIndex != -1) {
                playlist[playlistName].splice(deleteIndex, 1);
                set(playlist);
            }
        }
    };
}



function getCurrentPlaylist() {
    let $song;

    const unsubscribe = song.subscribe(value => {
        $song = value;
    });
    unsubscribe();
    return $song.currentPlaylist;
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
