/* Задача: Добавить анимацию для элемента: Напишите функцию, которая добавляет 
анимацию для элемента на веб-странице, например, плавное изменение его положения или размера. */

//Получаем элементы из DOM
let buttons = document.querySelectorAll('button');

//Перебираем всю коллекцию кнопок
buttons.forEach(btn => {
  //Создаем слушатель события по нажатию на кнопку
  btn.addEventListener('click', event => {
    addRipplesAnimation(event, btn);
  })
})

/**
 * Функция для добавления анимации в виде ряби 
 * @param {Object} event Объект события
 * @param {HTMLElement} element HTML элемент
 */
function addRipplesAnimation (event, element) {
  //Получаем координаты клика относительно элемента
  let x = event.clientX - event.target.offsetLeft;
  let y = event.clientY - event.target.offsetTop;

  //Создаем элемент для анимации и позиционируем его
  let ripples = document.createElement('span');
  ripples.style.left = x + 'px';
  ripples.style.top = y + 'px';

  //Вставляем span внутрь элемента
  element.appendChild(ripples);
  //Через 0.8с удаляем элемент ряби из DOM
  setTimeout(() => {ripples.remove()}, 800);
}