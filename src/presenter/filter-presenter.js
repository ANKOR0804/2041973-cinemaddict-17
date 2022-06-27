import {render, remove, replace} from '../framework/render';
import MainNavigationView from '../view/main-navigation-view';
import {filter} from '../utils/filter';
import {FilterType, UpdateType} from '../const';

export default class FilterPresenter {
  #filmsModel = null;
  #filterModel = null;

  #filterComponent = null;
  #filterContainerComponent = null;

  constructor(filterContainerComponent, filmsModel, filterModel) {
    this.#filterContainerComponent = filterContainerComponent;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filterTypes() {
    const films = this.#filmsModel.films;

    return [
      {
        type: FilterType.ALL,
        name: 'all',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCH_LIST,
        name: 'watchlist',
        count: filter[FilterType.WATCH_LIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'history',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }

  init = () => {
    const filterTypes = this.filterTypes;
    const prevFilterTypeComponent = this.#filterComponent;

    this.#filterComponent = new MainNavigationView(filterTypes, this.#filterModel.filmsFilter);
    this.#filterComponent.setFilterTypeClickHandler(this.#handleFilterTypeClick);

    if (prevFilterTypeComponent === null) {
      render(this.#filterComponent, this.#filterContainerComponent);
      return;
    }

    replace(this.#filterComponent, prevFilterTypeComponent);
    remove(prevFilterTypeComponent);
  };

  #handleFilterTypeClick = (filterType) => {
    if (this.#filterModel.filmsFilter === filterType) {
      return;
    }


    this.#filterModel.setFilmsFilter(UpdateType.MAJOR, filterType);
  };

  #handleModelEvent = () => {
    this.init();
  };
}
