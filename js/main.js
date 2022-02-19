/* eslint-disable no-console */

// Функция, возвращающая случайное целое число из переданного диапазона включительно.
//Использованы материалы: https://learn.javascript.ru/task/random-int-min-max

const getRandomInteger = function (min, max) {
  if (max <= min) {
    console.log('Ошибка! Заданы неверные границы диапазона');
    return undefined;
  }
  const randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
  console.log(`Случайное число: ${randomNumber}`);
  return (randomNumber);
};

getRandomInteger(0, 49);


//Функция для проверки максимальной длины комментария.

const checkLength = function (text, maxLength) {
  if (text.length > maxLength) {
    console.log(`Длина комментария составляет ${text.length}, что больше допустимых ${maxLength} символов`);
    return false;
  }
  console.log(`Длина комментария составляет ${text.length}, что меньше допустимых ${maxLength} символов`);
  return true;
};

checkLength('Не слишком ли длинный комментарий?', 24);
