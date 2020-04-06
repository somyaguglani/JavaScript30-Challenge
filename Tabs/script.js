const tabContainer = document.querySelector(`.tabContainer`);
const tabButtons = tabContainer.querySelectorAll(`[role = "tab"]`);
console.log(tabButtons);
const tabPanels = tabContainer.querySelectorAll(`[role = "tabpanel"]`);

const handleClick = (e) => {
  //remove selection from everything else
  tabPanels.forEach((tabpanel) => (tabpanel.hidden = true));
  tabButtons.forEach((button) => button.setAttribute(`area-selected`, false));
  tabPanels.forEach((tabpanel) => {
    if (tabpanel.ariaLabelledby === e.currentTarget.id) {
      console.log(e.currentTarget.id);
      tabpanel.hidden = false;
    }
  });
};

tabButtons.forEach((button) => button.addEventListener(`click`, handleClick));
