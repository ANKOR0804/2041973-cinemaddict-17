// *** Статистика фильмов в футере ***

import AbstractView from '../framework/view/abstract-view';

const createFooterStatisticsTemplate = (totalFilmsCount) => (
  `<p>${totalFilmsCount} movies inside</p>`
);

export default class FooterStatisticsView extends AbstractView{
  #totalFilmsCount = null;

  constructor(totalFilmsCount) {
    super();
    this.#totalFilmsCount = totalFilmsCount;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#totalFilmsCount);
  }
}
