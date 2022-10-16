import { useCallback } from 'react';

import { useSearchParams } from 'react-router-dom';

import {
  totalGraphActivitiesUiControls,
  agentGraphUiControls,
  allPeriodsUiControls,
  tablePeriodsUiControls,
} from 'conf/uiControls';
import {
  getInitialAsset,
  getInitialGraphData,
  getInitialPeriod,
  getInitialTableSortType,
} from 'store/UI';

interface UrlParams {
  activity?: (keyof IAddressGraphData)[];
  g_period?: number;
  t_period?: number;
  t_sort?: combinedTypes;
  asset?: string;
}

type keyType = keyof UrlParams;

interface IUseStateUrlParamsOutput {
  // eslint-disable-next-line no-unused-vars
  setUrl: (searchParams: UrlParams) => void;
  params: URLSearchParams;
  // eslint-disable-next-line no-unused-vars
  getParamsString: (searchParams: UrlParams) => string;
  totalActivityParam: (keyof ITotalWithTvlActivity)[];
  totalPeriodParam: number;
  tableSortParam: combinedTypes;
  tablePeriodParam: number;
  assetParam: string;
  agentActivityParam: (keyof IAddressGraphData)[];
  agentPeriodParam: number;
}

export const useStateUrlParams = (): IUseStateUrlParamsOutput => {
  const [params, setParams] = useSearchParams();

  const getUrlSearchParams = useCallback(
    (
      searchParamsArr: UrlParams,
      urlSearchParams = new URLSearchParams()
    ): URLSearchParams => {
      Object.keys(searchParamsArr).forEach((key) => {
        if (urlSearchParams.has(key)) {
          const value = searchParamsArr[key as keyType];
          const urlParam = Array.isArray(value)
            ? String(value.join('-'))
            : String(value);
          urlSearchParams.set(key, urlParam);
        } else {
          const value = searchParamsArr[key as keyType];
          const urlParam = Array.isArray(value)
            ? String(value.join('-'))
            : String(value);
          urlSearchParams.append(key, urlParam);
        }
      });
      return urlSearchParams;
    },
    []
  );

  const getParamsString = useCallback(
    (searchParams: UrlParams) => getUrlSearchParams(searchParams).toString(),
    [getUrlSearchParams]
  );

  const setUrl = useCallback(
    (searchParams: UrlParams) => {
      const urlSearchParams = getUrlSearchParams(searchParams, params);
      setParams(urlSearchParams);
    },
    [getUrlSearchParams, params, setParams]
  );

  const totalActivityParam = getInitialGraphData<ITotalWithTvlActivity>(
    params,
    totalGraphActivitiesUiControls,
    'activity'
  );

  const totalPeriodParam = getInitialPeriod(
    params,
    allPeriodsUiControls,
    'g_period'
  );

  const tableSortParam = getInitialTableSortType(params);

  const tablePeriodParam = getInitialPeriod(
    params,
    tablePeriodsUiControls,
    't_period'
  );

  const assetParam = getInitialAsset(params);

  const agentActivityParam = getInitialGraphData<IAddressGraphData>(
    params,
    agentGraphUiControls,
    'activity'
  );

  const agentPeriodParam = getInitialPeriod(
    params,
    allPeriodsUiControls,
    'g_period'
  );

  return {
    params,
    setUrl,
    getParamsString,
    totalActivityParam,
    totalPeriodParam,
    tableSortParam,
    tablePeriodParam,
    assetParam,
    agentActivityParam,
    agentPeriodParam,
  };
};
