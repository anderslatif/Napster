<script>
	import Playlist from "./Components/Playlist/Playlist.svelte"
	import ControlBar from "./Components/ControlBar/ControlBar.svelte"

	const playlists = [{ name: "default" }];
</script>

<main>
	<ControlBar />
	{#each playlists as playlist }
		<Playlist playlistName={playlist.name} />
	{/each}
</main>

<style>
	main {
		padding: 0;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>