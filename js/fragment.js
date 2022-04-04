//Объявление переменных
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

//Создание единичного элемента фрагмента
const getPicture = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__img').dataset.pictureId = picture.id;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  return pictureElement;
};

//Заполнение фрагмента массивом ссылок, вставка фрагмента в разметку, передача массива описаний превью
const getFragment = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    fragment.append(getPicture(picture));
  });
  picturesContainer.append(fragment);
  return pictures;
};

export {getFragment};

