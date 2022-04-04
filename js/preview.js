import {isEscapeKey, showAlert} from './util.js';
import {setFilters} from './filter.js';
import {getData} from './api.js';

//Объявление переменных
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

//Создание шаблона комментария для фото
const createCommentTemplate = (comment) => (`<li class="social__comment"><img class="social__picture" src="${comment.avatar}"
  alt="Имя комментатора: ${comment.name}" width="35" height="35">
  <p class="social__text">${comment.message}</p></li>`);

//Отрисовка новых комментариев, увеличение счетчика на величину COMMENTS_LIMIT
const pushComments = (commentsArray) => {
  commentsArray.forEach((comment) => {
    previewCommentsBlock.insertAdjacentHTML('beforeend', createCommentTemplate(comment));
  });
  commentsCounter += commentsArray.length;
  commentsLoaded.textContent = commentsCounter;
};

//Скрытие кнопки подгрузки новых комментариев
const hideCommentsButton = () => {
  commentsButton.classList.add('hidden');
};

//Загрузка дополнительных комментариев по клику сommentsButton
const onCommentsButtonClick = () => {
  if (comments.length <= COMMENTS_LIMIT) {
    hideCommentsButton();
    commentsButton.removeEventListener('click', onCommentsButtonClick);
  }
  pushComments(comments.splice(0, COMMENTS_LIMIT));
};

//Показ кнопки подгрузки новых комментариев
const showCommentsButton = () => {
  commentsButton.classList.remove('hidden');
  commentsButton.addEventListener('click', onCommentsButtonClick);
};

//Отображение счетчика комментариев после их отрисовки в пределах COMMENTS_LIMIT
const showCommentsCountBlock = () => {
  commentsCountBlock.classList.remove('hidden');
  pushComments(comments.splice(0, COMMENTS_LIMIT));
};

//Перенос данных превью в полноэкранный режим, наполнение блока комментариев
const fillPreview = (photoData) => {
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
};

//Закрытие модального окна по клику иконки закрытия
const onPreviewCloseClick = () => {
  bodyElement.classList.remove('modal-open');
  preview.classList.add('hidden');
  hideCommentsButton();
  commentsCounter = 0;
  comments = [];
  previewClose.removeEventListener('click', onPreviewCloseClick);
};

//Закрытие модального окна клавишей ESC
const onPreviewEscPress = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onPreviewCloseClick();
    document.removeEventListener('keydown', onPreviewEscPress);
  }
};

//Открытие превью в полноэкранном режиме
const openPreview = (pictureElement) => {
  bodyElement.classList.add('modal-open');
  preview.classList.remove('hidden');
  previewClose.addEventListener('click', onPreviewCloseClick);
  document.addEventListener('keydown', onPreviewEscPress);
  fillPreview(pictureElement);
};

//Проверка клика по изображению из контейнера миниатюр
const onContainerClick = (evt, pictures) => {
  if (evt.target.classList.contains('picture__img')) {
    const pictureId = evt.target.dataset.pictureId;
    openPreview (pictures[pictureId]);
  }
};

//Загрузка данных миниатюр с сервера, вставка фрагмента в разметку
//Передача описаний превью в полноразмерный режим просмотра
getData(setFilters, showAlert)
  .then((pictures) => picturesContainer.addEventListener('click', (evt) => onContainerClick (evt, pictures)));
