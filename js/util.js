function getRandomInteger (min, max) {
  const result = Math.floor(Math.random() * (max - min + 1) + min);
  return result;
}

function getComment (id, messages, names) {
  return ({
    id: id + 1,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: messages[getRandomInteger(1, messages.length - 1)],
    name: names[getRandomInteger(1, names.length - 1)]
  });
}

function getComments (count, messages, names) {
  const comments = Array.from({length: count}, (_, idx) => getComment(idx, messages, names));
  return comments;
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

  // const errorEmoticon = alertContainer.querySelector('.emoji__size');
  // errorEmoticon.style.fontSize = '25px';

  setTimeout(() => alertContainer.remove(), ALERT_SHOW_TIME);
}

export {getRandomInteger, getComments, isEscapeKey, isEnterKey, showAlert};
