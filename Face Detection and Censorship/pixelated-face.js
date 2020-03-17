const videoElement = document.querySelector(`.video`);
const canvas = document.querySelector(`.first`);
const faceCanvas = document.querySelector(`.second`);
const ctx = canvas.getContext(`2d`);
const faceCtx = faceCanvas.getContext(`2d`);
const faceDetector = new window.FaceDetector();
