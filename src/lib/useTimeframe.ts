import { useMemo } from 'react';

import { addDays, endOfDay, endOfHour } from 'date-fns';

interface IUseTimeframeOutput {
  from: number;
  to: number;
  now: number;
}

export const useTimeframe = (
  selectedPeriod: number,
  timeframe: tfTypes
): IUseTimeframeOutput => {
  const thisHour = endOfHour(new Date()).getTime();

  const now = useMemo(
    () =>
      timeframe === 'daily'
        ? Math.floor(thisHour / 1000 / 3600 / 24)
        : Math.floor(thisHour / 1000 / 3600),
    [thisHour, timeframe]
  );

  const from = useMemo(() => {
    if (selectedPeriod === 0) {
      return 0;
    }
    switch (timeframe) {
      case 'daily':
        return Math.floor(
          endOfDay(addDays(thisHour, -selectedPeriod)).getTime() /
            1000 /
            3600 /
            24
        );
      default:
        return Math.floor(
          addDays(thisHour, -selectedPeriod).getTime() / 1000 / 3600
        );
    }
  }, [selectedPeriod, thisHour, timeframe]);

  const to = useMemo(() => {
    switch (timeframe) {
      case 'daily':
        return Math.floor(endOfDay(thisHour).getTime() / 1000 / 3600 / 24) - 1;
      default:
        return Math.floor(thisHour / 1000 / 3600);
    }
  }, [thisHour, timeframe]);

  return { from, to, now };
};
