// *** Фильтры фильмов ***

import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../const';

const createSortTemplate = (currentSortType) => (
  `<ul class="sort">
    <li>
      <a href="#"
         class="sort__button ${currentSortType === SortType.BY_DEFAULT ? 'sort__button--active' : ''}"
         data-sort-type="${SortType.BY_DEFAULT}">Sort by default</a>
    </li>
    <li>
      <a href="#"
         class="sort__button ${currentSortType === SortType.BY_DATE ? 'sort__button--active' : ''}"
         data-sort-type="${SortType.BY_DATE}">Sort by date</a>
    </li>
    <li>
      <a href="#"
         class="sort__button ${currentSortType === SortType.BY_RATING ? 'sort__button--active' : ''}"
         data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
  </ul>`
);

export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeCLickHandler = (callback) => {
    this._callback.SortTypeChangeClick = callback;
    this.element.addEventListener('click', this.#sortTypeChangeClickHandler);
  };

  #sortTypeChangeClickHandler = (event) => {
    event.preventDefault();

    if (event.target.tagName !== 'A') {
      return;
    }

    event.preventDefault();
    this._callback.SortTypeChangeClick(event.target.dataset.sortType);
  };
}
