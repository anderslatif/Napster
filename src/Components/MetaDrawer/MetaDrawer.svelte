<script>
    export let currentItem; 
</script>

{#if currentItem?.metadata.albumArt || currentItem?.metadata.lyrics}
    <div id="meta-drawer">
        {#if currentItem?.metadata.albumArt}
        <img 
            id="album-art" 
            src={currentItem.metadata.albumArt} 
            alt="album art"
            on:dblclick={() => window.electron.send("enlargeAlbumCover", currentItem.metadata.albumArt)}
        />
        {/if}
        <div id="lyrics-container">
            {#each currentItem.metadata.lyrics?.split('\n') || [] as line}
                <div id="line">{line}</div>
            {/each}
            <br><br><br><br>
        </div>
    </div>
{/if}

<style>
    #meta-drawer {
        width: 30vw;
    }

    #album-art {
        width: 100%;
    }

    #lyrics-container {
        color: rgb(187, 187, 187);
        width: 100%;
        height: 50vh;
        bottom: 0;
        overflow-y: auto;
        margin: 0.5em;
        margin-right: 1em;
    }

    #line {
        min-height: 1em;
    }
</style>