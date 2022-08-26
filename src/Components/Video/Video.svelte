<script>   
    export let videoFilePath;

    import { playlist } from "../../store.js";
    import { getSound } from "../../playlist/howler.js";
    
    import Playlist from "../Playlist/Playlist.svelte";
    
    import { onMount } from "svelte";

    let video;
    let source;

    let showPlaylistPane = false;

    onMount(() => {
        video = document.getElementsByTagName("video")[0];
        source = video.getElementsByTagName("source");

        getSound()?.stop();

        video.addEventListener("ended", () => {
            playlist.playNext();
        });
    });

    playlist.subscribe((playlist) => {
        if (!playlist.currentIsAudio && playlist.currentItem.path !== videoFilePath) {
            videoFilePath = playlist.currentItem.path;
            source.src = videoFilePath;
            video.load();
            video.play();
        }
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
        <source src={videoFilePath}>
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
        z-index: 1;
    }
</style>