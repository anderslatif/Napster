import App from './App.svelte';
import './utils/ipcRendererHandler.js';

const app = new App({
	target: document.body,
	props: {
	}
});

export default app;