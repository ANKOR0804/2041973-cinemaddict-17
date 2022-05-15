import FilmsBoardView from '../view/films-board-view';
import FilmCardView from '../view/film-card-view';
import FilmsListView from '../view/films-list-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import {render} from '../render';

export default class FilmsBoardPresenter {
  filmsBoardComponent = new FilmsBoardView();
  filmsListComponent = new FilmsListView();

  init = (filmsBoardContainer) => {
    this.filmsBoardContainer = filmsBoardContainer;

    render(this.filmsBoardComponent, this.filmsBoardContainer);
    render(this.filmsListComponent, this.filmsBoardComponent.getElement());

    const filmCardContainer = document.querySelector('.films-list__container');
    const filmCardTotalNumber = 5;

    for (let i = 0; i < filmCardTotalNumber; i++) {
      render(new FilmCardView(), filmCardContainer);
    }

    render(new ShowMoreButtonView(), this.filmsListComponent.getElement());
  };
}
