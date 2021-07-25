import { writable } from "svelte/store";
import Playlist from "./playlist/Playlist.js";

let thisWindowsPlaylistId;

function playlistHandler() {
    const { subscribe, set, update } = writable(Playlist);

    return {
        subscribe,
        setItems: (items) => {
            update(playlist => playlist.setItems(items));
        },
        playItem: (item) => {
            update(playlist => {
                playlist.playItem(item);
                return playlist;
            });

        },
        playNext: (item) => {
            update(playlist => {
                const newCurrentIndex = playlist.playNext();
                // todo test update the current index below 
                playlist.currentIndex = newCurrentIndex;
                return playlist;
            });
        },
        changePlaylist: (newPlaylist) => {
            update(playlist => playlist.changePlaylist(newPlaylist));
        }
    }
}

function playlistsHandler() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
         initializePlaylists: (newPlaylist) => {

            // updatePlaylistSongs(newPlaylist.songs);
            thisWindowsPlaylistId = newPlaylist._id;
            set(newPlaylist);
        },
        updatePlaylistSongs: (newSongList) => {
            update(playlist => {
                updateCurrentPlaylist(newSongList);
                window.electron.send("toMainSetSongList", { _id: playlist._id, newSongList }); 
                
                return { ...playlist, songs: newSongList };
            });
        },
        addPlaylistSongs: (newSongList) => {
            update(playlist => {
                return { ...playlist, songs: playlist.songs.concat(newSongList) };
            });
        },
        updatePlaylistName: (newName) => {
            update(playlist => {
                window.electron.send("toMainChangePlaylistName", { _id: playlist._id, name: newName });
                return { ...playlist, name: newName};
            })
        },
        deletePlaylistSongs: (ids) => {
            
            update(playlist => {
                const newSongList = playlist.songs.filter(song => !ids.includes(song.id));
                window.electron.send("toMainSetSongList", { _id: playlist._id, newSongList }); 

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


export const playlist = playlistHandler();
export const playlists = playlistsHandler();
