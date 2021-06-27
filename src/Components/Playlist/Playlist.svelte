<script>
  import FileUpload from "../../GenericComponents/FileUpload/FileUpload.svelte";
  import { getSongTitle } from "../../utils/songutils.js";
  import PlaylistColumn from "./SubComponents/PlaylistColumn.svelte";
  import Song from "./SubComponents/Song.svelte";
  import PlaylistBar from "./SubComponents/PlaylistBar.svelte";
  import { guid } from "../../utils/generalutils.js";

  export let songs;
  export let playlistName;


  async function handleFileUpload(files) {
    const filesWithMetaData = await files.map(async (file, index) => {
      const songTitle = getSongTitle(file.name);

      // todo get metadata
      
      if (!songTitle) { /* todo handle invalid files uploaded */ }
      return {
        id: guid(), 
        file,
        title: songTitle,
        type: songTitle ? "audio" : "video",
      }
    });
    Promise.all(filesWithMetaData).then((filesReady) => {
      songs = songs.concat(filesReady);
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