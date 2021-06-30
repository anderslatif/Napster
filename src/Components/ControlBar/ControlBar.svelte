<script>
    import WaveSurfer from "./SubComponents/WaveSurfer.svelte";
    import { song } from "../../store.js";
    import { getSound } from "../../howler.js";
    import { convertSecondsToTimeString } from "../../utils/songutils.js";

    let sound = getSound();
    let soundPlaying = false;

    let totalTime = 0;
    let totalTimeString = "0:00";
    let currentTime = 0;
    let currentTimeString = "0:00";

    function handleProgressBarClick(event) {

        if (sound) {
            const goToSeconds = Number(event.target.value);
            currentTime = goToSeconds;
            currentTimeString = convertSecondsToTimeString(currentTime);

            sound.seek(goToSeconds);
        }
    }

    setInterval(() => {
        sound = getSound();
        soundPlaying = sound?.playing();
        
        if (soundPlaying) {
            currentTime = Math.floor(sound.seek());
            currentTimeString = convertSecondsToTimeString(currentTime);
            totalTime = Math.floor(sound.duration());
            totalTimeString = convertSecondsToTimeString(totalTime);
        }
    }, 1000); // todo lower it when production ready

</script>

<div id="control-bar">
    <div id="control-progress-container">
        <!--     <WaveSurfer id="wavesurfer-container" /> -->    
        <div id="progress-bar-container">
            <div id="label-container">
                <label id="progress-bar-label-currentTime" class="progress-bar-label" for="progress-bar">{currentTimeString}</label>
                <label id="progress-bar-label-totalTime" class="progress-bar-label"  for="progress-bar">{totalTimeString}</label>
            </div>
            <input type="range" id="progress-bar" 
                min={0} max={totalTime} value={currentTime}
                on:click={handleProgressBarClick}
            >
        </div>
    </div>
    <div id="control-button-container">
        <button class="control-button {soundPlaying ? "control-button-paused" : "control-button-playing"}" 
            on:click={() => song.playOrPauseSong()}>
            { soundPlaying ? "❚❚" : "▶" }
        </button>
    </div>
</div>

<style>
    #control-bar {
        height: 10vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    #progress-bar-container{
        margin-right: 1em;
        width: 80vw;
    }

    .progress-bar-label {
        color: white;
    }

    #label-container {
        width: 100%;
        display: flex;
    }

    #progress-bar-label-totalTime {
        margin-left: auto;
    }

    #progress-bar {
        width: 100%;
    }

    #control-button-container {
        margin-right: 1em;
    }

    .control-button {
        background-color: rgb(0, 0, 0, 0);
        height: 2em;
        color: green;
    }

    .control-button-paused {
        color: darkgray;
    }

    .control-button:focus {
        background-color: rgb(0, 0, 0, 0);
    }

    @media (max-width: 640px) {
		#control-bar {
			flex-wrap: nowrap;
            margin-bottom: 2em;
		}
        .control-button {
            width: 100%;
        }
	}

</style>