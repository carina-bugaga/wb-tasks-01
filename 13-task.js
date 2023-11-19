/* Задача на классы и наследование: создайте базовый класс Shape (фигура), 
который имеет методы для расчета площади и периметра. Затем создайте подклассы, 
представляющие различные фигуры, такие как прямоугольник, круг и треугольник. 
Реализуйте методы расчета площади и периметра для каждой фигуры. */

//Класс с двумя неопределенными методами для расчета площади и периметра фигуры
class Shape {
  getArea() {
    throw new Error('Method not defined');
  }
  getPerimeter() {
    throw new Error('Method not defined');
  }
}

//Подкласс Прямоугольника
class Rectangle extends Shape {
  //Переопределяем конструктор
  constructor(a, b) {
    super();
    this.a = a;
    this.b = b;
  }
  //Подсчитываем площадь прямоугольника
  getArea() {
    return this.a * this.b;
  }
  //Подсчитываем периметр прямоугольника
  getPerimeter() {
    return 2 * (this.a + this.b);
  }
}

//Подкласс Круга
class Circle extends Shape {
  //Переопределяем конструктор
  constructor(radius) {
    super();
    this.radius = radius;
  }
  //Подсчитываем площадь круга
  getArea() {
    return Math.PI * this.radius * this.radius;
  }
  //Подсчитываем периметр круга
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  }
}

//Подкласс Треугольника
class Triangle extends Shape {
  //Переопределяем конструктор
  constructor(a, b, c, h) {
    super();
    this.a = a;
    this.b = b;
    this.c = c;
    this.h = h;
  }
  //Подсчитываем площадь треугольника
  getArea() {
    return (this.a * this.h) / 2;
  }
  //Подсчитываем периметр
  getPerimeter() {
    return this.a + this.b + this.c;
  }
}

const rectangle = new Rectangle(4, 5);
console.log('Площадь прямоугольника:', rectangle.getArea());
console.log('Периметр прямоугольника:', rectangle.getPerimeter());

const circle = new Circle(10);
console.log('Площадь круга:', circle.getArea().toFixed(0));
console.log('Периметр круга:', circle.getPerimeter().toFixed(0));

const triangle = new Triangle(4, 5, 6, 6);
console.log('Площадь треугольника:', triangle.getArea());
console.log('Периметр треугольника:', triangle.getPerimeter());
