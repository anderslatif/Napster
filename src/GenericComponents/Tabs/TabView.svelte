<script>
    export let id;

    import { getContext } from "svelte";
    import { TABS } from  "./Tabs.svelte";

    const view = { id };
    const { registerView, selectedView } = getContext(TABS);

    registerView(view);
</script>

{#if $selectedView === view}
    <slot></slot>
{/if}

