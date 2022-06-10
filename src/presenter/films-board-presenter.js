// *** Презентер доски фильма ***

import FilmsBoardView from '../view/films-board-view';
import FilmCardView from '../view/film-card-view';
import FilmsPopupView from '../view/films-popup-view';
import FilmsListView from '../view/films-list-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import {render, RenderPosition} from '../render';

export default class FilmsBoardPresenter {
  #filmsBoardContainer = null;
  #filmsModel = null;
  #commentsModel = null;

  #filmsBoardComponent = new FilmsBoardView();
  #filmsListComponent = new FilmsListView();

  #boardFilms = [];
  #boardFilmsComments = [];
  #filmCardContainer = null;
  #filmCardCommentContainer = null;

  init = (filmsBoardContainer, filmsModel, commentsModel) => {
    this.#filmsBoardContainer = filmsBoardContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#boardFilms = [...this.#filmsModel.films];
    this.#boardFilmsComments = [...this.#commentsModel.comments];

    render(this.#filmsBoardComponent, this.#filmsBoardContainer);
    render(this.#filmsListComponent, this.#filmsBoardComponent.element);

    this.#filmCardContainer = document.querySelector('.films-list__container');
    this.#filmCardCommentContainer = document.querySelector('.main');

    for (let i = 0; i < this.#boardFilms.length; i++) {
      this.#renderFilm(this.#boardFilms[i], this.#boardFilms[i]);
    }

    render(new ShowMoreButtonView(), this.#filmsListComponent.element);
  };

  #renderFilm = (film, filmPopup) => {
    const filmComponent = new FilmCardView(film);
    const filmPopupComponent = new FilmsPopupView(filmPopup, this.#boardFilmsComments);

    const showFilmCardPopup = (event) => {
      const exception = filmComponent.element.querySelector('.film-card__controls');

      for(let i = 0; i < exception.childNodes.length; i++) {
        if(event.target === exception.childNodes[i]) {
          return false;
        }
      }

      render(filmPopupComponent, this.#filmCardCommentContainer, RenderPosition.BEFOREEND);
      document.querySelector('body').style.overflow = 'hidden';
    };

    const hideFilmCardPopup = () => {
      filmPopupComponent.element.remove();
      document.querySelector('body').style.overflow = 'unset';
    };

    const onEscKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        event.preventDefault();
        hideFilmCardPopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmComponent.element.addEventListener('click', () => {
      showFilmCardPopup(event);
      document.addEventListener('keydown', onEscKeyDown);
    });

    filmPopupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      hideFilmCardPopup();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(filmComponent, this.#filmCardContainer);
  };
}
