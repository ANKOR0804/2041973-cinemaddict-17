// *** Навигация ***

import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../const';

const createFilterItemTemplate = (filmFilter, currentFilter) => (
  `<a id="${filmFilter.type}"
      href="#${filmFilter.name}"
      class="main-navigation__item ${filmFilter.type === currentFilter ? 'main-navigation__item--active' : ''}">
    ${filmFilter.type !== FilterType.ALL
    ? `${filmFilter.name.charAt(0).toUpperCase() + filmFilter.name.slice(1)}
      <span class="main-navigation__item-count">${filmFilter.count}</span>`
    : 'All movies'}
  </a>`
);

const createMainNavigationTemplate = (filterTypes, currentFilter) => (
  `<nav class="main-navigation">
    ${filterTypes.map((filmFilter) => createFilterItemTemplate(filmFilter, currentFilter)).join(' ')}
  </nav>`
);

export default class MainNavigationView extends AbstractView {
  #filterTypes = null;
  #currentFilter = null;

  constructor(filterTypes, currentFilter) {
    super();
    this.#filterTypes = filterTypes;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createMainNavigationTemplate(this.#filterTypes, this.#currentFilter);
  }

  setFilterTypeClickHandler = (callback) => {
    this._callback.filterTypeClick = callback;
    this.element.querySelectorAll('.main-navigation__item')
      .forEach((element) => element.addEventListener('click', this.#filterTypeClickHandler));
  };

  #filterTypeClickHandler = (event) => {
    event.preventDefault();
    this._callback.filterTypeClick(event.target.id);
  };
}
