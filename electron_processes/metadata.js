const mm = require('music-metadata');

async function getMetaData(filePath) {
    const metadata = await mm.parseFile(filePath);
       
    const { duration } = metadata.format;
    // todo fix this
    // const durationString = convertSecondsToTimeString(duration);
    // metadata.common.duration = duration;
    // metadata.common.durationString = durationString;

    return metadata;
}

module.exports = {
    getMetaData
};