// *** Модуль модели фильма ***

import Observable from '../framework/observable';
import {UpdateType} from '../const';

const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;

export default class FilmsModel extends Observable {
  #films = [];
  #topRatedFilms = null;
  #mostCommentedFilms = null;
  #filmsApiService = null;

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  init = async () => {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(this.#adaptToClient);
    } catch(err) {
      this.#films = [];
    }

    this._notify(UpdateType.INIT);
  };

  get films() {
    return this.#films;
  }

  get topRatedFilms() {
    if (!this.#topRatedFilms) {
      this.#topRatedFilms = [...this.films]
        .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
        .slice(0, Math.min(this.films.length, TOP_RATED_FILMS_COUNT));
    }

    return this.#topRatedFilms;
  }

  get mostCommentedFilms() {
    if (!this.#mostCommentedFilms) {
      this.#mostCommentedFilms = [...this.films]
        .sort((a, b) => b.comments.length - a.comments.length)
        .slice(0, Math.min(this.films.length, MOST_COMMENTED_FILMS_COUNT));
    }

    return this.#mostCommentedFilms;
  }

  updateFilm = async (updateType, updateItem) => {
    const index = this.#checkFilmExists(updateItem);

    const response = await this.#filmsApiService.updateFilm(updateItem);
    const updatedFilm = this.#adaptToClient(response);
    this.#setAndNotifyLocalFilm(index, updateType, updatedFilm);
  };

  updateToLocal = async (updateType, updateItem) => {
    const index = this.#checkFilmExists(updateItem);
    this.#setAndNotifyLocalFilm(index, updateType, updateItem);
  };

  #setAndNotifyLocalFilm = (index, updateType, updateItem) => {
    if (updateItem.user_details) {
      updateItem = this.#adaptToClient(updateItem);
    }

    this.#films = [
      ...this.#films.slice(0, index),
      updateItem,
      ...this.#films.slice(index + 1),
    ];

    this.#mostCommentedFilms = null;
    this.#topRatedFilms = null;

    this._notify(updateType, updateItem);
  };

  #checkFilmExists = (updateFilm) => {
    const index = this.#films.findIndex((film) => film.id === updateFilm.id);

    if (index === -1) {
      throw new Error('Can\'t update unexciting film');
    }

    return index;
  };

  #adaptToClient = (film) => {
    const adaptedFilm = {
      id: film.id,
      comments: film.comments,
      filmInfo: {
        ...film.film_info,
        ageRating: film.film_info.age_rating,
        alternativeTitle: film.film_info.alternative_title,
        totalRating: film.film_info.total_rating,
        release: {
          date: film.film_info.release.date !== null ? new Date(film.film_info.release.date) : film.film_info.release.date,
          releaseCountry: film.film_info.release.release_country
        }
      },
      userDetails: {
        ...film.user_details,
        alreadyWatched: film.user_details.already_watched,
        watchingDate: film.user_details.watching_date !== null ? new Date(film.user_details.watching_date) : film.user_details.watching_date
      }
    };

    delete adaptedFilm.filmInfo.age_rating;
    delete adaptedFilm.filmInfo.alternative_title;
    delete adaptedFilm.filmInfo.total_rating;
    delete adaptedFilm.userDetails.already_watched;
    delete adaptedFilm.userDetails.watching_date;

    return adaptedFilm;
  };
}
