/* eslint-disable no-misleading-character-class */
/* eslint-disable no-console */
const uploadForm = document.querySelector('.img-upload__form');
const hashTagsMaxAmount = 5;
const descriptionLength = 140;

//Шаблон регулярного выражения для проверки вводимых хэш-тегов
const re = /^#[A-Za-zА-Яа-яËё0-9]{1,19}$/;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  // errorClass: 'img-upload__text--invalid',
  // successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'field__error'
});

//Получение массива хэш-тегов на основании данных поля, приведение тегов к строчному регистру
function getHashTagsArray (str) {
  const splitArray = str.split(' ').map((element) => element.toLowerCase());
  return splitArray;
}

//Проверка на количество хэш-тегов не более hashTagsMaxAmount
function checkHashTagsAmount (arr) {
  return arr.length <= hashTagsMaxAmount;
}

//Проверка на отсутствие повторяющихся хэш-тегов
function checkHashTagsRepeat (arr) {
  return (arr.every((element) => arr.indexOf(element) === arr.lastIndexOf(element)));
}

//Проверка валидности поля ввода хэш-тегов
function validateHashTags (value) {
  return getHashTagsArray(value).every((element, idx, array) =>
    re.test(element) && checkHashTagsAmount(array) && checkHashTagsRepeat(array)
  );
}

//Проверка длины введенного комментария не более descriptionLength
function validateDescription (value) {
  return value.length >= 1 && value.length <= descriptionLength;
}

//Создание валидаторов для библиотеки Pristine на указанных полях
pristine.addValidator(uploadForm.querySelector('.text__hashtags'), validateHashTags, 'Введенные хэш-теги не соответствуют <a href="#" aria-label="Требования к хэш-тегам">требованиям</a>');
pristine.addValidator(uploadForm.querySelector('.text__description'), validateDescription, 'Длина комментария должна быть от 1 до 140 символов');

export function onUploadFormSubmit (evt) {
  if (!pristine.validate()) {evt.preventDefault();}
}