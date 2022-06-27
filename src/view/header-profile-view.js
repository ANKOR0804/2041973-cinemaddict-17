// *** Звание пользователя ***

import AbstractView from '../framework/view/abstract-view';

const createHeaderProfileTemplate = (profileRank) => (
  `<section class="header__profile profile">${
    length !== 0
      ? `<p class="profile__rating">${profileRank.charAt(0).toUpperCase() + profileRank.slice(1)}</p>`
      : ''
  }
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class HeaderProfileView extends AbstractView {
  #profileRank = null;

  constructor(profileRank) {
    super();
    this.#profileRank = profileRank;
  }

  get template() {
    return createHeaderProfileTemplate(this.#profileRank);
  }
}
