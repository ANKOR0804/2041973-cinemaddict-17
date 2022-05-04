// *** Сама доска ***

import {createElement} from '../render';

const createBoardTemplate = () => '<section class="board container"></section>';

export default class BoardView {
  getTemplate() {
    return createBoardTemplate();
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
