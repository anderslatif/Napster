const { getMetaData, isSong } = require("./songUtils.js");
const { guid } = require("./generalUtils.js");

async function playlistHandler(filePaths) {
    const playlistReadyFiles = await Promise.all(filePaths.filter(Boolean).map(async (path) => {
        const isAudio = isSong(path);
  
        if (isAudio) {
          const metadata = await getMetaData(path);
          // the key - ID3v2.3 - under native contains a period and causes problems for my database
          delete metadata.native; 
          delete metadata.quality;
  
          return {
            id: guid(), 
            type: "audio",
            path,
            metadata
          };
        }
      }));
      return playlistReadyFiles;
}

module.exports = {
    playlistHandler
}
