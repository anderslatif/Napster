const fs = require('fs');
const AudioContext = require('web-audio-api').AudioContext;
const context = new AudioContext();

context.outStream = process.stdout;

(async function getAudioBuffer() {
    const path = "/Users/anders/Desktop/Current 93 - The Inmost Light (2007)/CD1 - Where The Long Shadows Fall/01 - Where The Long Shadows Fall (Beforetheinmostlight).mp3";
    const buffer = await fs.readFileSync(path, { flag: 'r' })

    await context.decodeAudioData(buffer, (audioBuffer) => {
        console.log(audioBuffer);
    });

})();

// https://github.com/audiojs/web-audio-api/issues/70
// https://css-tricks.com/making-an-audio-waveform-visualizer-with-vanilla-javascript/



