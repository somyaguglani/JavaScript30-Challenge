const form = document.querySelector(`.shopping-form`);
const list = document.querySelector(`.shopping-list`);
let items = [];

//-----------FUNCTION FOR SUBMITTING FORM------------

function handleSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  const item = {
    name: name,
    id: Date.now(),
    completed: false
  };
  e.currentTarget.reset();
  items.push(item);
  list.dispatchEvent(new CustomEvent(`updateList`));
}

//----------FUNCTION FOR DISPLAYING LIST----------

function displayList() {
  const newitems = items.map(item => {
    return `<li>
        <input type = "checkbox" ></input>
        ${item.name}
        <button aria-label = "Remove ${item.name}"type = "submit">&times;</button>
        </li>`;
  });
  list.innerHTML = newitems.join(``);
}

//function for displaying items
//function for displaying
//function for reloading
//function for updation of list
//function for deleting stuff
//function for checkboxes

form.addEventListener(`submit`, handleSubmit);

list.addEventListener(`updateList`, displayList);
