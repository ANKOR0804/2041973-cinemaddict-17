// *** Карточка попапа фильма ***

import AbstractView from '../framework/view/abstract-view';
import {humanizeDuration, humanizeDateByDay, humanizeFullByTime} from '../utils/film';
import classNames from 'classnames';

const createFilmsPopupTemplate = (film, comments) => {
  const {filmInfo, userDetails} = film;

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

  const isWatchlist = classNames({'film-details__control-button--active' : userDetails.watchlist});
  const isWatched = classNames({'film-details__control-button--active' : userDetails.alreadyWatched});
  const isFavorite = classNames({'film-details__control-button--active' : userDetails.favorite});

  const renderComments = () => {
    let commentsList = '';

    for (const comment of comments) {
      const commentDay = humanizeFullByTime(comment.date);
      commentsList += `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="${comment.emotion}" width="55" height="55" alt="emoji-smile">
          </span>
          <div>
            <p class="film-details__comment-text">${comment.comment}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${comment.author}</span>
              <span class="film-details__comment-day">${commentDay}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`;
    }

    return commentsList;
  };

  const allComments = renderComments();

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
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
                    id="watchlist" name="watchlist">Add to watchlist
            </button>
            <button type="button"
                    class="film-details__control-button film-details__control-button--watched ${isWatched}"
                    id="watched" name="watched">Already watched
            </button>
            <button type="button"
                    class="film-details__control-button film-details__control-button--favorite ${isFavorite}"
                    id="favorite"
                    name="favorite">Add to favorites
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
              <div class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here"
                      name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                       id="emoji-smile"
                       value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                       id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                       id="emoji-puke"
                       value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio"
                       id="emoji-angry"
                       value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmsPopupView extends  AbstractView {
  #film = null;
  #comments = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;
  }

  get template() {
    return createFilmsPopupTemplate(this.#film, this.#comments);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (event) => {
    event.preventDefault();
    this._callback.click();
  };
}
