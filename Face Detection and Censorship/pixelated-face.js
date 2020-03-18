const video = document.querySelector(`.video`);
const canvas = document.querySelector(`.first`);
const faceCanvas = document.querySelector(`.second`);
console.log(video, canvas, faceCanvas);
const ctx = canvas.getContext(`2d`);
const faceCtx = faceCanvas.getContext(`2d`);
const faceDetector = new window.FaceDetector();

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
  faces.forEach(draw);
  faces.forEach(censor);
  requestAnimationFrame(detect);
}
populateVideo().then(detect);
