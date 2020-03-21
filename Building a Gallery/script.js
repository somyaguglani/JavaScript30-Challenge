function Gallery(gallery) {
  if (!gallery) return;

  const imagesArray = gallery.querySelectorAll(`img`);
  const modal = document.querySelector(`.modal`);
  const prevButton = modal.querySelector(`.prev`);
  const nextButton = modal.querySelector(`.next`);

  function showPhoto(e) {
    if (!e) return;
    console.dir(e.src, e.title, e.dataset.description);
    modal.querySelector(`img`).src = e.src;
  }

  imagesArray.forEach(image => {
    image.addEventListener(`click`, function(e) {
      showPhoto(e.currentTarget);
    });
  });
}

const gallery1 = Gallery(document.querySelector(`.gallery1`));
const gallery2 = Gallery(document.querySelector(`.gallery2`));
