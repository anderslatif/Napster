<script>
  import { song as sound, playlists } from '../../store.js';
  import DragAndDropTableRow from "../../GenericComponents/DragAndDropTableRow/DragAndDropTableRow.svelte";
  import { sortListByNewIdList } from '../../utils/generalutils.js';

  export let index;
  export let song;
  export let songs;
  export let playlistName;
  const { title, track, artist, album, year, durationString } = song.metadata.common;

  function handleOrderChange(newIdList) {
    const newSongList = sortListByNewIdList(songs, newIdList);
    playlists.updatePlaylistSongs(playlistName, newSongList);
  }

  function handleDoubleClick() {
    sound.playSong(song, playlistName);
  }

</script>


<DragAndDropTableRow 
  id={song.id} index={index} surroundingDivId="song-container" onOrderChange={handleOrderChange}
  onDoubleClick={handleDoubleClick}
>
  <td id="song-track">{track?.no}</td>
  <td id="song-title">{title}</td>
  <td id="song-artist">{artist}</td>
  <td id="song-album">{album}</td>
  <td id="song-length">{durationString}</td>
  <td id="song-year">{year}</td>
</DragAndDropTableRow>

<style>
  @media (max-width: 600px) {
    td {
      font-size: 0.8em;
    }
  }

</style>