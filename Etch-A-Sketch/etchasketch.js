const canvas = document.querySelector(`.etch-a-sketch`);
const btn = document.querySelector(`.btn`);
const ctx = canvas.getContext(`2d`);
const MOVE_AMOUNT = 10;
const { width, height } = canvas; //easier to write
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
let hue = 0;
ctx.strokeStyle = `hsl(${hue},100%,50%)`;

ctx.lineJoin = `round`;
ctx.lineCap = `round`;
ctx.lineWidth = MOVE_AMOUNT;
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// ...........FUNCTION FOR DRAWING .............

// function draw(options) { //we can pass options object

// object de-structuring
function draw({ key }) {
  hue += 2;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  ctx.beginPath();
  ctx.moveTo(x, y);
  switch (key) {
    case `ArrowUp`:
      y -= MOVE_AMOUNT;
      break;
    case `ArrowDown`:
      y += MOVE_AMOUNT;
      break;
    case `ArrowLeft`:
      x -= MOVE_AMOUNT;
      break;
    case `ArrowRight`:
      x += MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// ................FUNCTION FOR CLEARING CanvasGradient.........

function clearCanvas() {
  canvas.classList.add(`shake`);
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    `animationend`,
    () => canvas.classList.remove(`shake`),
    { once: true }
  ); //so that the listener unbinds itself we pass an object as the third arguement
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y);
  ctx.stroke();
}

// .........FUNCTION FOR HANDLING KEYS AND LISTENERS.........

function handleKey(e) {
  if (e.key.includes(`Arrow`)) {
    e.preventDefault();
    draw({ key: e.key });
  }
}
window.addEventListener(`keydown`, handleKey);
btn.addEventListener(`click`, clearCanvas);
