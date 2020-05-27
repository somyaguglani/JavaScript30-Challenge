// const wait = (time) => {
//   return new Promise((resolve) => setTimeout(resolve, time));
// };

// const destroyForm = async (form) => {
//   await wait(50);
//   form.remove();
//   form = null; //so that form is also removed from js memory
// };

// const makePromise = (options) => {
//   return new Promise(async (resolve) => {
//     const form = document.createElement(`form`);
//     form.insertAdjacentHTML(
//       `afterbegin`,
//       `
//     <fieldset>
//     <label>${options.title}</label>
//     <input type = "text" name = "input"></input>
//     <button type = "submit">Submit</button>
//     </fieldset>
//     `
//     );

//     document.body.appendChild(form);

//     if (options.cancel) {
//       const cancelButton = document.createElement(`button`);
//       cancelButton.type = `button`;
//       cancelButton.textContent = `Cancel`;
//       form.firstElementChild.appendChild(cancelButton);
//       cancelButton.addEventListener(
//         `click`,
//         async (e) => {
//           resolve(null);
//           destroyForm(form);
//         },
//         { once: true }
//       );
//     }

//     form.addEventListener(
//       `submit`,
//       async (e) => {
//         e.preventDefault();
//         resolve(e.target[1].value);
//         await destroyForm(form);
//       },
//       { once: true }
//     );

//     await wait(500);
//     form.classList.add(`open`);
//   });
// };

// const allButtons = document.querySelectorAll(`[data-question]`);

// allButtons.forEach((button) => {
//   const options = {
//     title: `enter your ${button.dataset.question}`,
//     cancel: button.hasAttribute(`data-cancel`),
//   };
//   button.addEventListener(`click`, async () => {
//     const ans = await makePromise(options);
//     console.log(ans);
//   });
// });
// // console.log(allButtons);

// //what if we want 3 to work consequtively ? the of loop helps us in that way not the others ,eg->

// const constQuestions = async () => {
//   const results = [];
//   const questions = [
//     { title: `what is your name `, cancel: false },
//     { title: `what is your age `, cancel: true },
//     { title: `what is your dog's name `, cancel: false },
//   ];

//   for (question of questions) {
//     const val = await makePromise(question);
//     results.push(val);
//   }
//   return results;
// };

// const go = async () => {
//   const resultOfQuestions = await constQuestions();
//   console.log(resultOfQuestions);
// };
// go();

function Board() {}
Board.prototype.attachListeners = function () {
  const buttons = document.querySelectorAll(`.questions`);
  buttons.forEach((button) => {
    button.addEventListener(`click`, async (e) => {
      console.log();
      const val = await this.generatePrompts({
        title: `what is your  ${e.currentTarget.textContent} `,
        cancel:
          e.currentTarget.getAttribute(`data-cancelable`) == `false`
            ? false
            : true,
      }); //test promise
      console.log(val);
    });
  });
};

Board.prototype.generatePrompts = function ({ title, cancel }) {
  return new Promise((resolve) => {
    const form = document.createElement(`form`);
    form.innerHTML = `<fieldset> 
    <label>${title}</label>
    <input type ="text"></input>
    <button type ="button" class= "submit">Submit</button>
    </fieldset>`;

    document.body.insertAdjacentElement(`afterbegin`, form);
    if (cancel) {
      const cancelButton = document.createElement(`button`);
      cancelButton.textContent = `Cancel`;
      cancelButton.type = `button`;
      form.firstElementChild.insertAdjacentElement(`beforeend`, cancelButton);

      cancelButton.addEventListener(`click`, async () => {
        console.log(`cancelling form`);
        resolve(null);
        await this.destroyForm(500, form);
      });
    }

    const submitButton = document.querySelector(`.submit`);
    submitButton.addEventListener(`click`, async (e) => {
      console.log(`submitting the form`);
      resolve(e.currentTarget.parentElement.querySelector(`input`).value);
      await this.destroyForm(500, form);
    });
    form.classList.add(`visibleNow`);
  });
};

Board.prototype.destroyForm = async function (time, form) {
  await this.wait(time);
  form.remove();
  form = null;
};

Board.prototype.wait = function (time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
const newBoard = new Board();
newBoard.attachListeners();

const multipleQuestions = async () => {
  const result = [];
  const questions = [
    { title: `what is your name`, cancel: false },
    { title: `what is your age`, cancel: true },
    { title: `what is your dog's name`, cancel: true },
  ];

  for (question of questions) {
    await newBoard.wait(1000);
    const val = await newBoard.generatePrompts(question);
    result.push(val);
  }

  console.log(result);
};
multipleQuestions();
