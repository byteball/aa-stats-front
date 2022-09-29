import { FC, memo, useCallback, useEffect, useMemo } from 'react';

import { equals } from 'ramda';
import { useParams } from 'react-router-dom';

import {
  agentGraphUiControls,
  allPeriodsUiControls,
  shortPeriodsUiControls,
} from 'conf/uiControls';
import { useContextMenu } from 'lib/useContextMenu';
import { useLineChart } from 'lib/useLineChart';
import { useStateUrlParams } from 'lib/useStateUrlParams';
import { useTimeframe } from 'lib/useTimeframe';
import { useAppDispatch, useAppSelector } from 'store';
import {
  useGetStatsForOneAddressQuery,
  useGetTvlOverTimeForOneAddressQuery,
} from 'store/AAstats';
import {
  agentGraphActivitiesControlsSelector,
  agentGraphPeriodControlSelector,
  agentGraphTimeframeSelector,
  agentGraphTypeSelector,
  assetSelector,
  assetsSelector,
  handleAgentGraphActivitiesControls,
  handleAgentGraphPeriodControl,
  handleAsset,
  handleAssets,
} from 'store/UI';

import AgentGraph from './AgentGraph';

const AgentGraphConnected: FC = () => {
  const dispatch = useAppDispatch();
  const { address = '' } = useParams<{ address: string }>();
  const asset = useAppSelector(assetSelector);
  const selectedAssets = useAppSelector(assetsSelector);
  const timeframe = useAppSelector(agentGraphTimeframeSelector);
  const selectedPeriod = useAppSelector(agentGraphPeriodControlSelector);
  const selectedActivities = useAppSelector(
    agentGraphActivitiesControlsSelector
  );
  const { setUrl } = useStateUrlParams();
  const { from, to } = useTimeframe(selectedPeriod, timeframe);
  const presicion = useMemo(
    () => (timeframe === 'daily' ? 'day' : 'hour'),
    [timeframe]
  );
  const yType = useAppSelector(agentGraphTypeSelector);
  const { mouseX, mouseY, handleOpenContextMenu, handleCloseContextMenu } =
    useContextMenu();

  useEffect(() => {
    if (
      selectedActivities.includes('usd_balance' || 'balance') &&
      selectedPeriod > 30
    )
      dispatch(handleAgentGraphPeriodControl(30));
  }, [dispatch, selectedActivities, selectedPeriod]);

  const handlePeriod = useCallback(
    (value: number) => () => {
      dispatch(handleAgentGraphPeriodControl(value));
      setUrl({ g_period: value });
    },
    [dispatch, setUrl]
  );

  const isSelectedPeriod = useCallback(
    (value: number) => selectedPeriod === value,
    [selectedPeriod]
  );

  const selectButtonConf = useMemo(
    () =>
      asset === 'all'
        ? agentGraphUiControls.filter((ctrl) => ctrl.value !== 'balance')
        : agentGraphUiControls,
    [asset]
  );

  const handleActivities = useCallback(
    (value: keyof IAddressGraphData) => () => {
      const isSelected = selectedActivities.some((a) => a === value);
      const conf = selectButtonConf.find((c) => c.value === value);

      if (conf != null) {
        if (!isSelected) {
          if (
            value === 'usd_balance' ||
            value === 'balance' ||
            value === 'num_users' ||
            value === 'triggers_count'
          ) {
            dispatch(handleAgentGraphActivitiesControls([value]));
            setUrl({ activity: [value] });
            if (
              (value === 'usd_balance' || value === 'balance') &&
              (selectedPeriod > 30 || selectedPeriod === 0)
            ) {
              dispatch(handleAgentGraphPeriodControl(30));
              setUrl({ g_period: 30 });
            }
          } else {
            const activity = [
              ...selectedActivities.filter(
                (sa) => !(sa !== 'usd_amount_in' && sa !== 'usd_amount_out')
              ),
              value,
            ].sort();
            dispatch(handleAgentGraphActivitiesControls(activity));
            setUrl({ activity });
          }
        } else if (selectedActivities.length > 1) {
          const activity = selectedActivities.filter((a) => a !== value);
          dispatch(handleAgentGraphActivitiesControls(activity));
          setUrl({ activity });
        }
      }
    },
    [dispatch, selectButtonConf, selectedActivities, selectedPeriod, setUrl]
  );

  const isSelectedActivities = useCallback(
    (value: keyof IAddressGraphData) =>
      selectedActivities.some((a) => a === value),
    [selectedActivities]
  );

  const slices = useMemo(() => {
    const validActivities = selectedActivities.filter(
      (agc) => !(agc === 'usd_balance' || agc === 'balance')
    );
    return agentGraphUiControls.filter((agc) =>
      validActivities.includes(agc.value)
    );
  }, [selectedActivities]);

  const tvlSelected = useMemo(
    () =>
      selectedActivities.find((sa) => sa === 'usd_balance' || sa === 'balance'),
    [selectedActivities]
  );

  const tvlConf = useMemo(
    () => agentGraphUiControls.find((agc) => agc.value === tvlSelected),
    [tvlSelected]
  );

  const actionButtonsConf = useMemo(() => {
    if (tvlSelected) {
      return shortPeriodsUiControls;
    }
    return allPeriodsUiControls;
  }, [tvlSelected]);

  const { data, isFetching } = useGetStatsForOneAddressQuery(
    {
      address,
      from,
      to,
      timeframe,
    },
    { skip: !!tvlSelected }
  );

  const graphData = useMemo(() => {
    let addressData = Array.isArray(data) ? data : [];
    if (asset === 'all') {
      const uniqPeriods = Array.from(
        new Set(addressData.map((ad) => ad.period))
      );
      addressData = uniqPeriods.map((uniqPeriod) => {
        const thisPeriodData = addressData.filter(
          (ad) => ad.period === uniqPeriod
        );
        return thisPeriodData.reduce(
          (accu: IAddress, curr) => ({
            ...accu,
            amount_in: accu.amount_in + curr.amount_in,
            amount_out: accu.amount_out + curr.amount_out,
            bounced_count: accu.bounced_count + curr.bounced_count,
            num_users: accu.num_users + curr.num_users,
            triggers_count: accu.triggers_count + curr.triggers_count,
            usd_amount_in: accu.usd_amount_in + curr.usd_amount_in,
            usd_amount_out: accu.usd_amount_out + curr.usd_amount_out,
          }),
          {
            ...thisPeriodData[0],
            amount_in: 0,
            amount_out: 0,
            bounced_count: 0,
            num_users: 0,
            triggers_count: 0,
            usd_amount_in: 0,
            usd_amount_out: 0,
          }
        );
      });
    } else {
      addressData = addressData.filter((ad) => ad.symbol === asset);
    }
    return slices.map(({ label, color, value }) => ({
      id: label,
      color,
      data: addressData.map((d) => ({
        x:
          timeframe === 'daily'
            ? new Date(d.period * 3600 * 1000 * 24)
            : new Date(d.period * 3600 * 1000),
        y:
          value !== 'asset' && value !== 'usd_balance' && value !== 'balance'
            ? d[value]
            : d.usd_amount_in,
      })),
    }));
  }, [asset, data, slices, timeframe]);

  const { data: tvlData, isFetching: isTvlFetching } =
    useGetTvlOverTimeForOneAddressQuery(
      {
        address,
        from,
        to,
        timeframe,
      },
      { skip: !tvlSelected }
    );

  const tvlGraphData = useMemo(() => {
    let addressTvlData = Array.isArray(tvlData) ? tvlData : [];

    if (asset === 'all') {
      const uniqPeriods = Array.from(
        new Set(addressTvlData.map((atd) => atd.period))
      );
      addressTvlData = uniqPeriods.map((uniqPeriod) => {
        const thisPeriodData = addressTvlData.filter(
          (atd) => atd.period === uniqPeriod
        );
        return thisPeriodData.reduce(
          (accu: IAddressTvl, curr) => ({
            ...accu,
            balance: accu.balance + curr.balance,
            usd_balance: accu.usd_balance + curr.usd_balance,
          }),
          {
            ...thisPeriodData[0],
            balance: 0,
            usd_balance: 0,
          }
        );
      });
    } else {
      addressTvlData = addressTvlData.filter((atd) => atd.symbol === asset);
    }

    if (addressTvlData.length > 0 && tvlConf) {
      if (timeframe === 'daily') {
        const dailyTvlPeriods = Array.from(
          new Set(addressTvlData.map((d) => Math.floor(d.period / 24)))
        );
        const dailyTvl = dailyTvlPeriods.map((period) => {
          const hoursTvlByDay = addressTvlData.filter(
            (d) => Math.floor(d.period / 24) === period
          );
          return {
            period,
            usd_balance:
              hoursTvlByDay.reduce((accu, curr) => accu + curr.usd_balance, 0) /
              hoursTvlByDay.length,
            balance:
              hoursTvlByDay.reduce((accu, curr) => accu + curr.balance, 0) /
              hoursTvlByDay.length,
          };
        });
        return [
          {
            id: tvlConf.label,
            color: tvlConf.color,
            data: dailyTvl.map((d) => ({
              x: new Date(d.period * 3600 * 1000 * 24),
              y:
                tvlConf.value === 'balance' || tvlConf.value === 'usd_balance'
                  ? d[tvlConf.value]
                  : d.usd_balance,
            })),
          },
        ];
      }
      return [
        {
          id: tvlConf.label,
          color: tvlConf.color,
          data: addressTvlData.map((d) => ({
            x: new Date(d.period * 3600 * 1000),
            y:
              tvlConf.value === 'balance' || tvlConf.value === 'usd_balance'
                ? d[tvlConf.value]
                : d.usd_balance,
          })),
        },
      ];
    }
    return [];
  }, [asset, timeframe, tvlConf, tvlData]);

  const isLoading = useMemo(
    () => (tvlSelected ? isTvlFetching : isFetching),
    [isFetching, tvlSelected, isTvlFetching]
  );

  const totalData = useMemo(() => {
    if (tvlSelected) {
      return tvlGraphData;
    }
    return graphData;
  }, [graphData, tvlSelected, tvlGraphData]);

  const { fullDaysBetweenStartAndEnd, isEveryValOfSerieIsNull, serieLength } =
    useLineChart(totalData);

  useEffect(() => {
    if (tvlSelected && tvlData) {
      const assets = [
        ...new Set(
          tvlData.filter((d) => d.symbol !== undefined).map((t) => t.asset)
        ),
      ].map((assetId) => ({
        assetId,
        assetSymbol:
          tvlData.find((a) => a.asset === assetId)?.symbol || 'GBYTE',
      }));

      if (!equals(selectedAssets, assets)) {
        dispatch(handleAssets(assets));
      }
      if (!assets.some((a) => a.assetSymbol === asset) && asset !== 'all') {
        dispatch(handleAsset('all'));
      }
    } else if (data) {
      const assets = [
        ...new Set(
          data.filter((d) => d.symbol !== undefined).map((t) => t.asset)
        ),
      ].map((assetId) => ({
        assetId,
        assetSymbol: data.find((a) => a.asset === assetId)?.symbol || 'GBYTE',
      }));

      if (!equals(selectedAssets, assets)) {
        dispatch(handleAssets(assets));
      }
      if (!assets.some((a) => a.assetSymbol === asset) && asset !== 'all') {
        dispatch(handleAsset('all'));
      }
    }
  }, [asset, data, dispatch, selectedAssets, tvlData, tvlSelected]);

  useEffect(() => {
    if (asset === 'all' && selectedActivities[0] === 'balance') {
      dispatch(
        handleAgentGraphActivitiesControls(
          selectButtonConf
            .filter((sbc) => sbc.value === 'usd_balance')
            .map((sbc) => sbc.value)
        )
      );
    }
  }, [asset, dispatch, selectButtonConf, selectedActivities]);

  return (
    <AgentGraph
      actionButtonsConf={actionButtonsConf}
      data={totalData}
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
      selectButtonConf={selectButtonConf}
      serieLength={serieLength}
      yType={yType}
      onContextMenu={handleOpenContextMenu}
      onContextMenuClose={handleCloseContextMenu}
    />
  );
};

export default memo(AgentGraphConnected);
