/*Задача о коллекции функций: у вас есть массив функций, напишите код, который вызовет каждую функцию 
в этом массиве и выведет их порядковый номер. Однако, вызов каждой функции должен происходить только 
после вызова предыдущей функции.
Другими словами, нужно выполнить следующие шаги:
-- Вызвать первую функцию из массива.
-- После завершения работы первой функции вызвать вторую функцию.
-- После завершения работы второй функции вызвать третью функцию.
-- И так далее, пока все функции в массиве не будут вызваны по порядку.
*/

//Массив с синхронными функциями
const arrayOfFunctions = [function1(), function2(), function3()];

function function1() { return 'Call function1'; }
function function2() { return 'Call function2'; }
function function3() { return 'Call function3'; }

//Перебор массива, вызов синхронных функций и вывод порядкого номера (начиная с 1)
arrayOfFunctions.forEach((fn, i) => {
  console.log(fn, `Function number - ${i + 1}`);
});


//Массив с асинхронными функциями
const arrayOfAsincFunctions = [functionA(), functionB(), functionC()];
function functionA() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve('Call async function1'); }, 3000);
  });
}
function functionB() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve('Call async function2'); }, 1000);
  });
}
function functionC() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve('Call async function3'); }, 1500);
  });
}

/**
 * Асинхронная функция для последовательного вызова асинхронный функций
 * @param {Function} array Массив асинхронный функций
 */
async function callAsyncFunc (array) {
  //Перебор каждой асинхронной функции
  for (let i = 0; i < array.length; i++) {
    //Используем оператор await для приостановки выполнения до тех пор,
    //пока Promise, возвращаемый асинхронной функцией не завершится
    console.log(await array[i], `Async function number - ${i + 1}`);
  }
};

callAsyncFunc(arrayOfAsincFunctions);