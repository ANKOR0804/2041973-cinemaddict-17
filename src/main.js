import NewMovieButtonView from './view/new-movie-button-view';
import {render} from './render';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');

render(new NewMovieButtonView(), siteHeaderElement);
