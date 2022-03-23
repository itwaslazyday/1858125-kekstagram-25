import {isEscapeKey} from './util.js';
import {uploadFormValidate} from './validation.js';
import {setScaleBlock, closeScaleBlock} from './scale.js';
import {setPictureEffects, closePictureEffects} from './effects.js';

//Объявление переменных
const bodyElement = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadField = document.querySelector('#upload-file');
const hashTagsField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const editBlock = document.querySelector('.img-upload__overlay');
const editBlockClose = editBlock.querySelector('.img-upload__cancel');

//Показ блока редактирования изображения после загрузки изображения
uploadField.addEventListener('change', () => openUploadForm());

function openUploadForm () {
  bodyElement.classList.add('modal-open');
  editBlock.classList.remove('hidden');
  editBlockClose.addEventListener('click', onEditCloseClick);
  document.addEventListener('keydown', onEditEscPress);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  setScaleBlock();
  setPictureEffects();
}
//Скрытие блока редактирования кнопкой закрытия
function onEditCloseClick () {
  uploadForm.reset();
  uploadField.value = '';
  bodyElement.classList.remove('modal-open');
  editBlock.classList.add('hidden');
  editBlockClose.removeEventListener('click', onEditCloseClick);
  document.removeEventListener('keydown', onEditEscPress);
  closePictureEffects();
}
//Скрытие блока редактирования по нажатию Esc
function onEditEscPress (evt) {
  if (isEscapeKey(evt) && evt.target !== hashTagsField && evt.target !== commentField) {
    evt.preventDefault();
    onEditCloseClick();
  }
}

//Отправка формы, вызов валидации, закрытие блока масштабирования
function onUploadFormSubmit (evt) {
  evt.preventDefault();
  uploadFormValidate();
  closeScaleBlock();
}
