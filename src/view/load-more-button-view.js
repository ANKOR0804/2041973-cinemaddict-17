import {createElement} from '../render';

const createLoadMoreButtonTemplate = () => '<button class="load-more" type="button">Load more</button>';

export default class LoadMoreButtonView {
  getTemplate() {
    return createLoadMoreButtonTemplate();
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
