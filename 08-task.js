/* Задача о замыканиях: напишите функцию, которая будет принимать массив функций и возвращать новую функцию, 
которая вызывает каждую функцию в этом массиве и возвращает массив результатов, полученных после вызова каждой функции.*/

//Массив с функциями
const arrayOfFunctions = [function1(), function2(), function3()];

function function1() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve('Call async function1'); }, 3000);
  });
}
function function2() { return 'Call function2'; }
function function3() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve('Call async function3'); }, 1500);
  });
}

/**
 * Функция с замыканием для последовательного вызова асинхронных и синхронных функций
 * @param {Function} array Массив функций
 * @returns Асинхронная функция
 */
function callFunc (array) {
  //Асинхронная функция, для вызова каждой функции в массиве 
  return (async function () {
    //Используем Promise.all для ожидания выполнения всех функций в массиве
    return await Promise.all(array.map(fn => fn))
      //Выводим массив значений от всех промисов
      .then(results => console.log(results));
  }) ();
};

callFunc(arrayOfFunctions);