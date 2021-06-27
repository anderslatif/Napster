<script>
    import { findAfterElement } from "../../../utils/draggableutils";

    export let song;
    export let index;

    function handleClick(event) {
      const rowNode = event.target.parentNode;

      if (event.shiftKey) {
        console.log("shift key pressed while clicking")
      } else if (event.ctrlKey || event.metaKey) {
        rowNode.classList.toggle("selected");
      } else {
        // deselect all selections
        document.querySelectorAll(".selected").forEach(selected => {
            selected.classList.toggle("selected");
        });
        // select the clicked item
        rowNode.classList.toggle("selected");
      }
  }

  function handleDoubleClick() {
    // todo play song
        // const foundIndex = songs.findIndex(song => song.id === Number(event.target.id));
    // currentlyPlayingIndex = foundIndex;
    // playSong(songs[foundIndex]);
  }

  function handleDragStart(event) {
    const draggingRow = event.target;
    draggingRow.classList.add("dragging");
    
    // deselect others if the dragged item is not selected yet another group is already selected
    if (!draggingRow.classList.contains("selected")) {
      document.querySelectorAll(".selected").forEach(selected => {
        selected.classList.toggle("selected");
      });
      draggingRow.classList.toggle("selected");
    }

  }

  function handleDragOver(event) {
    const container = event.target.parentNode.parentNode;
    const afterElement = findAfterElement(container, event.clientY);
    const draggables = document.querySelectorAll(".selected");
    const draggable = document.querySelector(".dragging");

    
    if (draggables.length > 0) {
        draggables.forEach(drag => {
            if (!afterElement) {
                container.appendChild(drag);
            } else {
                container.insertBefore(drag, afterElement);
            }
        })
    } else {
        if (!afterElement) {
            container.appendChild(draggable);
        }  else {
            container.insertBefore(draggable , afterElement);
        }
    }
  }

  function handleDragEnd(event) {
    const draggingRow = event. target;
    draggingRow.classList.remove("dragging");
  }


</script>

<main>
    <tr  id="{song.id}" class="draggable song-container song-container-{index % 2}"
        on:click={handleClick}
        on:dblclick={handleDoubleClick}
        on:dragstart={handleDragStart}
        on:dragover={handleDragOver}
        on:dragend={handleDragEnd}
        draggable="true"
    >
        <td id="song-title">{song.title}</td>
        <td id="song-artist">Artist</td>
        <td id="song-album">Album</td>
  </tr>
</main>

<style>
    .song-container {
      border:black;
      cursor: move;
      user-select: none;
      color: white;
    }
    .song-container-0 {
      background-color: #3a3a3a;
    }
    .song-container-1 {
      background-color: #282828;
    }

    .selected {
      background-color: rgb(0, 0, 41);
    }

    #song-title {
      width: 50vw;
    }

    #song-artist {
      width: 20vw;
    }
    
    #song-album {
      width: 30vw;
    }
</style>