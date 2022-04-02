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

//Показ окна предпросмотра изображения и блока редактирования после загрузки фото
uploadField.addEventListener('change', () => {
  openUploadForm();
  showUploadFile();
});

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
  picturePreview.src = '';
  bodyElement.classList.remove('modal-open');
  editBlock.classList.add('hidden');
  editBlockClose.removeEventListener('click', onEditCloseClick);
  document.removeEventListener('keydown', onEditEscPress);
  closePictureEffects();
  closeScaleBlock();
}
//Скрытие блока редактирования по нажатию Esc
function onEditEscPress (evt) {
  if (isEscapeKey(evt) && evt.target !== hashTagsField && evt.target !== commentField) {
    evt.preventDefault();
    onEditCloseClick();
  }
}

//Показ информационного окна после успешной/неудачной отправки формы
function showResultMessage (message) {
  const messageTemplate = document.querySelector(`#${message}`)
    .content
    .querySelector(`.${message}`);
  const messageElement = messageTemplate.cloneNode(true);
  document.body.append(messageElement);
  const elementButton = messageElement.querySelector(`.${message}__button`);
  window.addEventListener('click', (evt) => onWindowClick(evt, message, messageElement));
  document.addEventListener('keydown', (evt) => onResultMessageEscPress(evt, messageElement), {once: true});
  elementButton.addEventListener('click', () => onResultCloseClick(messageElement), {once: true});
}

//Закрытие информ. окна по клику на кнопке
function onResultCloseClick (messageElement) {
  messageElement.remove();
}

//Закрытие информационного окна клавишей ESC
function onResultMessageEscPress (evt, messageElement) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onResultCloseClick(messageElement);
  }
}

//Закрытие информ. окна по клику вне его области
function onWindowClick (evt, message, messageElement) {
  if (!evt.target.closest(`.${message}__inner`)) {
    onResultCloseClick(messageElement);
    window.removeEventListener('click', () => onWindowClick(evt, message, messageElement));
  }
}

//Блокировка кнопки формы на время ожидания ответа сервера
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};

//Разблокировка кнопки формы после получения ответа от сервера
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

//Отправка формы, вызов валидации, закрытие блока масштабирования
function onUploadFormSubmit (evt) {
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

}
