import {render, RenderPosition} from './framework/render';
import MainNavigationView from './view/main-navigation-view';
import FilmsBoardPresenter from './presenter/films-board-presenter';
import FilmsModel from './model/films-model';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel();

const filmsBoardPresenter = new FilmsBoardPresenter(
  siteHeaderElement,
  siteMainElement,
  siteFooterElement,
  document.body,
  new FilmsModel()
);

render(new MainNavigationView([...filmsModel.films]), siteMainElement, RenderPosition.AFTERBEGIN);

filmsBoardPresenter.init();
