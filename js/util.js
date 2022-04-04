//Объявление переменных
const ALERT_SHOW_TIME = 3000;

//Генерация случайного числа в указанных пределах
const getRandomInteger = (min, max) => {
  const result = Math.floor(Math.random() * (max - min + 1) + min);
  return result;
};

//Проверка нажатия клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

//Показ блока с текстом ошибки при получении ошибки от сервера при загрузке данных
const showAlert = (errorMessage) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 10;
  alertContainer.style.position = 'absolute';
  alertContainer.style.width = '100%';
  alertContainer.style.top = '2%';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = '#ffe753';
  alertContainer.style.fontFamily = '"Open Sans", "Arial", sans-serif';
  alertContainer.style.lineHeight = '1.5em';
  alertContainer.style.textTransform = 'none';
  alertContainer.textContent = errorMessage;
  document.body.append(alertContainer);
  setTimeout(() => alertContainer.remove(), ALERT_SHOW_TIME);
};

//Перемешивание элментов заданного массива случайным образом
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInteger(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


//Устранение "дребезга" при многократных кликах, обращениях к функциям
let timeoutId;
const debounce = (callback, timeoutDelay) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => callback(), timeoutDelay);
};

export {isEscapeKey, showAlert, shuffleArray, debounce};
