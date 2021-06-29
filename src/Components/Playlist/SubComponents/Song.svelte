<script>
  import { findAfterElement } from "../../../utils/draggableutils";
  import { song as sound } from '../../../store.js';
    
  export let song;
  export let playlistName;
  export let index;
  const { artist, album, year, durationString } = song.metadata.common;


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

  function handleDoubleClick(event) {
    sound.playSong(song, playlistName);
  }

  function handleDragStart(event) {
    const draggingRow = event.target;
    draggingRow.classList.add("dragging");
    
    // deselect others if the dragged item is not selected yet another group is already selected
    if (!draggingRow.classList.contains("selected")) {
      document.querySelectorAll(".selected").forEach(selected => {
        selected.classList.remove("selected");
      });
    }
    draggingRow.classList.add("selected");
  }

  function handleDragOver(event) {
    const container = event.target.parentNode.parentNode;
    const afterElement = findAfterElement(container, event.clientY);
    const draggables = document.querySelectorAll(".selected");
    const draggable = document.querySelector(".dragging");

    // not dragging a dom element but dropping a file
    if (!draggable) {
      return;
    }

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
    const draggingRow = event.target;
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
        <td id="song-artist">{artist}</td>
        <td id="song-album">{album}</td>
        <td id="song-length">{durationString}</td>
        <td id="song-year">{year}</td>
  </tr>
</main>

<style>
    .song-container {
      border:black;
      cursor: move;
      color: white;
      font-size: 0.75em;
    }
    .song-container-0 {
      background-color: #3a3a3a;
    }
    .song-container-1 {
      background-color: #303030;
    }

    .selected {
      background-color: rgb(0, 0, 41);
    }

    #song-title {
      width: 40vw;
    }

    #song-artist {
      width: 20vw;
    }
    
    #song-album {
      width: 30vw;
    }

    #song-length {
      width: 5vw;
    }

    #song-year {
      width: 5vw;
    }

    .isPlaying {
      text-decoration: underline;
      
    }
</style>