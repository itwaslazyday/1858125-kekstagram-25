import {getRandomInteger, getComments} from './util.js';

const descriptions = [
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

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Киприян',
  'Агрипина',
  'Марфа',
  'Прохор',
  'Ахмед',
  'Веньямин',
  'Евдокия',
  'Силантий'
];

const likesAmount = {
  min: 15,
  max: 200
};

const commentsAmount = {
  min: 1,
  max: 5
};

function getPictureDescription (id) {
  return ({
    id: id + 1,
    url: `photos/${id + 1}.jpg`,
    description: descriptions[id],
    likes: getRandomInteger(likesAmount.min, likesAmount.max),
    comments: getComments(getRandomInteger(commentsAmount.min, commentsAmount.max), messages, names)
  });
}

export function getPictures (count) {
  const pictures = Array.from({length: count}, (_, idx) => getPictureDescription(idx));
  return pictures;
}