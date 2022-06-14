import {render, RenderPosition} from './framework/render';
import HeaderProfileView from './view/header-profile-view';
import MainNavigationView from './view/main-navigation-view';
import FooterStatisticsView from './view/footer-statistics-view';
import FilmsBoardPresenter from './presenter/films-board-presenter';
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filmsBoardPresenter = new FilmsBoardPresenter(siteMainElement, filmsModel, commentsModel);

render(new HeaderProfileView(), siteHeaderElement);
render(new MainNavigationView([...filmsModel.films]), siteMainElement, RenderPosition.AFTERBEGIN);
render(new FooterStatisticsView(), siteFooterElement);

filmsBoardPresenter.init();
