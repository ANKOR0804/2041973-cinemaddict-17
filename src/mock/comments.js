import {getRandomInteger} from '../utils/common';
import {nanoid} from 'nanoid';

const generateCommentAuthor = () => {
  const authors = [
    'Bill',
    'Tony',
    'Sam',
    'Nina',
    'Sara',
  ];

  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

const generateCommentText = () => {
  const comments = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  ];

  const randomIndex = getRandomInteger(0, comments.length - 1);

  return comments[randomIndex];
};

const generateDate = () => {
  const dates = [
    '2022-06-13T00:00:00.000Z',
    '2022-06-14T00:00:00.000Z',
    '2022-06-01T00:00:00.000Z',
    '2009-04-12T16:12:32.554Z',
    '1999-03-13T00:00:00.000Z',
  ];

  const randomIndex = getRandomInteger(0, dates.length - 1);

  return dates[randomIndex];
};

const generateEmotion = () => {
  const emotions = [
    'smile',
    'sleeping',
    'puke',
    'angry',
  ];

  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

const generateComment = () => ({
  id: nanoid(),
  author: generateCommentAuthor(),
  comment: generateCommentText(),
  date: generateDate(),
  emotion: generateEmotion(),
});

export const generateComments = (size) => Array.from({length: size}, () => generateComment());
