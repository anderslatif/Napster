const { getMusicMetaData, isAudio } = require("./songUtils.js");
const { getffmpegMetaData, isVideo, getTitle } = require("./videoUtils.js");
const { guid } = require("./generalUtils.js");

async function playlistHandler(filePaths) {
    const playlistReadyFiles = await Promise.all(filePaths.map( async (path) => {
  
      const fileNameSplit = path.split(".");
      const extension = fileNameSplit.pop();

      if (isAudio(extension)) {
        const metadata = await getMusicMetaData(path);

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
            title: title || getTitle(filename, extension),
            track,
            artist,
            album,
            duration: duration.seconds,
            durationString: duration.raw
          }
        };
      }
    }));
    return playlistReadyFiles.filter(Boolean);
}

module.exports = {
    playlistHandler
}
