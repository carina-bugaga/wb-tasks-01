/* Необходимо реализовать простое поле ввода адреса с функцией геокодинга: 
пользователь вводит данные в поле с помощью одного из геоинформационных 
сервисов (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес. 
Найденные данные должны отображаться в выпадающем списке, из которого 
можно выбрать подходящее значение.

Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий. */

//Получаем элементы из DOM
const addressWrapper = document.querySelector('.address-input');
const input = document.querySelector('#input-address');
const selectBox = document.querySelector('#select-box');

//Создаем слушатель события на ввод текста в input
input.addEventListener("input", function(event) {
  //Отправка запроса при непустом значении
  if (event.target.value !== '') {
    //Используем функцию-обертку дебаунсер
    //Подходит для конечного результата, например ввод в строку поиска
    debounce(getData(event.target.value), 200);
    //Используем функцию-обертку троттлинг
    //Подходит для игнорирования частых вывовов, например resize окна или движение мышки
    //throttle(getData(event.target.value), 1000);
  }
});

/**
 * Асинхронная функция для получения данных с API
 */
async function getData() {
  const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=84938e35-127e-4426-b5c8-a6350d32ad82&geocode=${input.value}&format=json`); 
  
  try {
    const json = await response.json();
    const jsonAddress = json.response.GeoObjectCollection.featureMember;
    selectBox.innerHTML = ''
    //Перебираем массив результатов
    jsonAddress.forEach(el => {
      //Создаем элемент для хранения адреса
      const option = document.createElement('li');
      //Устанавливаем содержимое элемента
      option.innerHTML = `${el.GeoObject.name} ${el.GeoObject.description ? ', ' + el.GeoObject.description : ''}`;
      //Добавляем в родительский контейнер и устанавливаем класс
      selectBox.append(option);
      addressWrapper.classList.add('active');

      //Создаем слушателя события на click по адресу
      option.addEventListener('click', event => {
        //Устанавливаем подходящий адрес в input
        input.value = event.target.innerHTML
        addressWrapper.classList.remove('active');
      })
    })
  } catch (error) {
    //Выводим ошибку
    console.log(error); 
  }
}

/**
 * Функция-обертка дебаунсер для ограничения числа выполнений функции в промежутке времени
 * @param {*} func Функция для выполнения запроса
 * @param {*} ms Время задержки, в миллисекундах
 * @returns 
 */
function debounce(func, ms) {
  let timeout;
  return function() {
    //Записываем функцию с передачей аргументов
    let funcCall = () => {func.apply(this, arguments)};
    //Отменяем setTimeout
    clearTimeout(timeout);
    //Вызов функции с задержкой
    timeout = setTimeout(funcCall, ms);
  }
}

/**
 * Функция-обертка троттлинг для ограничения числа запросов в единицу времени
 * @param {*} func Функция для выполнения запроса
 * @param {*} ms Время задержки, в миллисекундах
 * @returns 
 */
function throttle(func, ms) {
  //Переменная отвечает за наличия задержки
  let isThrottled = false;
  let saveArgs, saveThis;
  function wrapper() {
    //Если есть задержка
    if(isThrottled) {
      //Сохраняем текущие аргументы и контекст
      saveArgs = arguments;
      saveThis = this;
      return;
    }
    //Передаем все аргументы, с которыми была вызвана функция
    func.apply(this, arguments);
    //Отмечаем наличие задержки
    isThrottled = true;
    //Вызов функции через указанное время в ms
    setTimeout(() => {
      isThrottled = false;
      //Если есть аргументы, полученные во время задержки
      if(saveArgs) {
        //Вызываем функцию с сохраненными аршементами и обнуляем их
        wrapper.apply(saveThis, saveArgs);
        saveArgs = saveThis = null;
      }
    }, ms);
  }
  return wrapper;
}