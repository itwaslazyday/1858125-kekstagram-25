/* eslint-disable no-console */

// Структура каждого объекта должна быть следующей:

// id, число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.

// url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.

// description, строка — описание фотографии. Описание придумайте самостоятельно.

// likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.

// comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:

// {
//   id: 135,
//   avatar: 'img/avatar-6.svg',
//   message: 'В целом всё неплохо. Но не всё.',
//   name: 'Артём',
// }
// У каждого комментария есть идентификатор — id — случайное число. Идентификаторы не должны повторяться.

// Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.

// Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:

// Всё отлично!
// В целом всё неплохо. Но не всё.
// Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
// Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
// Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
// Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!
// Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.

const PICTURE_QTY = 25;

const descriptionArray = [
  'Кекс на море',
  'Рабочие будни',
  'Поездка в Испанию',
  'Отдых у бабушки',
  'На тренировке',
  'Кошачьи лапки',
  'Прыжки от стены',
  'Погром в офисе',
  'Украденные тапки',
  'Хозяин здесь - я',
  'Дома, с любимой',
  'Пишу для тебя ТЗ',
  'Билеты в Сан-Франциско',
  'Кекс на весах',
  'После тяжелого дня',
  'Едем шопиться!',
  'Летучка в офисе',
  'Обеденная сиеста',
  'Полет на дельтаплане',
  'Воздушный поцелуй',
  'Читаю последние новости',
  'Селфи на фоне Парижа',
  'Пробую новое вино',
  'Выбираю подарки на 8 марта',
  'Я - красивый!'
];

const messageArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const namesArray = [
  'Иван',
  'Хуан',
  'Мария',
  'Кристофф',
  'Виктор',
  'Юлия',
  'Себастьян',
  'Ахмед'
];

const idArray = [];
let result;
function getRandomInteger (a, b, noRepeat, array) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  result = Math.floor(Math.random() * (upper - lower + 1) + lower);
  if (noRepeat) {
    if (array.includes(result)) {return getRandomInteger(a, b, noRepeat, array);}
    else {
      array.push(result);
      return result;
    }
  }
  return result;
}

const commentIdArray = [];
function getComment () {
  return ({
    id: getRandomInteger(1, 1000, true, commentIdArray),
    avatar: `img/avatar-${getRandomInteger(1, 6, false)}.svg.`,
    message: messageArray[getRandomInteger(1, messageArray.length - 1, false)],
    name: namesArray[getRandomInteger(1, namesArray.length - 1, false)]
  });
}

function getCommentsArray (commentsQty) {
  const commentsArray = Array.from({length: commentsQty}, getComment);
  return commentsArray;
}

const getPictureDescription = function () {
  return ({
    id: getRandomInteger(1, PICTURE_QTY, true, idArray),
    url: `photos/${result}.jpg`,
    description: descriptionArray[result],
    likes: getRandomInteger(15, 200, false),
    comments: getCommentsArray(getRandomInteger(1, 5, false))
  });
};

const getArrayOfPictures = Array.from({length: PICTURE_QTY}, getPictureDescription);

console.log(getArrayOfPictures);

