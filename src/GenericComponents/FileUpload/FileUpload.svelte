<script>
    export let onFileUpload;

    import { sortListAlphabetically } from "../../utils/generalutils.js";

    const nodePath = require("path");

    let files = [];

    function handleDragOver(event) {
        // if dropping files deselect existing selections
        if (event.dataTransfer.items.length > 0) {
            document.querySelectorAll(".selected").forEach(selected => {
                selected.classList.toggle("selected");
            });
        }
    }

    async function dropHandler(event) {
        files = [];

        const dataTransferItems = Object.keys(event.dataTransfer.files);

        await Promise.all(dataTransferItems.map(async (key) => {
            const item = event.dataTransfer.items[key];
            const entry = item.webkitGetAsEntry();
            if (entry.isFile) {
                // only item contains the absolute path
                files.push(item.getAsFile().path);
            } else if (entry.isDirectory) {
                const directoryReader = entry.createReader();
                await walkDirRecursively(item.getAsFile().path, directoryReader);
            }
        }));
        onFileUpload(files);
    }

    function walkDirRecursively(path, directoryReader) {
        return new Promise(async (resolve, reject) => {
            await directoryReader.readEntries(async (entries) => {
                // webkit does not respect the OS ordering of folders/files so an alphabetic sort is needed
                await Promise.all(sortListAlphabetically(entries).map(async (entry) => {
                    if (entry.isFile) {
                        files.push(nodePath.join(path, entry.name));
                    } else if (entry.isDirectory) {
                        const newDirectoryReader = entry.createReader();
                        await walkDirRecursively(nodePath.join(path, entry.name), newDirectoryReader);
                    }
                }));
                resolve();
            });
        });
    }
</script>

<div 
    id="dropZone"
    on:dragover|preventDefault={handleDragOver}
    on:drop|preventDefault={dropHandler}
    webkitdirectory
>
    <slot></slot>
</div>
