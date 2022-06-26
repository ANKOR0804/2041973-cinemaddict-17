// *** Список фильмов ***

import AbstractView from '../framework/view/abstract-view';

const createFilmsListTemplate = (title, isExtra) => (
  `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${!isExtra ? 'visually-hidden' : ''}">${title}</h2>
  </section>`
);

export default class FilmsListView extends AbstractView {
  #title = null;
  #isExtra = null;

  constructor(title, isExtra) {
    super();
    this.#title = title;
    this.#isExtra = isExtra;
  }

  get template() {
    return createFilmsListTemplate(this.#title, this.#isExtra);
  }
}
