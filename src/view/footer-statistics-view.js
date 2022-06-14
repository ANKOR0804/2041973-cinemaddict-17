// *** Статистика фильмов в футере ***

import AbstractView from '../framework/view/abstract-view';

const createFooterStatisticsTemplate = () => (
  `<section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>`
);

export default class FooterStatisticsView extends AbstractView{
  get template() {
    return createFooterStatisticsTemplate();
  }
}
