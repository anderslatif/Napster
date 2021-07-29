<script>
	import Playlist from "./Components/Playlist/Playlist.svelte"
	import Video from "./Components/Video/Video.svelte";
	import ControlBar from "./Components/ControlBar/ControlBar.svelte"
	import { keyDown, keyUp } from "./utils/keyHandler.js";
	import { playlist, playlists } from "./store.js";

</script>

<main>
	{#if $playlist.currentIsAudio}
		<div id="wrapper">
			<ControlBar />
			{#each $playlists as playlist (playlist.id)}
				<Playlist playlist={playlist} />
			{/each}
		</div>
	{:else}
		<Video videoFile={$playlist.currentItem} />
	{/if}
</main>

<svelte:window 
	on:keydown={keyDown} 
	on:keyup={keyUp} 
/>

<style>
	main {
		margin: 0 auto;
		user-select: none;
	}

	#wrapper {
		padding: 0.8em;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>