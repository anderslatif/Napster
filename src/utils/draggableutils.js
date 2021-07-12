export function findAfterElement(container, y) {
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
