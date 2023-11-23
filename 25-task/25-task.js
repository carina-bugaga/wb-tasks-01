/* Задача: Создать и добавить стиль для элемента: Напишите функцию, 
которая создает новый элемент, добавляет его в DOM и устанавливает 
для него стиль с помощью CSS. */

//Получаем элемент из DOM
const box = document.getElementById('box')

/**
 * Функция для создания нового элемента с добавлением его в DOM и установкой стилей.
 * @param {String} tagName Строка, указывающая элемент какого типа должен быть создан
 * @param {String} style Строка с перечнем стилей
 * @param {String} text Текстовое содержимое элемента
 */
function createAndStyleElementDOM (tagName, style, text = '') {
  // Создаем новый элемент с указанным тегом
  let newElement = document.createElement(tagName);
  
  // Добавляем текст в элемент
  newElement.innerText = text;
  
  // Устанавливаем стили CSS разными способами
  //Через добавление атрибута style у элемента  
  newElement.setAttribute('style', style)
  //Через отдельное свойство
  newElement.style.backgroundColor = 'plum';
  
  // Добавляем элемент в DOM
  box.append(newElement);
}

createAndStyleElementDOM('div', 'width: 300px; padding: 10px; margin-bottom: 20px; color: white; border: 4px solid pink;', 'New Text Element');
createAndStyleElementDOM('button', 'width: 200px; color: white; border: 4px solid violet; font-size: 18px;', 'Click me!');
