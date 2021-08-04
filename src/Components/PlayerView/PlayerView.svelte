<script>
    import { Tabs, TabList, TabView, Tab } from '../../GenericComponents/Tabs/tabs.js';
    import EditableField from "../../GenericComponents/EditableField/EditableField.svelte";
	import Playlist from "../Playlist/Playlist.svelte"
    import ControlBar from "../ControlBar/ControlBar.svelte";
    import MetaDrawer from "../MetaDrawer/MetaDrawer.svelte";
    import ElementDropHandler from "../../GenericComponents/ElementDropHandler/ElementDropHandler.svelte"
    import HorizontalDragAndDrop from "../../GenericComponents/HorizontalDragAndDrop/HorizontalDragAndDrop.svelte"
	import { playlist as playlistStore, playlists, selectedIdsStore, selectedTabPlaylistId } from "../../store.js";
    import { changeIsPlaying } from '../../utils/domSelector.js';


    function handleTabSelect(playlistId) {
        selectedTabPlaylistId.set(playlistId);
        // restyle the playing track when a tab i select
        if ($playlistStore.playlistId === playlistId && $playlistStore.currentItem) {
            // give it time to change view
            setTimeout(() => changeIsPlaying($playlistStore.currentItem.id), 10);
        }
    }

    function handleElementsDroppedOnTab(droppedOnPlaylistId) {
        const draggedFromPlaylist = $playlists.find(playlist => playlist._id === $selectedTabPlaylistId);
        const droppedOnPlaylist = $playlists.find(playlist => playlist._id === droppedOnPlaylistId);

        const draggedIds = $selectedIdsStore;
        const draggedItems = draggedFromPlaylist.items.filter(item => draggedIds.includes(item.id));
        const newItems = draggedFromPlaylist.items.filter(item => !draggedIds.includes(item.id));
        
        playlists.setPlaylistItems(draggedFromPlaylist._id, newItems);
        playlists.setPlaylistItems(droppedOnPlaylistId, droppedOnPlaylist.items.concat(draggedItems));

        // ignore the reordering that also saves to the store
        setTimeout(() => playlistStore.setItems(newItems), 10);
    }
</script>

<ControlBar />

    <div id="tab-view">
        <Tabs selectedTabId={$selectedTabPlaylistId}>
            <TabList onNewTab={() => window.electron.send("toMainCreatePlaylist")}>
                <div id="tab-list-container">
                    {#each $playlists as playlist (playlist._id)}
                        <HorizontalDragAndDrop 
                            containerId="tab-list-container" 
                            playlistId={playlist._id} 
                        >
                        <Tab 
                            id={playlist._id}
                            onCloseTab={() => playlists.deletePlaylist(playlist._id)}
                            onTabSelect={() => handleTabSelect(playlist._id)}
                        >
                                <ElementDropHandler onElementsDropped={() => handleElementsDroppedOnTab(playlist._id)}>
                                    <EditableField content={playlist.name} onSubmit={(newTitle) => playlists.updatePlaylistName(playlist._id, newTitle)} /> 
                                </ElementDropHandler>
                        </Tab>
                        </HorizontalDragAndDrop>
                    {/each}
                </div>
            </TabList>

    <div id="player-view-wrapper">
                <div id="meta-drawer-wrapper">
                    <MetaDrawer currentItem={$playlistStore.currentItem} />
                </div>

                {#each $playlists as playlist (playlist._id)}
                    <TabView id={playlist._id} >
                        <Playlist playlist={playlist} />
                    </TabView>
                {/each}
                </Tabs>
    </div>


<style>
    #tab-list-container {
      display: flex;
    }

    #player-view-wrapper {
      display: flex;
    }

    #tab-view {
        width: 100%;
    }

    @media screen and (max-width: 640px) {
        #meta-drawer-wrapper {
            display: none;
        }
    }
    
    @media screen and (max-width: 320px) {
        #tab-list-container {
            font-size: 0.4em;
        }

        #player-view-wrapper {
            font-size: 0.6em;
        }
    }
</style>