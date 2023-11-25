/* Разработайте страницу, отображающую таблицу с данными. Данные необходимо подгружать из этого источника.
   Требования:
-- данные должны загружаться при загрузке страницы;
-- необходимо реализовать сортировку по убыванию и по возрастания для всех колонок;
-- необходимо реализовать клиентскую пагинацию (50 элементов на странице). */

//Добавляем обработчик события, когда документ полностью загружен  
document.addEventListener("DOMContentLoaded", async function() {
  await getData();
  buildTable();
});

//Пустой массив для хранения результата запроса
let responseArray = [];
//Объект с начальными состояниями текущей страницы, количеством строк на странице, количеством элементов пагинации
let state = {
  'currentPage': 1,
  'rows': 50,
  'showNumberPagination': 5,
}

//Добавляем обработчики события на click по заголовкам таблицы 
document.querySelectorAll('th').forEach(th => 
  th.addEventListener('click', () => {
    //Получаем значения заголовка столбца, типа сортировки и текста столбца
    let column = th.dataset.column;
    let order = th.dataset.order;
    let text = th.innerText;
    //Удаляем символ стрелки у столбца
    text = text.substring(0, text.length-2);
    
    //Если значение data атрибута по убыванию
    if (order === 'desc') {
      //Меняем значение data атрибута и добавляем символ стрелки к тексту столбца 
      th.dataset.order = 'asc';
      th.innerText = text + ' ▼';
      //Сортирируем массив по возрастанию
      responseArray = responseArray.sort((a,b) => {
        //Проверяем тип содержимого ячейки
        //Если string, то приводим всё к верхнему регистру
        if (typeof a[column] === 'string') {
          return a[column].toUpperCase() > b[column].toUpperCase() ? 1 : -1;
        } else {
          //Для числел
          return a[column] > b[column] ? 1 : -1;
        }
      })
      //Если значение data атрибута по возрастанию
    } else {
      //Меняем значение data атрибута и добавляем символ стрелки к тексту столбца 
      th.dataset.order ='desc';
      th.innerText = text + ' ▲';
      //Сортирируем массив по убыванию
      responseArray = responseArray.sort((a,b) => {
        //Проверяем тип содержимого ячейки
        //Если string, то приводим всё к верхнему регистру
        if (typeof a[column] === 'string') {
          return a[column].toUpperCase() < b[column].toUpperCase() ? 1 : -1;
        } else {
          //Для числел
          return a[column] < b[column] ? 1 : -1;
        }
      })
    }

  //Строим таблицу на основе отсортированного массива
  buildTable();
}))

/**
 * Асинхронная функция для получения данных JSON
 */
async function getData() {
  const response = await fetch('http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true'); 
  try {
    responseArray = await response.json();
  } catch (error) {
    //Выводим ошибку
    console.log(error); 
  }
}

/**
 * Функция для отображения данных в таблице
 */
function buildTable() {
  //Получаем тело таблицы
  let table = document.getElementById('tableJSON');
  table.innerHTML = '';

  //Используем pagination() для получения данных, которые будут отображены на текущей странице
  let paginationData = pagination(responseArray, state.currentPage, state.rows);
  //Перебораем и отрисовываем данные текущей страницы пагинации
  paginationData.data.forEach( data => {
    //Генерируем строки таблицы
    let row = `<tr> 
                  <td>${data.fname}</td>
                  <td>${data.lname}</td>
                  <td>${data.tel}</td>
                  <td>${data.address}</td>
                  <td>${data.city}</td>
                  <td>${data.state}</td>
                  <td>${data.zip}</td>
              </tr>
    `
    table.innerHTML +=row
  })

  //Используем pageButtons() для отображения кнопок пагинации
  pageButtons(paginationData.pages);
}

/**
 * Пагинация данных
 * @param {Object} [data] Массив данных
 * @param {Number} currentPage Номер текущей страницы
 * @param {Number} rows Количество строк на странице
 * @returns {Object} Объект с данными текущей страницы и общим количеством страниц
 */
function pagination(data, currentPage, rows) {
  //Вычисляем общее количество страниц и округляем вверх
  let pages = Math.round(data.length / rows);

  //Определяем индекс первой и послeдней строки, которые будут отображены на текущей странице
  let startRow = (currentPage - 1) * rows;
  let endRow = startRow + rows;
  //Возвращаем подмассив из диапазона строк текущей страницы
  let currentPageData = data.slice(startRow, endRow);

  return {
    'data': currentPageData,
    'pages': pages,
  }
}

/**
 * Генерация кнопок нумерации на основе количества страниц
 * @param {Number} pages Общее число страниц
 */
function pageButtons(pages) {
  //Получаем обёртку для хранения кнопок пагинации
  let wrapper = document.getElementById('pagination-wrapper');
  wrapper.innerHTML = '';

  //Вычисляем максимальное количество левой и правой страниц
  let maxLeftPage = (state.currentPage - Math.floor(state.showNumberPagination / 2));
  let maxRightPage = (state.currentPage + Math.floor(state.showNumberPagination / 2));
  //Если maxLeftPage меньше 1
  if (maxLeftPage < 1) {
    //Установливаем maxLeftPage = 1 и корректируем maxRightPage
    maxLeftPage = 1;
    maxRightPage = state.showNumberPagination;
  }

  //Если maxRightPage больше общего числа страниц
  if (maxRightPage > pages) {
    //Корректируем maxLeftPage 
    maxLeftPage = pages - (state.showNumberPagination - 1);
    //Так как maxLeftPage не может быть меньше 1
    if (maxLeftPage < 1){
      maxLeftPage = 1;
    }
    maxRightPage = pages;
  }
  
  //Перебираем от maxLeftPage до maxRightPage и отображаем кнопки номеров страниц
  for (let page = maxLeftPage; page <= maxRightPage; page++) {
    //Для текущей страницы устанволиваем свой стиль
    if (page == state.currentPage) {
      wrapper.innerHTML += `<button value=${page} class="button active">${page}</button>`;
    } else {
      wrapper.innerHTML += `<button value=${page} class="button">${page}</button>`;
    }
  }

  //Добавляем кнорку перехода на первую страницу 
  if (state.currentPage != 1) {
    wrapper.innerHTML = `<button value=${1} class="button">&#171;</button>` + wrapper.innerHTML;
  }
  
  //Добавляем кнорку перехода на последнюю страницу 
  if (state.currentPage != pages) {
      wrapper.innerHTML += `<button value=${pages} class="button">&#187;</button>`;
  } 

  //Добавляем обработчики события на click по кнопкам пагинации и перерисовываем таблицу
  document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
      state.currentPage = Number(button.value);
      buildTable();
    })
  })
}
