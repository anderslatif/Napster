<script>
    import { Tabs, TabList, TabView, Tab } from '../../GenericComponents/Tabs/tabs.js';

	import Playlist from "../Playlist/Playlist.svelte"
    import ControlBar from "../ControlBar/ControlBar.svelte";
	import { playlists } from "../../store.js";

    function handleNewTab() {
        window.electron.send("toMainCreatePlaylist"); 
    }
</script>

<div id="wrapper">
    <ControlBar />
    <Tabs>
        <TabList onNewTab={handleNewTab}>
            {#each $playlists as playlist (playlist._id)}
                <Tab onCloseTab={() => playlists.deletePlaylist(playlist._id)}>{playlist.name}</Tab>
            {/each} 
        </TabList>

        {#each $playlists as playlist (playlist._id)}
            <TabView>
                <Playlist playlist={playlist} />
            </TabView>
        {/each}
    </Tabs>
</div>

<style>

</style>