<script>
  import FileUpload from "../../GenericComponents/FileUpload/FileUpload.svelte";
  import PlaylistBar from "./SubComponents/PlaylistBar.svelte";
  import PlaylistColumns from "./SubComponents/PlaylistColumns.svelte";
  import Song from "../Song/Song.svelte";
  import ResizableTable from "../../GenericComponents/ResizableTable/ResizableTable.svelte";
	import { playlist } from '../../store.js';

</script>

<div class="playlist">
  <PlaylistBar playlistName={$playlist.name} />
  <table id="playlist-table" class="playlist-table">
    <FileUpload onFileUpload={(filePaths) => window.electron.send("toMainDroppedFilePaths", filePaths)}>
      <ResizableTable tableId="playlist-table">
        <PlaylistColumns />
      </ResizableTable>
      <tbody id="song-container">
        {#each $playlist.songs as song, i (song.id)}
          <Song index={i} song={song} playlistName={playlist.name} />
        {/each}
        </tbody>
    </FileUpload>

  </table>
</div>


<style>
  .playlist {
    height: 85vh;
    overflow-y: auto;
  }

  .playlist-table {
    width: 100%;
    height: 100%;
    margin-bottom: 2.5em;
    overflow-y: auto;
  }
</style>