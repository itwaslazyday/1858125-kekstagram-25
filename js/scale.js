const uploadForm = document.querySelector('.img-upload__form');
const reduceButton = uploadForm.querySelector('.scale__control--smaller');
const increaseButton = uploadForm.querySelector('.scale__control--bigger');
const scaleValue = uploadForm.querySelector('.scale__control--value');
const picturePreview = uploadForm.querySelector('.img-upload__preview');

const pictureSize = {
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
  STEP: 25
};

let currentPictureSize = 100;

//Уменьшение масштаба фото на величину STEP
function onReduceButtonClick () {
  if (currentPictureSize > pictureSize.MIN) {
    const newSize = currentPictureSize - pictureSize.STEP;
    setPictureSize(newSize);
  }
}

//Увеличение масштаба фото на величину STEP
function onIncreaseButtonClick () {
  if (currentPictureSize < pictureSize.MAX) {
    const newSize = currentPictureSize + pictureSize.STEP;
    setPictureSize(newSize);
  }
}

//Изменение размеров фото и содержимого поля отображения масштаба
function setPictureSize (size) {
  scaleValue.value = `${size}%`;
  picturePreview.style = `transform: scale(${size / 100})`;
  currentPictureSize = size;
}

//Добавление обработчиков на кнопки после загрузки фотографии, установка масштаба по умолчанию
function setScaleBlock () {
  setPictureSize(pictureSize.DEFAULT);
  reduceButton.addEventListener('click', onReduceButtonClick);
  increaseButton.addEventListener('click', onIncreaseButtonClick);
}

//Удаление обработчиков с кнопок масштабирования после отправки формы
function closeScaleBlock ()  {
  reduceButton.removeEventListener('click', onReduceButtonClick);
  increaseButton.removeEventListener('click', onIncreaseButtonClick);
}

export {setScaleBlock, closeScaleBlock};
