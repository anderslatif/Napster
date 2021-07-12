<script>
  import FileUpload from "../../GenericComponents/FileUpload/FileUpload.svelte";
  import PlaylistBar from "./SubComponents/PlaylistBar.svelte";
  import PlaylistColumns from "./SubComponents/PlaylistColumns.svelte";
  import Song from "../Song/Song.svelte";
  import { playlist as storePlaylist } from "../../store.js";
  import { isSong, getMetaData } from "../../utils/songutils.js";
  import { guid } from '../../utils/generalutils.js';
  import ResizableTable from "../../GenericComponents/ResizableTable/ResizableTable.svelte";

  export let playlist;

  async function handleFileUpload(filePaths) {

    const playlistReadyFiles = await Promise.all(filePaths.map(async (path) => {
      const isAudio = isSong(path);

      if (isAudio) {
        const metadata = await getMetaData(path);
        // the key - ID3v2.3 - under native contains a period and causes problems for my database
        delete metadata.native; 

        return {
          id: guid(), 
          type: "audio",
          path,
          metadata
        };
      }
    }));
    console.log((playlist.songs.concat(playlistReadyFiles.filter(Boolean))));
    storePlaylist.updatePlaylistSongs(playlist.songs.concat(playlistReadyFiles.filter(Boolean)));
  }

</script>

<div class="playlist">
  <PlaylistBar playlistName={playlist.name} />
  <table id="playlist-table" class="playlist-table">
    <FileUpload onFileUpload={handleFileUpload}>
      <ResizableTable tableId="playlist-table">
        <PlaylistColumns />
      </ResizableTable>
      <tbody id="song-container">
        {#each playlist.songs as song, i (song.id)}
          <Song index={i} song={song} songs={playlist.songs} playlistName={playlist.playlistName} />
        {/each}
        </tbody>
    </FileUpload>

  </table>
</div>


<style>
  .playlist {
    height: 90vh;
    overflow-y: auto;
  }

  .playlist::-webkit-scrollbar {
    display: none;
  }

  .playlist-table {
    width: 100%;
    height: 100%;
    margin-bottom: 2.5em;
    overflow-y: auto;
  }
</style>