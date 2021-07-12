import { writable } from "svelte/store";
import { playSong, playOrPauseSong, stopSong, updateCurrentPlaylist } from "./howler.js";
import { insert as storageInsert, update as storageUpdate } from "./storage.js";

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
    const { subscribe, set, update } = writable({ songs: [] });

    return {
        subscribe,
        initializePlaylist: async () => {
            const newPlaylist = { name: "default", songs: [] };
            set(newPlaylist);
            const insertedPlaylist = await storageInsert(newPlaylist);
            thisWindowsPlaylistId = insertedPlaylist._id;
        },
        setPlaylists: (newPlaylist) => {
            thisWindowsPlaylistId = newPlaylist._id;
            set(newPlaylist);
        },
        updatePlaylistSongs: (newSongList) => {
            storageUpdate({ _id: thisWindowsPlaylistId }, { $set: { songs: newSongList } });

            update(playlist => {
                updateCurrentPlaylist(newSongList);
                return { ...playlist, songs: newSongList };
            });
        },
        updatePlaylistName: (oldName, newName) => {},
        deletePlaylistSongs: (ids) => {
            

            update(playlist => {
                const newSongList = playlist.songs.filter(song => !ids.includes(song.id));
                storageUpdate({ _id: thisWindowsPlaylistId }, { $set: { songs: newSongList } });

                return { ...playlist, songs: newSongList }; 
            })
        }
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
export const playlist = playlistHandler();
