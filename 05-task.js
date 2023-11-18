/* Разработайте функцию преобразования JSON в связный список. На входе функция должна получать JSON, 
содержащий список объектов, на выходе объект, представляющий из себя односвязный список. */

//Односвязный список - структура данных, в которой несколько значений хранятся линейно;
//каждое значение сохраняет ссылку на следующий узел.

const json = [
  {"name":"Tony","year":1965},
  {"name":"Loki","year":1981},
  {"name":"Tor","year":1983},
  {"name":"Halk","year":1967}
];

//Класс узла односвязного списка
class LinkedListNode {
  //Инициализируем объект с двумя свойствами
  constructor(value, next = null) {
    //Текущее значение
    this.value = value;
    //Ссылка на следующий узел в списке
    this.next = next;
  }
}

//Класс односвязного списка
class LinkedList {
  //Инициализируем объект с двумя свойствами
  constructor() {
    //Ссылка на узел в начале списка
    this.head = null;
    //Ссылка на узел в конце списка
    this.tail = null;
  }
  //Метод, который создаёт новый узел и добавляет его в конец списка
  appendNode(value) {
    //Создаем новый узел
    const newNode = new LinkedListNode(value);

    //Если список пуст, тогда создается список с 1 элементом
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    //Добавляем новый узел у концу списка, меняем ссылку с null на новый узел
    this.tail.next = newNode;
    //Меняем ссылку конца на новый узел
    this.tail = newNode;
    //Возвращаем текущий список
    return this;
  }
  //Метод, который возвращает голову head списка
  getHeadList() {
    return this.head;
  }
}

/**
 * Преобразование JSON в связный список.
 * @param {String} json JSON строка
 * @returns Односвязный список
 */
function transformJSONtoLinkedList(json) {
  //Создаем новый список
  const linkedList = new LinkedList();
  //Проверка что массив не пустой
  if (json.length == 0) return;
  //Перебираем массив и добавляем каждый элемент в список
  json.forEach(el => linkedList.appendNode(el));
  //Возвращаем голову списка
  return linkedList.getHeadList();
}

console.log(transformJSONtoLinkedList(json));
