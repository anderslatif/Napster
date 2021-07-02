<script>
  import FileUpload from "../../GenericComponents/FileUpload/FileUpload.svelte";
  import PlaylistBar from "./SubComponents/PlaylistBar.svelte";
  import PlaylistColumn from "./SubComponents/PlaylistColumn.svelte";
  import DragAndDropItem from "../../GenericComponents/DragAndDropItem/DragAndDropItem.svelte";
  import Song from "../Song/Song.svelte";

  import { guid } from "../../utils/generalutils.js";
  import { playlists, song } from "../../store.js";
  import { getSongTitle, convertSecondsToTimeString, sortSongsByNewIdList } from "../../utils/songutils.js";
  import { afterUpdate } from "svelte";

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
    console.log(newIdList[0]);
    const newSongList = sortSongsByNewIdList(songs, newIdList);
    // console.log(newSongList[0].id);
    playlists.updatePlaylistSongs(playlistName, newSongList);
  }

  afterUpdate(() => {
    console.log(songs);
  });

</script>

<div class="playlist">
  <PlaylistBar playlistName={playlistName} />
  <table class="playlist-table">
    <FileUpload onFileUpload={handleFileUpload}>
      <PlaylistColumn />
      <div id="song-container">
        {#each songs as song, i}
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