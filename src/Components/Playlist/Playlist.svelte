<script>
  import FileUpload from "../../GenericComponents/FileUpload/FileUpload.svelte";
  import Howler from "howler";

  let songs = [
  ];
  let sound;

  function handleFileUpload(files) {
    const filesWithId = files.map((file, index) => { return {file, id: index }});
    songs = songs.concat(filesWithId);
  }

  function handleSelectSong(event) {
    const foundSong = songs.find(song => song.id === Number(event.target.id));
    playSong(foundSong);
  }

  function playSong(song) {
    sound?.stop();
    sound = new Howler.Howl({
      src: song.file.path,
      html5: true
    });

    sound.play();
  }


</script>

<main>
  <FileUpload class="file-upload" onFileUpload={handleFileUpload}>
    {#each songs as song, i}
      <div  id="{song.id}" class="song-container song-container-{i % 2}"
            on:click={handleSelectSong}
            draggable="true"
      >
        {song.file.name}
      </div>
    {/each}
  </FileUpload>

</main>

<style>
    main {
      height: 90vh;
    }

    .song-container {
      border:black;
      user-select: none;
    }
    .song-container-0 {
      background-color: rgb(191, 190, 190);
    }
    .song-container-1 {
      background-color: grey;
    }
</style>