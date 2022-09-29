import { useCallback } from 'react';

import { useSearchParams } from 'react-router-dom';

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
}

export const useStateUrlParams = (): IUseStateUrlParamsOutput => {
  const [params, setParams] = useSearchParams();

  const setUrl = useCallback(
    (searchParams: UrlParams) => {
      Object.keys(searchParams).forEach((key) => {
        if (params.has(key)) {
          const value = searchParams[key as keyType];
          const urlParam = Array.isArray(value)
            ? String(value.join('-'))
            : String(value);
          params.set(key, urlParam);
          setParams(params);
        } else {
          const value = searchParams[key as keyType];
          const urlParam = Array.isArray(value)
            ? String(value.join('-'))
            : String(value);
          params.append(key, urlParam);
          setParams(params);
        }
      });
    },
    [params, setParams]
  );

  return { params, setUrl };
};
