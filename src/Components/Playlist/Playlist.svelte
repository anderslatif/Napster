<script>
  import FileUpload from "../../GenericComponents/FileUpload/FileUpload.svelte";
  import PlaylistColumns from "./SubComponents/PlaylistColumns.svelte";
  import Item from "../Item/Item.svelte";
  import ResizableTable from "../../GenericComponents/ResizableTable/ResizableTable.svelte";
  import { songsProcessedCount } from "../../store.js";

  export let playlist;

  let lastClickedTableRowId;
  let selectedIds = [];

  function handleFileUpload(filePaths) {
    window.electron.send("toMainDroppedFilePaths", { _id: playlist._id, filePaths })
		songsProcessedCount.set({ total: filePaths.length, remaining: filePaths.length, percentage: 0.0 });
  }

</script>

<div class="playlist">
  <table id="playlist-table" class="playlist-table">
    <FileUpload onFileUpload={handleFileUpload}>
      <ResizableTable tableId="playlist-table">
        <PlaylistColumns />
      </ResizableTable>
      <tbody id="item-container">
        {#each playlist.items as item, i (item.id)}
          <Item
            index={i} item={item} playlist={playlist} 
            lastClickedTableRowId={lastClickedTableRowId} changeLastClickedTableRowId={(newClickedId) => lastClickedTableRowId = newClickedId}
            selectedIds={selectedIds} updateSelectedIds={newIdList => selectedIds = newIdList}  
          />
        {/each}
        </tbody>
    </FileUpload>
  </table>
</div>


<style>
  .playlist {
    height: 85vh;
    overflow-y: auto;
  }

  .playlist-table {
    width: 100%;
    height: 100%;
    margin-bottom: 2.5em;
    overflow-y: auto;
  }
</style>