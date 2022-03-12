import {getPictures} from './data.js';
import {getFragment} from './fragment.js';
const picturesAmount = 25;

const picturesDescriptions = getPictures(picturesAmount);
const picturesContainer = document.querySelector('.pictures');
picturesContainer.append(getFragment(picturesDescriptions));
