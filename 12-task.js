/* Задача на работу с объектами: создайте объект, представляющий собой книгу. 
Объект должен иметь свойства, такие как: название книги, автор и год издания. 
Напишите методы для получения и изменения значений свойств книги. */

let book = {
  title: "Alice's Adventures in Wonderland",
  author: "Lewis Carroll",
  year: 1865,
  
  //Метод для получения названия книги
  getTitle() { 
    return this.title; 
  },
  //Метод для получения автора книги
  getAuthor() {
    return this.author;
  },
  //Метод для получения года издания книги
  getYear() {
    return this.year;
  },
  //Метод для изменения названия книги
  setTitle(newTitle) {
    this.title = newTitle;
  },
  //Метод для изменения автора книги
  setAuthor(newAuthor) {
    this.author = newAuthor;
  },
  //Метод для изменения года издания книги
  setYear(newYear) {
    this.year = newYear;
  }
};

book.setTitle("The Lord of the Rings: The Fellowship of the Ring");
book.setAuthor("John Ronald Reuel Tolkien");
book.setYear(1954);
console.log(book.getTitle());
console.log(book.getAuthor());
console.log(book.getYear());