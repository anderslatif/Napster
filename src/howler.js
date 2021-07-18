import Howler from "howler";
import { changeIsPlaying } from "./utils/domSelector.js";

let sound;
let playlistSongs;
let currentlyPlayingIndex = 0;

export function getSound() {
  return sound;
}

export function playSong(song, playlist, playlistIndex) { 
  if (!song) return;

  changeIsPlaying(song.id);
  
  playlistSongs = playlist.songs;
  currentlyPlayingIndex = playlistIndex || playlistIndex === 0 ? playlistIndex : currentlyPlayingIndex;

  sound?.stop();

  sound = new Howler.Howl({
    src: song.path,
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

export function skipSong(changeInSeconds) {
    sound?.seek(sound.seek() + changeInSeconds);
}

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
