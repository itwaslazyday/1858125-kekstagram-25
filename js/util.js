//Генерация случайного числа в указанных пределах
function getRandomInteger (min, max) {
  const result = Math.floor(Math.random() * (max - min + 1) + min);
  return result;
}

//Проверка нажатия клавиши Escape
function isEscapeKey (evt) {
  return evt.key === 'Escape';

}

//Проверка нажатия клавиши Enter
function isEnterKey (evt) {
  return evt.key === 'Enter';
}

const ALERT_SHOW_TIME = 2500;

//Показ блока с текстом ошибки при получении ошибки от сервера при загрузке данных
function showAlert (errorMessage) {
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
  alertContainer.innerHTML = errorMessage;
  document.body.append(alertContainer);
  setTimeout(() => alertContainer.remove(), ALERT_SHOW_TIME);
}

//Перемешивание элментов заданного массива случайным образом
function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInteger(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


//Устранение "дребезга" при многократных кликах, обращениях к функциям
let timeoutId;
function debounce (callback, timeoutDelay) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => callback(), timeoutDelay);
}

export {isEscapeKey, isEnterKey, showAlert, shuffleArray, debounce};
