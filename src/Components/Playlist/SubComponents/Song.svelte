<script>
    export let song;
    export let index;

    function handleSelectSong(event) {
    // const foundIndex = songs.findIndex(song => song.id === Number(event.target.id));
    // currentlyPlayingIndex = foundIndex;
    // playSong(songs[foundIndex]);
      event.target.parentNode.classList.toggle("selected");
  }

  function playSong(song) {
    sound?.stop();
    sound = new Howler.Howl({
      src: song.file.path,
      html5: true,
      onended: () => {
        currentlyPlayingIndex += 1;
        // todo see what happens if the playlist has been played through
        playSong(songs[currentlyPlayingIndex]);
      }
    });

/*     setInterval(() => {
      if (sound.playing()) {
    let width = (sound.seek()/sound.duration())/100;
  }
},300); */


    sound.play();
  }
</script>

<main>
    <tr  id="{song.id}" class="song-container song-container-{index % 2}"
        on:click={handleSelectSong}
        draggable="true"
    >
        <td id="song-title">{song.title}</td>
        <td id="song-artist">Artist</td>
        <td id="song-album">Album</td>
  </tr>
</main>

<style>
    .song-container {
      border:black;
      cursor: move;
      user-select: none;
      color: white;
    }
    .song-container-0 {
      background-color: #3a3a3a;
    }
    .song-container-1 {
      background-color: #282828;
    }

    .selected {
      background-color: rgb(0, 0, 74);
    }

    #song-title {
      width: 50vw;
    }

    #song-artist {
      width: 20vw;
    }
    
    #song-album {
      width: 30vw;
    }
</style>