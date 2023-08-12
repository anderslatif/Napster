<script>
    export let onNewTab;

    let tabContainer;

    function handleVerticalScroll(event) {
        if (event.deltaY > 0) {
            tabContainer.scrollLeft += 100;
        } else {
            tabContainer.scrollLeft -= 100;
        }
    }
</script>

<div id="tab-container" bind:this={tabContainer} on:wheel={handleVerticalScroll}>
    <slot></slot>
    <button class="new-tab-button" on:click={onNewTab}>+</button>
</div>

<style>
    #tab-container {
        border-bottom: 1px solid teal;
        background: linear-gradient(0deg, rgb(0, 0, 0) 0%, rgb(55, 55, 55) 82%); 
        color: rgb(60, 60, 60);
        display: flex; /* to display the two buttons (title and close tab) next to each other */
    }

    .new-tab-button {
        background: linear-gradient(0deg, rgb(0, 0, 0) 0%, rgb(55, 55, 55) 82%);
        border: 1px solid grey;
        border-bottom: 0;
        color: white;
    }
</style>