<script>
    export let onFileUpload;

    function dropHandler(event) {
        event.preventDefault();
        // todo handle dropping folders
        const files = event.dataTransfer.files.length
        ? [...event.dataTransfer.files]
        : event.dataTransfer.items
            .filter(({ kind }) => kind === "file")
            .map(({ getAsFile }) => getAsFile());
        onFileUpload(files);
    }
</script>
  
<main>
    <div 
        id="dropZone"
        on:dragover|preventDefault={() => {}}
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
