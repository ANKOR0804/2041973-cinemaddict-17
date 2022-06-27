import {render, remove, replace} from '../framework/render';
import AbstractView from '../framework/view/abstract-view';
import HeaderProfileView from '../view/header-profile-view';

const headerProfileRank = {
  'Novice': [0, 10],
  'Fan': [11, 29],
  'Movie Buff': [21, Infinity],
};

export default class HeaderProfilePresenter extends AbstractView {
  #filmsModel = null;
  #filmsWatchedCount = null;

  #profileRank = null;
  #profileComponent = null;
  #profileContainerComponent = null;

  constructor(profileContainerComponent, filmsModel) {
    super();
    this.#profileContainerComponent = profileContainerComponent;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#filmsWatchedCount = this.#getFilmsWatchedCount(this.#filmsModel.films);
    this.#profileRank = this.#getProfileRank(this.#filmsWatchedCount)[0];

    const prevProfileComponent = this.#profileComponent;
    this.#filmsModel.addObserver(this.#handleModelEvent);

    this.#profileComponent = new HeaderProfileView(this.#profileRank);

    if (prevProfileComponent === null) {
      render(this.#profileComponent, this.#profileContainerComponent);
      return;
    }

    replace(this.#profileComponent, prevProfileComponent);
    remove(prevProfileComponent);
  };

  #getFilmsWatchedCount = (films) => films.filter((film) => film.userDetails.alreadyWatched).length;

  #getProfileRank = (length) => Object.entries(headerProfileRank)
    .filter(([, value]) => length >= value[0] && length <= value[1])
    .flat();

  #handleModelEvent = () => {
    this.init();
  };
}
