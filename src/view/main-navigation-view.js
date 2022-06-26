// *** Навигация ***

import AbstractView from '../framework/view/abstract-view';

const createMainNavigationTemplate = (films) => {
  const initialCount = {
    watchListCount: 0,
    favoriteCount: 0,
    watchedList: 0,
  };

  const totalCount = films.reduce((count, item) => {
    const {watchlist, alreadyWatched, favorite} = item.userDetails;

    return {
      watchListCount: count.watchListCount + (watchlist ? 1 : 0),
      favoriteCount: count.favoriteCount + (alreadyWatched ? 1 : 0),
      watchedList: count.watchedList + (favorite ? 1 : 0)
    };
  }, initialCount);

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">
        Watchlist <span class="main-navigation__item-count">${totalCount.watchListCount}</span></a>
      <a href="#history" class="main-navigation__item">
        History <span class="main-navigation__item-count">${totalCount.favoriteCount}</span></a>
      <a href="#favorites" class="main-navigation__item">
        Favorites <span class="main-navigation__item-count">${totalCount.watchedList}</span></a>
    </nav>`
  );
};

export default class MainNavigationView extends AbstractView {
  #userInfo = null;

  constructor(userInfo) {
    super();
    this.#userInfo = userInfo;
  }

  get template() {
    return createMainNavigationTemplate(this.#userInfo);
  }
}
