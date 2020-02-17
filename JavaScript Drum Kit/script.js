window.addEventListener(`keydown`, function(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  //   console.log(audio);
  if (!audio)
    //handles keys that don't have values associated to them
    return;
  audio.currentTime() = 0; //rewinds time
  audio.play();
});
