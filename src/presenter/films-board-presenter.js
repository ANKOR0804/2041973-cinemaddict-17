// *** Презентер доски фильма ***

import FilmsBoardView from '../view/films-board-view';
import FilmCardView from '../view/film-card-view';
import FilmsPopupView from '../view/films-popup-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import SortView from '../view/sort-view';
import NoFilmsView from '../view/no-films-view';
import {render, RenderPosition} from '../render';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsBoardPresenter {
  #filmsBoardContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filmCardCommentContainer = null;

  #filmsBoardComponent = new FilmsBoardView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #boardFilms = [];
  #boardFilmsComments = [];
  #renderFilmCount = FILM_COUNT_PER_STEP;

  constructor(filmsBoardContainer, filmsModel, commentsModel) {
    this.#filmsBoardContainer = filmsBoardContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#boardFilms = [...this.#filmsModel.films];
    this.#boardFilmsComments = [...this.#commentsModel.comments];

    this.#renderFilmsBoard();
  };

  #handleShowMoreButtonClick = (event) => {
    event.preventDefault();
    this.#boardFilms
      .slice(this.#renderFilmCount, this.#renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film, film));

    this.#renderFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderFilmCount >= this.#boardFilms.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderFilm = (film, filmPopup) => {
    const filmComponent = new FilmCardView(film);
    const filmPopupComponent = new FilmsPopupView(filmPopup, this.#boardFilmsComments);

    const showFilmCardPopup = (event) => {
      const exception = filmComponent.element.querySelector('.film-card__controls');

      for (let i = 0; i < exception.childNodes.length; i++) {
        if (event.target === exception.childNodes[i]) {
          return false;
        }
      }

      render(filmPopupComponent, this.#filmCardCommentContainer);
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

    render(filmComponent, this.#filmsListContainerComponent.element);
  };

  #renderFilmsBoard = () => {
    render(this.#filmsBoardComponent, this.#filmsBoardContainer);

    this.#filmCardCommentContainer = document.querySelector('.main');

    if (this.#boardFilms.length === 0) {
      render(new NoFilmsView(), this.#filmsBoardComponent.element);
    } else {
      render(new SortView(), this.#filmsBoardComponent.element, RenderPosition.BEFOREBEGIN);
      render(this.#filmsListComponent, this.#filmsBoardComponent.element);
      render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

      for (let i = 0; i < Math.min(this.#boardFilms.length, FILM_COUNT_PER_STEP); i++) {
        this.#renderFilm(this.#boardFilms[i], this.#boardFilms[i]);
      }

      if (this.#boardFilms.length > FILM_COUNT_PER_STEP) {
        render(this.#showMoreButtonComponent, this.#filmsListComponent.element);

        this.#showMoreButtonComponent.element.addEventListener('click', this.#handleShowMoreButtonClick);
      }
    }
  };
}
