const wait = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const makePromise = (options) => {
  return new Promise(async (resolve) => {
    const form = document.createElement(`form`);
    form.insertAdjacentHTML(
      `afterbegin`,
      `
    <fieldset>
    <label>${options.title}</label>
    <input type = "text"></input>
    <button type = "submit">Submit</button>
    </fieldset>
    `
    );

    document.body.appendChild(form);

    if (options.cancel) {
      const cancelButton = document.createElement(`button`);
      cancelButton.type = `button`;
    }

    await wait(2000);
    form.classList.add(`open`);
  });
};
