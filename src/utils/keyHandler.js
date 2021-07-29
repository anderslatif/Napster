import { playlist, playlists } from '../store.js';
import { deselectAll, highlightAll } from './domSelector.js';
import { skipSong, playOrPauseSong } from "../playlist/howler.js";

const pressedKeys = {};

export function keyDown(event) {
    pressedKeys[event.code] = true;
    keyHandler();
}

export function keyUp(event) {
    pressedKeys[event.code] = false;

    if (event.key === "Meta") {
        // Macs modify the behavior with the Meta key and won't fire on keyUp for other keys pressed down simultanously. 
        Object.keys(pressedKeys).forEach(keyCode => {
            if (pressedKeys[keyCode]) {
                setTimeout(() => pressedKeys[keyCode] = false, 500);
            }
        });
    }

}


function keyHandler() {
    
    if (pressedKeys.Space) {
        playOrPauseSong();
    }

    if (pressedKeys.Backspace || pressedKeys.Delete) {
        const selectedIds = [...document.querySelectorAll(".selected")].map(element => element.id);

        if (selectedIds.length > 0) {
            playlists.deletePlaylistItems(selectedIds);
        }
    }

    if (pressedKeys.MetaLeft || pressedKeys.MetaRight) {
        if (pressedKeys.KeyA) {
            highlightAll();
        }
    }

    if (pressedKeys.Escape) {
        deselectAll();
    }

    if (pressedKeys.ArrowLeft) {
        if (pressedKeys.ShiftLeft || pressedKeys.ShiftRight) {
            skipSong(-1);
        } else if (pressedKeys.MetaLeft || pressedKeys.MetaRight) {
            skipSong(-10);
        }
        else {
            skipSong(-5);
        }
    }

    if (pressedKeys.ArrowRight) {
        if (pressedKeys.ShiftLeft || pressedKeys.ShiftRight) {
            skipSong(1);
        } else if (pressedKeys.MetaLeft || pressedKeys.MetaRight) {
            skipSong(10);
        }
        else {
            skipSong(5);
        }
    }

}