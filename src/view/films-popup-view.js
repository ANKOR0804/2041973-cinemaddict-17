// *** Карточка попапа фильма ***

import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {humanizeDuration, humanizeDateByDay, humanizeFullByTime} from '../utils/film';
import classNames from 'classnames';
import he from 'he';

const createFilmsPopupTemplate = (state, comments) => {
  const {filmInfo, userDetails} = state;

  const writers = filmInfo.writers.join(', ');

  const actors = filmInfo.actors.join(', ');

  const fullDate = humanizeDateByDay(filmInfo.release.date);

  const duration = filmInfo.runtime !== null
    ? humanizeDuration(filmInfo.runtime)
    : '';

  const renderGenres = (genres) => {
    let genresList = '';
    for (const genre of genres) {
      genresList += `<span class="film-details__genre">${genre}</span>`;
    }
    return genresList;
  };

  const allGenres = renderGenres(filmInfo.genre);

  const totalComments = comments.length;

  const returnImageOfEmotion = () => {
    for (const comment of comments) {
      switch (comment.emotion) {
        case 'smile':
          comment.emotion = './images/emoji/smile.png';
          break;
        case 'sleeping':
          comment.emotion = './images/emoji/smile.png';
          break;
        case 'puke':
          comment.emotion = './images/emoji/puke.png';
          break;
        case 'angry':
          comment.emotion = './images/emoji/angry.png';
          break;
      }
    }
  };

  returnImageOfEmotion();

  const isWatchlist = classNames({'film-details__control-button--active': userDetails.watchlist});
  const isWatched = classNames({'film-details__control-button--active': userDetails.alreadyWatched});
  const isFavorite = classNames({'film-details__control-button--active': userDetails.favorite});

  const renderComments = () => {
    let commentsList = '';

    for (const comment of comments) {
      const commentDay = humanizeFullByTime(comment.date);
      commentsList += `<li class="film-details__comment" id="${comment.id}">
          <span class="film-details__comment-emoji">
            <img src="${comment.emotion}" width="55" height="55" alt="emoji-smile">
          </span>
          <div>
            <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${comment.author}</span>
              <span class="film-details__comment-day">${commentDay}</span>
              <button class="film-details__comment-delete "${state.isCommentDeleting ? ' disabled' : ''}>
                ${state.isCommentDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </p>
          </div>
        </li>`;
    }

    return commentsList;
  };

  const allComments = renderComments();

  const commentEmojiTemplate = state.commentEmoji
    ? `<img src="images/emoji/${state.commentEmoji}.png" width="55" height="55" alt="emoji-${state.commentEmoji}}">`
    : '';

  return (
    `<form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./${filmInfo.poster}" alt="">

              <p class="film-details__age">${filmInfo.ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${filmInfo.title}</h3>
                  <p class="film-details__title-original">Original: ${filmInfo.title}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${filmInfo.totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${filmInfo.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${fullDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">${allGenres}</td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${filmInfo.description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <button type="button"
                    class="film-details__control-button film-details__control-button--watchlist ${isWatchlist}"
                    id="watchlist" name="watchlist" ${state.isFilmUpdating ? ' disabled' : ''}>Add to watchlist
            </button>
            <button type="button"
                    class="film-details__control-button film-details__control-button--watched ${isWatched}"
                    id="watched" name="watched" ${state.isFilmUpdating ? ' disabled' : ''}>Already watched
            </button>
            <button type="button"
                    class="film-details__control-button film-details__control-button--favorite ${isFavorite}"
                    id="favorite"
                    name="favorite" ${state.isFilmUpdating ? ' disabled' : ''}>Add to favorites
            </button>
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">
            Comments <span class="film-details__comments-count">${totalComments}</span></h3>
            <ul class="film-details__comments-list">
              ${allComments}
            </ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label">${commentEmojiTemplate}</div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input"
                          placeholder="Select reaction below and write comment here"
                          name="comment" ${state.isCommentAdding ? ' disabled' : ''}>
                  ${state.commentText ? state.commentText : ''}
                </textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                       id="emoji-smile"
                       value="smile"
                       ${state.isCommentAdding ? ' disabled' : ''}>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                       id="emoji-sleeping" value="sleeping" ${state.isCommentAdding ? ' disabled' : ''}>
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                       id="emoji-puke"
                       value="puke"
                       ${state.isCommentAdding ? ' disabled' : ''}>
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                       id="emoji-angry"
                       value="angry"
                       ${state.isCommentAdding ? ' disabled' : ''}>
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>`
  );
};

