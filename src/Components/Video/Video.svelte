<script>   
    export let videoFile;

    import { playlist } from "../../store.js";
    import { onMount } from "svelte";

    onMount(() => {
        document.getElementById("video").addEventListener("ended", () => {
            $playlist.playNext();
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
    }

    video {
        width: 100%;
        height: auto;
        object-fit: contain;
        position: fixed;
        bottom: 0;
    }

</style>