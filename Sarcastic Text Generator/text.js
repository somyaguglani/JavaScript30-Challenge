const textArea = document.querySelector(`.container textarea[name = "input"]`);
const options = document.querySelectorAll(`.container input[name = "options"]`);
const outputPara = document.querySelector(`p`);

textArea.addEventListener(`input`, transformText);

function transformText(event) {
  const value = event.currentTarget.value;
  outputPara.textContent = value;
}
