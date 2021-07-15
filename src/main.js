import App from './App.svelte';
// import ipcRendererHandler from "./utils/ipcRendererHandler.js";

// const ipcRenderer = require("electron").ipcRenderer;
// ipcRenderer.on('initializePlaylist', (event, data) => {
//     console.log(data);
// });

const app = new App({
	target: document.body,
	props: {
	}
});

export default app;