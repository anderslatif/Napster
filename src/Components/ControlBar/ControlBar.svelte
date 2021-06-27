<script>
    import WaveSurfer from "./SubComponents/WaveSurfer.svelte";
    import { songs } from "../../store.js";

    let progressBarPercentage = 0;

    function handleProgressBarClick(event) {
        const sound = $songs.sound;

        if (sound) {
            const totalWidth = event.target.clientWidth - 1;
            const clickedX = 1 + event.clientX - event.target.offsetLeft;
            
            progressBarPercentage = 100 * clickedX / totalWidth;

            sound.seek((progressBarPercentage * sound.duration()) / 100);
        }
    }

    setInterval(() => {
        const sound = $songs.sound;
        

        if (sound && sound.playing()) {
            progressBarPercentage = (sound.seek()/sound.duration() * 100);
        }
    }, 1000);

</script>

<main>
    <div id="control-progress-container">
        <!--     <WaveSurfer id="wavesurfer-container" /> -->    
        <div id="progress" on:click={handleProgressBarClick}>
            <div id="progress-bar" style="width: {progressBarPercentage}%;"></div>
        </div>
    </div>
    <div id="control-button-container">
        <button class="control-button" on:click={() => songs.playOrPauseSong()}>
            { $songs.isPlaying ? "❚❚" : "▶" }
        </button>
    </div>
</main>

<style>
    main {
        height: 10vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .control-button {
        background-color: rgb(0, 0, 0, 0);
        color: green;
    }

    .control-button:focus {
        background-color: rgb(0, 0, 0, 0);
    }

    #progress {
        width: 80vw;
        background-color: grey;
    }

    #progress-bar {
        height: 2em;
        background-color: rgb(0, 38, 255);
    }
</style>