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


module.exports = {
    getffmpegMetaData,
    isVideo,
};