export default class FilmsPopupView extends AbstractStatefulView {
  #filmComments = null;

  constructor(film, comments) {
    super();
    this.#filmComments = comments;
    this._state = this.#parseFilmToState(film);
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmsPopupTemplate(this._state, this.#filmComments);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this
      .element
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closeClickHandler);
  };

  #closeClickHandler = (event) => {
    event.preventDefault();
    this._callback.click();
    document.body.classList.remove('hide-overflow');
  };

  setAddToWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this
      .element
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#watchlistClickHandler);
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this
      .element
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this
      .element
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#favoriteClickHandler);
  };

  #watchlistClickHandler = (event) => {
    event.preventDefault();

    this.updateElement({
      scrollTop: this.element.scrollTop,
      isFilmUpdating: true,
    });

    this._callback.watchlistClick();
  };

  #alreadyWatchedClickHandler = (event) => {
    event.preventDefault();

    this.updateElement({
      scrollTop: this.element.scrollTop,
      isFilmUpdating: true,
    });

    this._callback.alreadyWatchedClick();
  };

  #favoriteClickHandler = (event) => {
    event.preventDefault();

    this.updateElement({
      scrollTop: this.element.scrollTop,
      isFilmUpdating: true,
    });

    this._callback.favoriteClick();
  };

  #parseFilmToState = (film) => ({
    ...film,
    commentEmoji: null,
    commentText: null,
    scrollTop: null,
    isCommentDeleting: false,
    isCommentAdding: false,
    isFilmUpdating: false,
  });

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setOuterHandlers();
  };

  restorePosition = () => {
    this.element.scrollTop = this._state.scrollTop;
  };

  #localCommentEmojiClickHandler = (event) => {
    event.preventDefault();

    this.updateElement({commentEmoji: event.target.value, scrollTop: this.element.scrollTop});
    this.element.querySelectorAll('.film-details__emoji-item')
      .forEach((item) => {
        item.checked = false;
      });

    this.element.querySelector(`#${event.target.id}`).checked = true;
    this.restorePosition();
  };

  #localCommentInputHandler = (event) => {
    event.preventDefault();

    this._setState({commentText: event.target.value, scrollTop: this.element.scrollTop});

    this.restorePosition();
  };

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-item')
      .forEach((element) =>
        element.addEventListener('click', this.#localCommentEmojiClickHandler));
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#localCommentInputHandler);
  };

  #setOuterHandlers = () => {
    this.setClickHandler(this._callback.click);
    this.setAddToWatchlistClickHandler(this._callback.watchlistClick);
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setCommentAddClickHandler(this._callback.commentAddClick);
    this.setCommentDeleteClickHandler(this._callback.commentDeleteClick);
  };

  setCommentDeleteClickHandler = (callback) => {
    this._callback.commentDeleteClick = callback;
    this.element.querySelectorAll('.film-details__comment-delete')
      .forEach((element) => element.addEventListener('click', this.#commentDeleteClickHandler));
  };


  setCommentAddClickHandler = (callback) => {
    this._callback.commentAddClick = callback;
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('keydown', this.#commentAddClickHandler);
  };

  #commentDeleteClickHandler = (event) => {
    event.preventDefault();
    const commentId = event.target.closest('.film-details__comment').id;

    this.updateElement({
      scrollTop: this.element.scrollTop,
      isCommentDeleting: true,
    });

    this.element.querySelector(`.film-details__comment[id="${commentId}"]`)
      .querySelector('.film-details__comment-delete').textContent = 'Deleting...';
    this._callback.commentDeleteClick(event.target.closest('.film-details__comment').id);
  };

  #commentAddClickHandler = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 13 && this._state.commentEmoji) {
      this.updateElement({
        scrollTop: this.element.scrollTop,
        isCommentAdding: true,
      });

      this._callback.commentAddClick({
        comment: this._state.commentText,
        emotion: this._state.commentEmoji,
      });
    }
  };

  reset = (film) => {
    this.updateElement(this.#parseFilmToState(film));
  };
}
