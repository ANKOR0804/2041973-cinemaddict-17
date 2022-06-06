import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeDateByYear = (dateByYear) => dayjs(dateByYear).format('YYYY');

const humanizeDateByDay = (dateByDay) => dayjs(dateByDay).format('DD MMMM YYYY');

const humanizeFullByTime = (dateByTime) => {
  const datesDifferenceInDays = dayjs().diff(dayjs(dateByTime), 'day');

  switch (datesDifferenceInDays) {
    case 0:
      return 'Today';
    case 1:
      return `${datesDifferenceInDays} day ago`;
    case 2: case 3: case 4: case 5: case 6: case 7:
      return `${datesDifferenceInDays} days ago`;
    default:
      return dayjs(dateByTime).format('YYYY/MM/DD HH:MM');
  }
};

const humanizeDuration = (time) => {
  const hours = Math.trunc(time/60);
  const minutes = time % 60;
  return `${hours}h ${minutes}m`;
};

export {getRandomInteger, humanizeDateByYear, humanizeDateByDay, humanizeFullByTime, humanizeDuration};
