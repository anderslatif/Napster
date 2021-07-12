<script>
  import FileUpload from "../../GenericComponents/FileUpload/FileUpload.svelte";
  import PlaylistBar from "./SubComponents/PlaylistBar.svelte";
  import PlaylistColumns from "./SubComponents/PlaylistColumns.svelte";
  import Song from "../Song/Song.svelte";
  import { playlists } from "../../store.js";
  import { isSong, getMetaData } from "../../utils/songutils.js";
  import { guid } from '../../utils/generalutils.js';
  import ResizableTable from "../../GenericComponents/ResizableTable/ResizableTable.svelte";

  export let songs;
  export let playlistName;

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

    playlists.updatePlaylistSongs(playlistName, songs.concat(playlistReadyFiles.filter(Boolean)));
  }

</script>

<div class="playlist">
  <PlaylistBar playlistName={playlistName} />
  <table id="playlist-table" class="playlist-table">
    <FileUpload onFileUpload={handleFileUpload}>
      <ResizableTable tableId="playlist-table">
        <PlaylistColumns />
      </ResizableTable>
      <tbody id="song-container">
        {#each songs as song, i (song.id)}
          <Song index={i} song={song} songs={songs} playlistName={playlistName} />
        {/each}
        </tbody>
    </FileUpload>

  </table>
</div>


<style>
  .playlist {
    height: 90vh;
  }

  .playlist-table {
    width: 100%;
    height: 100%;
  }

  #song-container {
    height: 88vh;
  }
</style>