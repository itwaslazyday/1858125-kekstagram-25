//Объявление переменных
const uploadForm = document.querySelector('.img-upload__form');
const reduceButton = uploadForm.querySelector('.scale__control--smaller');
const increaseButton = uploadForm.querySelector('.scale__control--bigger');
const scaleValue = uploadForm.querySelector('.scale__control--value');
const picturePreview = uploadForm.querySelector('.img-upload__preview');
const PictureSize = {
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
  STEP: 25
};
let currentPictureSize = 100;

//Изменение размеров фото и содержимого поля отображения масштаба
const setPictureSize = (size) => {
  scaleValue.value = `${size}%`;
  picturePreview.style = `transform: scale(${size / 100})`;
  currentPictureSize = size;
};

//Уменьшение масштаба фото на величину STEP
const onReduceButtonClick = () => {
  if (currentPictureSize > PictureSize.MIN) {
    const newSize = currentPictureSize - PictureSize.STEP;
    setPictureSize(newSize);
  }
};

//Увеличение масштаба фото на величину STEP
const onIncreaseButtonClick = () => {
  if (currentPictureSize < PictureSize.MAX) {
    const newSize = currentPictureSize + PictureSize.STEP;
    setPictureSize(newSize);
  }
};

//Добавление обработчиков на кнопки после загрузки фотографии, установка масштаба по умолчанию
const setScaleBlock = () => {
  setPictureSize(PictureSize.DEFAULT);
  reduceButton.addEventListener('click', onReduceButtonClick);
  increaseButton.addEventListener('click', onIncreaseButtonClick);
};

//Удаление обработчиков с кнопок масштабирования после отправки формы
const closeScaleBlock = () => {
  reduceButton.removeEventListener('click', onReduceButtonClick);
  increaseButton.removeEventListener('click', onIncreaseButtonClick);
};

export {setScaleBlock, closeScaleBlock};
