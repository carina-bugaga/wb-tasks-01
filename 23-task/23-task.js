/* Анализатор сложности пароля: создайте функцию, которая оценивает сложность 
введенного пользователем пароля. Необходимо анализировать длину пароля, 
использование различных символов, наличие чисел и букв в разных регистрах. 
Выведите пользователю оценку сложности пароля и предложите улучшения, 
если пароль слишком слабый. */

//Получаем элементы из DOM
const input = document.getElementById('input');
const gradeMessage = document.getElementById('grade-message');
const improvementMessage = document.getElementById('improvement-message');

//Создаем слушатель события на ввод текста в input
input.addEventListener('input', function(event) {
  //Убираем пробелы из пароля
  input.value = event.target.value.replaceAll(' ','')
  
  gradeMessage.innerHTML = '';
  improvementMessage.innerHTML = '';
  
  //Проверка на непустое значение
  if (event.target.value !== '') {
    passwordAnalyzer(event.target.value)
  }
});

/**
 * Функция анализатор сложности пароля.
 * @param {String} password Введеный пароль
*/
const passwordAnalyzer = (password) => {
  //Счетчик для оценки сложности пароля
  let grade = 0;


  //Буквы в разных регистрах, цифры и спецсимволы
  const uppercase = 'QWERTYUIOPASDFGHJKLZXCVBNM';
  const lowercase = 'qwertyuiopasdfghjklzxcvbnm';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_-+=\|/.,:;[]{}';

  //Есть ли в пароле буквы, цифры или спецсимволы
  let isUppercase = false;
  let isLowercase = false;
  let isNumbers = false;
  let isSymbols = false;

  //Проверяем каждый символ на принадлежность к каждому из критериев сложности
  for (let i =0; i < password.length; i++) {
    if (uppercase.indexOf(password[i]) != -1) {
      isUppercase = true;
    }
    if (lowercase.indexOf(password[i]) != -1) {
      isLowercase = true;
    }
    if (numbers.indexOf(password[i]) != -1) {
      isNumbers = true;
    }
    if (symbols.indexOf(password[i]) != -1) {
      isSymbols = true;
    }
  }

  //Если в пароле есть критерий, то увеличиваем счетчик оценки сложности
  if (isUppercase) grade++;
  if (isLowercase) grade++;
  if (isNumbers) grade++;
  if (isSymbols) grade++;
  
  //Анализируем длину пароля и его оценку, на основе этого выводим сообщение и рекомендации
  if (password.length < 6) {
    gradeMessage.innerHTML = 'Ну очень слабый пароль';
    improvementMessage.innerHTML = 'Рукомендуем увеличить длину пароля';
  } else if (grade <= 2) {
    gradeMessage.innerHTML = 'Всё ещё слабый пароль';
    improvementMessage.innerHTML = 'Рукомендуем добавить буквы в разных регистрах, цифры и спецсимволы';
  } else if (grade == 3 && password.length <= 8) {
    gradeMessage.innerHTML = 'Почти, но пока слабый пароль';
    improvementMessage.innerHTML = 'Рукомендуем увеличить длину пароля';
  } else if (grade == 3 && password.length > 8) {
    gradeMessage.innerHTML = 'Класс, уже пароль посложнее';
  } else if (grade == 4 && password.length <= 8) {
    gradeMessage.innerHTML = 'Неплохо, пароль лучше, но до сложного осталось чуть-чуть';
    improvementMessage.innerHTML = 'Рукомендуем увеличить длину пароля';
  } else if (grade == 4 && password.length > 8) {
    gradeMessage.innerHTML = 'Вау... супер сложный пароль, защита от взлома +100%';
  }
}
