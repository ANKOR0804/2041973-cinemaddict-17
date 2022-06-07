// *** Модуль модели фильма ***

import {generateFilm} from '../mock/film';

const filmsCount = 5;

export default class FilmsModel {
  films = Array.from({length: filmsCount}, generateFilm);

  getFilms = () => this.films;
}
