<script>
    export let index;
    export let id;
    export let surroundingDivId;
    export let onOrderChange; 
    export let onDoubleClick;
    export let lastClickedTableRowId;
    export let changeLastClickedTableRowId;

    function handleClick(event) {
        const tableRow = event.target.parentNode;
        const tableRowId = Number(tableRow.dataset.index);

        if (event.metaKey || event.ctrlKey) {
            if (tableRow.classList.contains("selected")) {
                tableRow.classList.remove("selected");
            } else {
                tableRow.classList.add("selected");
                changeLastClickedTableRowId(tableRowId);
            }
        } else if (event.shiftKey) {
            const selectedRows = document.querySelectorAll(".selected");
            const clickedRowId = tableRowId;

            if (selectedRows.length === 0) {
                const firstIndex = 0;
                selectInRange(firstIndex, clickedRowId);
            } else if (selectedRows.length === 1) {
                const selectedRowId = Number(selectedRows[0].dataset.index);

                if (selectedRowId < clickedRowId) {
                    selectInRange(selectedRowId, clickedRowId);
                } else if (selectedRowId > clickedRowId) {
                    selectInRange(clickedRowId, selectedRowId);
                }
            } else {
                if (lastClickedTableRowId < clickedRowId) {
                    selectInRange(lastClickedTableRowId, clickedRowId);
                } else {
                    selectInRange(clickedRowId, lastClickedTableRowId);
                }
            }
        } else {
            document.querySelectorAll(".selected").forEach(selectedRow => {
                selectedRow.classList.remove("selected");
            });
            tableRow.classList.add("selected");
            changeLastClickedTableRowId(tableRowId);
        }
    }

    function selectInRange(min, max) {
        for (let i = min; i <= max; i++) {
            document.querySelector(`[data-index~="${i}"]`).classList.add("selected");
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
        const listElements = document.getElementById(surroundingDivId).childNodes;
        const orderedIds = [...listElements].map(element => element.id);
        onOrderChange(orderedIds.filter(Boolean));
    }

    function findAfterElement(container, y) {
        // get the elements not being dragged with :not so ass to calculate the closest element
        const notDraggedElements = [...container.querySelectorAll(".draggable:not(.dragging)")];

        return notDraggedElements.reduce((accumulator, child) => {
            const box = child.getBoundingClientRect();
            // how far away the mouse (y) is from the center of the box 
            const offset = y - box.top - box.height / 2;

            // a negative offset means that the cursor is above the element
            // trying to get the offset that is smallest (closest to the element)
            if (offset < 0 && offset > accumulator.offset) {
                return { offset: offset, element: child }
            } else {
                return accumulator;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }


</script> 

<tr
    id={id}
    class="draggable list-item list-item-container-{index % 2}"
    data-index={index}
    on:click={handleClick}
    on:dragstart={handleDragStart}
    on:dragover={handleDragOver}
    on:dragend={handleDragEnd}
    draggable="true"
    on:dblclick={onDoubleClick}
>
    <slot></slot>
</tr>


<style>
    .list-item {
      border:black;
      cursor: move;
      color: white;
    }

    .list-item-container-0 {
      background-color: #474747;
    }

    .list-item-container-1 {
      background-color: #303030;
    }
    
    .selected {
	    background-color: rgb(0, 0, 41);
    }
</style>
