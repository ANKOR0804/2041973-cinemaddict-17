import FilmsBoardView from '../view/films-board-view';
import FilmCardView from '../view/film-card-view';
import FilmsListView from '../view/films-list-view';
import FilmsListExtraView from '../view/films-list-extra-view';
import FilmsPopupView from '../view/films-popup-view';
import SortView from '../view/sort-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import {render} from "../render";

export default class FilmsBoardPresenter {
  filmsBoardComponent = new FilmsBoardView();
  filmsListComponent = new FilmsListView();

  init = (filmsBoardContainer) => {
    this.filmsBoardContainer = filmsBoardContainer;

    render(this.filmsBoardComponent, this.filmsBoardContainer);
    render(new SortView(), this.filmsBoardComponent.getElement());
    render(this.filmsListComponent, this.filmsBoardComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new FilmCardView(), this.filmsListComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.filmsBoardComponent.getElement());
  }
}
