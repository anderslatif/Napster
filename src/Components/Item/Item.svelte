<script>
  import { playlist, playlists } from '../../store.js';
  import DragAndDropTableRow from "../../GenericComponents/DragAndDropTableRow/DragAndDropTableRow.svelte";
  import { sortListByIdList } from '../../utils/generalutils.js';
  
  export let index;
  export let item;
  export let playlistName;

  export let lastClickedTableRowId;
  export let changeLastClickedTableRowId;
  export let selectedIds;
  export let updateSelectedIds;

  const { title, track, artist, album, year, durationString } = item.metadata;

  function handleOrderChange(newIdList) {
    const newItemList = sortListByIdList($playlist.items, newIdList);
    // fixme below call both playlist and playlists and the DB!!!
    // todo consider where to call domSelector.changeIsPlaying 
    playlist.setItems(newItemList);
  }

  function handleDoubleClick() {
    playlist.playItem(item, playlistName);
  }

</script>


<DragAndDropTableRow 
  id={item.id} index={index} 
  surroundingDivId="item-container" 
  onOrderChange={handleOrderChange}
  onDoubleClick={handleDoubleClick}
  lastClickedTableRowId={lastClickedTableRowId}
  changeLastClickedTableRowId={changeLastClickedTableRowId}
  updateSelectedIds={updateSelectedIds}
  selected={selectedIds.includes(item.id)}
>
  <td id="track">{track?.no || ""}</td>
  <td id="title">{title || ""}</td>
  <td id="artist">{artist || ""}</td>
  <td id="album">{album || ""}</td>
  <td id="length">{durationString || ""}</td>
  <td id="year">{year || ""}</td>
</DragAndDropTableRow>

<style>
  @media (max-width: 600px) {
    td {
      font-size: 0.8em;
    }
  }

</style>