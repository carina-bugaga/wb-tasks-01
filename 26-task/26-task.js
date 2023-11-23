/* Задача: Рекурсивный обход дерева DOM: Напишите функцию, которая 
рекурсивно обходит дерево DOM, начиная с указанного элемента, и выполняет 
определенное действие с каждым узлом (например, выводить информацию о теге в консоль). */

//Получаем элементы из DOM
let parentBox1 = document.getElementById('parent-box-1');
let parentBox2 = document.getElementById('parent-box-2');

/**
 * Рекурсивный обход DOM дерева
 * @param {HTMLElement} parentElement Текущий узел
 */
function recursionDOMTree (parentElement) {
  //Выводим информацию о теге в консоль
  console.log(`tag: ${parentElement.tagName}`);

  //Рекурсивно вызываем функцию для каждого дочернего элемента
  for (const child of parentElement.children) {
    recursionDOMTree(child);
  }
}

recursionDOMTree(parentBox1);
recursionDOMTree(parentBox2);