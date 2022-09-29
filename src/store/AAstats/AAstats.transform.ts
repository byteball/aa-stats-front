import { Serie } from '@nivo/line';
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query';

import { getActualDifferenceInPreviousPeriod, getRange } from './utils';

export const transformStatsForOneAddress = (
  data: IAddress[] | undefined,
  _: FetchBaseQueryMeta,
  arg: IAAStatsAddressReq
): IAddress[] => {
  if (Array.isArray(data) && data.length > 0) {
    const range = getRange(
      arg.from === 0 ? data[0].period : arg.from,
      arg.to,
      1
    );
    const assets = [...new Set(data.map((address) => address.symbol))];
    const assetArrays = assets.reduce(
      (accu: IAddress[][], curr) =>
        accu.concat([data.filter((address) => address.symbol === curr)]),
      []
    );

    const assetFullArrays = assetArrays.map((assetArr) =>
      range.map<IAddress>((period) => {
        const found = assetArr.find((val) => val.period === period);
        if (found) return found;
        return {
          address: assetArr[0].address,
          amount_in: 0,
          amount_out: 0,
          asset: assetArr[0].asset,
          bounced_count: 0,
          decimals: assetArr[0].decimals,
          num_users: 0,
          period,
          symbol: assetArr[0].symbol,
          triggers_count: 0,
          usd_amount_in: 0,
          usd_amount_out: 0,
        };
      })
    );
    return [...assetFullArrays.flat()].sort((a, b) => b.period - a.period);
  }
  return [];
};

export const transformTotalActivity = (
  data: ITotalActivity[] | undefined,
  _: FetchBaseQueryMeta,
  arg: IAAStatsTotalActivity
): Serie[] => {
  const { slices, timeframe } = arg;
  if (Array.isArray(data) && data.length > 0) {
    data.sort((a, b) => b.period - a.period);
    return slices.map((slice) => ({
      id: slice.label,
      color: slice.color,
      data: data.map((d) => ({
        x:
          timeframe === 'daily'
            ? new Date(d.period * 3600 * 1000 * 24)
            : new Date(d.period * 3600 * 1000),
        y: d[slice.value],
      })),
    }));
  }
  return [];
};

export const transformTopAA = (
  data: IAddress[] | undefined
): IRenderAddress[] => {
  if (Array.isArray(data) && data.length > 0) {
    return data.reduce((accu: IRenderAddress[], curr) => {
      if (curr.usd_amount_in < 1 && curr.usd_amount_out < 1) {
        return accu;
      }
      return accu.concat({
        address: curr.address,
        usd_amount_in: curr.usd_amount_in,
        usd_amount_out: curr.usd_amount_out,
      });
    }, []);
  }
  return [];
};

export const transformTvlOverTimeForOneAddress = (
  data: IAddressTvlWithDecimals[] | undefined
): IAddressTvl[] => {
  if (Array.isArray(data) && data.length > 0) {
    data.sort((a, b) => b.period - a.period);
    return data.map((address) => ({
      address: address.address,
      asset: address.asset,
      period: address.period,
      balance: address.balance / 10 ** address.decimals,
      usd_balance: address.usd_balance,
      symbol: address.symbol,
    }));
  }
  return [];
};

export const transformTopAAByTvl = (
  data: topAAbyTvlRes[] | undefined
): IRenderAATvl[] => {
  if (Array.isArray(data) && data.length > 0) {
    return data.map((address) => ({
      address: address.address,
      usd_balance: address.usd_balance,
    }));
  }
  return [];
};

