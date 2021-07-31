<script>
    export let id;

    function handleDrop(event) {
        console.log(event.target, id);
    }
</script>

<div
    on:dragover|preventDefault
    on:drop={handleDrop}
>
    <slot></slot>
</div>