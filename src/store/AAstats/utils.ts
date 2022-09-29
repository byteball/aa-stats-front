import { startOfDay } from 'date-fns';

export const getRange = (start: number, end: number, step: number): number[] =>
  [...Array(Math.floor((end - start) / step) + 1).keys()].map(
    (x) => x * step + start
  );

export const getActualDifferenceInPreviousPeriod = (to: number): number =>
  to - Math.ceil(startOfDay(to * 3600 * 1000).getTime() / 1000 / 3600);
