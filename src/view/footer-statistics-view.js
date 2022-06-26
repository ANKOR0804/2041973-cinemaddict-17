// *** Статистика фильмов в футере ***

import AbstractView from '../framework/view/abstract-view';

const createFooterStatisticsTemplate = (totalFilmsCount) => (
  `<section class="footer__statistics">
    <p>${totalFilmsCount} movies inside</p>
  </section>`
);

export default class FooterStatisticsView extends AbstractView{
  #totalFilmsCount = null;

  constructor(films) {
    super();
    this.#totalFilmsCount = films.length;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#totalFilmsCount);
  }
}
