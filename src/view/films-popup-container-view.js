import AbstractView from '../framework/view/abstract-view';

const createFilmPopupContainerTemplate = () => (
  '<section class="film-details"></section>'
);

export default class FilmsPopupContainerView extends AbstractView {
  get template() {
    return createFilmPopupContainerTemplate();
  }
}

