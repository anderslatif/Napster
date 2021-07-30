<script>
    export let onCloseTab;
    
    import { getContext } from "svelte";
    import { TABS } from "./Tabs.svelte";

    const tab = {};
    const { registerTab, selectTab, selectedTab } = getContext(TABS);

    registerTab(tab);
</script>

<button class:selected={$selectedTab === tab} on:click="{() => selectTab(tab)}">
	<slot></slot>
</button>
<button class:selected={$selectedTab === tab} on:click={() => onCloseTab(tab)}>x</button>

<style>
	button {
		background: none;
		border: none;
		border-bottom: 2px solid white;
		border-radius: 0;
		margin: 0;
		color: #ccc;
	}
	
	.selected {
		border-bottom: 2px solid teal;
		color: blue;
	}
</style>