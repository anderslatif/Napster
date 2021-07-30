<script>
	import Playlist from "../Playlist/Playlist.svelte"
	import { playlists } from "../../store.js";

</script>

<!-- <div id="wrapper">
    {#each $playlists as playlist (playlist.id)}
        <Playlist playlist={playlist} />
    {/each}
</div>
 -->
 
<style>
    #wrapper {
		padding: 0.8em;
	}
</style>