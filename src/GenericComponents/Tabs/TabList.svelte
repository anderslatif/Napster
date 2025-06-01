<script>
    // import { TabView, Tab } from '../../GenericComponents/Tabs/tabs.js';
    import Tab from "./Tab.svelte";
    import ElementDropHandler from "../../GenericComponents/ElementDropHandler/ElementDropHandler.svelte"
    import EditableField from "../EditableField/EditableField.svelte";
    import HorizontalDragAndDrop from "../../GenericComponents/HorizontalDragAndDrop/HorizontalDragAndDrop.svelte";
    import { playlist as playlistStore, playlists, selectedIdsStore, selectedTabPlaylistId } from "../../store.js";


    import { onMount } from 'svelte';

    let tabContainer;
    let tabListContainer;
    let newTabButtonSticky;

    function handleOnWheel(event) {
        if (event.deltaY > 0) {
            tabContainer.scrollLeft += 100;
        } else {
            tabContainer.scrollLeft -= 100;
        }
    }

    playlists.subscribe((value) => {

        if (!tabListContainer) return;

        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        let tabListWidth = 0;

        // Wait for the tab items to render before calculating the actual width
        setTimeout(() => {
            for (let tabItem of tabListContainer.children) {
                tabListWidth += tabItem.offsetWidth;
            }

            tabListContainer.style.width = tabListWidth + 'px';
        });
    });


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

        // if no items are dragged over the tab and the tab are rearranged then don't update the playlist items
        if (draggedItems.length > 0) {
            const newItemsDraggedFrom = draggedFromPlaylist.items.filter(item => !draggedIds.includes(item.id));
            const newItemsDroppedOn = droppedOnPlaylist.items.concat(draggedItems);

            playlists.setPlaylistItems(draggedFromPlaylist._id, newItemsDraggedFrom);
            playlists.setPlaylistItems(droppedOnPlaylistId, newItemsDroppedOn);

            // if the playlist that is dragged from is current playlist then update items for that playlist            
            if (PlayListHandler.playlistId === draggedFromPlaylist._id) {
                // ignore the reordering that also saves to the store
                setTimeout(() => playlistStore.setItems(newItemsDraggedFrom), 10);
            }
            if (PlayListHandler.playlistId === droppedOnPlaylist._id) {
                setTimeout(() => playlistStore.setItems(newItemsDroppedOn), 10);
            }

        }

    }

    function onNewTab() {
        window.electron.send("toMainCreatePlaylist", { order: $playlists.length });
    }
</script>

<div id="tab-container" bind:this={tabContainer} on:wheel={handleOnWheel}>
    <div id="tab-list-container" bind:this={tabListContainer}>
        {#each $playlists as playlist (playlist._id)}
            <HorizontalDragAndDrop 
                containerId="tab-list-container" 
                playlistId={playlist._id}
                onDragEnd={playlists.rearrangePlaylistOrder}
            >
                <div class="tab-item">
                    <Tab
                        id={playlist._id}
                        onCloseTab={() => playlists.deletePlaylist(playlist)}
                        onTabSelect={() => handleTabSelect(playlist._id)}
                    >
                            <ElementDropHandler onElementsDropped={() => handleElementsDroppedOnTab(playlist._id)}>
                                <EditableField content={playlist.name} onSubmit={(newTitle) => playlists.updatePlaylistName(playlist._id, newTitle)} /> 
                            </ElementDropHandler>
                    </Tab>
                </div>
            </HorizontalDragAndDrop>
        {/each}

        <button class="tab-item new-tab-button-sticky-right" bind:this={newTabButtonSticky} on:click={onNewTab}>+</button>
    </div>
</div>

<style>
    #tab-container {
        border-bottom: 1px solid teal;
        background: linear-gradient(0deg, rgb(0, 0, 0) 0%, rgb(55, 55, 55) 82%); 
        color: rgb(60, 60, 60);

        width: 100%;
        overflow: hidden;
        position: relative;
    }

    #tab-list-container {
        display: flex;
        white-space: nowrap;
        overflow: scroll hidden;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    #tab-list-container::-webkit-scrollbar {
        display: none;
    }

    .new-tab-button-sticky-right {
        background-color: inherit;
        color: white;
        transform: translateY(0);
    }

</style>