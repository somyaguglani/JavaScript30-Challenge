const canvas = document.querySelector(`.etch-a-sketch`);
const btn = document.querySelector(`.btn`);
const ctx = canvas.getContext(`2d`);
// console.dir(canvas);
const { width, height } = canvas; //easier to write
console.log(width + ` ` + height);
console.log(ctx);
ctx.lineJoin = `round`;
ctx.lineCap = `round`;
ctx.lineWidth = 10;
ctx.beginPath();
ctx.moveTo(200, 200);
ctx.lineTo(200, 200);
ctx.stroke();
