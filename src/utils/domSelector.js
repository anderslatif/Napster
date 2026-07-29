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
