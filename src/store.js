import { writable } from "svelte/store";

function songHandler() {
    const { subscribe, set, update } = writable(0);

    return {
        subscribe,
        stopSong: () => console.log("stop song"),
        playSong: () => console.log("play song")
    }
}


function playlistHandler() {
    const loadedPlaylists = [{ name: "default", songs: [] }];
    const { subscribe, set, update } = writable(loadedPlaylists);

    return {
        subscribe,
        updatePlaylist: (playlistName, newPlaylist) => { console.log(playlistName, newPlaylist) }
    };

}

export const songs = songHandler();
export const playlists = playlistHandler();




/* function playSong(song) {
    sound?.stop();
    sound = new Howler.Howl({
      src: song.file.path,
      html5: true,
      onended: () => {
        currentlyPlayingIndex += 1;
        // todo see what happens if the playlist has been played through
        playSong(songs[currentlyPlayingIndex]);
      }
    });

/*     setInterval(() => {
      if (sound.playing()) {
    let width = (sound.seek()/sound.duration())/100;
  }
},300); */


    sound.play();
  } */
