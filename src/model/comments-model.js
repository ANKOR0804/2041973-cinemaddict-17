// *** Модуль модели комментариев ***

import {generateComments} from '../mock/film';

export default class CommentsModel {
  comments = generateComments();

  getComments = () => this.comments;
}
