import { FC, memo, useCallback, useEffect, useMemo, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { useStateUrlParams } from 'lib/useStateUrlParams';
import { useTimeframe } from 'lib/useTimeframe';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useGetTopAAbyTvlQuery,
  useGetTopAACombinedByTypeQuery,
} from 'store/AAstats';
import { obyteApi } from 'store/Obyte';
import {
  agentsTableSortTypeSelector,
  agentsTablePeriodSelector,
  handleAgentsTableSortType,
  handleAgentsTablePeriodControl,
  agentsTableTimeframeSelector,
  increaseAgentsTableDataLimit,
  agentsTableLimitSelector,
} from 'store/UI';

import AgentsTable from './AgentsTable';

const AgentsTableConnected: FC = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const selectedPeriod = useAppSelector(agentsTablePeriodSelector);
  const timeframe = useAppSelector(agentsTableTimeframeSelector);
  const type = useAppSelector(agentsTableSortTypeSelector);
  const limit = useAppSelector(agentsTableLimitSelector);
  const { from, to } = useTimeframe(selectedPeriod, timeframe);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { setUrl } = useStateUrlParams();

  const handlePeriod = useCallback(
    (value: number) => () => {
      dispatch(handleAgentsTablePeriodControl(value));
      setUrl({ t_period: value });
    },
    [dispatch, setUrl]
  );

  const isSelectedPeriod = useCallback(
    (value: number) => selectedPeriod === value,
    [selectedPeriod]
  );

  const onChangeSortType = useCallback(
    (dataKey: string) => () => {
      dispatch(handleAgentsTableSortType(dataKey as combinedTypes));
      setUrl({ t_sort: dataKey as combinedTypes });
    },
    [dispatch, setUrl]
  );

  const handleNavigateFabric = useCallback(
    (address: string) => () => {
      nav(`/aa/${address}`);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },
    [nav]
  );

  const isSortSelected = useCallback(
    (dataKey: keyof IGetTopAACombinedByTypeRes) => type === dataKey,
    [type]
  );

  const { data, isFetching } = useGetTopAACombinedByTypeQuery({
    from,
    to,
    type,
    timeframe,
    limit,
  });

  const skipQueryData = useMemo(() => {
    if (data && data.length >= 10) {
      return data.length % 10 !== 0;
    }
    return true;
  }, [data]);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      if (
        Array.isArray(entries) &&
        entries[0].isIntersecting &&
        !skipQueryData
      ) {
        dispatch(increaseAgentsTableDataLimit(10));
      }
    },
    [dispatch, skipQueryData]
  );

  const observer = useMemo(
    () =>
      new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }),
    [handleObserver]
  );

  useEffect(() => {
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [handleObserver, observer]);

  const { data: fullData } = useGetTopAAbyTvlQuery({});

  useEffect(() => {
    if (data && data.length <= 20)
      dispatch(
        obyteApi.util.prefetch(
          'getDefinitions',
          data.map((d) => d.address),
          {}
        )
      );
    if (fullData)
      dispatch(
        obyteApi.util.prefetch(
          'getDefinitions',
          fullData.map((fD) => fD.address),
          {}
        )
      );
  }, [data, dispatch, fullData]);

  return (
    <AgentsTable
      data={data || []}
      handlePeriod={handlePeriod}
      isLoading={isFetching}
      isSelectedPeriod={isSelectedPeriod}
      isSortSelected={isSortSelected}
      loaderRef={loaderRef}
      onChangeSortType={onChangeSortType}
      onNavigate={handleNavigateFabric}
    />
  );
};

export default memo(AgentsTableConnected);
