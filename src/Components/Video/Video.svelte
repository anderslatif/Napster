<script>   
    export let videoFile;

    import { playlist } from "../../store.js";
    import { getSound } from "../../playlist/howler.js";
    import { onMount } from "svelte";

    onMount(() => {
        getSound()?.stop();

        document.getElementById("video").addEventListener("ended", () => {
            playlist.playNext();
        });
    });

</script>

<div id="container">    
    <video id="video" controls autoplay>
        <source src={videoFile.path}>
        <track kind="captions">
        <button>STOP</button>
    </video>
</div>

<style>
    #container {
        width: 100vw;
		height: 100vh;
        background-color:  black;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    video {
        width: 100%;
        height: auto;
        max-width: 100vw;
        max-height: 100vh;
        object-fit: contain;
        position: fixed;
        /* bottom: 0; */
    }

</style>