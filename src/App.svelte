<script>
	import Video from "./Components/Video/Video.svelte";
	import { keyDown, keyUp } from "./utils/keyHandler.js";
	import { playlist } from "./store.js";
	import PlayerView from "./Components/PlayerView/PlayerView.svelte";
    import {playOrPauseSong } from "./playlist/howler.js";

	if ('mediaSession' in navigator) {
		navigator.mediaSession.setActionHandler('pause', () => {
			playOrPauseSong();
		});
		navigator.mediaSession.setActionHandler('play', () => {
			playOrPauseSong();
		});
	}

</script>

<main>
	{#if $playlist.currentIsAudio}
		<PlayerView />
	{:else}
		<Video videoFilePath={$playlist.currentItem.path} />
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
</style>