/* eslint-disable camelcase */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Client } from 'obyte';
import { isEmpty } from 'ramda';

import { corsProxyUrl } from 'conf/constants';
import { TRootState } from 'store';
import { getAssetsMetadata } from 'store/AAstats';
import { showSnackBar } from 'store/SnackStack';

import {
  updateAgentsCacheByAddresses,
  updateAgentsCacheByAssetsSymbols,
  updateAgentsCacheByAssetsValues,
  updateAgentsCacheByDefinition,
} from './Obyte.reducer';
import {
  getAddressesBaseAA,
  getAddressesWithDefinedSymbolsByMeta,
  getAddressesWithDefinedSymbolsByObyte,
  getAddressesWithTemplatedAssetsValues,
  getAddressesWithUndefinedBaseAA,
  getAddressesWithUndefinedSymbols,
  getBaseAAWithDefinition,
  getBaseAAwithUndefinedDefinition,
  getTemplatedAddressesWithUndefinedAsset,
} from './utils';

let obyte: Client;

function getObyteClient(): Client {
  if (!obyte) {
    obyte = new Client();
  }
  return obyte;
}

export const obyteApi = createApi({
  reducerPath: 'obyteApi',
  baseQuery: fetchBaseQuery({
    mode: 'cors',
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 60 * 60 * 24,
  endpoints: (build) => ({
    getDefinitions: build.query<IDefinedBaseAAData[], string[]>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, dispatch, getState }
      ) {
        try {
          await cacheDataLoaded;
          const socket = getObyteClient();

          /** 1. create/update cache: base_aa -> addresses -> address */
          const { agentsCache: agentsCache1 } = (getState() as TRootState)
            .obyte;
          const addressesBaseAA = await getAddressesBaseAA(
            getAddressesWithUndefinedBaseAA(agentsCache1, arg),
            socket
          );
          dispatch(updateAgentsCacheByAddresses(addressesBaseAA));

          /** 2. update cache by addresses with templated asset values */
          const { agentsCache: agentsCache2 } = (getState() as TRootState)
            .obyte;
          const addressesWithTemplatedAssetsValues =
            await getAddressesWithTemplatedAssetsValues(
              getTemplatedAddressesWithUndefinedAsset(agentsCache2),
              socket
            );
          dispatch(
            updateAgentsCacheByAssetsValues(addressesWithTemplatedAssetsValues)
          );

          /** 3. update cache by addresses with asset symbols from api */
          const { agentsCache: agentsCache3, assetsCache } = (
            getState() as TRootState
          ).obyte;
          dispatch(
            updateAgentsCacheByAssetsSymbols(
              getAddressesWithDefinedSymbolsByMeta(
                getAddressesWithUndefinedSymbols(agentsCache3),
                isEmpty(assetsCache)
                  ? await dispatch(getAssetsMetadata()).unwrap()
                  : assetsCache
              )
            )
          );

          /** 4. update cache by addresses with asset symbols from obyte.js */
          const { agentsCache: agentsCache4 } = (getState() as TRootState)
            .obyte;
          const addressesWithDefinedSymbolsByObyte =
            await getAddressesWithDefinedSymbolsByObyte(
              getAddressesWithUndefinedSymbols(agentsCache4),
              socket
            );
          dispatch(
            updateAgentsCacheByAssetsSymbols(addressesWithDefinedSymbolsByObyte)
          );

          /** 5. update cache by adresses with their base_aa and json`s definition */
          const { agentsCache: agentsCache5 } = (getState() as TRootState)
            .obyte;
          const baseAAWithDefinition = await getBaseAAWithDefinition(
            getBaseAAwithUndefinedDefinition(agentsCache5),
            socket
          );
          dispatch(updateAgentsCacheByDefinition(baseAAWithDefinition));

          /** 6. update cache by adresses with their base_aa and json`s definition by cors proxy */
          if (corsProxyUrl) {
            const { agentsCache: agentsCache6 } = (getState() as TRootState)
              .obyte;
            const baseAAWithDefinitionByCP = await getBaseAAWithDefinition(
              getBaseAAwithUndefinedDefinition(agentsCache6),
              socket,
              true
            );
            dispatch(updateAgentsCacheByDefinition(baseAAWithDefinitionByCP));
          }

          await cacheEntryRemoved;
        } catch (e) {
          dispatch(
            showSnackBar({
              message:
                e instanceof Error ? e.message : 'definition query error',
              title: 'Definitions Query',
              severity: 'error',
            })
          );
        }
      },
    }),
  }),
});

export const { useGetDefinitionsQuery } = obyteApi;
