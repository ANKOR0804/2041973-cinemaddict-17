// *** Модуль модели фильма ***

import {generateFilms} from '../mock/film';
import {generateComments} from '../mock/comments';

const FILMS_COUNT = 21;
const COMMENTS_COUNT = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;

export default class FilmsModel {
  #films = null;
  #comments = null;
  #topRatedFilms = null;
  #mostCommentedFilms = null;

  get films() {
    if (!this.#films) {
      this.#films = generateFilms(FILMS_COUNT, this.comments);
    }

    return this.#films;
  }

  get comments() {
    if (!this.#comments) {
      this.#comments = generateComments(COMMENTS_COUNT);
    }

    return this.#comments;
  }

  get topRatedFilms() {
    if (!this.#topRatedFilms) {
      this.#topRatedFilms = this.#films
        .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
        .slice(0, Math.min(this.films.length, TOP_RATED_FILMS_COUNT));
    }

    return this.#topRatedFilms;
  }

  get mostCommentedFilms() {
    if (!this.#mostCommentedFilms) {
      this.#mostCommentedFilms = this.#films
        .sort((a, b) => b.comments.length - a.comments.length)
        .slice(0, Math.min(this.films.length, MOST_COMMENTED_FILMS_COUNT));
    }

    return this.#mostCommentedFilms;
  }

  getFilmComments() {
    return this.comments;
  }
}
