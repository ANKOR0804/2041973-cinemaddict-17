import Observable from '../framework/observable.js';
import {FilterType} from '../const.js';


export default class FilterModel extends Observable {
  #filter = FilterType.ALL;

  get filmsFilter() {
    return this.#filter;
  }

  setFilmsFilter = (updateType, filterType) => {
    this.#filter = filterType;
    this._notify(updateType, filterType);
  };
}
