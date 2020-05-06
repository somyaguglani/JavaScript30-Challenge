const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const ask = (options) => {
  return new Promise(async (resolve) => {
    //make popup
    const popup = document.createElement(`form`);
    popup.classList.add(`popup`);
    popup.insertAdjacentHTML(
      `afterbegin`,

      `<fieldset>
      <label>${options.title}</label>
      </fieldset>`
    );
    console.log(popup);

    //is cancel button required

    if (options.calcel) {
      const skipButton = document.createElement(`button`);
      skipButton.type = `button`;
      skipButton.textContent = `Cancel`;

      // TODO: listen for clicks on skipButton
    }
    document.body.appendChild(popup);
    await wait(2000);
    popup.classList.add(`open`);
  });
};
