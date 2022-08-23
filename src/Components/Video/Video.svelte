<script>   
    export let videoFile;

    import { playlist } from "../../store.js";
    import { getSound } from "../../playlist/howler.js";
    
    import Playlist from "../Playlist/Playlist.svelte";
    
    import { onMount } from "svelte";

    let showPlaylistPane = false;

    onMount(() => {
        getSound()?.stop();

        document.getElementById("video").addEventListener("ended", () => {
            playlist.playNext();
        });
    });

    function keyDownHandler({ key }) {
        if (key === 'l' || key === 'L') {
            showPlaylistPane = !showPlaylistPane;
        } else if (key === 's' || key === 'S') {
            stopVideo();
        }
    }

    function stopVideo() {
        document.getElementById("video").pause();
        playlist.stop();
    }

</script>

<div id="container" on:keydown={keyDownHandler}>

    {#if showPlaylistPane}
        <div id='playlist-pane'>
            <Playlist playlist={$playlist} />
        </div>
    {/if}
    
    <video id="video" controls autoplay>
        <source src={videoFile.path}>
        <track kind="captions">
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

    #playlist-pane {
        z-index: 1;
    }

    video {
        width: 100%;
        height: auto;
        max-width: 100vw;
        max-height: 100vh;
        object-fit: contain;
        position: fixed;
        outline: none;
    }
</style>