/* Реализовать виджет, отображающий список постов из любого паблика в VK 
(подойдет любой паблик, где постов очень много). Например, с помощью функции API VK. 
Виджет должен иметь фиксированные размеры и возможность прокрутки. 
При прокрутке содержимого виджета до конца должны подгружаться новые посты. 
Необходимо реализовать возможность кэширования уже загруженных данных: если 
пользователь закрыл страницу, а потом снова открыл ее, виджет должен отображать 
все загруженные ранее данные (новые данные должны подгружаться из учетом уже загруженных ранее).
При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми. */

/* ☝☝☝ Реализовать функцию подсчета объема памяти занимаемого данными в LocalStorage для предыдущей задачи. ☝☝☝
При изменении данных в localStorage в консоль должен выводиться объем занятой памяти / максимальный размер 	хранилища.  */

//Константы с параметрами запроса
const serviceKey = '999248d1999248d1999248d1e39a84266599992999248d1fcf06b22f7a8ff576d98978a';
const ownerID = '-22822305';
const count = 5;
const maxCount = 100;

//Смещение, необходимое для выборки уже загруженных постов
let offset = 0;
//Кэш
let cache = [];
//Идентификатор загрузки постов
let isLoadingPosts = false;

//Получаем элемент из DOM
const wall = document.getElementById('wall')

/**
 * Кросс-доменный запрос с использованием JSONP (из документации к API)
 * @param {Function} callback Имя функции, которая будет вызвана при получении результата
 */
function getJSONPRequest(callback) {
  isLoadingPosts = true;
  const script = document.createElement('script');
  script.src = `https://api.vk.com/method/wall.get?access_token=${serviceKey}&owner_id=${ownerID}&offset=${offset}&count=${count}&v=5.199&callback=${callback.name}}`;
  document.head.appendChild(script);
}

//Получаем максимальный объем хранилища при загрузке страницы
let maxSize = getMaxLocalStorageSize();

//Первоначальная загрузка постов
loadingPosts();

/**
 * Получение данных постов из запроса
 * @param {Object} result Результат запроса
 */
function getPosts(result) {
  isLoadingPosts = false;
  try {
    //Получаем посты из запроса и сохраняем их в кэш
    const posts = result.response.items;
    cache = cache.concat(posts);
    //Увеличиваем смещение постов, которые уже закэшированы
    offset += count;
    console.log(offset);
    //При переполнении кэша вытесняем данные загруженные первыми и обновляем кэш постов
    if (cache.length > maxCount) {
      const postsToDelete = cache.length - maxCount;
      cache = cache.slice(postsToDelete)
      localStorage.setItem('cachePosts', cache)
    }

    //Отображение постов на странице
    buildWall(posts);

    //Сохраняем данные и смещение в кэш 
    localStorage.setItem('cachePosts', JSON.stringify(cache));
    localStorage.setItem('cacheOffset', offset);
    
    //Получаем занятый объем LocalStorage после кэширования постов
    let currentSize = getLocalStorageSize();
    //Выводим данные об объёме LocalStorage
    console.log("Объем занятой памяти: " + currentSize.toFixed(0) + " Kb / " + maxSize + " Kb");
    console.log("Занято: " + ((currentSize / maxSize) * 100).toFixed(2) + "%");

  } catch (error) {
    console.log(error);
  }
}

/**
 * Отрисовка постов на стринице
 * @param {Object} posts Массив из постов
 */
function buildWall (posts) {
  posts.forEach(post => {
    //Если URL изображения, тогда добавляем её в разметку поста
    let image = '';
    if (post.attachments[0]?.photo?.sizes[2].url) {
      image = `<div class="image-box">
                        <img src="${post.attachments[0]?.photo?.sizes[2].url}" alt="post image" class="image" />
                      </div> `
    }

    //Фоматируем дату поста
    const options = {hour: 'numeric', minute: 'numeric'}
    let date = new Date(post.date*1000).toLocaleDateString('ru-RU', options);

    let item = `<div class="post"> 
                  <p class="text">${post.text}</p>
                  <span class="date">${date}</span>
                  ${image}
              </div>
              `;
    //Добавляем посты на стену          
    wall.innerHTML += item;
  })
}

