/* Задача: Создать и добавить элемент с использованием шаблонов: 
Напишите функцию, которая создает новый элемент с использованием шаблонов 
(например, с помощью тега <template>) и добавляет его в DOM. */

//Получаем элементы из DOM
const button = document.querySelector('.button');
const productsList = document.querySelector('.products-list')
const template = document.getElementById('template')

//Создаем слушатель события по нажатию на кнопку
button.addEventListener('click', () => {
  createFromATemplate();
})

/**
 * Функция для создания нового элемента по шаблону
 */
function createFromATemplate () {
  //Клонируем содержимое тега template
  const item = template.content.cloneNode(true);

  //Добавляем склонированный элемент на страницу
  productsList.append(item);
}