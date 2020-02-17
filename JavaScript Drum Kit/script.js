function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  //for classes we use dots for others we don't
  //for handling conditions when value is null
  if (!audio) return;
  audio.currentTime = 0; //rewinds time
  audio.play();
  key.classList.add(`pressing`);
}
function removeTransition(e) {
  if (e.propertyName !== `transform`) return;
  this.classList.remove(`pressing`);
}
const keys = document.querySelectorAll(`.key`);
//we call functions without using () like given below
keys.forEach(key => key.addEventListener(`transitionend`, removeTransition));
window.addEventListener(`keydown`, playSound);
