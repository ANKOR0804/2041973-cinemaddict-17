import {createElement} from '../render';

const createNewTaskButtonTemplate = () => '<button class="control__button">+ ADD NEW MOVIE</button>';

export default class NewMovieButtonView {
  getTemplate() {
    return createNewTaskButtonTemplate();
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
