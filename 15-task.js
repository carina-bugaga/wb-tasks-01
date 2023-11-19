/* Задача на асинхронность: напишите асинхронную функцию, которая использует 
ключевое слово await для ожидания выполнения других асинхронных операций, 
и возвращает результат выполнения. */


function function1() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve('Call async function1'); }, 3000);
  });
}
function function2() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve('Call async function2'); }, 3000);
  });
}

/**
 * Асинхронная функция для выполнения асинхронный операций
 * @returns {Promise} Результат выполнения операций
 */
async function callAsyncFunc () {
  //Используем await для приостановки выполнения до тех пор,
  //пока Promise, возвращаемый асинхронной функцией не завершится
  const response1 = await function1(); 
  const response2 = await function2();
  return {response1, response2};
}

callAsyncFunc()
  .then(response => console.log(response))