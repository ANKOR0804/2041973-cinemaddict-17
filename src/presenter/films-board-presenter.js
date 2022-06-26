// *** Презентер доски фильма ***

import {remove, render, RenderPosition} from '../framework/render';
import HeaderProfileView from '../view/header-profile-view';
import FooterStatisticsView from '../view/footer-statistics-view';
import FilmsBoardView from '../view/films-board-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import SortView from '../view/sort-view';
import NoFilmsView from '../view/no-films-view';
import FilmPresenter from './film-presenter';
import {extraSection} from '../const';
import {SortType} from '../const';
import {sortByDate, sortByRating} from '../utils/sort';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsBoardPresenter {
  #siteHeaderElement = null;
  #siteMainElement = null;
  #siteFooterElement = null;
  #filmsBoardContainer = null;
  #boardFilms = [];
  #sourcedBoardFilms = [];
  #filmsModel = null;
  #currentSortType = null;

  #sortComponent = new SortView();
  #noFilmsComponent = new NoFilmsView();
  #filmsBoardComponent = new FilmsBoardView();
  #allFilmsListComponent = new FilmsListView(extraSection.ALL);
  #topRatedFilmsListComponent = new FilmsListView(extraSection.TOP_RATED.TITLE, true);
  #mostCommentedFilmsListComponent = new FilmsListView(extraSection.MOST_COMMENTED.TITLE, true);
  #allFilmsListContainerComponent = new FilmsListContainerView();
  #topRatedFilmsListContainerComponent = new FilmsListContainerView();
  #mostCommentedFilmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #renderFilmCount = FILM_COUNT_PER_STEP;
  #filmPresenter = new Map();

  constructor(headerContainer, mainContainer, footerContainer, filmsBoardContainer, filmsModel) {
    this.#siteHeaderElement = headerContainer;
    this.#siteMainElement = mainContainer;
    this.#siteFooterElement = footerContainer;
    this.#filmsBoardContainer = filmsBoardContainer;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#boardFilms = [...this.#filmsModel.films];
    this.#sourcedBoardFilms = this.#filmsModel.films;
    this.#currentSortType = SortType.BY_DEFAULT;

    this.#renderFilmsBoard();
    this.#renderAllFilmsTypes();
  };

  #renderAllFilmsTypes () {
    this.#renderAllFilms();
    this.#renderTopRatedFilms();
    this.#renderMostCommentedFilms();
  }

  #handleShowMoreButtonClick = () => {
    this.#sourcedBoardFilms
      .slice(this.#renderFilmCount, this.#renderFilmCount += FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film, this.#allFilmsListContainerComponent.element));

    if (this.#boardFilms.length <= this.#renderFilmCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleModeChange = () => {
    this.#filmPresenter
      .forEach((value) => value
        .forEach((presenter) => presenter.resetView()));
  };

  #handleFilmChange = (updatedFilm) => {
    this.#filmPresenter.get(updatedFilm.id)
      .forEach((presenter) => presenter.init(updatedFilm));
  };

  #renderFilm = (film, container) => {
    const filmPresenter = new FilmPresenter(
      this.#filmsBoardContainer,
      container,
      this.#filmsModel,
      this.#handleFilmChange,
      this.#handleModeChange,
    );

    filmPresenter.init(film);

    if (this.#filmPresenter.has(film.id)) {
      this.#filmPresenter.get(film.id).push(filmPresenter);
      return;
    }

    this.#filmPresenter.set(film.id, [filmPresenter]);
  };

  #renderAllFilms = () => {
    this.#sourcedBoardFilms
      .slice(0, Math.min(this.#boardFilms.length, FILM_COUNT_PER_STEP))
      .forEach((film) => this.#renderFilm(film, this.#allFilmsListContainerComponent.element));

    if (this.#filmsModel.films.length > FILM_COUNT_PER_STEP) {
      render(this.#showMoreButtonComponent, this.#allFilmsListComponent.element);
      this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
    }
  };

  #renderTopRatedFilms = () => {
    this.#filmsModel.topRatedFilms.forEach((film) =>
      this.#renderFilm(film, this.#topRatedFilmsListContainerComponent.element));
  };

  #renderMostCommentedFilms = () => {
    this.#filmsModel.mostCommentedFilms.forEach((film) =>
      this.#renderFilm(film, this.#mostCommentedFilmsListContainerComponent.element));
  };

  #clearFilmsList = () => {
    this.#filmPresenter.forEach((value) => value.forEach((presenter) => presenter.destroy()));
    this.#filmPresenter.clear();
    this.#renderFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #renderNoFilms = () => {
    render(this.#noFilmsComponent, this.#filmsBoardComponent.element);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#filmsBoardComponent.element, RenderPosition.BEFOREBEGIN);
  };

  #renderFilmsList = () => {
    render(this.#allFilmsListComponent, this.#filmsBoardComponent.element);
  };

  // #renderFilmsListContainerComponent = () => {
  //   render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
  // };

  #renderSortComponent () {
    render (this.#sortComponent, this.#siteMainElement);
    this.#sortComponent.setSortTypeChangeCLickHandler(this.#handleSortTypeChange);
  }

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.BY_DATE:
        this.#sourcedBoardFilms.sort(sortByDate);
        break;
      case SortType.BY_RATING:
        this.#sourcedBoardFilms.sort(sortByRating);
        break;
      default:
        this.#sourcedBoardFilms = [...this.#boardFilms];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmsList();
    this.#renderAllFilmsTypes();
  };

  #renderFilmsBoard = () => {
    render(new HeaderProfileView(this.#filmsModel.films), this.#siteHeaderElement);
    render(new FooterStatisticsView(this.#filmsModel.films), this.#siteFooterElement);
    render(this.#filmsBoardComponent, this.#siteMainElement, RenderPosition.AFTEREND);
    this.#renderSortComponent();

    if (this.#filmsModel.films.length === 0) {
      this.#renderNoFilms();
    } else {
      render(this.#sortComponent, this.#siteMainElement);
      render(this.#allFilmsListComponent, this.#filmsBoardComponent.element);
      render(this.#mostCommentedFilmsListComponent, this.#filmsBoardComponent.element);
      render(this.#topRatedFilmsListComponent, this.#filmsBoardComponent.element);
      render(this.#allFilmsListContainerComponent, this.#allFilmsListComponent.element);
      render(this.#topRatedFilmsListContainerComponent, this.#topRatedFilmsListComponent.element);
      render(this.#mostCommentedFilmsListContainerComponent, this.#mostCommentedFilmsListComponent.element);
    }
  };
}
