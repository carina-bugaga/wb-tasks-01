/* Задача: Взаимодействие с формами: Напишите функцию, которая получает данные 
из формы на веб-странице и выполняет определенные действия с этими данными, 
например, отправляет их на сервер или отображает всплывающее окно с результатами. */

//Получаем элементы из DOM
const firstName = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('number');
const button = document.getElementById('button');

//Регулярное выражение для проверки email
const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

//Ограничиваем ввод number только цифрами
number.oninput = () => {
  number.value = number.value.replace(/[A-Za-zА-Яа-яЁё]/g, '')
}

//Создаем слушатель события по нажатию на кнопку
button.addEventListener('click', () => {
  //Проверяем что все поля заполнены и email валиден
  if (firstName.value !== '' && EMAIL_REGEXP.test(email.value) && number.value !== '')
    sendForm(firstName.value, email.value, number.value)
  }
)

/**
 * Функция для генерации случайного число с 1 до 10 и вывода данных формы
 * @param {String} name Имя пользователя
 * @param {String} email Email пользователя
 * @param {String} number Число для проверки
 */
function sendForm(name, email, number) {
  //Генерируем случайное число
  const secretNumber = Math.ceil(Math.random() * 10);

  //Проверяем угадано ли введёное число
  if (Number(number) !== secretNumber) {
    alert(`Увы ${name}, даже магия тебе не помогла.. Это - ${secretNumber}`);
  } else if (Number(number) === secretNumber) {
    alert(`${name}, ты выиграл, подробности пришлем на почту ${email}`);
  }
}
