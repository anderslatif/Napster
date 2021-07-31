<script>
    export let onCloseTab;
    import { getContext } from "svelte";
    import { TABS } from "./Tabs.svelte";

    const tab = {};
    const { registerTab, selectTab, selectedTab } = getContext(TABS);

    registerTab(tab);
</script>

<button class:selected-tab={$selectedTab === tab} on:click="{() => selectTab(tab)}">
	<slot></slot>
</button>
<button class:selected-tab={$selectedTab === tab} on:click={() => onCloseTab(tab)}>x</button>

<style>
	button {
		background: none;
		border: none;
		border-radius: 0;
		margin: 0;
		color: #ccc;
	}

	button:active {
		background-color: black;
	}
	
	.selected-tab {
		border-bottom: 3px solid teal;
		color: dodgerblue;
	}
</style>