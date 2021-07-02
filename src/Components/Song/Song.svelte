<script>
  import { song as sound } from '../../store.js';
    
  export let song;
  export let playlistName;
  const { title, track, artist, album, year, durationString } = song.metadata.common;

  function handleDoubleClick() {
    sound.playSong(song, playlistName);
  }

</script>

<tr  
  id={song.id}
  on:dblclick={handleDoubleClick}
>
  <td id="song-track">{track?.no}</td>
  <td id="song-title">{title}</td>
  <td id="song-artist">{artist}</td>
  <td id="song-album">{album}</td>
  <td id="song-length">{durationString}</td>
  <td id="song-year">{year}</td>
</tr>

<style>
  tr {
    color: white;
    font-size: 0.75em;
  }

  #song-track {
    width: 2vw;
  }

  #song-title {
    width: 35vw;
  }

  #song-artist {
    width: 20vw;
  }
    
  #song-album {
    width: 20vw;
  }

  #song-length {
    width: 6vw;
  }

  #song-year {
    width: 6vw;
  }
</style>