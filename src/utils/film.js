import dayjs from 'dayjs';

const humanizeDateByYear = (dateByYear) => dayjs(dateByYear).format('YYYY');

const humanizeDateByDay = (dateByDay) => dayjs(dateByDay).format('DD MMMM YYYY');

const humanizeFullByTime = (dateByTime) => {
  const dateInner = dayjs(dateByTime);
  const dayDifferenceInDays = dayjs().diff(dateInner, 'days');

  if (dayDifferenceInDays <= 1) {
    return 'Today';
  }
  if (dayDifferenceInDays > 1 && dayDifferenceInDays <= 30) {
    return `${dayDifferenceInDays} days ago`;
  }
  if (dayDifferenceInDays >30) {
    return dayjs(dateByTime).format('YYYY/MM/DD HH:MM');
  }

  return dayjs(dateByTime).format('YYYY/MM/DD HH:MM');
};

const humanizeDuration = (time) => {
  const hours = Math.trunc(time/60);
  const minutes = time % 60;
  return `${hours}h ${minutes}m`;
};

export {humanizeDateByYear, humanizeDateByDay, humanizeFullByTime, humanizeDuration};
