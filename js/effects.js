//Объявление переменных
const uploadForm = document.querySelector('.img-upload__form');
const picturePreview = uploadForm.querySelector('.img-upload__preview');
const pictureView = picturePreview.querySelector('img');
const effectsList = uploadForm.querySelector('.effects__list');
const intensityPanel = uploadForm.querySelector('.effect-level');
const intensitySlider = uploadForm.querySelector('.effect-level__slider');
const intensityValue = uploadForm.querySelector('.effect-level__value');
const sliderSettings = {
  none: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  }
};

const filterSettings = {
  chrome: {command: 'grayscale', unit: ''},
  sepia: {command: 'sepia', unit: ''},
  marvin: {command: 'invert', unit: '%'},
  phobos: {command: 'blur', unit: 'px'},
  heat: {command: 'brightness', unit: ''}
};

//Скрытие блока слайдера по умолчанию
intensityPanel.style = 'display: none';

//Начальное создание слайдера с произвольными параметрами
noUiSlider.create(intensitySlider,
  sliderSettings.none
);

//Сброс примененных эффектов с изображения после закрытия формы, выбора оригинала
const resetPictureView = () => {
  intensityPanel.style = 'display: none';
  pictureView.style = 'filter: none';
  pictureView.className = '';
};

//Запись данных из слайдера в скрытое поле, и в фильтр интенсивности наложенного эффекта
const changeIntensityValue = (effect) => {
  intensitySlider.noUiSlider.updateOptions(sliderSettings[effect]);
  intensitySlider.noUiSlider.on('update', () => {
    const intensity = intensitySlider.noUiSlider.get();
    intensityValue.value = intensity;
    const effectCommand = filterSettings[effect].command;
    const effectUnit = filterSettings[effect].unit;
    pictureView.style = `filter: ${effectCommand}(${intensity}${effectUnit})`;
  });
};

//Отмена всплытия на радио-кнопках, добавление класса эффекта, вызов и скрытие слайдера интенсивности
const onEffectClick = (evt) => {
  const effectRadio = evt.path[2].querySelector('input');
  effectRadio.addEventListener('click', (e) => e.stopPropagation());
  const chosenEffect = evt.target.classList[1];
  const effectName = chosenEffect.substring(18);
  pictureView.className = '';
  pictureView.classList.add(chosenEffect);
  if (evt.target.nodeName === 'SPAN' && effectName !== 'none') {
    intensityPanel.style = 'display: block';
    changeIntensityValue(effectName);
  } else {
    resetPictureView();
  }
};

//Делегирование клика с эффекта на список, вызов обработчиков
const setPictureEffects = () => {
  effectsList.addEventListener('click', onEffectClick);
};

//Полный сброс эффектов с фотографии, удаление обработчиков событий с элементов
const closePictureEffects = () => {
  effectsList.removeEventListener('click', onEffectClick);
  resetPictureView();
};

export {setPictureEffects, closePictureEffects};
