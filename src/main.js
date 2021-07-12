import App from './App.svelte';

import { playlist } from './store.js';
import { find } from "./storage.js";

// load the playlist from the database when the app starts
(async () => {
	const loadedPlaylists = await find();
	if (loadedPlaylists.length === 0) {
		playlist.initializePlaylist();
	} else {
		playlist.setPlaylists(loadedPlaylists[0]);
	}
})();

const app = new App({
	target: document.body,
	props: {
	}
});

export default app;