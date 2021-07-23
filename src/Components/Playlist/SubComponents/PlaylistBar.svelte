<script>
    import { playlist } from "../../../store.js";

    export let playlistName;

	let isEditing = false;
	
	function handleSubmit(event) {
		if (event.code === "Enter" || event.code === "Escape") {
			isEditing = false;
            playlist.updatePlaylistName(playlistName);
		}
	}
</script>

<div id="playlist-bar" on:dblclick={() => isEditing = true}>
	{#if isEditing}
		<input id="playlist-bar-input" bind:value={playlistName} on:keydown={handleSubmit} />
	{:else}
		<div>
			{playlistName}
        </div>
	{/if}
</div>

<style>
    #playlist-bar {
        background: linear-gradient(0deg, rgb(0, 0, 0) 0%, rgb(55, 55, 55) 82%); 
        color: rgb(60, 60, 60);
    }

    #playlist-bar-input {
        background: linear-gradient(0deg, rgb(0, 0, 0) 0%, rgb(55, 55, 55) 82%); 
        color: white;
    }
</style>