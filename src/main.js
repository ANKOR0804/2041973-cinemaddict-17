import FilmsBoardPresenter from './presenter/films-board-presenter';
import FilterPresenter from './presenter/filter-presenter';
import HeaderProfilePresenter from './presenter/header-profile-presenter';
import FooterStatisticPresenter from './presenter/footer-statistic-presenter';
import FilmsModel from './model/films-model';
import CommentModel from './model/comment-model';
import FilterModel from './model/filter-model';
import FilmsApiService from './films-api-service';

const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';
const AUTHORIZATION = 'Basic hS2sfSasdccl1sa2p';

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer__statistics');

const filmApi = new FilmsApiService(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel(filmApi);
const commentsModel = new CommentModel(filmApi);
const filtersModel = new FilterModel();

const headerProfilePresenter = new HeaderProfilePresenter(
  siteHeaderElement,
  filmsModel,
);

const filterPresenter = new FilterPresenter(
  siteMainElement,
  filmsModel,
  filtersModel,
);

const filmsBoardPresenter = new FilmsBoardPresenter(
  siteMainElement,
  siteBodyElement,
  filmsModel,
  commentsModel,
  filtersModel,
);

const footerStatisticPresenter = new FooterStatisticPresenter(
  siteFooterElement,
  filmsModel
);

headerProfilePresenter.init();
filterPresenter.init();
filmsBoardPresenter.init();
footerStatisticPresenter.init();
filmsModel.init();
