const bodyElement = document.querySelector('body');
const preview = document.querySelector('.big-picture');
const previewImage = preview.querySelector('.big-picture__img').querySelector('img');
const previewClose = preview.querySelector('.cancel');

const previewCaption = preview.querySelector('.social__caption');
const previewLikes = preview.querySelector('.likes-count');

const commentsCountBlock = preview.querySelector('.social__comment-count');
const commentsLoaderBlock = preview.querySelector('.social__comments-loader');

const previewCommentsBlock = preview.querySelector('.social__comments');


// Открытие фотографии в полноэкранном режиме
export function openPreview (photoData) {
  bodyElement.classList.add('modal-open');
  preview.classList.remove('hidden');
  commentsCountBlock.classList.add('hidden');
  commentsLoaderBlock.classList.add('hidden');
  previewClose.addEventListener('click', onPreviewCloseClick);
  document.addEventListener('keydown', onPreviewEscPress);
  window.addEventListener('click', windowClick);
  fillPreview(photoData);
}

//Создание шаблона комментария для фото
function createCommentTemplate (comment) {
  return (`<li class="social__comment"><img class="social__picture" src="${comment.avatar}"
  alt="Имя комментатора: ${comment.name}" width="35" height="35">
  <p class="social__text">${comment.message}</p></li>`);
}

//Перенос данных фотографии, после её открытия в полноэкранном режиме
let comments = [];
function fillPreview (photoData) {
  previewImage.src = photoData.url;
  previewCaption.textContent = photoData.description;
  previewLikes.textContent = photoData.likes;
  previewCommentsBlock.innerHTML = '';
  comments = photoData.comments.slice();
  commentsCountBlock.querySelector('.comments-count').textContent = comments.length;
  comments.forEach((comment) => {
    previewCommentsBlock.insertAdjacentHTML('beforeend', createCommentTemplate(comment));
  });
}

//Закрытие модального окна по клику иконки закрытия
function onPreviewCloseClick () {
  bodyElement.classList.remove('modal-open');
  preview.classList.add('hidden');
  commentsCountBlock.classList.remove('hidden');
  commentsLoaderBlock.classList.remove('hidden');
  previewClose.removeEventListener('click', onPreviewCloseClick);
  document.removeEventListener('keydown', onPreviewEscPress);
  window.removeEventListener('click', windowClick);
}

//Закрытие модального окна клавишей ESC (возможно, фукнции ниже нужно перенести в утилитарный файл)
const ESC_KEY_CODE = 27;
function onPreviewEscPress (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    onPreviewCloseClick();
  }
}

//Закрытие модального окна кликом вне его области
function windowClick(event) {
  const target = event.target;
  if (!target.closest('.big-picture__preview') && !target.closest('.cancel')) {
    onPreviewCloseClick();
  }
}


