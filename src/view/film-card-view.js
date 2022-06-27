// *** Карточка фильма ***

import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {humanizeDateByYear, humanizeDuration} from '../utils/film';
import classNames from 'classnames';

const createFilmCardTemplate = (state) => {
  const {filmInfo, userDetails} = state;

  const releaseDate = filmInfo.release.date !== null
    ? humanizeDateByYear(filmInfo.release.date)
    : '';

  const duration = filmInfo.runtime !== null
    ? humanizeDuration(filmInfo.runtime)
    : '';

  const singleGenre = filmInfo.genre[0];

  const isWatchlist = classNames({'film-card__controls-item--active': userDetails.watchlist});
  const isWatched = classNames({'film-card__controls-item--active': userDetails.alreadyWatched});
  const isFavorite = classNames({'film-card__controls-item--active': userDetails.favorite});

  let commentsCount;

  switch (state.comments.length) {
    case 0:
      commentsCount = '';
      break;
    case 1:
      commentsCount = `${state.comments.length} comment`;
      break;
    default:
      commentsCount = `${state.comments.length} comments`;
      break;
  }

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${filmInfo.title}</h3>
        <p class="film-card__rating">${filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseDate}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${singleGenre}</span>
        </p>
        <img src="./${filmInfo.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${filmInfo.description}</p>
        <span class="film-card__comments">${commentsCount}</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isWatchlist}" type="button">Add to watchlist
        </button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatched}" type="button">Mark as watched
        </button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${isFavorite}" type="button">Mark as favorite
        </button>
      </div>
    </article>`
  );
};

export default class FilmCardView extends AbstractStatefulView {
  constructor(film) {
    super();
    this._state = this.#convertFilmToState(film);
  }

  get template() {
    return createFilmCardTemplate(this._state);
  }

  #convertFilmToState = (film) => ({
    ...film,
    isFilmUpdating: false
  });

  _restoreHandlers = () => {
    this.setClickHandler(this._callback.click);
    this.setAddToWatchlistClickHandler(this._callback.watchlistClick);
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (event) => {
    event.preventDefault();
    document.body.classList.add('hide-overflow');
    this._callback.click();
  };

  setAddToWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this
      .element
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#watchlistClickHandler);
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this
      .element
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this
      .element
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#favoriteClickHandler);
  };

  #watchlistClickHandler = (event) => {
    event.preventDefault();

    this.updateElement({
      isFilmUpdating: true,
    });

    this._callback.watchlistClick();
  };

  #alreadyWatchedClickHandler = (event) => {
    event.preventDefault();

    this.updateElement({
      isFilmUpdating: true,
    });

    this._callback.alreadyWatchedClick();
  };

  #favoriteClickHandler = (event) => {
    event.preventDefault();

    this.updateElement({
      isFilmUpdating: true,
    });

    this._callback.favoriteClick();
  };
}
