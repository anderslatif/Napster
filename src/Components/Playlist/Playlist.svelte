<script>
  import FileUpload from "../../GenericComponents/FileUpload/FileUpload.svelte";
  import PlaylistBar from "./SubComponents/PlaylistBar.svelte";
  import PlaylistColumn from "./SubComponents/PlaylistColumn.svelte";
  import DragAndDropItem from "../../GenericComponents/DragAndDropItem/DragAndDropItem.svelte";
  import Song from "../Song/Song.svelte";

  import { guid } from "../../utils/generalutils.js";
  import { playlists } from "../../store.js";
  import { getSongTitle, convertSecondsToTimeString, sortSongsByNewIdList } from "../../utils/songutils.js";

	const mm = require('music-metadata');

  export let songs;
  export let playlistName;

  async function handleFileUpload(files) {
    const filesWithMetaData = await files.map(async (file, index) => {
      const songTitle = getSongTitle(file.name);

      const metadata = await mm.parseFile(file.path);
       
      const { duration } = metadata.format;
      const durationString = convertSecondsToTimeString(duration);
      metadata.common.duration = duration;
      metadata.common.durationString = durationString;

      if (!songTitle) { /* handle invalid files uploaded */ }
      return {
        id: guid(), 
        title: songTitle,
        type: songTitle ? "audio" : "video",
        file,
        metadata
      }
    });
    Promise.all(filesWithMetaData).then((filesReady) => {
      playlists.updatePlaylistSongs(playlistName, songs.concat(filesReady));
    });
  }

  function handleOrderChange(newIdList) {
    const newSongList = sortSongsByNewIdList(songs, newIdList);
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
            <Song song={song} playlistName={playlistName} />
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