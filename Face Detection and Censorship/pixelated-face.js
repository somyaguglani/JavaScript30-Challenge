//----------ASSIGNING VARIABLES AND CONTEXT-------------

const video = document.querySelector(`.video`);
const canvas = document.querySelector(`.first`);
const faceCanvas = document.querySelector(`.second`);
const ctx = canvas.getContext(`2d`);
const faceCtx = faceCanvas.getContext(`2d`);
const faceDetector = new window.FaceDetector();

const inputs = document.querySelectorAll(`.controls input[type = "range"]`);

const options = {
  SIZE: 10,
  SCALE: 1.35
};

// --------------FUNCTION FOR HANDLING EVENTS---------------

inputs.forEach(input => input.addEventListener(`input`, handleEvent));

function handleEvent(event) {
  const input = event.currentTarget;
  options[input.name] = input.value;
}

// -----------FUNCTION FOR PLAYING VIDEO---------------

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

// ----------------FUNCTION FOR DETECTING FACE------------------

async function detect() {
  const faces = await faceDetector.detect(video);
  faces.forEach(drawFace);
  faces.forEach(censorFace);
  requestAnimationFrame(detect);
}

//----------FUNCTION FOR DRAWING FACE------------

function drawFace(face) {
  const { width, height, top, left } = face.boundingBox;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#ffc600";
  ctx.lineWidth = 2;
  ctx.strokeRect(left, top, width, height);
}

//-------------FUNCTION FOR CENSORING FACE--------------

function censorFace({ boundingBox: face }) {
  //destructuring and giving it a name
  faceCtx.imageSmoothingEnabled = false;
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  faceCtx.drawImage(
    video,
    face.x,
    face.y,
    face.width,
    face.height,
    face.x,
    face.y,
    options.SIZE,
    options.SIZE
  );

  const width = options.SCALE * face.width;
  const height = options.SCALE * face.height;
  faceCtx.drawImage(
    faceCanvas,
    face.x,
    face.y,
    options.SIZE,
    options.SIZE,
    face.x - (width - face.width) / 2,
    face.y - (height - face.height) / 2,
    width,
    height
  );
}

populateVideo().then(detect);
