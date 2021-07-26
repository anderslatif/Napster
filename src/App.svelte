<script>
	import Playlist from "./Components/Playlist/Playlist.svelte"
	import ControlBar from "./Components/ControlBar/ControlBar.svelte"
	import { keyDown, keyUp } from "./utils/keyHandler.js";
	import { playlist, playlists } from "./store.js";

</script>

<main>
	<ControlBar />
	{#each $playlists as playlist (playlist.id)}
		{#if true}
		<Playlist playlist={playlist} />
		{:else}
			<h1 style="color: white;">Video</h1>
		{/if}
	{/each}
</main>

<svelte:window 
	on:keydown={keyDown} 
	on:keyup={keyUp} 
/>

<style>
	main {
		padding: 0.8em;
		margin: 0 auto;
		user-select: none;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>