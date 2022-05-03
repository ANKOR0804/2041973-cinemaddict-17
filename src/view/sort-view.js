import {createElement} from '../render';

const createSortTemplate = () => (
  `<div class="board__sort-list">
    <a href="#" class="board__sort-item">Sort by default</a>
    <a href="#" class="board__sort-item">Sort by date</a>
    <a href="#" class="board__sort-item">Sort by rating</a>
  </div>`
);

export default class SortView {
  getTemplate() {
    return createSortTemplate();
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
