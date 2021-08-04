<script>
    export let playlistId;
    export let containerId;
    export let onDragEnd;

    function handleDragStart(event) {
        const draggingTab = event.target;
        draggingTab.classList.add("dragging-tab");
    }

    function handleDragOver(event) {
        const container = document.getElementById(containerId);

        const afterElement = findNextElement(container, event.clientX);
        const draggable = document.querySelector(".dragging-tab");
                
        if (!afterElement) {
            container.appendChild(draggable);
        }  else {
            container.insertBefore(draggable , afterElement);
        }
    }

    function handleDragEnd(event) {
        const draggingTab = event.target;
        draggingTab.classList.remove("dragging-tab");

        const container = document.getElementById(containerId).childNodes;
        const playlistIdsInOrder = [...container].map(playlist => playlist.id).filter(Boolean);
        onDragEnd(playlistIdsInOrder);
    }

    function findNextElement(container, x) {
        const draggableElements = [...container.querySelectorAll(".draggable-tab:not(.dragging-tab)")];

        return draggableElements.reduce((accumulator, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.right + box.width / 2;

            if (offset < 0 && offset > accumulator.offset) {
                return { offset: offset, element: child }
            } else {
                return accumulator;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
</script>

<div 
    id={playlistId}
    class="draggable-tab"
    on:dragstart={handleDragStart}
    on:dragover={handleDragOver}
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