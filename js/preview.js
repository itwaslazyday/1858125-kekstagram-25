import {isEscapeKey} from './util.js';
import {picturesDescriptions} from './fragment.js';

//Определение переменных
const bodyElement = document.querySelector('body');
const preview = document.querySelector('.big-picture');
const previewImage = preview.querySelector('.big-picture__img').querySelector('img');
const previewClose = preview.querySelector('.cancel');
const previewCaption = preview.querySelector('.social__caption');
const previewLikes = preview.querySelector('.likes-count');
const commentsCountBlock = preview.querySelector('.social__comment-count');
const commentsButton = preview.querySelector('.social__comments-loader') ;
const commentsLoaded = preview.querySelector('.comments-loaded');
const previewCommentsBlock = preview.querySelector('.social__comments');
const picturesContainer = document.querySelector('.pictures');

const COMMENTS_LIMIT = 5;
let comments = [];
let commentsCounter = 0;

picturesContainer.addEventListener('click', (evt) => onContainerClick (evt));

//Проверка клика по изображению из контейнера миниатюр
function onContainerClick (evt) {
  if (evt.target.nodeName === 'IMG') {
    openPreview (evt.target.dataset.pictureId);
  }
}

//Создание шаблона комментария для фото
function createCommentTemplate (comment) {
  return (`<li class="social__comment"><img class="social__picture" src="${comment.avatar}"
  alt="Имя комментатора: ${comment.name}" width="35" height="35">
  <p class="social__text">${comment.message}</p></li>`);
}

//Загрузка дополнительных комментариев по клику сommentsButton
function onCommentsButtonClick () {
  if (comments.length <= COMMENTS_LIMIT) {
    hideCommentsButton();
  }
  pushComments(comments.splice(0, COMMENTS_LIMIT));
}

//Показ кнопки подгрузки новых комментариев
function showCommentsButton ()  {
  commentsButton.classList.remove('hidden');
  commentsButton.addEventListener('click', onCommentsButtonClick);
}

//Скрытие кнопки подгрузки новых комментариев
function hideCommentsButton () {
  commentsButton.classList.add('hidden');
  commentsButton.removeEventListener('click', onCommentsButtonClick);
}

//Отрисовка новых комментариев, увеличение счетчика на величину COMMENTS_LIMIT
function pushComments (commentsArray) {
  commentsArray.forEach((comment) => {
    previewCommentsBlock.insertAdjacentHTML('beforeend', createCommentTemplate(comment));
  });
  commentsCounter += commentsArray.length;
  commentsLoaded.textContent = commentsCounter;
}

//Отображение счетчика комментариев после их отрисовки в пределах COMMENTS_LIMIT
function showCommentsCountBlock () {
  commentsCountBlock.classList.remove('hidden');
  pushComments(comments.splice(0, COMMENTS_LIMIT));
}

//Перенос данных превью в полноэкранный режим, наполнение блока комментариев
function fillPreview (photoData) {
  previewImage.src = photoData.url;
  previewCaption.textContent = photoData.description;
  previewLikes.textContent = photoData.likes;
  previewCommentsBlock.innerHTML = '';
  comments = photoData.comments.slice();
  commentsCountBlock.querySelector('.comments-count').textContent = comments.length;
  showCommentsCountBlock();
  if (photoData.comments.length <= COMMENTS_LIMIT) {
    hideCommentsButton();
  } else {
    showCommentsButton();
  }
}

//Открытие превью в полноэкранном режиме
function openPreview (pictureId) {
  bodyElement.classList.add('modal-open');
  preview.classList.remove('hidden');
  previewClose.addEventListener('click', onPreviewCloseClick);
  document.addEventListener('keydown', onPreviewEscPress);
  fillPreview(picturesDescriptions[pictureId]);
}

//Закрытие модального окна по клику иконки закрытия
function onPreviewCloseClick () {
  bodyElement.classList.remove('modal-open');
  preview.classList.add('hidden');
  hideCommentsButton();
  commentsCounter = 0;
  comments = [];
  previewClose.removeEventListener('click', onPreviewCloseClick);
  document.removeEventListener('keydown', onPreviewEscPress);
}

//Закрытие модального окна клавишей ESC
function onPreviewEscPress (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onPreviewCloseClick();
  }
}

export {fillPreview, openPreview};
