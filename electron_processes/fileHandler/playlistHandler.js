const { getMusicMetaData, isAudio, convertSecondsToTimeString, tryToGetTitleFromFilename, getSongFromAPI } = require("./songUtils.js");
const { getffmpegMetaData, isVideo } = require("./videoUtils.js");
const { guid, getFileName } = require("./generalUtils.js");

async function playlistHandler(filePaths) {
    const playlistReadyFiles = await Promise.all(filePaths.map( async (path) => {
  
      const fileNameSplit = path.split(".");
      const extension = fileNameSplit.pop();

      if (isAudio(extension)) {
        const metadata = await getMusicMetaData(path);
        const { artist, album, title, track, year }  = metadata.common;

        const { duration } = metadata.format;
        const durationString = convertSecondsToTimeString(duration);

        const { albumArt, lyrics } = await getSongFromAPI(artist, title);

        return {
          id: guid(),
          type: "audio",
          path,
          metadata: {
            title: title || tryToGetTitleFromFilename(getFileName(path, extension)),
            track: track || parseInt(getFileName(path, extension)),
            artist,
            album,
            year,
            duration,
            durationString,
            albumArt,
            lyrics
          }
        };
      } else if (isVideo(extension)) {
        const parsedVideo = await getffmpegMetaData(path);
        const { title, track, artist, album, duration }  = parsedVideo.metadata;

        return {
          id: guid(),
          type: "video",
          path,
          metadata: {
            title: title || getFileName(path, extension),
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
