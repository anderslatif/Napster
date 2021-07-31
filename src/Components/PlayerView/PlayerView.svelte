<script>
    import { Tabs, TabList, TabView, Tab } from '../../GenericComponents/Tabs/tabs.js';
    import EditableField from "../../GenericComponents/EditableField/EditableField.svelte";
	import Playlist from "../Playlist/Playlist.svelte"
    import ControlBar from "../ControlBar/ControlBar.svelte";
    import ElementDropHandler from "../../GenericComponents/ElementDropHandler/ElementDropHandler.svelte"
	import { playlist as playlistStore, playlists, selectedIdsStore } from "../../store.js";
    import { changeIsPlaying } from '../../utils/domSelector.js';

    let currentlySelectedTab;

    function handleTabSelect(playlistId) {
        currentlySelectedTab = playlistId;
        // restyle the playing track when a tab i select
        if ($playlistStore.playlistId === playlistId && $playlistStore.currentItem) {
            // give it time to change view
            setTimeout(() => changeIsPlaying($playlistStore.currentItem.id), 10);
        }
    }

    function handleElementsDroppedOnTab(droppedOnPlaylistId) {
/*         const draggedFromPlaylist = $playlists.find(playlist => playlist._id === currentlySelectedTab);
        const droppedOnPlaylist = $playlists.find(playlist => playlist._id === droppedOnPlaylistId);

        const draggedIds = $selectedIdsStore;
        const draggedItems = draggedFromPlaylist.items.filter(item => draggedIds.includes(item.id));
        const newItems = draggedFromPlaylist.items.filter(item => !draggedIds.includes(item.id));
        
        console.log(draggedFromPlaylistId, newItems);
        playlists.setPlaylistItems(draggedFromPlaylist._id, newItems);
        playlists.setPlaylistItems(droppedOnPlaylistId, droppedOnPlaylist.items.concat(draggedItems));

        // ignore the reordering that also saves to the store
        setTimeout(() => playlistStore.setItems(newItems), 10); */
    }
</script>

<div id="wrapper">
    <ControlBar />
    <Tabs>
        <TabList onNewTab={() => window.electron.send("toMainCreatePlaylist")}>
            {#each $playlists as playlist (playlist._id)}
                <Tab 
                    onCloseTab={() => playlists.deletePlaylist(playlist._id)}
                    onTabSelect={() => handleTabSelect(playlist._id)}
                >
                    <ElementDropHandler onElementsDropped={() => handleElementsDroppedOnTab(playlist._id)}>
                        <EditableField content={playlist.name} onSubmit={(newTitle) => playlists.updatePlaylistName(playlist._id, newTitle)} /> 
                    </ElementDropHandler>
                </Tab>
            {/each} 
        </TabList>

        {#each $playlists as playlist (playlist._id)}
            <TabView>
                <Playlist playlist={playlist} />
            </TabView>
        {/each}
    </Tabs>
</div>
