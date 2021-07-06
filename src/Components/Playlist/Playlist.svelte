<script>
  import FileUpload from "../../GenericComponents/FileUpload/FileUpload.svelte";
  import PlaylistBar from "./SubComponents/PlaylistBar.svelte";
  import PlaylistColumn from "./SubComponents/PlaylistColumn.svelte";
  import DragAndDropItem from "../../GenericComponents/DragAndDropItem/DragAndDropItem.svelte";
  import Song from "../Song/Song.svelte";
  import { playlists } from "../../store.js";
  import { isSong, getMetaData } from "../../utils/songutils.js";
  import { guid, sortListByNewIdList } from '../../utils/generalutils.js';

  export let songs;
  export let playlistName;

  async function handleFileUpload(filePaths) {

    const playlistReadyFiles = await Promise.all(filePaths.map(async (path) => {
      const isAudio = isSong(path);

      if (isAudio) {
        const metadata = await getMetaData(path);

        return {
          id: guid(), 
          type: "audio",
          path,
          metadata
        };

      } else {
        // console.log(path);
      }
    }));

    playlists.updatePlaylistSongs(playlistName, songs.concat(playlistReadyFiles.filter(Boolean)));
  }

  function handleOrderChange(newIdList) {
    const newSongList = sortListByNewIdList(songs, newIdList);
    playlists.updatePlaylistSongs(playlistName, newSongList);
  }

</script>

<div class="playlist">
  <PlaylistBar playlistName={playlistName} />
  <table class="playlist-table">
    <FileUpload onFileUpload={handleFileUpload}>
      <PlaylistColumn />
      <div id="song-container">
        {#each songs as song, i (song.id)}
          <DragAndDropItem id={song.id} index={i} surroundingDivId="song-container" onOrderChange={handleOrderChange}>
            <!-- <Song song={song} playlistName={playlistName} /> -->
          </DragAndDropItem>
        {/each}
      </div>
    </FileUpload>

  </table>
</div>


<style>
  .playlist {
    height: 90vh;
  }

  .playlist-table {
    width: 100%;
  }

  #song-container {
    height: 88vh;
  }


</style>