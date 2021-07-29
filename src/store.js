import { writable } from "svelte/store";
import Playlist from "./playlist/Playlist.js";

let currentPlaylistId;

function playlistHandler() {
    const { subscribe, set, update } = writable(Playlist);

    return {
        subscribe,
        setItems: (items) => {
            update(Playlist => Playlist.setItems(items));
        },
        playItem: (item) => {
            update(Playlist => Playlist.playItem(item));
        },
        playNext: () => {
            update(Playlist => Playlist.playNext());
        },
        stop: () => {
            update(Playlist => {
                Playlist.currentIsAudio = true;
                return Playlist;
            });
        },
        changePlaylist: (newPlaylist) => {
            currentPlaylistId = newPlaylist._id;
            update(Playlist => Playlist.changePlaylist(newPlaylist));
        }
    }
}

function playlistsHandler() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
         initializePlaylists: (playlists) => {
            set(playlists);
        },
        addPlaylistItems: (playlistId, newItems) => {
            update(playlists => {
                return playlists.map(playlist => {
                    if (playlist._id === playlistId) {

                        const updatedItems = playlist.items.concat(newItems);
                        if (currentPlaylistId === playlistId) {
                            playlistHandler().setItems(updatedItems);
                        }
                        return { ...playlist, items: updatedItems };
                    }
                    return playlist;
                });
            });
        },
        deletePlaylistItems: (ids) => {
            update(playlists => {
                return playlists.map(playlist => {
                    if (playlist._id === currentPlaylistId) {
                        const newItemList = playlist.items.filter(item => !ids.includes(item.id));
                    
                        // update the current playlist 
                        playlistHandler().setItems(newItemList);
                        // update the database
                        window.electron.send("toMainSetSongList", { _id: playlist._id, newItemList }); 

                        return { ...playlist, items: newItemList }; 
                    }
                    return playlist;
                });
            });
        },
        updatePlaylistName: (playlistId, newName) => {
            update(playlists => {
                return playlists.map(playlist => {
                    if (playlist._id === playlistId) {
                        window.electron.send("toMainChangePlaylistName", { _id: playlist._id, name: newName });
                        return { ...playlist, name: newName };
                    }
                    return playlist;
                });
            });
        },
        createPlaylist(name) {

        },
        deletePlaylist(playlistId) {

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
