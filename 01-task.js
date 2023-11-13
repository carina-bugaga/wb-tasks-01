/* Задача о палиндроме: напишите функцию, которая проверяет, является ли заданная строка палиндромом. 
Палиндром — это строка, которая читается одинаково в обоих направлениях (например, «аргентина манит негра»). */


/**
 * Функция, которая проверяет, является ли заданная строка палиндромом
 * @param {String} str Входное значение строки
 * @returns true или false 
 */
function isPalindromWithReverse(str) {
  //Приводим строку к нижнему регистру и убираем все пробелы
  let strTrim = str.toLowerCase().replaceAll(' ', '');
  //Разбиваем строку на массив, разорачиваем его и объединяем в новую перевернуту строку
  let strReverse = strTrim.split('').reverse().join('');
  //Сравниваем обе строки и возвращаем результат функции
  return strTrim == strReverse ? true : false;
}

console.log(isPalindromWithReverse('аргентина манит негра')); 
console.log(isPalindromWithReverse('это не палиндром'));


/**
 * Функция, которая проверяет, является ли заданная строка палиндромом
 * @param {String} str Входное значение строки
 * @returns true или false 
 */
function isPalindromWithCycle(str) {
  //Приводим строку к нижнему регистру и убираем все пробелы
  let strTrim = str.toLowerCase().replaceAll(' ', '');
  //Находим индекс последнего символа строки
  let lastIndex = strTrim.length - 1;
  //Проходим циклом до середины строки, чтобы сравнивать элементы с начала и конца на равном удалении от середины слова
  for (let i = 0; i < strTrim.length / 2; i++) {
    //Если первый и последний элементы не совпадают, то возвращаем результат функции
    if (strTrim[i] !== strTrim[lastIndex - i]) {
      return false;
    }
  }
  return true;
}

console.log(isPalindromWithCycle('Сел в озере березов лес'));
console.log(isPalindromWithCycle('хороший день'));
