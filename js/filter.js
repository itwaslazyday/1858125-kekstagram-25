import {getFragment} from './fragment.js';
import {shuffleArray, debounce} from './util.js';

//Объявление переменных
const galleryFiltersPanel = document.querySelector('.img-filters');
const galleryFiltersForm = document.querySelector('.img-filters__form');
const picturesContainer = document.querySelector('.pictures');
const RANDOM_QTY = 10;
const RERENDER_DELAY = 300;

//Добавление выбранному фильтру класса активности
const toggleButtonClass = (evt, id) => {
  const filtersList = galleryFiltersForm.getElementsByClassName('img-filters__button');
  Array.from(filtersList).forEach((element) => {
    element.className = 'img-filters__button';
    const tappedButton = galleryFiltersForm.querySelector(`#${id}`);
    tappedButton.classList.add('img-filters__button--active');
  });
};

//Сравнение соседних элементов массива, сортировка на убывание
const compareComments = (b, a) => a.comments.length - b.comments.length;

//Изменение отображения галереи миниатюр в зависимости от режима фильтрации
const onFiltersButtonClick = (evt, pictures) => {
  const filterId = evt.target.id;
  toggleButtonClass(evt, filterId);
  const oldPictures = picturesContainer.getElementsByClassName('picture');
  Array.from(oldPictures).forEach((element) => element.remove());
  if (filterId === 'filter-discussed') {
    const sortedByComments = pictures.slice()
      .sort(compareComments);
    return debounce(() => getFragment(sortedByComments), RERENDER_DELAY);
  }
  if (filterId === 'filter-random') {
    const sortedByRandom = shuffleArray(pictures.slice())
      .splice(0, RANDOM_QTY);
    return debounce(() => getFragment(sortedByRandom), RERENDER_DELAY);
  }
  return debounce(() => getFragment(pictures), RERENDER_DELAY);
};

//Показ блока фильтрации изображений до их отрисовки
const setFilters = (pictures) => {
  galleryFiltersPanel.classList.toggle('img-filters--inactive', false);
  galleryFiltersForm.addEventListener('click', (evt) => onFiltersButtonClick(evt, pictures));
  return getFragment(pictures);
};

export {setFilters};
