import Howler from "howler";

let sound;
let currentPlaylist;
let currentlyPlayingIndex = 0;

export function playSong(song, playlist, playlistIndex) { 
  if (!song) return;
  
  currentPlaylist = playlist;
  currentlyPlayingIndex = playlistIndex || currentlyPlayingIndex;

  document.querySelectorAll(".isPlaying").forEach(selected => {
    selected.classList.remove("isPlaying");
  });
  document.getElementById(song.id).classList.add("isPlaying");

  sound?.stop();

  sound = new Howler.Howl({
    src: song.file.path,
    html5: true,
    onend: () => {
      currentlyPlayingIndex += 1;
      if (currentlyPlayingIndex <= playlist.songs.length) {
        playSong(playlist.songs[currentlyPlayingIndex], playlist);
      }
    }
  });

  /*setInterval(() => {
      if (sound.playing()) {
    let width = (sound.seek()/sound.duration())/100;
  }
  },300); */

  sound;

  return sound;
}

export function playOrPauseSong(song, playlist) {
  if (!sound) {
    playSong(song, playlist);
    // if song is defined then it starts playing otherwise not 
    return song || false;
  }

  if (sound.playing()) {
    sound.pause();
  } else {
    sound.play();
  }
  
  return sound.playing();
}

export function stopSong() {
  sound?.stop();
}


