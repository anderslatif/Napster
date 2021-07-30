<script>
    import { Tabs, TabList, TabView, Tab } from '../../GenericComponents/Tabs/tabs.js';

	import Playlist from "../Playlist/Playlist.svelte"
    import ControlBar from "../ControlBar/ControlBar.svelte";
	import { playlists } from "../../store.js";

    function handleNewTab() {
        console.log("new tab");
    }

    function handleCloseTab() {
        console.log("close tab")
    }
</script>

<Tabs>
    <TabList onNewTab={handleNewTab}>
        <Tab onCloseTab={handleCloseTab}>One</Tab>
        <Tab onCloseTab={handleCloseTab}>Two</Tab>
        <Tab onCloseTab={handleCloseTab}>Three</Tab>
    </TabList>

    <TabView>
        <h1>First</h1>
    </TabView>

    <TabView>
        <h1>Second</h1>
    </TabView>

    <TabView>
        <h1>Third</h1>
    </TabView>
</Tabs>

<!-- <div id="wrapper">
    <ControlBar />
    {#each $playlists as playlist (playlist.id)}
        <Playlist playlist={playlist} />
    {/each}
</div> -->

<style>
    h1 {
        color: white;
    }

/*     #wrapper {
		padding: 0.8em;
	} */
</style>