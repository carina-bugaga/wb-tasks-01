/* Задача реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
-- вычисление N-го числа в ряду Фибоначчи;
-- вычисление всех чисел в ряду Фибоначчи до числа N;
-- вычисление N-го просто числа;
-- вычисление всех простых чисел до числа N. */

//Числа Фибоначчи — элементы числовой последовательности 0, 1, 1, 2, 3, 5, 8, 13, …,
//в которой первые два числа равны 0 и 1, а каждое последующее число равно сумме двух предыдущих чисел.

/**
 * Функция-аналог Math
 */
const MathX = (function() {
  /**
  * Функция, которая вычисляет значение N-го числа в ряду Фибоначчи
  * @param {Number} number Входное значение числа
  * @returns {Number} Число Фибоначчи
  */
  function getFibonacciByNumber(number) {
      if (number <= 1) {
          return number;
      } else {
          return getFibonacciByNumber(number - 1) + getFibonacciByNumber(number - 2);
      }
  }

  /**
  * Функция, которая вычисляет все числа до N-го ряду Фибоначчи
  * @param {Number} number Входное значение числа
  * @returns {Number} [number] Массив чисел
  */
  function getFibonacciArray(number) {
      const array = [];
      for (let i = 0; i <= number - 1; i++) {
          array.push(getFibonacciByNumber(i));
      }
      return array;
  }

  /**
  * Функция, которая проверяет что число является простым
  * @param {Number} number Входное значение числа
  * @returns {Boolean} Булево значение
  */
  function isPrime(number) {
      if (number <= 1) return false;
      for (let i = 2; i * i  <= number; i++) {
          if (number % i === 0) {
              return false;
          }
      }
      return true;
  }

  /**
  * Функция, которая вычисляет N-ое простое число
  * @param {Number} number Входное значение числа
  * @returns {Number} Простое число
  */
  function getPrimeByNumber(number) {
      const array = [];
      let currentNum = 2;
      while (array.length < number) {
        if (isPrime(currentNum)) {
          array.push(currentNum);
        }
        currentNum++;
      }
    return array[number - 1];
  }

  /**
  * Функция, которая вычисляет все простые числа до N-го
  * @param {Number} number Входное значение числа
  * @returns {Number} [number] Массив простых чисел
  */
  function getPrimesArray(number) {
      const array = [];
      for (let i = 2; i <= number; i++) {
          if (isPrime(i)) {
              array.push(i);
          }
      }
      return array;
  }

  return {
      getFibonacciByNumber: getFibonacciByNumber,
      getFibonacciArray: getFibonacciArray,
      getPrimeByNumber: getPrimeByNumber,
      getPrimesArray: getPrimesArray
  };
})();

console.log(MathX.getFibonacciByNumber(5));//3
console.log(MathX.getFibonacciArray(5));//[0, 1, 1, 2, 3]
console.log(MathX.getPrimeByNumber(3));//5
console.log(MathX.getPrimesArray(10));//[2, 3, 5, 7]