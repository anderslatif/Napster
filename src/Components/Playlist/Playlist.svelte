<script>
  import FileUpload from "../../GenericComponents/FileUpload/FileUpload.svelte";
  import PlaylistColumns from "./SubComponents/PlaylistColumns.svelte";
  import Item from "../Item/Item.svelte";
  import ResizableTable from "../../GenericComponents/ResizableTable/ResizableTable.svelte";

  export let playlist;

  let lastClickedTableRowId;
  let selectedIds = [];

</script>

<div class="playlist">
  <table id="playlist-table" class="playlist-table">
    <FileUpload onFileUpload={(filePaths) => window.electron.send("toMainDroppedFilePaths", { _id: playlist._id, filePaths })}>
      <ResizableTable tableId="playlist-table">
        <PlaylistColumns />
      </ResizableTable>
      <tbody id="item-container">
        {#each playlist.items as item, i (item.id)}
          <Item 
            index={i} item={item} playlistName={playlist.name} 
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