<script>
    export let index;

    import { findAfterElement } from "../../utils/draggableutils";
 

    function handleClick(event) {
        const itemNode = event.target.parentNode;

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
        console.log(draggingRow);
        
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
        // this hardcoded id is not generic enough
        let container = document.getElementById("song-container");

        // this shouldn't be a problem
        if (container.id === "dropZone") return;

        const afterElement = findAfterElement(container, event.clientY);
        const draggables = document.querySelectorAll(".dragging");


        // if (draggables.length > 0) {
            draggables.forEach(drag => {
                if (!afterElement) {
                    container.appendChild(drag);
                } else {
                    // console.log(container);
                    // console.log(drag, afterElement);
                    // console.log();
                    container.insertBefore(drag, afterElement);
                }
            })
/*         } else {
            if (!afterElement) {
                container.appendChild(draggable);
            }  else {
                container.insertBefore(draggable , afterElement);
            }
        } */
    }

    function handleDragEnd(event) {
        document.querySelectorAll(".dragging").forEach(drag => {
            drag.classList.remove("dragging");
        });
    }

</script> 

<div
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
</style>
