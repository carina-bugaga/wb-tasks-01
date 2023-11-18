// Реализовать функцию конвертации JSON в строку.

//
const json = {
  "objects": [
    {"name":"Tony","year":1965},
    {"name":"Loki","year":1981},
    {"name":"Tor","year":1983},
    {"name":"Halk","year":1967}
  ],
  "key": true
};

/**
 * Функция конвертации JSON в строку, аналог stringify()
 * @param {*} json JSON
 * @returns JSON-строка
 */
function jsonToString(json) {
  //Проверяем является ли объект массивом
  const isArray = Array.isArray(json);

  //Если объект не массив, то получаем ключи объекта
  const keys = Object.keys(json);
  //Создаем пустой массив для хранения отформатированных строк
  const result = [];
  //Перебор ключей объекта
  for (let key of keys) {
    //Форматируем значение ключа в зависимости от типа объекта (массив или объект)
    key = isArray ? '' : `"${key}":`;
    //Получаем значение по текущему ключу
    let value = json[key];
    //Форматируем значение в зависимости от его типа
    if (typeof value === 'string') {
      value = `"${value}"`;
    //Рекурсивно вызывает функция для вложенных объектов
    } else if (typeof value === 'object') {
      value = jsonToString(value)
    } else {
      value = value;
    }
    
    //Добавляем пары ключ-значение в массив
    result.push(`${key}${value}`);
  }

  //Возвращаем отформатированную JSON строку в зависимости от типа объекта (массив или объект)
  if (isArray) {
    return `[${result.join(',')}]`;
  } else {
    return `{${result.join(',')}}`;
  }
}

console.log(jsonToString(json));

//Используем stringify()
console.log(JSON.stringify(json));