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
                setTimeout(() => changeIsPlaying(Playlist.currentItem?.id), 10);
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
            const sortedByOrderPlaylists = playlists.sort((first, second) => first.order - second.order)
            selectedTabPlaylistId.set(playlists[0]?._id);
            set(sortedByOrderPlaylists);
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
        rearrangePlaylistOrder: (playlistIdsInOrder) => {
            update(playlists => {
                const playlistsWithNewOrders = playlists.map(playlist => {
                    return { ...playlist, order: playlistIdsInOrder.findIndex(id => id === playlist._id) };
                });
                window.electron.send("rearrangePlaylistsOrder", playlistsWithNewOrders);
                return playlistsWithNewOrders;
            });
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
        },
        openFiles: (itemIds) => {
            update(playlists => {
                const basePaths = [];
                const paths = [];
                const OSFileSeparator = getOSFileSeparator();

                playlists.forEach(playlist => {
                    playlist.items.forEach(item => {
                        if (itemIds.includes(item.id)) {
                            // assumes MacOS or Linux
                            const splitPath = item.path.split(OSFileSeparator);
                            splitPath.pop();
                            const currentItemsBasePath = splitPath.join(OSFileSeparator);

                            if (!basePaths.includes(currentItemsBasePath)) {
                                basePaths.push(currentItemsBasePath);

                                paths.push(item.path);
                            }
                        }
                    });
                });
                window.electron.send("openFiles", paths);

                return playlists;
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

function getOSFileSeparator() {
    let $OSFileSeparator;

    const unsubscribe = OSFileSeparator.subscribe(value => {
        $OSFileSeparator = value;
    });
    unsubscribe();
    return $OSFileSeparator;
}


export const playlist = playlistHandler();
export const playlists = playlistsHandler();
export const selectedIdsStore = writable([]);
export const selectedTabPlaylistId = writable();
export const OSFileSeparator = writable();
