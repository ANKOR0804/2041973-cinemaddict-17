// *** Список фильмов ***

import {createElement} from '../render';

const createFilmsListTemplate = () => (`
<section class="films-list">
      <h2 class="films-list__title">All movies. Upcoming</h2>

      <div class="films-list__container">
      </div>
    </section>
`);

export default class FilmsListView {
  getTemplate() {
    return createFilmsListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}