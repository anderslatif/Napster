import Howler from "howler";

let sound;
let currentPlaylist;
let currentlyPlayingIndex = 0;

export function getSound() {
  return sound;
}

export function playSong(song, playlist, playlistIndex) { 
  if (!song) return;
  
  currentPlaylist = playlist;
  currentlyPlayingIndex = playlistIndex || playlistIndex === 0 ? playlistIndex : currentlyPlayingIndex;

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

  sound.play();

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


