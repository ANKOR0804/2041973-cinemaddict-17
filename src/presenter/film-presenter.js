import {remove, render, replace} from '../framework/render';
import FilmCardView from '../view/film-card-view';
import FilmsPopupView from '../view/films-popup-view';
import FilmsPopupContainerView from '../view/films-popup-container-view';
import {UserAction, UpdateType} from '../const';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class FilmPresenter {
  #changeData = null;
  #changeMode = null;
  #scrollTopDetails = null;

  #siteBoardElement = null;
  #filmsListContainerComponent = null;
  #filmComponent = null;
  #filmPopupComponent = null;
  #filmPopupContainerComponent = null;
  #prevFilmComponent = null;
  #prevFilmPopupComponent = null;

  film = null;
  #filmComments = [];
  #updatedFilms = null;
  #filmModel = null;
  #commentModel = null;

  #mode = Mode.DEFAULT;

  constructor(siteBoardElement, filmsListContainerComponent, filmModel, commentModel, changeData, changeMode) {
    this.#siteBoardElement = siteBoardElement;
    this.#filmsListContainerComponent = filmsListContainerComponent;
    this.#filmModel = filmModel;
    this.#commentModel = commentModel;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film) => {
    this.film = film;
    this.#filmComments = this.#commentModel.comments;

    this.#prevFilmComponent = this.#filmComponent;
    this.#prevFilmPopupComponent = this.#filmPopupComponent;

    this.#filmComponent = new FilmCardView(this.film);
    this.#setFilmHandlers();
    this.#filmPopupComponent = new FilmsPopupView(this.film, []);
    this.#setFilmPopupHandlers();
    this.#filmPopupContainerComponent = new FilmsPopupContainerView();

    if (this.#prevFilmComponent === null && this.#prevFilmPopupComponent === null) {
      return render(this.#filmComponent, this.#filmsListContainerComponent);
    }

    if (!this.isPopup) {
      replace(this.#filmComponent, this.#prevFilmComponent);
      remove(this.#prevFilmComponent);
    }

    if (this.isPopup()) {
      this.#replaceFilmDetailsComponent(this.#filmComments);
    }
  };

  #setFilmHandlers = () => {
    this.#filmComponent.setClickHandler(this.#handleFilmClick);
    this.#filmComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#filmComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
  };

  #setFilmPopupHandlers = () => {
    this.#filmPopupComponent.setClickHandler(this.#handleFilmPopupClick);
    this.#filmPopupComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#filmPopupComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmPopupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmPopupComponent.setCommentDeleteClickHandler(this.#handleCommentDeleteClick);
    this.#filmPopupComponent.setCommentAddClickHandler(this.#handleCommentAddClick);
  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#filmPopupComponent);
  };

  destroyFilmCard = () => {
    remove(this.#filmComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#hideFilmCardPopup();
    }
  };

  #showFilmCardPopup = () => {
    if (this.#mode === Mode.DEFAULT) {
      render(this.#filmPopupContainerComponent, this.#filmsListContainerComponent);
      render(this.#filmPopupComponent, this.#filmPopupContainerComponent.element);
      document.addEventListener('keydown', this.#escKeyDownHandler);
      this.#changeMode();
      this.#mode = Mode.POPUP;
      this.#getAndUpdateComments();
    }
  };

  #hideFilmCardPopup = () => {
    this.#mode = Mode.DEFAULT;
    this.#filmPopupComponent.reset(this.film);
    this.#filmPopupComponent.element.remove();
    this.#filmPopupContainerComponent.element.remove();
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

  #handleAddToWatchlistClick = async () => {
    try {
      await this.#changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {
          ...this.film,
          userDetails: {
            ...this.film.userDetails,
            watchlist: !this.film.userDetails.watchlist,
          }
        }
      );
    } catch {
      this.#revertChanges();
    }
  };

  #handleAlreadyWatchedClick = async () => {
    try {
      await this.#changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {...this.film,
          userDetails: {
            ...this.film.userDetails,
            alreadyWatched: !this.film.userDetails.alreadyWatched,
          }
        }
      );
    } catch {
      this.#revertChanges();
    }
  };

  #handleFavoriteClick = async () => {
    try {
      await this.#changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {
          ...this.film,
          userDetails: {
            ...this.film.userDetails,
            favorite: !this.film.userDetails.favorite,
          }
        }
      );
    } catch {
      this.#revertChanges();
    }
  };

  #handleCommentDeleteClick = async (commentId) => {
    try {
      await this.#commentModel.deleteComment(
        UpdateType.MINOR,
        commentId
      );

      this.#changeData(
        UserAction.DELETE_COMMENT,
        UpdateType.MINOR,
        {
          ...this.film,
          comments: this.film.comments.filter((id) => id !== commentId),
        }
      );

    } catch {
      this.#revertChanges();
    }
  };

  #handleCommentAddClick = async (updateComment) => {
    try {
      this.#updatedFilms = await this.#commentModel.addComment(this.film.id, updateComment);

      this.#changeData(
        UserAction.ADD_COMMENT,
        UpdateType.MINOR,
        this.#updatedFilms
      );
    } catch {
      this.#revertChanges();
    }
  };

  #getAndUpdateComments = async () => {
    const comments = await this.#commentModel.getCommentsById(this.film.id);
    this.#prevFilmPopupComponent = this.#filmPopupComponent;
    this.#replaceFilmDetailsComponent(comments);
  };

  #replaceFilmDetailsComponent = (comments) => {
    this.#scrollTopDetails = this.#prevFilmPopupComponent.element.scrollTop;
    this.#filmPopupComponent = new FilmsPopupView(this.film, comments);
    this.#setFilmPopupHandlers();
    replace(this.#filmPopupComponent, this.#prevFilmPopupComponent);
    this.#filmPopupComponent.element.scrollTop = this.#scrollTopDetails;
    remove(this.#prevFilmPopupComponent);
  };

  #revertChanges = () => {
    if (this.isPopup()) {
      const resetFilmPopup = () => {
        this.#filmPopupComponent.updateElement({
          isCommentDeleting: false,
          isCommentAdding: false,
          isFilmUpdating: false,
        });
      };

      this.#filmPopupComponent.shake(resetFilmPopup);
      return true;
    }

    const resetFilm = () => {
      this.#filmComponent.updateElement({
        isFilmUpdating: false
      });
    };
    this.#filmComponent.shake(resetFilm);
  };

  isPopup = () => this.#mode === Mode.POPUP;
}
