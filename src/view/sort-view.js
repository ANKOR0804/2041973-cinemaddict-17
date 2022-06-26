// *** Фильтры фильмов ***

import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../const';

const createSortTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.BY_DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
  </ul>`
);

export default class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }

  setSortTypeChangeCLickHandler = (callback) => {
    this._callback.SortTypeChangeClick = callback;
    this.element.addEventListener('click', this.#sortTypeChangeClickHandler);
  };

  #sortTypeChangeClickHandler = (event) => {
    if (event.target.tagName !== 'A') {
      return;
    }

    this.element.querySelectorAll('.sort__button').forEach((item) =>
      item.classList.remove('sort__button--active'));

    event.target.classList.add('sort__button--active');

    event.preventDefault();
    this._callback.SortTypeChangeClick(event.target.dataset.sortType);
  };
}
