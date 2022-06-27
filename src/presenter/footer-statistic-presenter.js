import AbstractView from '../framework/view/abstract-view';
import FooterStatisticsView from '../view/footer-statistics-view';
import {render, remove, replace} from '../framework/render';

export default class FooterStatisticPresenter extends AbstractView {
  #filmsModel = null;
  #statisticComponent = null;
  #statisticComponentContainer = null;

  constructor(statisticComponentContainer, filmsModel) {
    super();
    this.#statisticComponentContainer = statisticComponentContainer;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    const films = this.#filmsModel.films;
    const filmCount = films.length;
    const prevStatisticComponent = this.#statisticComponent;
    this.#filmsModel.addObserver(this.#handleModelEvent);

    this.#statisticComponent = new FooterStatisticsView(filmCount);

    if (prevStatisticComponent === null) {
      render(this.#statisticComponent, this.#statisticComponentContainer);
      return;
    }

    replace(this.#statisticComponent, prevStatisticComponent);
    remove(prevStatisticComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };
}
