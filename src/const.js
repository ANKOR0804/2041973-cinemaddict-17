export const FILMS_LIST_EXTRA = 'extra list';

export const ExtraSection = {
  ALL: {
    TITLE: 'All movies. Upcoming',
  },

  TOP_RATED: {
    TITLE: 'Top rated',
    TYPE: FILMS_LIST_EXTRA,
  },

  MOST_COMMENTED: {
    TITLE: 'Most commented',
    TYPE: FILMS_LIST_EXTRA,
  },
};

export const SortType = {
  BY_DEFAULT: 'by-default',
  BY_DATE: 'by-date',
  BY_RATING: 'by-rating',
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const FilterType = {
  ALL: 'all',
  WATCH_LIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

export const NoFilmsText = {
  all: 'There are no movies in our database',
  watchlist: 'There are no movies to watch now',
  history: 'There are no watched movies now',
  favorites: 'There are no favorite movies now',
};
