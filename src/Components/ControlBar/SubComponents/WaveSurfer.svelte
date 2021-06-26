<script>
    import WaveSurfer from 'wavesurfer.js';

    const wavesurfer = WaveSurfer.create({
        container: "#waveform",
        waveColor: 'darkblue',
        progressColor: 'dodgerblue',
        barWidth: 1,
        barHeight: 0.75, // the height of the wave
        barGap: null // the optional spacing between bars of the wave, if not provided will be calculated in legacy format
    });

    // todo 
    // wavesurfer.playPause();
    // wavesurfer.on("finish", () => {});


    wavesurfer.load("/Users/anders/Downloads/modest.mouse.the.golden.casket.2021/01 - Fuck Your Acid Trip.mp3");
    wavesurfer.on('ready', function () {
        wavesurfer.play();
    });
</script>

<main>
</main>
