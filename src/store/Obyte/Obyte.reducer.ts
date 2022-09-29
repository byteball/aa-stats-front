/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable camelcase */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getAssetsMetadata } from 'store/AAstats';

const initialState: IObyteSlice = {
  agentsCache: {},
  assetsCache: { base: 'GBYTE' },
};

export const ObyteSlice = createSlice({
  name: 'obyte',
  initialState,
  reducers: {
    updateAgentsCacheByAddresses: (
      state: IObyteSlice,
      action: PayloadAction<IAddressWithBaseAA[]>
    ) => {
      action.payload.forEach(({ base_aa, address }) => {
        if (Object.hasOwn(state.agentsCache, base_aa)) {
          if (!Object.hasOwn(state.agentsCache[base_aa].addresses, address)) {
            Object.assign(state.agentsCache[base_aa].addresses, {
              [address]: {},
            });
          }
        } else {
          Object.assign(state.agentsCache, {
            [base_aa]: { addresses: { [address]: {} } },
          });
        }
      });
    },
    updateAgentsCacheByAssetsValues: (
      state: IObyteSlice,
      action: PayloadAction<IAddressWithTemplatedAssetInfo[]>
    ) => {
      action.payload.forEach(({ base_aa, address, assets }) => {
        const cachedAssets =
          state.agentsCache[base_aa].addresses[address].assets;
        if (cachedAssets) {
          Object.keys(cachedAssets).forEach((key) => {
            if (cachedAssets[key].value !== assets[key]) {
              state.agentsCache[base_aa].addresses[address].assets![key].value =
                assets[key];
            }
          });
        } else
          state.agentsCache[base_aa].addresses[address] = {
            assets: Object.keys(assets).reduce(
              (res: Record<string, IAssetEntity>, key) =>
                Object.assign(res, { [key]: { value: assets[key] } }),
              {}
            ),
          };
      });
    },
    updateAgentsCacheByAssetsSymbols: (
      state: IObyteSlice,
      action: PayloadAction<IAddressWithTemplatedAssetEntity[]>
    ) => {
      action.payload.forEach(({ base_aa, address, assets }) => {
        state.agentsCache[base_aa].addresses[address].assets = assets;
      });
    },
    updateAgentsCacheByDefinition: (
      state: IObyteSlice,
      action: PayloadAction<IBaseAAWithDefinition[]>
    ) => {
      action.payload.forEach(({ base_aa, definition }) => {
        state.agentsCache[base_aa].definition = definition;
      });
    },
    updateAssetsCache: (
      state: IObyteSlice,
      action: PayloadAction<IAssetEntity[]>
    ) => {
      action.payload.forEach((asset) => {
        if (!Object.hasOwn(state.assetsCache, asset.value)) {
          Object.assign(state.assetsCache, { [asset.value]: asset.symbol });
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAssetsMetadata.fulfilled,
      (state, action: PayloadAction<Record<string, string>>) => {
        Object.assign(state.assetsCache, action.payload);
      }
    );
  },
});

export const {
  updateAgentsCacheByAddresses,
  updateAgentsCacheByAssetsValues,
  updateAgentsCacheByAssetsSymbols,
  updateAgentsCacheByDefinition,
} = ObyteSlice.actions;
export const { reducer: ObyteReducer } = ObyteSlice;
