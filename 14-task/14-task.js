/* Задача на промисы: напишите функцию, которая принимает URL изображения и возвращает промис, 
который разрешается с данными об изображении, когда оно загружено. 
Когда говорится "промис разрешается с данными об изображении", это означает, что промис должен быть успешно 
выполнен (resolved) с данными об изображении после того, как изображение будет загружено. */

/**
 * Функция для загрузки данных изображения по URL адресу
 * @param {String} url URL изображения
 * @returns {Promise<Image>} Загруженное изображение
 */
function loadDataImage (url) {
  return new Promise ((resolve, reject) => {
    //Создаем изображение для хранения ресурса
    const image = document.createElement('img');
    //Событие для успешной загрузки изображения
    image.onload = () => { resolve(image) }
    //Событие для неудачной загрузки изображения
    image.onerror = (error) => { reject(error) }
    //Присваиваем путь для изображения
    image.src = url;
  })
}

loadDataImage('https://images.unsplash.com/photo-1488831861984-179da3647265?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
  .then(img => {
    //Добавляем изображение на страницу
    document.body.appendChild(img);
    //Выводим данные о ширине и высоте изображения
    console.log(`w: ${img.width}, h: ${img.height}`);
  })
  //Обрабатываем сообщение об ошибке
  .catch(err => console.log(err))