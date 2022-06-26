import FilmCardView from '../view/film-card-view';
import FilmsPopupView from '../view/films-popup-view';
import {remove, render, replace} from '../framework/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class FilmPresenter {
  #siteBoardElement = null;
  #filmsListContainerComponent = null;
  #changeData = null;
  #changeMode = null;

  #filmComponent = null;
  #filmPopupComponent = null;

  film = null;
  #filmComments = null;
  #filmModel = null;

  #mode = Mode.DEFAULT;

  constructor(siteBoardElement, filmsListContainerComponent, filmModel, changeData, changeMode) {
    this.#siteBoardElement = siteBoardElement;
    this.#filmsListContainerComponent = filmsListContainerComponent;
    this.#filmModel = filmModel;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film) => {
    this.film = film;
    this.#filmComments = this.#filmModel.getFilmComments();

    const prevFilmComponent = this.#filmComponent;
    const prevFilmPopupComponent = this.#filmPopupComponent;

    this.#filmComponent = new FilmCardView(this.film);
    this.#filmPopupComponent = new FilmsPopupView(this.film, this.#filmComments);

    this.#filmComponent.setClickHandler(this.#handleFilmClick);
    this.#filmComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#filmComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmPopupComponent.setClickHandler(this.#handleFilmPopupClick);
    this.#filmPopupComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#filmPopupComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmPopupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevFilmComponent === null && prevFilmPopupComponent === null) {
      return render(this.#filmComponent, this.#filmsListContainerComponent);
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmComponent, prevFilmComponent);
      remove(prevFilmComponent);
    }


    if (this.#mode === Mode.POPUP) {
      replace(this.#filmPopupComponent, prevFilmPopupComponent);
      remove(prevFilmPopupComponent);
    }
  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#filmPopupComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#hideFilmCardPopup();
    }
  };

  #showFilmCardPopup = () => {
    this.#changeMode();
    render(this.#filmPopupComponent, this.#siteBoardElement);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.POPUP;
  };

  #hideFilmCardPopup = () => {
    this.#mode = Mode.DEFAULT;
    this.#filmPopupComponent.element.remove();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      document.body.classList.remove('hide-overflow');
      this.#hideFilmCardPopup();
    }
  };

  #handleFilmClick = () => {
    this.#showFilmCardPopup();
  };

  #handleFilmPopupClick = () => {
    this.#hideFilmCardPopup();
  };

  #handleAddToWatchlistClick = () => {
    this.#changeData({
      ...this.film,
      userDetails: {
        ...this.film.userDetails,
        watchlist: !this.film.userDetails.watchlist
      }
    });
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData({
      ...this.film,
      userDetails: {
        ...this.film.userDetails,
        alreadyWatched: !this.film.userDetails.alreadyWatched
      }
    });
  };

  #handleFavoriteClick = () => {
    this.#changeData({
      ...this.film,
      userDetails: {
        ...this.film.userDetails,
        favorite: !this.film.userDetails.favorite,
      }
    });
  };
}
