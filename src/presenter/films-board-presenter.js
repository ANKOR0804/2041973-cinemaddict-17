// *** Презентер доски фильма ***

import FilmsBoardView from '../view/films-board-view';
import FilmCardView from '../view/film-card-view';
import FilmsPopupView from '../view/films-popup-view';
import FilmsListView from '../view/films-list-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import {render, RenderPosition} from '../render';

export default class FilmsBoardPresenter {
  filmsBoardComponent = new FilmsBoardView();
  filmsListComponent = new FilmsListView();

  init = (filmsBoardContainer, filmsModel, commentsModel) => {
    this.filmsBoardContainer = filmsBoardContainer;
    this.filmsModel = filmsModel;
    this.commentsModel = commentsModel;
    this.boardFilms = [...this.filmsModel.getFilms()];
    this.boardFilmsComments = [...this.commentsModel.getComments()];

    render(this.filmsBoardComponent, this.filmsBoardContainer);
    render(this.filmsListComponent, this.filmsBoardComponent.getElement());

    const filmCardContainer = document.querySelector('.films-list__container');

    // Закомментить, чтобы посмотреть без попапов
    render(new FilmsPopupView(this.boardFilms[0], this.boardFilmsComments), filmCardContainer, RenderPosition.AFTEREND);

    for (let i = 0; i < this.boardFilms.length; i++) {
      render(new FilmCardView(this.boardFilms[i]), filmCardContainer);
    }

    render(new ShowMoreButtonView(), this.filmsListComponent.getElement());
  };
}
