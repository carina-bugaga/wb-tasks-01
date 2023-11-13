/* Задача о странных числах: Напишите функцию, которая принимает число и возвращает true, если это число является странным, 
и false в противном случае. Странным числом считается число, которое равно сумме всех своих делителей, кроме самого себя. */

/**
 * Функция, которая проверяет, является ли число странным
 * @param {Number} num Входное значение числа
 * @returns true или false
 */
function isStrangeNumber(num) {
  //Проверка что параметром передано число
  if (typeof num !== 'number') return false;
  //Сумма делителей числа
  let sumDividers = 0;
  //Цикл для поиска делителей (ищем до середины, далее делителей быть не может)
  for (let i = 0; i <= num / 2; i++) {
    //Если деление без остатка, значит увеличиваем сумму делителей
    if (num % i === 0) {
      sumDividers += i;
    }
  }
  return sumDividers == num ? true : false;
}

console.log(isStrangeNumber(496));
console.log(isStrangeNumber(28));
console.log(isStrangeNumber('6'));
