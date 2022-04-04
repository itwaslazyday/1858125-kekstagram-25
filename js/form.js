import {isEscapeKey} from './util.js';
import {uploadFormValidate} from './validation.js';
import {setScaleBlock, closeScaleBlock} from './scale.js';
import {setPictureEffects, closePictureEffects} from './effects.js';
import {sendData} from './api.js';
import {showUploadFile} from './upload.js';

//Объявление переменных
const bodyElement = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadField = document.querySelector('#upload-file');
const picturePreview = uploadForm.querySelector('.img-upload__preview img');
const hashTagsField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const editBlock = document.querySelector('.img-upload__overlay');
const editBlockClose = editBlock.querySelector('.img-upload__cancel');
const submitButton = uploadForm.querySelector('.img-upload__submit');

//Закрытие информ. окна по клику на кнопке
const onResultCloseClick = () => document.body.lastChild.remove();

//Закрытие информационного окна клавишей ESC
const onResultEscPress = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onResultCloseClick();
  }
};

//Закрытие информ. окна по клику вне его области
const onWindowClick = (evt) => {
  if (!evt.target.closest('div')) {
    onResultCloseClick();
    window.removeEventListener('click', onWindowClick);
  }
};

//Показ информационного окна после успешной/неудачной отправки формы
const showResultMessage = (message) => {
  const messageTemplate = document.querySelector(`#${message}`)
    .content
    .querySelector(`.${message}`);
  const messageElement = messageTemplate.cloneNode(true);
  document.body.append(messageElement);
  const elementButton = messageElement.querySelector(`.${message}__button`);
  window.addEventListener('click', onWindowClick);
  document.addEventListener('keydown', onResultEscPress, {once: true});
  elementButton.addEventListener('click', onResultCloseClick, {once: true});
};

//Разблокировка кнопки формы после получения ответа от сервера
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

//Блокировка кнопки формы на время ожидания ответа сервера
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};

//Скрытие блока редактирования кнопкой закрытия
const onEditCloseClick = () => {
  uploadForm.reset();
  uploadField.value = '';
  picturePreview.src = '';
  bodyElement.classList.remove('modal-open');
  editBlock.classList.add('hidden');
  editBlockClose.removeEventListener('click', onEditCloseClick);
  closePictureEffects();
  closeScaleBlock();
};

//Скрытие блока редактирования по нажатию Esc
const onEditEscPress = (evt) => {
  if (isEscapeKey(evt) && evt.target !== hashTagsField && evt.target !== commentField) {
    evt.preventDefault();
    onEditCloseClick();
    document.removeEventListener('keydown', onEditEscPress);
  }
};

//Отправка формы, вызов валидации, закрытие блока масштабирования
const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (uploadFormValidate()) {
    blockSubmitButton();
    sendData(
      () => {
        onEditCloseClick();
        unblockSubmitButton();
        showResultMessage('success');
      },
      () => {
        onEditCloseClick();
        unblockSubmitButton();
        showResultMessage('error');
      },
      new FormData(evt.target),
    );
  }
};

//Показ окна предпросмотра изображения и блока редактирования после загрузки фото
const openUploadForm = () => {
  bodyElement.classList.add('modal-open');
  editBlock.classList.remove('hidden');
  editBlockClose.addEventListener('click', onEditCloseClick);
  document.addEventListener('keydown', onEditEscPress);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  setScaleBlock();
  setPictureEffects();
};

//Добавляет обработчик на событие поля загрузки фотографии
uploadField.addEventListener('change', () => {
  openUploadForm();
  showUploadFile();
});
