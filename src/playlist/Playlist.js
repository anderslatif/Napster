import { getSound, playSong } from "./howler.js";

class Playlist {
    playlistId;
    items;
    currentItem;  
    currentIndex = 0;

    currentIsAudio = true;

    playItem(item) {
        const foundIndex = this.items.findIndex(listItem => listItem.id === item.id);
        this.currentIndex = foundIndex;

        this.play(item);

        return this;
    }

    playNext() {
        this.currentIndex += 1;

        if (this.currentIndex >= this.items.length) return;

        const nextItem = this.items[this.currentIndex];
        this.play(nextItem);

        return this;
    }

    play(item) {
        this.currentItem = item;

        if (item.type === "audio") {
            this.currentIsAudio = true;
            playSong(item, this);
        } else if (item.type === "video") {
            this.currentIsAudio = false;
        }
    }

    setItems(items) {
        this.items = items;
        
        // recalculcate
        if (this.currentItem) {
            const newIndex = this.items.findIndex(item => item.id === this.currentItem.id);
            this.currentIndex = newIndex;
        }
        return this;
    }

    changePlaylist(playlist) {
        this.currentIndex = 0;
        this.playlistId = playlist._id;
        this.items = playlist.items;
        if (playlist.items.length > 0) this.currentIndex = this.items[this.currentIndex];

        return this;
    }
}

const playlist = new Playlist();

export default playlist;