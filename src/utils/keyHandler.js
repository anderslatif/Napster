import { song, playlists } from '../store.js';
import { highlightAll } from './domSelector.js';

const pressedKeys = {};

export function keyDown(event) {
    pressedKeys[event.code] = true;
    keyHandler();
}

export function keyUp(event) {
    pressedKeys[event.code] = false;
}


function keyHandler() {

    if (pressedKeys.Space) {
        song.playOrPauseSong();
    }

    if (pressedKeys.Backspace) {
        const selectedIds = [...document.querySelectorAll(".selected")].map(element => element.id);

        if (selectedIds.length > 0) {
            // fixme should retrieve the playlistName and not hardcode default
            playlists.deletePlaylistSongs(selectedIds, "default");           
        }
    }

    if (pressedKeys.MetaLeft || pressedKeys.MetaRight) {
        if (pressedKeys.KeyA) {
            highlightAll();
        }
    }

    if (pressedKeys.Escape) {
        console.log("deselect all");
    }

}