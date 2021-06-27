<script>
  import FileUpload from "../../GenericComponents/FileUpload/FileUpload.svelte";
  import Howler from "howler";
  import { getSongTitle } from "../../utils/songutils.js";
  import PlaylistColumn from "./SubComponents/PlaylistColumn.svelte";
  import Song from "./SubComponents/Song.svelte";
  import PlaylistBar from "./SubComponents/PlaylistBar.svelte";

  export let playlistName;
  
  let songs = [
    { title: "1" },
    { title: "2" },
    { title: "3" },
    { title: "4" },
  ];
  let currentlyPlayingIndex = 0;
  let sound;

  async function handleFileUpload(files) {
    const filesWithMetaData = await files.map(async (file, index) => {
      const title = getSongTitle(file.name);

      // todo get metadata

      console.log(title);
      
      if (!title) { /* todo handle invalid files uploaded */ }
      return {
        file,
        title,
        type: title ? "song" : "video",
        id: index 
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
            <Song song={song} index={i} />
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