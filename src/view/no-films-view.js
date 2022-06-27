// *** Заглушка на случай, если нету фильмов ***

import AbstractView from '../framework/view/abstract-view';
import {NoFilmsText} from '../const';

const createNoFilmsTemplate = (moFilmsText) => (
  `<section class="films-list">
    <h2 class="films-list__title">${moFilmsText}</h2>
  </section>`
);

export default class NoFilmsView extends AbstractView {
  #noFilmsText = null;

  constructor (filterType) {
    super();
    this.#noFilmsText = NoFilmsText[filterType];
  }

  get template() {
    return createNoFilmsTemplate(this.#noFilmsText);
  }
}