export const transformTotalTvl = (
  data: ITotalTvl[] | undefined,
  _: FetchBaseQueryMeta,
  arg: IAAStatsTotalTvl
): Serie[] => {
  const { timeframe, conf } = arg;
  if (Array.isArray(data) && data.length > 0) {
    data.sort((a, b) => b.period - a.period);
    if (timeframe === 'daily') {
      const dailyTvlPeriods = Array.from(
        new Set(data.map((d) => Math.floor(d.period / 24)))
      );
      const dailyTvl = dailyTvlPeriods.map((period) => {
        const hoursTvlByDay = data.filter(
          (d) => Math.floor(d.period / 24) === period
        );
        const middle =
          hoursTvlByDay.reduce((accu, curr) => accu + curr.usd_balance, 0) /
          hoursTvlByDay.length;

        return { period, usd_balance: middle };
      });
      return [
        {
          id: conf.label,
          color: conf.color,
          data: dailyTvl.map((d) => ({
            x: new Date(d.period * 3600 * 1000 * 24),
            y: d.usd_balance,
          })),
        },
      ];
    }
    return [
      {
        id: conf.label,
        color: conf.color,
        data: data.map((d) => ({
          x: new Date(d.period * 3600 * 1000),
          y: d.usd_balance,
        })),
      },
    ];
  }
  return [];
};

export const transformTvlValues = (
  data: ITotalTvl[] | undefined
): ITotalTvl[] => {
  if (Array.isArray(data) && data.length > 0) {
    const last = data[data.length - 1];
    const prev = data.find((d) => d.period === last.period - 24) || data[0];
    return [prev, last];
  }
  return [];
};

export const transformUSDInValues = (
  data: ITotalActivity[] | undefined,
  _: FetchBaseQueryMeta,
  arg: IAAStatsUSDInValuesReq
): { prev: number; value: number } => {
  if (Array.isArray(data) && data.length > 0) {
    const { from, to } = arg;
    const diff = getActualDifferenceInPreviousPeriod(to);
    return data.reduce(
      (accu: { prev: number; value: number }, curr) => {
        if (curr.period <= to && curr.period >= to - 24) {
          accu.value += curr.usd_amount_in;
        } else if (curr.period >= from && curr.period < from + diff) {
          accu.prev += curr.usd_amount_in;
        }
        return accu;
      },
      { prev: 0, value: 0 }
    );
  }
  return { prev: 0, value: 0 };
};

export const transformTvlOverTimeValuesForOneAddress = (
  data: IAddressTvlWithDecimals[] | undefined
): number[] => {
  if (Array.isArray(data) && data.length > 0) {
    if (Array.from(new Set(data.map((d) => d.asset))).length > 1) {
      const periods = Array.from(new Set(data.map((d) => d.period)));
      const merged = periods.map((period) => {
        const dataForPeriod = data.filter((d) => d.period === period);
        return dataForPeriod.reduce(
          (accu: IAddressTvlWithDecimals, curr) => ({
            ...accu,
            balance:
              accu.usd_balance / 10 ** accu.decimals +
              curr.usd_balance / 10 ** curr.decimals,
            usd_balance: accu.usd_balance + curr.usd_balance,
          }),
          {
            address: dataForPeriod[0].address,
            asset: null,
            period,
            balance: 0,
            usd_balance: 0,
            decimals: 0,
            symbol: 'GBYTE',
          }
        );
      });
      return [merged[0].usd_balance, merged[merged.length - 1].usd_balance];
    }
    return [data[0].usd_balance, data[data.length - 1].usd_balance];
  }
  return [0, 0];
};

export const transformUsdInValuesForOneAddress = (
  data: IAddress[] | undefined,
  _: FetchBaseQueryMeta,
  arg: IAAStatsAddressReq
): { prev: number; value: number } => {
  const { to } = arg;
  if (Array.isArray(data) && data.length > 0) {
    return data.reduce(
      (accu: { prev: number; value: number }, curr) => {
        if (curr.period <= to && curr.period >= to - 24) {
          accu.value += curr.usd_amount_in;
        }
        accu.prev += curr.usd_amount_in;

        return accu;
      },
      { prev: 0, value: 0 }
    );
  }
  return { prev: 0, value: 0 };
};

export const transformGetAssets = (
  data: AssetsResponseType | undefined
): IAssetMetaData[] => {
  if (data) {
    return Object.keys(data).map((key) => ({
      ...data[key],
      metadata_key: key,
    }));
  }
  return [];
};
