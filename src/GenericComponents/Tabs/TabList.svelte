<script>
    export let onNewTab;
</script>

<div class="tab-list">
    <slot></slot>
    <button on:click={onNewTab}>+</button>
</div>

<style>
    .tab-list {
        border-bottom: 1px solid teal;
    }
</style>