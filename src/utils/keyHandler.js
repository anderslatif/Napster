import { playlist, playlists } from '../store.js';
import { deselectAll, highlightAll } from './domSelector.js';
import { skipSong, playOrPauseSong } from "../playlist/howler.js";

const pressedKeys = {};

export function keyDown(event) {
    pressedKeys[event.code] = true;
    keyHandler();
}

export function keyUp(event) {
    event.preventDefault();
    pressedKeys[event.code] = false;
    
    if (event.code === "KeyO" && (pressedKeys.ControlLeft || pressedKeys.ControlLeft)) {
        // if I were to open the file view on key down then key up won't trigger
        // instead trigger on key up
        pressedKeys.ControlLeft = false;
        pressedKeys.ControlRight = false;
        handleKeyOUp();
    }

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

    // logic for selecting songs with up and down arrows
    if (pressedKeys.ShiftLeft || pressedKeys.ShiftRight) {
        if (pressedKeys.ArrowUp) {
            const selectedRows = document.querySelectorAll(".selected");
            const firstId = Number(selectedRows[0]?.getAttribute("data-index"));
            if (firstId && firstId-1 >= 0) {
                document.querySelector(`[data-index~="${firstId-1}"]`).classList.add("selected");
            }
        } else if (pressedKeys.ArrowDown) {
            const selectedRows = document.querySelectorAll(".selected");
            const lastId = Number(selectedRows[selectedRows.length-1]?.getAttribute("data-index"));
            if (lastId || lastId === 0) {
                const nextRow = document.querySelector(`[data-index~="${lastId+1}"]`)
                nextRow?.classList.add("selected");
            }
        }
    } else if (pressedKeys.ArrowUp) {
        const selectedRows = document.querySelectorAll(".selected");
        const firstId = Number(selectedRows[0]?.getAttribute("data-index"));
        
        if (firstId && firstId-1 >= 0) {
            document.querySelector(`[data-index~="${firstId-1}"]`).classList.add("selected");
            selectedRows.forEach(selectedRow => selectedRow.classList.remove("selected"));
        } else if (firstId <= 0) {
            selectedRows.forEach(selectedRow => selectedRow.classList.remove("selected"));
            document.querySelector(`[data-index~="${0}"]`).classList.add("selected");
        }
    } else if (pressedKeys.ArrowDown) {
        const selectedRows = document.querySelectorAll(".selected");
        const lastId = Number(selectedRows[selectedRows.length-1]?.getAttribute("data-index"));

        const nextRow = document.querySelector(`[data-index~="${lastId+1}"]`)

        selectedRows.forEach(selectedRow => selectedRow.classList.remove("selected"));

        if (!nextRow) {
            const lastRow = document.querySelector(`[data-index~="${lastId}"]`);
            lastRow?.classList.add("selected");
        } else if (lastId || lastId === 0) {
            nextRow.classList.add("selected");
        }
    }

    if (pressedKeys.KeyD && (pressedKeys.MetaLeft || pressedKeys.MetaRight)) {
        window.electron.send("debugWindowOn");   
    }

    if (pressedKeys.KeyQ && (pressedKeys.MetaLeft || pressedKeys.MetaRight)) {
        window.electron.send("quit");   
    }

    if (pressedKeys.Backspace || pressedKeys.Delete) {
        const selectedIds = [...document.querySelectorAll(".selected")].map(element => element.id);

        if (selectedIds.length > 0) {
            playlist.stopIfPlaying(selectedIds);
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

    if (pressedKeys.KeyT &&
        ((pressedKeys.ControlLeft || pressedKeys.ControlRight)
        || (pressedKeys.MetaLeft || pressedKeys.MetaRight)
        && (pressedKeys.ShiftLeft || pressedKeys.ShiftRight)
        )
    ) {
            window.electron.send("undoDeletePlaylist");   
        }

}

function handleKeyOUp() {
    const itemIds = [];
    document.querySelectorAll(".selected").forEach(selectedRow => itemIds.push(selectedRow.id));
    playlists.openFiles(itemIds);
}
