const wait = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const destroyForm = async (form) => {
  await wait(50);
  form.remove();
  form = null; //so that form is also removed from js memory
};

const makePromise = (options) => {
  return new Promise(async (resolve) => {
    const form = document.createElement(`form`);
    form.insertAdjacentHTML(
      `afterbegin`,
      `
    <fieldset>
    <label>${options.title}</label>
    <input type = "text" name = "input"></input>
    <button type = "submit">Submit</button>
    </fieldset>
    `
    );

    document.body.appendChild(form);

    if (options.cancel) {
      const cancelButton = document.createElement(`button`);
      cancelButton.type = `button`;
      cancelButton.textContent = `Cancel`;
      form.firstElementChild.appendChild(cancelButton);
      cancelButton.addEventListener(
        `click`,
        async (e) => {
          resolve(null);
          destroyForm(form);
        },
        { once: true }
      );
    }

    form.addEventListener(
      `submit`,
      async (e) => {
        e.preventDefault();
        resolve(e.target[1].value);
        await destroyForm(form);
      },
      { once: true }
    );

    await wait(500);
    form.classList.add(`open`);
  });
};

const allButtons = document.querySelectorAll(`[data-question]`);

allButtons.forEach((button) => {
  const options = {
    title: `enter your ${button.dataset.question}`,
    cancel: button.hasAttribute(`data-cancel`),
  };
  button.addEventListener(`click`, async () => {
    const ans = await makePromise(options);
    console.log(ans);
  });
});
// console.log(allButtons);

//what if we want 3 to work consequtively ? the of loop helps us in that way not the others ,eg->

const constQuestions = async () => {
  const results = [];
  const questions = [
    { title: `what is your name `, cancel: false },
    { title: `what is your age `, cancel: true },
    { title: `what is your dog's name `, cancel: false },
  ];

  for (question of questions) {
    const val = await makePromise(question);
    results.push(val);
  }
  return results;
};

const go = async () => {
  const resultOfQuestions = await constQuestions();
  console.log(resultOfQuestions);
};
go();
