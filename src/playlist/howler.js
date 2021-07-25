import Howler from "howler";
import { changeIsPlaying } from "../utils/domSelector.js";
// import { playlist } from "../store.js";

let sound;

export function getSound() {
  return sound;
}

export function playSong(song, playlist) { 
  if (!song) return;

  changeIsPlaying(song.id);
  
  sound?.stop();

  sound = new Howler.Howl({
    src: song.path,
    html5: true,
    onend: () => {
      playlist.playNext();
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

export function skipSong(changeInSeconds) {
    sound?.seek(sound.seek() + changeInSeconds);
}

// fixme move the logic below to Playlist
export function updatePlaylistSongs(songs) {
  playlistSongs = songs;
}

export function updateCurrentlyPlayingIndex(playlist) {
  if (sound) {
    const newIndex = playlist.findIndex(song => song.file.path === sound._src);
    currentlyPlayingIndex = newIndex
  }
}

export function updateCurrentPlaylist(newPlaylist) {
  updateCurrentlyPlayingIndex(newPlaylist);
  playlistSongs = newPlaylist.songs;
}
