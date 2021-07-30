export function changeIsPlaying(itemId) {
    document.querySelectorAll(".isPlaying").forEach(selected => {
        selected.classList.remove("isPlaying");
      });
      if (document.getElementById("item-container")) {
        document.getElementById(itemId).classList.add("isPlaying");
      } else {
          // in case it goes from a video player to the playlist view - give it time to change
          setTimeout(() => document.getElementById(itemId)?.classList.add("isPlaying"), 100);
      }
}

export function highlightAll() {
    document.querySelectorAll(".list-item").forEach(songElement => {
        songElement.classList.add("selected");
    });
}

export function deselectAll() {
    document.querySelectorAll(".selected").forEach(songElement => {
        songElement.classList.remove("selected");
    });
}
