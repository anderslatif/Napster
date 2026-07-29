import Howler from "howler";
import { pathToFileUrl } from "../utils/pathToFileUrl.js";

let sound;

export function getSound() {
  return sound;
}

export function playSong(song, playlist) { 
  if (!song) return;

  sound?.stop();

  sound = new Howler.Howl({
    src: pathToFileUrl(song.path),
    // taken from the raw path since howler infers the format from the extension
    format: [song.path.split(".").pop().toLowerCase()],
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

