export function isSong(filePath) {
    const fileNameSplit = filePath.split(".");
    const extension = fileNameSplit.pop();

    const validExtensions = ["mp3", "mpeg", "opus", "ogg", "oga", "wav", "aac", "caf",
                            "m4a", "m4b", "mp4", "weba", "webm", "dolby", "flac"];
    return validExtensions.includes(extension);
}

export function convertSecondsToTimeString(durationInSeconds) {
    const base60 = durationInSeconds / 60;
    const minutes = Math.floor(base60);
    const remainingSeconds = "" + Math.floor((base60 - minutes) * 60);

    return `${minutes}:${remainingSeconds.length === 2 ? remainingSeconds : "0"+remainingSeconds}`;
}

