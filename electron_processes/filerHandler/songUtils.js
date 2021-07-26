const mm = require('music-metadata');

async function getMusicMetaData(filePath) {
    const metadata = await mm.parseFile(filePath);
        
    const { duration } = metadata.format;
    const durationString = convertSecondsToTimeString(duration);
    metadata.common.duration = duration;
    metadata.common.durationString = durationString;

    return metadata;
}

function isAudio(extension) {
    const validExtensions = ["mp3", "mpeg", "opus", "ogg", "oga", "wav", "aac", "caf",
                            "m4a", "m4b", "mp4", "weba", "webm", "dolby", "flac"];
    return validExtensions.includes(extension.toLowerCase());
}

function convertSecondsToTimeString(durationInSeconds) {
    const base60 = durationInSeconds / 60;
    const minutes = Math.floor(base60);
    const remainingSeconds = "" + Math.floor((base60 - minutes) * 60);

    return `${minutes}:${remainingSeconds.length === 2 ? remainingSeconds : "0"+remainingSeconds}`;
}



module.exports = {
    getMusicMetaData,
    isAudio
};
