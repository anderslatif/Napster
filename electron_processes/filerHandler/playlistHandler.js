const { getMusicMetaData, isAudio, convertSecondsToTimeString } = require("./songUtils.js");
const { getffmpegMetaData, isVideo, getTitle } = require("./videoUtils.js");
const { guid } = require("./generalUtils.js");

async function playlistHandler(filePaths) {
    const playlistReadyFiles = await Promise.all(filePaths.map( async (path) => {
  
      const fileNameSplit = path.split(".");
      const extension = fileNameSplit.pop();

      if (isAudio(extension)) {
        const metadata = await getMusicMetaData(path);
        const { title, track, artist, album, year }  = metadata.common;

        const { duration } = metadata.format;
        const durationString = convertSecondsToTimeString(duration);

        return {
          id: guid(),
          type: "audio",
          path,
          metadata: {
            title,
            track,
            artist,
            album,
            year,
            duration,
            durationString
          }
        };
      } else if (isVideo(extension)) {
        const parsedVideo = await getffmpegMetaData(path);
        const { filename, title, track, artist, album, duration }  = parsedVideo.metadata;

        return {
          id: guid(),
          type: "video",
          path,
          metadata: {
            title: title || getTitle(path, extension),
            track,
            artist,
            album,
            duration: duration.seconds,
            durationString: duration.raw.substr(0, duration.raw.length-3) // removes .00 (miliseconds)
          }
        };
      }
    }));
    return playlistReadyFiles.filter(Boolean);
}

module.exports = {
    playlistHandler
}
