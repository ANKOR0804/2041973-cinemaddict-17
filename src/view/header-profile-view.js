// *** Звание пользователя ***

import AbstractView from '../framework/view/abstract-view';

const USER_RANK = {
  'Novice': [1, 10],
  'Fan': [11, 20],
  'Movie Buff': [21, Infinity],
};

const getUserRank = (amount) => Object
  .entries(USER_RANK)
  .filter(([, value]) => amount >= value[0] && amount <= value[1])
  .flat();

const createHeaderProfileTemplate = () => (
  `<section class="header__profile profile">${
    length !== 0
      ? `<p class="profile__rating">${getUserRank(length)[0].charAt(0).toUpperCase() + getUserRank(length)[0].slice(1)}</p>`
      : ''
  }
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class HeaderProfileView extends AbstractView {
  #watchedFilmCount = null;

  constructor(films) {
    super();
    this.#watchedFilmCount = films.filter((film) => film.userDetails.alreadyWatched).length;
  }

  get template() {
    return createHeaderProfileTemplate(this.#watchedFilmCount);
  }
}
