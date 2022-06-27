import {remove, render, replace} from '../framework/render';
import FilmCardView from '../view/film-card-view';
import FilmsPopupView from '../view/films-popup-view';
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

  film = null;
  #filmComments = null;
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
    this.#filmComments = this.#getFilmComments();

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
    this.#filmPopupComponent.setCommentDeleteClickHandler(this.#handleCommentDeleteClick);
    this.#filmPopupComponent.setCommentAddClickHandler(this.#handleCommentAddClick);

    if (prevFilmComponent === null && prevFilmPopupComponent === null) {
      return render(this.#filmComponent, this.#filmsListContainerComponent);
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmComponent, prevFilmComponent);
      remove(prevFilmComponent);
    }

    if (this.#mode === Mode.POPUP) {
      this.#scrollTopDetails = prevFilmPopupComponent.element.scrollTop;
      replace(this.#filmPopupComponent, prevFilmPopupComponent);
      this.#filmPopupComponent.element.scrollTop = this.#scrollTopDetails;
      remove(prevFilmPopupComponent);
    }
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
      render(this.#filmPopupComponent, this.#siteBoardElement);
      document.addEventListener('keydown', this.#escKeyDownHandler);
      this.#changeMode();
      this.#mode = Mode.POPUP;
    }
  };

  #hideFilmCardPopup = () => {
    this.#mode = Mode.DEFAULT;
    this.#filmPopupComponent.reset(this.film);
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
    this.#changeData(
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
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {
        ...this.film,
        userDetails: {
          ...this.film.userDetails,
          alreadyWatched: !this.film.userDetails.alreadyWatched,
        }
      }
    );
  };

  #handleFavoriteClick = () => {
    this.#changeData(
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
  };

  #handleCommentDeleteClick = (commentId) => {
    this.#commentModel.deleteComment(
      UpdateType.MINOR,
      commentId
    );

    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.MINOR,
      {
        ...this.film,
        comments: this.film.comments.filter((filmCommentId) => filmCommentId !== commentId),
      }
    );
  };

  #handleCommentAddClick = (updateComment) => {
    this.#commentModel.addComment(
      UpdateType.MINOR,
      updateComment
    );

    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.MINOR,
      {
        ...this.film,
        comments: [...this.film.comments, updateComment.id],
      }
    );
  };

  #getFilmComments() {
    return this.#commentModel.comments.filter((comment) => this.film.comments.includes(comment.id));
  }

  isDefault = () => this.#mode === Mode.DEFAULT;

  isPopup = () => this.#mode === Mode.POPUP;
}
