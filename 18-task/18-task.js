/* Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера. */

//Получаем элементы из DOM
const sizeNumber = document.getElementById('size');  

//Очищаем хранилище от данных
localStorage.clear();

try {    
  //Записываем максимальное количество данных с шагом итерации - 100 КВ
  //Берем 10240 KB = 10 MB, т.к. согласно документациям это максимальный localStorage для браузеров
  for (i = 0; i <= 10240; i += 100) {
    //Сохраняем данные в ключ test
    localStorage.setItem('test', new Array(i * 1024).join('a'));
  }
} catch (error) {
  //Удаляем элемент test из локального хранилища    
  localStorage.removeItem('test');
  //Получаем данные последней успешной итерации
  localStorage.setItem('test', i - 100); 
}

sizeNumber.innerHTML = localStorage.getItem('test');
//Очищаем хранилище от тестовых данных
localStorage.clear();
