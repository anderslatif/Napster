const mm = require('music-metadata');

export async function getMetaData(filePath) {
    const metadata = await mm.parseFile(filePath);
       
    const { duration } = metadata.format;
    const durationString = convertSecondsToTimeString(duration);
    metadata.common.duration = duration;
    metadata.common.durationString = durationString;

    return metadata;
}