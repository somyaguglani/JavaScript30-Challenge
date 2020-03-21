function Gallery(gallery) {
  if (!gallery) throw new Error(`gallery not found`);

  const imagesArray = gallery.querySelectorAll(`img`);
  const modal = document.querySelector(`.modal`);
  const prevButton = modal.querySelector(`.prev`);
  const nextButton = modal.querySelector(`.next`);
  let currentImage;
  function openModal() {
    modal.classList.add(`open`);
    prevButton.addEventListener(`click`, showPrevImage);
    nextButton.addEventListener(`click`, showNextImage);
  }

  function closeModal() {
    //cmplete this
    modal.classList.remove(`open`);
  }
  //handle keys

  function showPrevImage() {
    showPhoto(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  function showNextImage() {
    showPhoto(currentImage.nextElementSibling || gallery.firstElementChild);
  }
  function showPhoto(e) {
    if (!e) return;
    currentImage = e;
    console.log(e);
    modal.querySelector(`img`).src = e.src;
    modal.querySelector(`h2`).src = e.title;
    modal.querySelector(`p`).src = e.dataset.description;
    openModal();
  }

  imagesArray.forEach(image => {
    image.addEventListener(`click`, function(e) {
      showPhoto(e.currentTarget);
    });
  });
}

const gallery1 = Gallery(document.querySelector(`.gallery1`));
const gallery2 = Gallery(document.querySelector(`.gallery2`));
