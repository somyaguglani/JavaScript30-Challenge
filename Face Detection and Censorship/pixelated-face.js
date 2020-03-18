const video = document.querySelector(`.video`);
const canvas = document.querySelector(`.first`);
const faceCanvas = document.querySelector(`.second`);
console.log(video, canvas, faceCanvas);
const ctx = canvas.getContext(`2d`);
const faceCtx = faceCanvas.getContext(`2d`);
const faceDetector = new window.FaceDetector();
ctx.strokeStyle = "#ffc600";

async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 }
  });
  video.srcObject = stream;
  await video.play();
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

async function detect() {
  const faces = await faceDetector.detect(video);
  console.log(faces);
  faces.forEach(drawFace);
  faces.forEach(censorFace);
  //   requestAnimationFrame(detect);
}

function drawFace(face) {
  const { width, height, top, left } = face.boundingBox;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  ctx.strokeRect(left, top, width, height);
}
function censorFace() {}

populateVideo().then(detect);
