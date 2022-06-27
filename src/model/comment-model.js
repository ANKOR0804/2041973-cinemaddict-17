import Observable from '../framework/observable.js';

export default class CommentModel extends Observable {
  #comments = null;

  get comments() {
    return this.#comments;
  }

  set comments(comments) {
    this.#comments = comments;
  }

  deleteComment = (updateType, id) => {
    this.#comments = this.#comments.filter((comment) => comment.id !== id);

    this._notify(updateType, id);
  };

  addComment = (updateType, updateItem) => {
    this.#comments.push(updateItem);

    this._notify(updateType, updateItem);
  };
}
