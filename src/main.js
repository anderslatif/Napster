import App from './App.svelte';

import { playlists } from './store.js';
import { find } from "./storage.js";

// load the playlist from the database when the app starts
(async () => {
	const loadedPlaylists = await find();
	if (loadedPlaylists.length === 0) {
		playlists.initializePlaylist({ name: "default", songs: [] });
	} else {
		playlists.setPlaylists(loadedPlaylists);
	}
})();

const app = new App({
	target: document.body,
	props: {
	}
});

export default app;