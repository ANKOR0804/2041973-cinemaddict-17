// *** Навигация ***

import AbstractView from '../framework/view/abstract-view';

const createMainNavigationTemplate = (userInfo) => {
  const watchListCount = () => {
    let count = 0;

    for (let i = 0; i < userInfo.length; i++) {
      if (userInfo[i].userDetails.watchlist) {
        count++;
      }
    }

    return count;
  };

  const favoriteCount = () => {
    let count = 0;

    for (let i = 0; i < userInfo.length; i++) {
      if (userInfo[i].userDetails.favorite) {
        count++;
      }
    }

    return count;
  };

  const watchedCount = () => {
    let count = 0;

    for (let i = 0; i < userInfo.length; i++) {
      if (userInfo[i].userDetails.alreadyWatched) {
        count++;
      }
    }

    return count;
  };

  const totalWatchlist = watchListCount();
  const favoritelist = favoriteCount();
  const watchedlist = watchedCount();

  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">
      Watchlist <span class="main-navigation__item-count">${totalWatchlist}</span></a>
    <a href="#history" class="main-navigation__item">
      History <span class="main-navigation__item-count">${favoritelist}</span></a>
    <a href="#favorites" class="main-navigation__item">
      Favorites <span class="main-navigation__item-count">${watchedlist}</span></a>
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
