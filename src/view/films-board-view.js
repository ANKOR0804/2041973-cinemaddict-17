// *** Сама доска фильмов ***

import {createElement} from '../render';

const createFilmsBoardTemplate = () => '<section class="films"></section>';

export default class FilmsBoardView {
  getTemplate() {
    return createFilmsBoardTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
