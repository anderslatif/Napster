<script>
    export let onCloseTab;
	export let onTabSelect;
	export let id;

    import { getContext } from "svelte";
    import { TABS } from "./Tabs.svelte";

    const tab = { id };
    const { registerTab, selectTab, selectedTab } = getContext(TABS);

    registerTab(tab);
</script>

<button class:selected-tab={$selectedTab === tab} 
	on:mouseup={(event) => {
		// middle click
		if (event.which === 2) {
			onCloseTab(tab);
		}
	}}
	on:click="{() => {
		onTabSelect();
		selectTab(tab)}
	}">
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
		background-color: #333;
	}
	
	.selected-tab {
		border-bottom: 3px solid teal;
		color: dodgerblue;
	}
</style>