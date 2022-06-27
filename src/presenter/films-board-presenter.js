// *** Презентер доски фильма ***

import {remove, render} from '../framework/render';
import FilmsBoardView from '../view/films-board-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import SortView from '../view/sort-view';
import NoFilmsView from '../view/no-films-view';
import FilmPresenter from './film-presenter';
import {ExtraSection, SortType, UserAction, UpdateType} from '../const';
import {sortByDate, sortByRating} from '../utils/sort';
import {filter} from '../utils/filter';
import LoadingView from '../view/loading-view';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsBoardPresenter {
  #siteMainComponent = null;
  #noFilmsComponent = null;
  #sortComponent = null;
  #filmsBoardContainer = null;
  #initialFilmsPresenter = null;
  #scrollPosition = null;
  #isLoading = true;

  #filmsModel = null;
  #commentsModel = null;
  #filtersModel = null;

  #loadingComponent = new LoadingView();
  #filmsBoardComponent = new FilmsBoardView();
  #allFilmsListComponent = new FilmsListView(ExtraSection.ALL.TITLE);
  #topRatedFilmsListComponent = new FilmsListView(ExtraSection.TOP_RATED.TITLE, true);
  #mostCommentedFilmsListComponent = new FilmsListView(ExtraSection.MOST_COMMENTED.TITLE, true);
  #allFilmsListContainerComponent = new FilmsListContainerView();
  #topRatedFilmsListContainerComponent = new FilmsListContainerView();
  #mostCommentedFilmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #renderFilmCount = FILM_COUNT_PER_STEP;
  #currentSortType = SortType.BY_DEFAULT;
  #filmPresenter = new Map();

  constructor(mainContainer, filmsBoardContainer, filmsModel, commentsModel, filtersModel) {
    this.#siteMainComponent = mainContainer;
    this.#filmsBoardContainer = filmsBoardContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filtersModel = filtersModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#renderFilmsBoard();
  };

  get films() {
    const filterType = this.#filtersModel.filmsFilter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[filterType](films);

    switch (this.#currentSortType) {
      case SortType.BY_DATE:
        return [...filteredFilms].sort(sortByDate);
      case SortType.BY_RATING:
        return [...filteredFilms].sort(sortByRating);
    }

    return filteredFilms;
  }

  #renderAllFilmsTypes() {
    this.#renderAllFilms();
    this.#renderTopRatedFilms();
    this.#renderMostCommentedFilms();
  }

  #handleShowMoreButtonClick = () => {
    this.films
      .slice(this.#renderFilmCount, this.#renderFilmCount += FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film, this.#allFilmsListContainerComponent.element));

    if (this.films.length <= this.#renderFilmCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleModeChange = () => {
    this.#filmPresenter
      .forEach((value) => value
        .forEach((presenter) => presenter.resetView()));

    if (this.#initialFilmsPresenter) {
      this.#initialFilmsPresenter.resetView();
    }
  };

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        await this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
      case UserAction.ADD_COMMENT:
        this.#filmsModel.updateToLocal(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id)
          .forEach((presenter) => presenter.init(data));
        break;
      case UpdateType.MINOR:
        this.#clearFilmsBoard();
        this.#renderFilmsBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearFilmsBoard({resetRenderedAllFilms: true, resetSortType: true});
        this.#renderFilmsBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderFilmsBoard();
        break;
    }
  };

  #renderFilm = (film, container) => {
    const filmPresenter = new FilmPresenter(
      this.#filmsBoardContainer,
      container,
      this.#filmsModel,
      this.#commentsModel,
      this.#handleViewAction,
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
    this.films
      .slice(0, this.#renderFilmCount)
      .forEach((film) => this.#renderFilm(film, this.#allFilmsListContainerComponent.element));
  };

  #renderTopRatedFilms = () => {
    const totalFilmRate = this.#filmsModel.topRatedFilms
      .map((film) => parseFloat(film.filmInfo.totalRating))
      .reduce((a, b) => a + b);
    if (totalFilmRate > 0) {
      render(this.#topRatedFilmsListComponent, this.#filmsBoardComponent.element);
      render(this.#topRatedFilmsListContainerComponent, this.#topRatedFilmsListComponent.element);
      this.#filmsModel.topRatedFilms
        .forEach((film) => this.#renderFilm(film, this.#topRatedFilmsListContainerComponent.element));
    }
  };

  #renderMostCommentedFilms = () => {
    const commentsCount = this.#filmsModel.mostCommentedFilms
      .map((film) => film.comments.length)
      .reduce((a, b) => a + b);
    if (commentsCount > 0) {
      render(this.#mostCommentedFilmsListComponent, this.#filmsBoardComponent.element);
      render(this.#mostCommentedFilmsListContainerComponent, this.#mostCommentedFilmsListComponent.element);
      this.#filmsModel.mostCommentedFilms
        .forEach((film) => this.#renderFilm(film, this.#mostCommentedFilmsListContainerComponent.element));
    }
  };

  #renderNoFilms = () => {
    this.#noFilmsComponent = new NoFilmsView(this.#filtersModel.filmsFilter);
    render(this.#noFilmsComponent, this.#allFilmsListComponent.element);
  };

  #renderSortComponent() {
    this.#sortComponent = new SortView(this.#currentSortType);
    render(this.#sortComponent, this.#siteMainComponent);
    this.#sortComponent.setSortTypeChangeCLickHandler(this.#handleSortTypeChange);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilmsBoard({resetRenderedFilms: true});
    this.#renderFilmsBoard();
  };

  #renderFilmsBoard = () => {
    render(this.#filmsBoardComponent, this.#siteMainComponent);
    render(this.#allFilmsListComponent, this.#filmsBoardComponent.element);

    if (this.#isLoading) {
      render(this.#loadingComponent, this.#allFilmsListComponent.element);
      this.#allFilmsListComponent.element.firstElementChild.remove();
      return;
    }

    const films = this.films;
    const filmsCount = films.length;

    this.#renderSortComponent();
    render(this.#filmsBoardComponent, this.#siteMainComponent);
    render(this.#allFilmsListComponent, this.#filmsBoardComponent.element);

    if (filmsCount === 0) {
      this.#renderNoFilms();
      remove(this.#sortComponent);

      return;
    }

    render(this.#allFilmsListContainerComponent, this.#allFilmsListComponent.element);

    this.#updateInitialFilmsPresenter();
    this.#renderAllFilmsTypes();

    if (this.films.length > this.#renderFilmCount) {
      render(this.#showMoreButtonComponent, this.#allFilmsListComponent.element);
      this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
    }

    if (this.#scrollPosition) {
      window.scrollTo(0, this.#scrollPosition);
    }
  };

  #clearFilmsBoard = ({resetRenderedFilms = false, resetSortType = false} = {}) => {
    const filmsCount = this.films.length;

    this.#scrollPosition = document.documentElement.scrollTop;

    this.#filmPresenter
      .forEach((presenters) =>
        presenters.forEach((presenter) => {
          if (presenter.isPopup()) {
            this.#initialFilmsPresenter = presenter;
            return presenter.destroyFilmCard();
          }

          presenter.destroy();
        })
      );

    this.#filmPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#filmsBoardComponent);
    remove(this.#allFilmsListComponent);
    remove(this.#mostCommentedFilmsListComponent);
    remove(this.#loadingComponent);
    remove(this.#topRatedFilmsListComponent);
    remove(this.#showMoreButtonComponent);

    if (this.#noFilmsComponent) {
      remove(this.#noFilmsComponent);
    }

    if (resetRenderedFilms) {
      this.#renderFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this.#renderFilmCount = Math.min(filmsCount, this.#renderFilmCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.BY_DEFAULT;
    }
  };

  #updateInitialFilmsPresenter = () => {
    if (!this.#initialFilmsPresenter) {
      return true;
    }

    if (!this.#initialFilmsPresenter.isPopup) {
      this.#initialFilmsPresenter = null;
    }

    const updatedFilm = this.#filmsModel.films.filter((film) => film.id === this.#initialFilmsPresenter.film.id)[0];

    this.#initialFilmsPresenter.init(updatedFilm);
  };
}
