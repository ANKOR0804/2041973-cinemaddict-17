// *** Сама доска фильмов ***

import AbstractView from '../framework/view/abstract-view';

const createFilmsBoardTemplate = () => '<section class="films"></section>';

export default class FilmsBoardView extends AbstractView{

  get template() {
    return createFilmsBoardTemplate();
  }
}
