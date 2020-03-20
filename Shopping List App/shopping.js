const shoppingForm = document.querySelector(".shopping-form");
const list = document.querySelector(".shopping-list");

// We need an array to hold our state
let items = [];

//--------FUNCTION FOR HANDLING SUBMIT------------

function handleSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  // if its empty, then dont submit it
  if (!name) return;

  const item = {
    name,
    id: Date.now(),
    complete: false
  };
  // Push the items into our state
  items.push(item);
  console.log(`There are now ${items.length} in your state`);
  // Clear the form
  e.target.reset();
  // fire off a custom event that will tell anyone else who cares that the items have been updated!
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

//----------FUNCTION FOR DISPLAYING LIST------------

function displayItems() {
  const html = items
    .map(
      item => `<li class="list__item">
      <input
        value="${item.id}"
        type="checkbox"
        ${item.complete && "checked"}
      >
      <span class="itemName">${item.name}</span>
      <button
      class="list__check-btn"
        aria-label="Remove ${item.name}"
        value="${item.id}"
      >&times;</buttonaria-label="Remove>
  </li>`
    )
    .join("");
  list.innerHTML = html;
}

//----------FUNCTION FOR LOCAL STORAGE---------------

function mirrorToLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
}

//----------FUNCTION FOR RESTORING FROM STORAGE------------

function restoreFromLocalStorage() {
  // pull the items from LS
  const lsItems = JSON.parse(localStorage.getItem("items"));
  if (lsItems.length) {
    // items = lsItems;
    // lsItems.forEach(item => items.push(item));
    // items.push(lsItems[0], lsItems[1]);
    items.push(...lsItems);
    list.dispatchEvent(new CustomEvent("itemsUpdated"));
  }
}

//-------------FUNCTIONS FOR EVENT DELEGATION--------------

//-----------FUNCTION FOR DELETING ITEMS--------------

function deleteItem(id) {
  // update our items array without this one
  items = items.filter(item => item.id !== id);
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

//----------FUNCTION FOR CHECKBOX--------------

function markAsComplete(id) {
  const itemRef = items.find(item => item.id === id);
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

//------------EVENT LISTNERS-------------------

shoppingForm.addEventListener("submit", handleSubmit);
list.addEventListener("itemsUpdated", displayItems);
list.addEventListener("itemsUpdated", mirrorToLocalStorage);
// Event Delegation: We listen or the click on the list <ul> but then delegate the click over to the button if that is what was clicked
list.addEventListener("click", function(e) {
  const id = parseInt(e.target.value);
  if (e.target.matches("button")) {
    deleteItem(id);
  }
  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});
restoreFromLocalStorage();
