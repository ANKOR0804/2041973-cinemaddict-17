// *** Сама доска фильмов ***

import {createElement} from '../render';

const createFilmsBoardTemplate = () => '<section class="films"></section>';

export default class FilmsBoardView {
  #element = null;

  get template() {
    return createFilmsBoardTemplate();
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
