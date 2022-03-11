import {getFragment} from './fragment.js';
import {getPictures} from './data.js';
const picturesAmount = 25;

const picturesDescriptions = getPictures(picturesAmount);
const picturesContainer = document.querySelector('.pictures');
picturesContainer.append(getFragment(picturesDescriptions));
