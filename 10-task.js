//Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.

const string = '{"objects":[{"name":"Tony","year":1965},{"name":"Loki","year":1981},{"name":"Tor","year":1983},{"name":"Halk","year":1967}],"key":true}';

/**
 * Функция конвертации строки в JSON, аналог parse()
 * @param {String} string Строка
 * @returns JSON-объект
 */
function stringToJson(string) {
  // Проверка что в парамент передана строка или не пустая строка
  if (typeof string !== 'string' || string.trim() === '') {
      return string;
  }
  //Создаем пустой объект
  let json = {};
  try {
    //Использовуем eval для выполнения кода, в котором строка интерпретируется как объект JSON и присваивается переменной json
    eval(`json = ${string}`);
  //Если возникает ошибка, возвращаем строку
  } catch (error) {
    return string;
  }
  //Возвращаем JSON объект
  return json;
}

console.log(stringToJson(string));