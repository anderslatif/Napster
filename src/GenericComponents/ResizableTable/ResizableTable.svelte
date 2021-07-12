<script>
    import { onMount } from "svelte";

    export let tableId;

    onMount(() => {
        // Query the table
        const table = document.getElementById(tableId);

        // Query all headers
        const columns = table.querySelectorAll('th');

        const createResizableColumn = (column, resizer) => {
            // Track the current position of mouse
            let x = 0;
            let w = 0;

            const mouseDownHandler = (event) => {
                resizer.classList.add('resizing');

                // Get the current mouse position
                x = event.clientX;

                // Calculate the current width of column
                const styles = window.getComputedStyle(column);
                w = parseInt(styles.width);

                // Attach listeners for document's events
                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
            };

            const mouseMoveHandler = (event) => {
                // Determine how far the mouse has been moved
                const dx = event.clientX - x;


                // Update the width of column
                column.style.width = `${w + dx}px`;
            };

            // When user releases the mouse, remove the existing event listeners
            const mouseUpHandler = () => {
                resizer.classList.remove('resizing')
                
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };

            resizer.addEventListener('mousedown', mouseDownHandler);
        };

        [...columns].forEach((column) => {
            // Create a resizer element
            const resizer = document.createElement('div');
            resizer.classList.add('resizer');

            // Set the height
            resizer.style.height = `${table.offsetHeight}px`;

            // Add a resizer element to the column
            column.appendChild(resizer);

            // Will be implemented in the next section
            createResizableColumn(column, resizer);
        });
        
    });

</script>

<slot></slot>
