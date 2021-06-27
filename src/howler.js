export function initializeHowl() {

}

export function playHowlerSong() {
    
}




function playSong(song) {
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
}
