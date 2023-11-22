/* Вычислить размер коллстэка в основных браузерах: Chrome, Firefox, Opera и Safari (если есть возможность). */

//Получаем элемент из DOM
const sizeNumber = document.getElementById('size');  

//Рекурсивный вызов функции без переменных
let i = 0;
const functionWithoutVariables = () => {
  i++;
  functionWithoutVariables();
};
try {
  functionWithoutVariables();
} catch (e) {
  //Ловим ошибку переполнения стэка и выводим значение счетчика в консоль
  console.log(`Функция вызвалась ${i} раз`);
}

//Рекурсивный вызов функции с тремя переменными
let j = 0;
const functionWithVariables = () => {
  let a = j + 1;
  let b = a + 1;
  let c = b + 1;
  j++;
  functionWithVariables();
};
try {
  functionWithVariables();
} catch (e) {
  //Ловим ошибку переполнения стэка и выводим значение счетчика в консоль
  console.log(`Функция вызвалась ${j} раз`);
}

/**
 * Размер коллстэка равен сумме Контекста Выполнения и Размеру всех переменных внутри функции
 * 
 * CallStack size = (ExecutionStack + n * SizeOfVariables) * N,
 * 
 * где ExecutionStack = 72 байта (после расчета уравнения)
 *     n - число переменных, 
 *     SizeOfVariables = 8 байт, согласно стандарту IEEE 754 64-битное число двойной точности,
 *     N - количество вызовов функции.
 */

sizeNumber.innerHTML = (72 + 3 * 8) * j;
console.log(`Размер коллстека ${72 * i} байт`);
console.log(`Размер коллстека ${(72 + 3 * 8) * j} байт`);

//Firefox  1820064 byte 
//Yandex   1004640 byte 
//Chrome    926880 byte
//Opera     926784 byte
