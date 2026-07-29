<script>
    export let itemId;
    export let onReorder;

    function handleDragStart(event) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", itemId);
        event.target.classList.add("dragging-tab");
    }

    function handleDragOver(event) {
        // if songs are being dragged then let the drop handler deal with it
        if (document.querySelector(".dragging")) return;

        // allow this element to be a drop target
        event.preventDefault();
    }

    function handleDrop(event) {
        if (document.querySelector(".dragging")) return;

        event.preventDefault();

        const draggedItemId = event.dataTransfer.getData("text/plain");
        if (!draggedItemId || draggedItemId === itemId) return;

        // insert after this element when the cursor is past its horizontal midpoint
        const box = event.currentTarget.getBoundingClientRect();
        const insertAfter = event.clientX > box.left + box.width / 2;

        onReorder(draggedItemId, itemId, insertAfter);
    }

    function handleDragEnd(event) {
        event.target.classList.remove("dragging-tab");
    }
</script>

<div
    id={itemId}
    class="draggable-tab"
    on:dragstart={handleDragStart}
    on:dragover={handleDragOver}
    on:drop={handleDrop}
    on:dragend={handleDragEnd}
    draggable="true"
>
    <slot></slot>
</div>

<style>
    .draggable-tab {
        display: flex;
    }
</style>
