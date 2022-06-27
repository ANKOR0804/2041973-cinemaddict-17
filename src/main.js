import FilmsBoardPresenter from './presenter/films-board-presenter';
import FilterPresenter from './presenter/filter-presenter';
import HeaderProfilePresenter from './presenter/header-profile-presenter';
import FilmsModel from './model/films-model';
import CommentModel from './model/comment-model';
import FilterModel from './model/filter-model';
import {generateFilms} from './mock/film';
import {generateComments} from './mock/comments';

const COMMENTS_COUNT = 50;
const FILMS_COUNT = 21;

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel();
const commentsModel = new CommentModel();
const filtersModel = new FilterModel();

const setData = () => {
  const comments = generateComments(COMMENTS_COUNT);
  const films = generateFilms(FILMS_COUNT, comments);

  filmsModel.films = films;
  commentsModel.comments = comments;
};

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
  siteFooterElement,
  siteBodyElement,
  filmsModel,
  commentsModel,
  filtersModel,
);

setData();
headerProfilePresenter.init();
filterPresenter.init();
filmsBoardPresenter.init();
