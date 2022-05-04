import FilterView from './view/filter-view';
import {render} from './render';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');

render(new FilterView(), siteMainElement);
