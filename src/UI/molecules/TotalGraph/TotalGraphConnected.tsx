import { FC, memo, useCallback, useEffect, useMemo } from 'react';

import {
  longPeriodsUiControls,
  shortPeriodsUiControls,
  totalGraphActivitiesUiControls,
} from 'conf/uiControls';
import { useContextMenu } from 'lib/useContextMenu';
import { useLineChart } from 'lib/useLineChart';
import { useStateUrlParams } from 'lib/useStateUrlParams';
import { useTimeframe } from 'lib/useTimeframe';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useGetTotalActivityOverTimeQuery,
  useGetTotalTvlOverTimeQuery,
} from 'store/AAstats';
import {
  handleTotalGraphPeriodControl,
  totalGraphControlValue,
  totalGraphActivityControl,
  handleTotalGraphActivitiesControls,
  totalGraphTimeframeSelector,
} from 'store/UI';

import TotalGraph from './TotalGraph';

const TotalGraphConnected: FC = () => {
  const timeframe = useAppSelector(totalGraphTimeframeSelector);
  const presicion = useMemo(
    () => (timeframe === 'daily' ? 'day' : 'hour'),
    [timeframe]
  );
  const dispatch = useAppDispatch();
  const selectedPeriod = useAppSelector(totalGraphControlValue);
  const selectedActivities = useAppSelector(totalGraphActivityControl);
  const { from, to } = useTimeframe(selectedPeriod, timeframe);
  const { setUrl } = useStateUrlParams();
  const { mouseX, mouseY, handleOpenContextMenu, handleCloseContextMenu } =
    useContextMenu();

  useEffect(() => {
    if (
      !selectedActivities.includes('usd_balance') &&
      selectedPeriod < 30 &&
      selectedPeriod > 0
    )
      dispatch(handleTotalGraphPeriodControl(30));
    else if (
      selectedActivities.includes('usd_balance') &&
      selectedPeriod > 30 &&
      selectedPeriod !== 0
    )
      dispatch(handleTotalGraphPeriodControl(30));
  }, [dispatch, selectedActivities, selectedPeriod]);

  useEffect(() => {
    if (
      selectedActivities.some(
        (a) =>
          !(
            a === 'usd_amount_in' ||
            a === 'usd_amount_out' ||
            a === 'usd_balance'
          )
      )
    ) {
      dispatch(handleTotalGraphActivitiesControls(['usd_balance']));
    }
  }, [dispatch, selectedActivities]);

  const handlePeriod = useCallback(
    (value: number) => () => {
      dispatch(handleTotalGraphPeriodControl(value));
      setUrl({ g_period: value });
    },
    [dispatch, setUrl]
  );

  const isSelectedPeriod = useCallback(
    (value: number) => selectedPeriod === value,
    [selectedPeriod]
  );

  const handleActivities = useCallback(
    (value: keyof ITotalWithTvlActivity) => () => {
      const isSelected = selectedActivities.some((a) => a === value);
      const conf = totalGraphActivitiesUiControls.find(
        (c) => c.value === value
      );

      if (conf != null) {
        if (!isSelected) {
          if (value === 'usd_balance') {
            dispatch(handleTotalGraphActivitiesControls([value]));
            setUrl({ activity: [value] });
            if (selectedPeriod !== 30) {
              dispatch(handleTotalGraphPeriodControl(30));
              setUrl({ g_period: 30 });
            }
          } else {
            const activity = [
              ...selectedActivities.filter(
                (sa) => !(sa !== 'usd_amount_in' && sa !== 'usd_amount_out')
              ),
              value,
            ].sort();
            dispatch(handleTotalGraphActivitiesControls(activity));
            setUrl({ activity });
            if (selectedPeriod < 30 && selectedPeriod > 0) {
              dispatch(handleTotalGraphPeriodControl(30));
              setUrl({ g_period: 30 });
            }
          }
        } else if (selectedActivities.length > 1) {
          const activity = selectedActivities.filter((a) => a !== value);
          dispatch(handleTotalGraphActivitiesControls(activity));
          setUrl({ activity });
        }
      }
    },
    [dispatch, selectedActivities, selectedPeriod, setUrl]
  );

  const isSelectedActivities = useCallback(
    (value: keyof ITotalWithTvlActivity) =>
      selectedActivities.some((a) => a === value),
    [selectedActivities]
  );

  const slices = useMemo(() => {
    const validActivities = selectedActivities.filter(
      (sa) => sa !== 'usd_balance'
    );
    return totalGraphActivitiesUiControls.filter((control) =>
      validActivities.includes(control.value)
    ) as IUiSelects<ITotalActivity>[];
  }, [selectedActivities]);

  const tvlConf = useMemo(
    () =>
      totalGraphActivitiesUiControls.find((sa) => sa.value === 'usd_balance'),
    []
  );

  const tvlSelected = useMemo(
    () => selectedActivities.find((sa) => sa === 'usd_balance'),
    [selectedActivities]
  );

  const actionButtonsConf = useMemo(() => {
    if (tvlSelected) {
      return shortPeriodsUiControls;
    }
    return longPeriodsUiControls;
  }, [tvlSelected]);

  const { data, isFetching } = useGetTotalActivityOverTimeQuery(
    {
      from,
      to,
      timeframe,
      slices,
    },
    { skip: !!tvlSelected }
  );

  const { data: tvl, isFetching: isTvlFetching } = useGetTotalTvlOverTimeQuery(
    {
      from,
      to,
      timeframe,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      conf: tvlConf!,
    },
    { skip: !tvlSelected }
  );

  const isLoading = useMemo(
    () => (tvlSelected ? isTvlFetching : isFetching),
    [isFetching, tvlSelected, isTvlFetching]
  );

  const total = useMemo(() => {
    if (tvlSelected) {
      return tvl || [];
    }
    return data || [];
  }, [data, tvlSelected, tvl]);

  const { fullDaysBetweenStartAndEnd, isEveryValOfSerieIsNull, serieLength } =
    useLineChart(total);

  return (
    <TotalGraph
      actionButtonsConf={actionButtonsConf}
      data={total}
      fullDaysBetweenStartAndEnd={fullDaysBetweenStartAndEnd}
      handleActivities={handleActivities}
      handlePeriod={handlePeriod}
      isEveryValOfSerieIsNull={isEveryValOfSerieIsNull}
      isLoading={isLoading}
      isSelectedActivities={isSelectedActivities}
      isSelectedPeriod={isSelectedPeriod}
      mouseX={mouseX}
      mouseY={mouseY}
      presicion={presicion}
      serieLength={serieLength}
      onContextMenu={handleOpenContextMenu}
      onContextMenuClose={handleCloseContextMenu}
    />
  );
};

export default memo(TotalGraphConnected);
