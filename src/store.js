import { writable } from "svelte/store";
import Playlist from "./playlist/Playlist.js";
import { changeIsPlaying } from "./utils/domSelector";

let currentPlaylistId;

function playlistHandler() {
    const { subscribe, set, update } = writable(Playlist);

    return {
        subscribe,
        setItems: (items) => {
            update(Playlist => {
                // the need for a timeout is because the items also get set in playlists which rerenders the entire view
                setTimeout(() => changeIsPlaying(Playlist.currentItem?.id), 20);
                return Playlist.setItems(items)
            });
        },
        playItem: (item, playlist) => {
            update(Playlist => {
                if (Playlist.playlistId !== playlist._id) {
                    playlistHandler().changePlaylist(playlist);
                }
                return Playlist.playItem(item)
            });
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
        stopIfPlaying: (ids) => {
            update(Playlist => {
                if (ids.includes(Playlist.currentItem?.id)) {
                    Playlist.stop();
                }
                
                return Playlist;
            })
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
        setPlaylistItems: (playlistId, items) => {
            update(playlists => {
                return playlists.map(playlist => {
                    if (playlist._id === playlistId) {
                        window.electron.send("toMainSetSongList", { _id: playlist._id, newItemList: items });
                        playlist.items = items;
                    }
                    return playlist;
                });
            })
        },
        deletePlaylistItems: (ids) => {
            update(playlists => {
                return playlists.map(playlist => {
                    if (playlist.items.some(item => ids.includes(item.id))) { 
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
        createPlaylist: (playlist) => {
            update(playlists => {
                playlists.push(playlist);
                return playlists;
            })
        },
        deletePlaylist: (playlistId) => {
            window.electron.send("toMainDeletePlaylist", { _id: playlistId });
            update(playlists => playlists.filter(playlist => playlist._id !== playlistId));
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
