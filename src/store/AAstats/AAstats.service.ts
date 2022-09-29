import { Serie } from '@nivo/line';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { apiKey } from 'conf/constants';

import {
  transformStatsForOneAddress,
  transformTopAA,
  transformTopAAByTvl,
  transformTotalActivity,
  transformTotalTvl,
  transformTvlOverTimeForOneAddress,
  transformTvlOverTimeValuesForOneAddress,
  transformTvlValues,
  transformUSDInValues,
  transformUsdInValuesForOneAddress,
} from './AAstats.transform';

export const aastatsAPI = createApi({
  reducerPath: 'aastatsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: apiKey,
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: [
    'Address',
    'TvlForAddress',
    'TotalTvl',
    'TotalActivity',
    'TopAA',
    'TopAAbyTvl',
    'TopAssets',
    'Assets',
  ],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (build) => ({
    getStatsForOneAddress: build.query<IAddress[], IAAStatsAddressReq>({
      query: (request) => ({
        url: 'address',
        method: 'POST',
        body: request,
      }),
      providesTags: ['Address'],
      transformResponse: transformStatsForOneAddress,
    }),
    getUsdInValuesForOneAddress: build.query<
      { prev: number; value: number },
      IAAStatsAddressReq
    >({
      query: (request) => ({
        url: 'address',
        method: 'POST',
        body: request,
      }),
      keepUnusedDataFor: 60 * 30,
      providesTags: ['Address'],
      transformResponse: transformUsdInValuesForOneAddress,
    }),
    getTvlOverTimeForOneAddress: build.query<IAddressTvl[], IAAStatsTvlReq>({
      query: ({ from, to, asset, address, timeframe }) => ({
        url: 'address/tvl',
        method: 'POST',
        body:
          timeframe === 'daily'
            ? { from: from * 24, to: to * 24, asset, address }
            : { from, to, asset, address },
      }),
      providesTags: ['TvlForAddress'],
      transformResponse: transformTvlOverTimeForOneAddress,
    }),
    getTvlOverTimeValuesForOneAddress: build.query<
      number[],
      IAAStatsTvlValuesForOneAddressReq
    >({
      query: (request) => ({
        url: 'address/tvl',
        method: 'POST',
        body: request,
      }),
      keepUnusedDataFor: 60 * 30,
      providesTags: ['TvlForAddress'],
      transformResponse: transformTvlOverTimeValuesForOneAddress,
    }),
    getTotalTvlOverTime: build.query<Serie[], IAAStatsTotalTvl>({
      query: ({ from, to, asset, timeframe }) => ({
        url: 'total/tvl',
        method: 'POST',
        body:
          timeframe === 'daily'
            ? { from: from * 24, to: to * 24, asset }
            : { from, to, asset },
      }),
      keepUnusedDataFor: 60 * 30,
      providesTags: ['TotalTvl'],
      transformResponse: transformTotalTvl,
    }),
    getTotalTvlValues: build.query<ITotalTvl[], IAAStatsTotalTvlValuesReq>({
      query: (request) => ({
        url: 'total/tvl',
        method: 'POST',
        body: request,
      }),
      providesTags: ['TotalTvl'],
      keepUnusedDataFor: 60 * 30,
      transformResponse: transformTvlValues,
    }),
    getTotalActivityOverTime: build.query<Serie[], IAAStatsTotalActivity>({
      query: ({ asset, from, to, timeframe }) => ({
        url: 'total/activity',
        method: 'POST',
        body: { asset, from, to, timeframe },
      }),
      providesTags: ['TotalActivity'],
      keepUnusedDataFor: 60 * 30,
      transformResponse: transformTotalActivity,
    }),
    getTotalUsdInValues: build.query<
      { prev: number; value: number },
      IAAStatsUSDInValuesReq
    >({
      query: (request) => ({
        url: 'total/activity',
        method: 'POST',
        body: request,
      }),
      providesTags: ['TotalActivity'],
      keepUnusedDataFor: 60 * 30,
      transformResponse: transformUSDInValues,
    }),
    getTopAAbyTvl: build.query<IRenderAATvl[], IAAStatsTopAAbyTvlReq>({
      query: (request) => ({
        url: 'top/aa/tvl',
        method: 'POST',
        body: request,
      }),
      keepUnusedDataFor: 60 * 10,
      providesTags: ['TopAAbyTvl'],
      transformResponse: transformTopAAByTvl,
    }),
    getTopAAbyType: build.query<IRenderAddress[], IAAStatsTopAAbyTypeReq>({
      query: ({ asset, from, to, timeframe, limit, type }) => ({
        url: `top/aa/${type}`,
        method: 'POST',
        body: { asset, from, to, timeframe, limit },
      }),
      providesTags: ['TopAA'],
      transformResponse: transformTopAA,
    }),
    getMostActiveAgents: build.query<IAddress[], IAAStatsMosActiveAgenstReq>({
      query: (request) => ({
        url: 'top/aa/usd_amount_in',
        method: 'POST',
        body: request,
      }),
      providesTags: ['TopAA'],
      keepUnusedDataFor: 60 * 30,
    }),
    getTopAssets: build.query<IAsset[], IAAStatsTopAssetsReq>({
      query: (request) => ({
        url: 'top/asset/tvl',
        method: 'POST',
        body: request,
      }),
      providesTags: ['TopAssets'],
    }),
    getAsset: build.query<AssetsResponseType, void>({
      query: () => ({
        url: 'assets',
        method: 'GET',
      }),
      providesTags: ['Assets'],
      keepUnusedDataFor: 60 * 60 * 24,
      // transformResponse: transformGetAssets,
    }),
    getTopAACombinedByType: build.query<
      IGetTopAACombinedByTypeRes[],
      IGetTopAACombinedByTypeReq
    >({
      query: ({ type, from, to, timeframe, limit }) => ({
        url: `top/aa/combined/${type}`,
        method: 'POST',
        body: { from, to, timeframe, limit },
      }),
      providesTags: ['TopAA'],
      keepUnusedDataFor: 60 * 30,
    }),
  }),
});

export const {
  useGetStatsForOneAddressQuery,
  useGetUsdInValuesForOneAddressQuery,
  useGetTvlOverTimeForOneAddressQuery,
  useGetTotalTvlOverTimeQuery,
  useGetTvlOverTimeValuesForOneAddressQuery,
  useGetTotalTvlValuesQuery,
  useGetTotalActivityOverTimeQuery,
  useGetTotalUsdInValuesQuery,
  useGetMostActiveAgentsQuery,
  useGetTopAAbyTvlQuery,
  useGetTopAAbyTypeQuery,
  useGetTopAssetsQuery,
  useGetAssetQuery,
  useGetTopAACombinedByTypeQuery,
} = aastatsAPI;
