<script>
    export let onFileUpload;

    function handleDragOver(event) {

        // if dropping files deselect existing selections
        if (event.dataTransfer.items.length > 0) {
            document.querySelectorAll(".selected").forEach(selected => {
                selected.classList.toggle("selected");
            });
        }
    }

    function dropHandler(event) {
        event.preventDefault();

        if (event.dataTransfer.items) {
                const files = Object.keys(event.dataTransfer.items).map(key => {
                    const value = event.dataTransfer.items[key];
                    if (value.kind === "file") {
                        return value.getAsFile();
                    }
                });
            if (files.length > 0) {
                onFileUpload(files);
            }
        } else {
            if (files.length > 0) {
                onFileUpload(event.dataTransfer.files);
            }
        }
    }
</script>
  
<main>
    <div 
        id="dropZone"
        on:dragover|preventDefault={handleDragOver}
        on:drop|preventDefault={dropHandler}
    >
        <slot></slot>
    </div>
</main>

<style>
    #dropZone {
      min-height: 88vh;
    }
</style>
