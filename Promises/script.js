//basics of promises

function Pizza(toppings) {
  const pizzaPromise = new Promise(function (resolved, rejected) {
    setTimeout(function () {
      resolved(`here is your baked pizza - ${toppings.join(` `)}`);
    }, 2000);
  });
  return pizzaPromise;
}

const pizzaPromise1 = new Pizza([`olives`, `extra cheese`, `juicy chicken`]);
const pizzaPromise2 = new Pizza([`tomato`, `extra cheese`, `corn`]);
const pizzaPromise3 = new Pizza([`tomato`, `extra cheese`]);
// console.log(pizzaPromise1);
// pizzaPromise1
//   .then(function (message) {
//     console.log(message);
//     return new Pizza([`tomato`, `extra cheese`, `corn`]);
//   })
//   .then(function (message) {
//     console.log(message);
//     return new Pizza([`tomato`, `extra cheese`, `corn`, `last`]);
//   });

const dinnerPromise = Promise.all([
  pizzaPromise1,
  pizzaPromise2,
  pizzaPromise3,
]).then(function (pizza) {
  console.log(pizza);
});

const firstPizza = Promise.race([pizzaPromise1, pizzaPromise2, pizzaPromise3]);
firstPizza.then(function (pizza) {
  console.log(`you got the first pizza ${pizza}`);
});
