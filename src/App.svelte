<script>
	import Video from "./Components/Video/Video.svelte";
	import { keyDown, keyUp } from "./utils/keyHandler.js";
	import { playlist } from "./store.js";
	import PlayerView from "./Components/PlayerView/PlayerView.svelte";

</script>

<main>
	{#if $playlist.currentIsAudio}
		<PlayerView />
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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>