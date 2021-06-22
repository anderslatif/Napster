<script>
import { prevent_default } from "svelte/internal";

    const onFileUploaded = (event) => {
        console.log("onFileUploaded", event);
    }
</script>

<main>
    <label 
        id="dropzone"
        on:dragstart|preventDefault={() => {
            console.log("start")
        }}
        on:drag|preventDefault={onFileUploaded}
        on:dragenter="{() => document.getElementById("dropzone").classList.toggle("hoovering")}"
    >
        <input 
            type="file" 
            multiple=true 
            on:input={onFileUploaded(getFilesFromInputEvent)} />
        <h1>Drop your files here</h1>
    </label>
</main>

<style>
  .dropzone {
    height: 300px;
    background: #fdfdfd;
    border-radius: 5px;
    border: 2px dashed #ff3e00;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 300ms ease-out;
  }
/*   .dropzone.hoovering {
    border: 2px solid #ff3e00;
    background: rgba(255, 62, 0, 0.05);
  } */
  label:hover {
    cursor: pointer;
  }
</style>