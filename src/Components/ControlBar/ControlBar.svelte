<script>
    import WaveSurfer from "./SubComponents/WaveSurfer.svelte";

    let isPlaying = false;

    function handlePlayOrPause() {

    }
</script>

<main>
<!--     <WaveSurfer id="wavesurfer-container" /> -->    
    <div id="control-container">
        <button class="control-button" on:click={handlePlayOrPause}>
            { isPlaying ? "❚❚" : "▶" }
        </button>
    </div>
</main>

<style>
    main {
        height: 10vh;
        width: 100vw;
        overflow: hidden;
    }

    #control-container {
        width: 10vw;
        float: right;
    }

    .control-button {
        background-color: rgb(0, 0, 0, 0);
        color: green;
    }

    .control-button:focus {
        background-color: rgb(0, 0, 0, 0);
    }
</style>