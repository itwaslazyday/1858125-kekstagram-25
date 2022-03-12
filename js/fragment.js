import {openPreview} from './preview.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

function getPicture (picture) {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.addEventListener('click', () => openPreview(picture));
  return pictureElement;
}

export function getFragment (pictures) {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    fragment.append(getPicture(picture));
  });
  return fragment;
}
