function isValidSong(extension) {
    const validExtensions = ["mp3", "mpeg", "opus", "ogg", "oga", "wav", "aac", 
                "caf", "m4a", "m4b", "mp4", "weba", "webm", "dolby", "flac"];
    return validExtensions.includes(extension);
}

export function getSongTitle(fileName) {
    const fileNameSplit = fileName.split(".");
    const extension = fileNameSplit.pop();
    if (!isValidSong(extension)) return false;
    return fileNameSplit.join("");
}

