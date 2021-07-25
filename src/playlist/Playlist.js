import { getSound, playSong } from "./howler.js";

export default class Playlist {
    playlistId;
    items;
    currentItem;  
    currentIndex = 0;

    currentIsAudio = true;

    sound;

    constructor(playlistId, items) {
        this.playlistId = playlistId;
        this.items = items;
    }

    playItem(item) {
        const foundIndex = this.items.findIndex(listItem => listItem.id === item.id);
        this.currentIndex = foundIndex;

        if (item.type === "audio") {
            playSong(item, this);
        }
    }

    playOrPauseItem() {
    
    }

    playNext() {
        this.currentIndex += 1;

        if (this.currentIndex >= this.items.length) return;


        const nextItem = this.items[this.currentIndex];
        if (nextItem.type === "audio") {
            playSong(nextItem, this);
        }
    }

    changePlaylist(items) {
        this.currentIndex = 0;
        this.items = items;
        if (items.length > 0) this.currentIndex = items[this.currentIndex];
    }
}