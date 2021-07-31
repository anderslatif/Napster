<script>
    export let onElementsDropped;

</script>

<div
    on:dragover|preventDefault
    on:drop={onElementsDropped}
>
    <slot></slot>
</div>