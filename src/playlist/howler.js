import Howler from "howler";
import { changeIsPlaying } from "../utils/domSelector.js";

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
    volume: 0.8,
    onend: () => {
      window.electron.send("toMainPlayNext");
    }
  });

  sound.play();
}

export function playOrPauseSong() {
  if (!sound) return;

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