/**
 * Загрузка постов
 */
function loadingPosts() {
  //Получаем данные постов и смещение из кэша по ключу
  const cachePosts = localStorage.getItem('cachePosts');
  const cacheOffset = Number(localStorage.getItem('cacheOffset'));

  //Если есть закэшированные посты и смещение отлично от кэшированного,
  //тогда отрисовываем посты из кэша
  if (cachePosts && cacheOffset !== offset) {
    cache = JSON.parse(cachePosts);
    offset = cacheOffset;
    buildWall(cache);
    return;
  }
  //Отправляем запрос для получения новые постов
  getJSONPRequest(getPosts); 
}

//Добавляем обработчики события на scroll страницы
window.addEventListener('scroll', throttle(checkPosition, 300))

/**
 * Функция для отслеживания положения скролла и отправки запроса
 */
function checkPosition() {
  //Получаем высоту wall и высоту экрана
  const height = wall.offsetHeight;
  const screenHeight = window.innerHeight;

  //Записываем, сколько пикселей уже проскроллили
  const scrolled = window.scrollY;

  //Обозначаем порог(четверть экрана), по приближении к которому будем вызывать загрузку постов
  const threshold = height - screenHeight / 4;

  //Отслеживаем, где находится низ экрана относительно страницы
  const position = scrolled + screenHeight;

  //Если пересекаем порог, вызываем загрузку постов
  if (position >= threshold && !isLoadingPosts) {
    getJSONPRequest(getPosts);
  }
}

/**
 * Функция-обертка троттлинг для ограничения числа запросов в единицу времени
 * @param {*} func Функция для выполнения запроса
 * @param {*} ms Время задержки, в миллисекундах
 * @returns Обертка (wrapper), которая обеспечивает задержку между последовательными вызовами функции 
 */
function throttle(func, ms) {
  //Переменная отвечает за наличия задержки
  let isThrottled = false;
  let saveArgs, saveThis;

  function wrapper() {
    //Если есть задержка
    if(isThrottled) {
      //Сохраняем текущие аргументы и контекст
      saveArgs = arguments;
      saveThis = this;
      return;
    }

    //Передаем все аргументы, с которыми была вызвана функция
    func.apply(this, arguments);
    //Отмечаем наличие задержки
    isThrottled = true;

    //Вызов функции через указанное время в ms
    setTimeout(() => {
      isThrottled = false;
      //Если есть аргументы, полученные во время задержки
      if(saveArgs) {
        //Вызываем функцию с сохраненными аргументами и обнуляем их
        wrapper.apply(saveThis, saveArgs);
        saveArgs = saveThis = null;
      }
    }, ms);
  }
  return wrapper;
}

/**
 * Функция для подсчета текущей занятой памяти
 * @returns Объем занятой памяти хранилища
 */
function getLocalStorageSize() {
  let currentSize = 0;
  
  //Перебираем все элементы в LocalStorage и суммируем их размер с учетом длины ключа и значения
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    currentSize += key.length + value.length;
  }

  //Переводим в Кб
  return currentSize / 1024;
}

/**
 * Функция для подсчета максимальной памяти LocalStorage
 * @returns Объем максимальной памяти хранилища 
 */
function getMaxLocalStorageSize() {
  try {    
    //Записываем максимальное количество данных с шагом итерации - 100 КВ
    //Берем 10240 KB = 10 MB, т.к. согласно документациям это максимальный LocalStorage для браузеров
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

  //Суммируем занятый кэшем LocalStorage и оставшийся объём хранилища
  let maxSize = Number(localStorage.getItem('test')) + getLocalStorageSize();
  return maxSize.toFixed(0);
}