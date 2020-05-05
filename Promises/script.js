//basics of promises

function Pizza(toppings) {
  //reject if toppings include pinapple pizza
  const pizzaPromise = new Promise(function (resolved, rejected) {
    if (toppings.includes(`pineapple`)) rejected(`seriously? get out `);
    setTimeout(function () {
      resolved(`here is your baked pizza - ${toppings.join(` `)}`);
    }, 2000);
  });
  return pizzaPromise;
}

const pizzaPromise1 = Pizza([`olives`, `extra cheese`]);
// pizzaPromise1
//   .then(function (message) {
//     console.log(message);
//   })
//   .catch(function (message) {
//     console.log(`you got rejected`);
//     console.log(message);
//   });

const pizzaPromise2 = Pizza([`tomato`, `extra cheese`, `corn`, `pineapple`]);
const pizzaPromise3 = Pizza([`tomato`, `extra cheese`]);
// console.log(pizzaPromise1);
// pizzaPromise1
//   .then(function (message) {
//     console.log(message);
//     return Pizza([`tomato`, `extra cheese`]);
//   })
//   .then(function (message) {
//     console.log(message);
//     return Pizza([`tomato`, `extra cheese`, `corn`, `last`, `pineapple`]);
//   })
//   .catch(function (message) {
//     console.log(`you got rejected`);
//     console.log(message);
//   });
const dinnerPromise = Promise.allSettle([
  pizzaPromise1,
  pizzaPromise1,
  pizzaPromise3,
]).then((things) => console.log(things));

// const dinnerPromise = Promise.all([
//   pizzaPromise1,
//   pizzaPromise2,
//   pizzaPromise3,
// ]).then(function (pizza) {
//   console.log(pizza);
// });

// const firstPizza = Promise.race([pizzaPromise1, pizzaPromise2, pizzaPromise3]);
// firstPizza.then(function (pizza) {
//   console.log(`you got the first pizza ${pizza}`);
// });
