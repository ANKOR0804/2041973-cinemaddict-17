import HeaderProfileView from './view/header-profile-view';
import MainNavigationView from './view/main-navigation-view';
import SortView from './view/sort-view';
import FooterStatisticsView from './view/footer-statistics-view';
import FilmsBoardPresenter from './presenter/films-board-presenter';

import {render, RenderPosition} from './render';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const filmsBoardPresenter = new FilmsBoardPresenter();

render(new HeaderProfileView(), siteHeaderElement);
render(new MainNavigationView(), siteMainElement, RenderPosition.AFTERBEGIN);
render(new SortView(), siteMainElement);
render(new FooterStatisticsView(), siteFooterElement);

filmsBoardPresenter.init(siteMainElement);
