import {getRandomInteger} from '../utils/common';
import {nanoid} from 'nanoid';

const genetareTitle = () => {
  const titles = [
    'Lorem',
    'Cras',
    'Fusce',
    'Aliquam',
    'Nullam',
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateArrTitle = () => [
  'Lorem',
  'Cras',
  'Fusce',
  'Aliquam',
  'Nullam',
];

const generatePoster = () => {
  const posters = [
    'images/posters/made-for-each-other.png',
    'images/posters/popeye-meets-sinbad.png',
    'images/posters/sagebrush-trail.jpg',
    'images/posters/santa-claus-conquers-the-martians.jpg',
    'images/posters/the-dance-of-life.jpg',
    'images/posters/the-great-flamarion.jpg',
    'images/posters/the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const genetareRuntime = () => {
  const runtimes = [
    60,
    90,
    120,
  ];

  const randomIndex = getRandomInteger(0, runtimes.length - 1);

  return runtimes[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
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

const generateRating = () => {
  const ratings = [
    0,
    6,
    10,
  ];

  const randomIndex = getRandomInteger(0, ratings.length - 1);

  return ratings[randomIndex];
};

const generateState = () => {
  const states = [
    true,
    false,
  ];

  const randomIndex = getRandomInteger(0, states.length - 1);

  return states[randomIndex];
};

const generateFilm = (comments) => ({
  id: nanoid(),
  comments: Array.from({length: 5}, () =>
    comments.map((comment) => comment.id))
    .filter((item, index, arr) => arr.indexOf(item) === index),

  filmInfo: {
    title: genetareTitle(),
    alternativeTitle: genetareTitle(),
    totalRating: generateRating(),
    poster: generatePoster(),
    ageRating: generateRating(),
    director: genetareTitle(),
    writers: generateArrTitle(),
    actors: generateArrTitle(),
    release: {
      date: generateDate(),
      releaseCountry: genetareTitle(),
    },
    runtime: genetareRuntime(),
    genre: generateArrTitle(),
    description: generateDescription(),
  },

  userDetails: {
    watchlist: generateState(),
    alreadyWatched: generateState(),
    watchingDate: generateDate(),
    favorite: generateState(),
  },
});

export const generateFilms = (size, comments = []) =>
  Array.from({length: size}, () => generateFilm(comments));
