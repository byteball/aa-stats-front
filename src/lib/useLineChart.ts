import { useMemo } from 'react';

import { Datum, Serie } from '@nivo/line';
import { differenceInDays } from 'date-fns';

interface useLineChartOutput {
  serieLength: number;
  isEveryValOfSerieIsNull: boolean;
  fullDaysBetweenStartAndEnd: number;
}

export const useLineChart = (data: Serie[]): useLineChartOutput => {
  const allSeries = useMemo(
    () => data.reduce((accu: Datum[], curr) => accu.concat(curr.data), []),
    [data]
  );

  const serieLength = useMemo(
    () => (data.length > 0 ? data[0].data.length : 0),
    [data]
  );

  const fullDaysBetweenStartAndEnd = useMemo(() => {
    const startDate = Math.min(
      ...allSeries.map((d) => new Date(d?.x || Date.now()).getTime())
    );
    const endDate = Math.max(
      ...allSeries.map((d) => new Date(d?.x || Date.now()).getTime())
    );

    return differenceInDays(new Date(endDate), new Date(startDate));
  }, [allSeries]);

  const isEveryValOfSerieIsNull = useMemo(
    () => allSeries.every((s) => s.y == null),
    [allSeries]
  );

  return {
    serieLength,
    isEveryValOfSerieIsNull,
    fullDaysBetweenStartAndEnd,
  };
};
