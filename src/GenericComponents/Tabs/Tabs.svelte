<script context="module">
    export const TABS = {};
</script>

<script>
    import { setContext, onDestroy } from "svelte";
    import { writable } from "svelte/store";

    const tabs = [];
    const views = [];
    const selectedTab = writable(null);
    const selectedView = writable(null);

    setContext(TABS, {

        registerTab: tab => {
            tabs.push(tab);
            selectedTab.update(current => current || tab);

            onDestroy(() => {
                const index = tabs.indexOf(tab);
                tabs.splice(index, 1);
                selectedTab.update(current => current === tab ? (tabs[index] || tabs[tabs.length-1]) : current);
            });
        },

        registerView: view => {
            views.push(view);
            selectedView.update(current => current || view);

            onDestroy(() => {
                const index = views.indexOf(view);
                views.splice(index, 1);
                selectedView.update(current => current === view ? (views[index] || views[views.length -1]) : current);
            });
        },

        selectTab: tab => {
            const index = tabs.indexOf(tab);
            selectedTab.set(tab);
            selectedView.set(views[index]);
        },

        selectedTab,
        selectedView
    });
</script>

<div class="tabs">
    <slot></slot>
</div>