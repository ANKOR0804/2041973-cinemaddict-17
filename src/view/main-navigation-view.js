// *** Навигация ***

import AbstractView from '../framework/view/abstract-view';

const createMainNavigationTemplate = (userInfo) => {
  let totalCount = {
    watchListCount: 0,
    favoriteCount: 0,
    watchedList: 0,
  };

  totalCount = userInfo.reduce((count, item) => {
    const isWatchlist = item.userDetails.watchlist ? 1 : 0;
    const isFavoritelist = item.userDetails.alreadyWatched ? 1 : 0;
    const isWatchedlist = item.userDetails.favorite ? 1 : 0;

    return {
      watchListCount: count.watchListCount + isWatchlist,
      favoriteCount: count.favoriteCount + isFavoritelist,
      watchedList: count.watchedList + isWatchedlist};
  }, totalCount);

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
