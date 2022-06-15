// *** Карточка фильма ***

import AbstractView from '../framework/view/abstract-view';
import {humanizeDateByYear, humanizeDuration} from '../utils/film';
import classNames from 'classnames';

const createFilmCardTemplate = (film) => {
  const {filmInfo, userDetails} = film;

  const releaseDate = filmInfo.release.date !== null
    ? humanizeDateByYear(filmInfo.release.date)
    : '';

  const duration = filmInfo.runtime !== null
    ? humanizeDuration(filmInfo.runtime)
    : '';

  const singleGenre = filmInfo.genre[0];

  const isWatchlist = classNames({'film-card__controls-item--active' : userDetails.watchlist});
  const isWatched = classNames({'film-card__controls-item--active' : userDetails.alreadyWatched});
  const isFavorite = classNames({'film-card__controls-item--active' : userDetails.favorite});

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
        <span class="film-card__comments">5 comments</span>
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

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (event) => {
    event.preventDefault();
    this._callback.click();
  };
}
