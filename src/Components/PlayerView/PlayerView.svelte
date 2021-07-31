<script>
    import { Tabs, TabList, TabView, Tab } from '../../GenericComponents/Tabs/tabs.js';
    import EditableField from "../../GenericComponents/EditableField/EditableField.svelte";
	import Playlist from "../Playlist/Playlist.svelte"
    import ControlBar from "../ControlBar/ControlBar.svelte";
	import { playlists } from "../../store.js";

</script>

<div id="wrapper">
    <ControlBar />
    <Tabs>
        <TabList onNewTab={() => window.electron.send("toMainCreatePlaylist")}>
            {#each $playlists as playlist (playlist._id)}
                <Tab 
                    onCloseTab={() => playlists.deletePlaylist(playlist._id)}
                >
                    <EditableField content={playlist.name} onSubmit={(newTitle) => playlists.updatePlaylistName(playlist._id, newTitle)} /> 
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
