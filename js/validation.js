//Объявление переменных
const uploadForm = document.querySelector('.img-upload__form');
const hashTagsField = uploadForm.querySelector('.text__hashtags');
const HASH_TAGS_MAX_AMOUNT = 5;
const HASH_TAG_MAX_SYMBOLS = 20;
let errorMessage = '';

//Шаблон регулярного выражения для проверки вводимых хэш-тегов
const regularExpression = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

const pristine = window.Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'text__error'
});

//Получение массива хэш-тегов на основании данных поля, приведение тегов к строчному регистру
const getSplitArray = (str) => {
  const splitArray = str.split(' ').map((element) => element.toLowerCase());
  return splitArray;
};

//Проверка хэш-тегов на соответствие указанным требованиям
const validateHashTags = (value) => {
  errorMessage = '';
  const inputText = value.trim();

  if (!inputText) {
    return true;
  }

  const splitArray = getSplitArray(inputText);
  const hashTagsRules = [
    {
      check: splitArray.some((element) => element.indexOf('#', 1) >= 0),
      error: 'Хэш-теги должны разделяться пробелами'
    },
    {
      check: splitArray.some((element) => !regularExpression.test(element)),
      error: 'Хэш-тег содержит недопустимые символы, либо состоит из одной решётки'
    },
    {
      check: splitArray.length > HASH_TAGS_MAX_AMOUNT,
      error: `Нельзя указать больше ${HASH_TAGS_MAX_AMOUNT} хэш-тегов`
    },
    {
      check: splitArray.some((element) => element.length > HASH_TAG_MAX_SYMBOLS),
      error: `Максимальная длина одного хэш-тега ${HASH_TAG_MAX_SYMBOLS} символов, включая #`
    },
    {
      check: !splitArray.every((element, idx, arr) => arr.indexOf(element) === arr.lastIndexOf(element)),
      error: 'Хэш-теги не должны повторяться'
    },
    {
      check: splitArray.some((element) => element[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа #'
    },
  ];

  return hashTagsRules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

//Показ сообщения об ошибке на основании работы функции validateHashTags
const showErrorMessage = () => errorMessage;

//Создание валидаторов pristine на указанных полях, если туда что-либо введено
pristine.addValidator(hashTagsField, validateHashTags, showErrorMessage);

//Запуск валидации перед отправкой формы
const uploadFormValidate = () => pristine.validate();

export {uploadFormValidate};
