/* eslint-disable no-unused-vars */
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
  setUrl: (searchParams: UrlParams) => void;
  params: URLSearchParams;
  getParamsString: (searchParams: UrlParams) => string;
}

export const useStateUrlParams = (): IUseStateUrlParamsOutput => {
  const [params, setParams] = useSearchParams();

  const getParamsString = useCallback((searchParams: UrlParams) => {
    const strArr = Object.keys(searchParams).reduce((res: string[], key) => {
      const value = searchParams[key as keyType];
      if (Array.isArray(value)) {
        res.push(`${key}=${value.join('-')}`);
      } else {
        res.push(`${key}=${value}`);
      }

      return res;
    }, []);
    return strArr.join('&');
  }, []);

  const setUrl = useCallback(
    (searchParams: UrlParams) => {
      Object.keys(searchParams).forEach((key) => {
        if (params.has(key)) {
          const value = searchParams[key as keyType];
          const urlParam = Array.isArray(value)
            ? String(value.join('-'))
            : String(value);
          params.set(key, urlParam);
        } else {
          const value = searchParams[key as keyType];
          const urlParam = Array.isArray(value)
            ? String(value.join('-'))
            : String(value);
          params.append(key, urlParam);
        }
      });
      setParams(params);
    },
    [params, setParams]
  );

  return { params, setUrl, getParamsString };
};
