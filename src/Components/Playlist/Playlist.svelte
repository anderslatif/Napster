<script>
  import FileUpload from "../../GenericComponents/FileUpload/FileUpload.svelte";
  import { getSongTitle } from "../../utils/songutils.js";
  import PlaylistColumn from "./SubComponents/PlaylistColumn.svelte";
  import Song from "./SubComponents/Song.svelte";
  import PlaylistBar from "./SubComponents/PlaylistBar.svelte";
  import { guid } from "../../utils/generalutils.js";
  import { playlists } from "../../store.js";
  import { convertSecondsToTimeString } from "../../utils/songutils.js";
 
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


</script>

<main>
  <PlaylistBar playlistName={playlistName} />
  <table class="playlist-table">
    <PlaylistColumn />
    <FileUpload onFileUpload={handleFileUpload}>
      <div id="song-container">
        {#each songs as song, i}
            <Song song={song} index={i} playlistName={playlistName} />
        {/each}
      </div>
    </FileUpload>
  </table>


</main>

<style>
    main {
      height: 90vh;
    }

    .playlist-table {
      width: 100%;
    }
</style>