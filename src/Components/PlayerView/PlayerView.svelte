<script>
    import { Tabs, TabList, TabView, Tab } from '../../GenericComponents/Tabs/tabs.js';
	import Playlist from "../Playlist/Playlist.svelte"
    import ControlBar from "../ControlBar/ControlBar.svelte";
    import MetaDrawer from "../MetaDrawer/MetaDrawer.svelte";
	import { playlist as playlistStore, playlists, selectedIdsStore, selectedTabPlaylistId } from "../../store.js";
    import { changeIsPlaying } from '../../utils/domSelector.js';
    import PlayListHandler from "../../playlist/Playlist.js";
    import ProgressBar from '../ProgressBar/ProgressBar.svelte';


</script>

<ControlBar />
<ProgressBar />

<div id="tab-view">
    <Tabs selectedTabId={$selectedTabPlaylistId}>
        <TabList />

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
</style>