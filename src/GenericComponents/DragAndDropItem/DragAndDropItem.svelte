<script>
    export let index;
    export let id;
    export let surroundingDivId;
    export let onOrderChange; 

    import { findAfterElement } from "../../utils/draggableutils";
 

    function handleClick(event) {
        const itemNode = event.target.parentNode.parentNode;

        if (event.shiftKey) {
            console.log("shift key pressed while clicking")
        } else if (event.ctrlKey || event.metaKey) {
            itemNode.classList.toggle("selected");
        } else {
            // deselect all selections
            document.querySelectorAll(".selected").forEach(selected => {
                selected.classList.toggle("selected");
            });
            // select the clicked item
            itemNode.classList.toggle("selected");
        }
    }

    function handleDragStart(event) {
        const draggingRow = event.target;

        // deselect others if the dragged item is not selected yet another group is already selected
        if (!draggingRow.classList.contains("selected")) {
            document.querySelectorAll(".selected").forEach(selected => {
                selected.classList.remove("selected");
            });
        }
        draggingRow.classList.add("selected");

        const selected = document.querySelectorAll(".selected");
        selected.forEach(element => element.classList.add("dragging"));
    }

    function handleDragOver(event) {
        let container = document.getElementById(surroundingDivId);

        const afterElement = findAfterElement(container, event.clientY);
        const draggables = document.querySelectorAll(".dragging");


        draggables.forEach(drag => {
            if (!afterElement) {
                container.appendChild(drag);
            } else {
                container.insertBefore(drag, afterElement);
            }
        });
    }

    function handleDragEnd(event) {
        document.querySelectorAll(".dragging").forEach(drag => {
            drag.classList.remove("dragging");
        });
        const listElements = document.getElementById(surroundingDivId).children;
        const orderedIds = [];
        
        for (let i = 0; i < listElements.length; i++) {
            orderedIds.push([listElements[i].id]);
        }
        onOrderChange(orderedIds);
    }

</script> 

<div
    id={id}
    class="draggable list-item list-item-container-{index % 2}"
    on:click={handleClick}
    on:dragstart={handleDragStart}
    on:dragover={handleDragOver}
    on:dragend={handleDragEnd}
    draggable="true"
>
    <slot></slot>
</div>


<style>
    .list-item {
      border:black;
      cursor: move;
      color: white;
    }

    .list-item-container-0 {
      background-color: #3a3a3a;
    }

    .list-item-container-1 {
      background-color: #303030;
    }
    
    .selected {
	    background-color: rgb(0, 0, 41);
    }
</style>
