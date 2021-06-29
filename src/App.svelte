<script>
	import Playlist from "./Components/Playlist/Playlist.svelte"
	import ControlBar from "./Components/ControlBar/ControlBar.svelte"
	import { song, playlists } from './store.js';

	function handleKeydown(event) {
		if (event.key === "backspace") {
			// todo handle delete selected songs
			// document.querySelectorAll("selected");
			// playlists.deleteSongs();
		}
		if (event.code === "Space") {
			song.playOrPauseSong();
		}
	}
</script>

<main>
	<ControlBar />
	{#each $playlists as playlist }
		<Playlist playlistName={playlist.name} songs={playlist.songs} />
	{/each}
</main>

<svelte:window on:keydown={handleKeydown} />

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