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

export function convertSecondsToTimeString(durationInSeconds) {
    const base60 = durationInSeconds / 60;
    const minutes = Math.floor(base60);
    const remainingSeconds = "" + Math.floor((base60 - minutes) * 60);

    return `${minutes}:${remainingSeconds.length === 2 ? remainingSeconds : "0"+remainingSeconds}`;
}

export function sortSongsByNewIdList(songs, newIdList) {
    return songs.sort((a, b) => {
        return newIdList.indexOf(a.id) - newIdList.indexOf(b.id);
    });
}
