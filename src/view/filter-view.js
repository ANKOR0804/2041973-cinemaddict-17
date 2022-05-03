import {createElement} from '../render';

const createFilterTemplate = () => (
  `<section class="main__filter filter container"></section>
    <input
    type="radio"
    id="filter__all"
    class="filter__input visually-hidden"
    name="filter"
    checked
    />
    <label for="filter__all" class="filter__label">
    All <span class="filter__all-count">13</span>
</label>
    `
);

export default class FilterView {
  getTemplate() {
    return createFilterTemplate();
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
