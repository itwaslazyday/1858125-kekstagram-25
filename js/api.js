//Получение данных миниатюр от сервера методом GET
const getData = (onSuccess, onFail) => fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((pictures) => onSuccess(pictures))
  .catch(() => onFail('Ошибка загрузки галереи. Попробуйте обновить страницу.'));

//Отправка данных формы на сервер, метод POST
const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    });
};

export {getData, sendData};
