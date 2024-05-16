const mm = require('music-metadata');
const { getSong } = require('genius-lyrics-api');
let customenv;
try {
    // it's not necessary that the file exists
    customenv = require("../../env.json");
} catch {}

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
                            "m4a", "m4b", /* "mp4",  */"weba", "webm", "dolby", "flac"];
    return validExtensions.includes(extension.toLowerCase());
}

function convertSecondsToTimeString(durationInSeconds) {
    const base60 = durationInSeconds / 60;
    const minutes = Math.floor(base60);
    const remainingSeconds = "" + Math.floor((base60 - minutes) * 60);

    return `${minutes}:${remainingSeconds.length === 2 ? remainingSeconds : "0"+remainingSeconds}`;
}

function tryToGetTitleFromFilename(filename) {
    try {
        return filename.split(".")[1].substring(1, filename.length);
    } catch {
        return "";
    }
}

async function getSongFromAPI(artist, title) {
    if (customenv && artist && title) {
        try {
            return await getSong({
                apiKey: customenv.GENIUS_ACCESS_TOKEN,
                artist,
                title,
                optimizeQuery: true
            }) || {};
        } catch {
            return {};
        }
    }
    return {};
}



module.exports = {
    getMusicMetaData,
    isAudio,
    convertSecondsToTimeString,
    tryToGetTitleFromFilename,
    getSongFromAPI
};
