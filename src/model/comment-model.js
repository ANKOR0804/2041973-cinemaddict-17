import Observable from '../framework/observable.js';

export default class CommentModel extends Observable {
  #comments = [];
  #filmsApiService = null;

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  getCommentsById = async (filmId) => {
    try {
      const comments = await this.#filmsApiService.getComments(filmId);
      this.#comments = comments;
    } catch {
      this.#comments = [];
      throw new Error('Can\'t get comments by film ID');
    }

    return this.#comments;
  };

  get comments() {
    return this.#comments;
  }

  set comments(comments) {
    this.#comments = comments;
  }

  deleteComment = async (updateType, id) => {
    const index = this.#comments.findIndex((comment) => comment.id !== id);

    if (index === -1) {
      throw new Error('Can\'t delete unexciting comment');
    }

    try {
      await this.#comments.deleteComment(id);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];
    } catch {
      throw new Error('Can\'t delete comment');
    }
  };

  addComment = async (filmId, updateItem) => {
    try {
      const updatedData = await this.#filmsApiService.addComment(filmId, updateItem);
      this.#comments = updatedData.comments;
      return updatedData.movie;
    } catch {
      throw new Error('Can\'t add comment');
    }
  };
}
