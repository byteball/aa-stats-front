/* eslint-disable camelcase */
import { createSelector } from '@reduxjs/toolkit';

import { templates, ITemplate } from 'conf/templates';
import { TRootState } from 'store';
import { getTvlByAddressSelector } from 'store/AAstats';

const obyteSelector = (state: TRootState): IObyteSlice => state.obyte;

export const agentsCacheSelector = createSelector(
  obyteSelector,
  (obyte) => obyte.agentsCache
);

export const assetsCacheSelector = createSelector(
  obyteSelector,
  (obyte) => obyte.assetsCache
);

const templateSelector = (base_aa: string): ITemplate | undefined =>
  templates.find((template) => template.baseAAs.includes(base_aa));

export const definitionByAddressSelector = createSelector(
  agentsCacheSelector,
  (agentsCache) => (address: string) =>
    Object.keys(agentsCache)
      .map((base_aa) => ({ ...agentsCache[base_aa], base_aa }))
      .find((cache) => Object.hasOwn(cache.addresses, address))
);

export const safetyDefinitionByAddressSelector = createSelector(
  definitionByAddressSelector,
  (def) => (address: string) => {
    const defData = def(address);
    if (defData && defData.definition) {
      return defData.definition;
    }
    return { description: address };
  }
);

export const descriptionByAddressSelector = createSelector(
  definitionByAddressSelector,
  (getDefinition) =>
    (address: string): string => {
      const definedData = getDefinition(address);
      if (definedData) {
        const template = templateSelector(definedData.base_aa);
        const { assets } = definedData.addresses[address];
        if (assets && template) {
          const assetsArr = Object.keys(assets).map((assetKey) => ({
            assetKey,
            ...assets[assetKey],
          }));
          if (assetsArr.every((assetInfo) => assetInfo.symbol)) {
            return template.getTemplate(
              assetsArr.reduce(
                (res: Record<string, string>, curr) =>
                  Object.assign(res, { [curr.assetKey]: curr.symbol }),
                {}
              )
            );
          }
          if (assetsArr.every((assetInfo) => assetInfo.value)) {
            return template.getTemplate(
              assetsArr.reduce(
                (res: Record<string, string>, curr) =>
                  Object.assign(res, {
                    [curr.assetKey]: curr.value.substring(0, 5),
                  }),
                {}
              )
            );
          }
        }
        if (definedData.definition) {
          return definedData.definition.description || address;
        }
      }
      return address;
    }
);

export const fullFlattenDefinedDataSelector = createSelector(
  agentsCacheSelector,
  descriptionByAddressSelector,
  getTvlByAddressSelector,
  (agentsCache, getDescription, getTvl): ILabeledAddress[] =>
    Object.keys(agentsCache).reduce(
      (labeledAddresses: ILabeledAddress[], base_aa) =>
        labeledAddresses.concat(
          Object.keys(agentsCache[base_aa].addresses).map((address) => ({
            address,
            label: getDescription(address),
            tvl: getTvl(address),
          }))
        ),
      []
    )
);
