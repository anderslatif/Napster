const path = require("path");
const ffmpeg = require('ffmpeg');

async function getffmpegMetaData(filePath) {
    try {
        return await new ffmpeg(filePath);
    } catch (error) {
        throw new Error(error);
    }
}

function isVideo(extension) { 
    const validExtensions = ["ogg", "ogv", "mp4", "webm", "mpeg"];
    return validExtensions.includes(extension.toLowerCase());
}

function getTitle(absolutePath, extension) {
    // the second parameter removes the '.extension' from the returned value
    return path.basename(absolutePath, `.${extension}`) || path.win32.basename(absolutePath, `.${extension}`);
}

module.exports = {
    getffmpegMetaData,
    isVideo,
    getTitle
};
