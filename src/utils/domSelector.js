export function changeIsPlaying(songId) {
    document.querySelectorAll(".isPlaying").forEach(selected => {
        selected.classList.remove("isPlaying");
      });
      document.getElementById(songId).classList.add("isPlaying");
}

export function highlightOne() {

}

export function highlightAll() {
    document.querySelectorAll(".list-item").forEach(songElement => {
        songElement.classList.add("selected");
    });
}

export function deselctAll() {
    document.querySelectorAll(".selected").forEach(songElement => {
        songElement.classList.remove("selected");
    });
}
