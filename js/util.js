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

export {getRandomInteger, getComments, isEscapeKey, isEnterKey};
