import {createElement} from '../render';

const createFilmsEditTemplate = () => (`<article>
    <form class="movie__form" method="get">
        <div class="movie__inner">

</div>
</form>
    </article>`);

export default class TaskEditView {
  getTemplate() {
    return createFilmsEditTemplate();
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
