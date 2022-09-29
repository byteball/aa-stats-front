import { createSelector } from '@reduxjs/toolkit';

import {
  agentGraphUiControls,
  allPeriodsUiControls,
  shortPeriodsUiControls,
  totalGraphActivitiesUiControls,
} from 'conf/uiControls';
import { TRootState } from 'store';

const uiSelector = (state: TRootState): UIState => state.ui;

export const darkModeSelector = createSelector(uiSelector, (ui) => ui.darkMode);

export const homeLayoutsSelector = createSelector(
  uiSelector,
  (ui) => ui.homeLayouts
);

export const homeLayoutsCacheSelector = createSelector(
  uiSelector,
  (ui) => ui.homeLayoutsCache
);

export const totalGraphControlValue = createSelector(
  uiSelector,
  (ui) => ui.totalGraphPeriodControls
);

export const totalGraphActivityControl = createSelector(
  uiSelector,
  (ui) => ui.totalGraphActivitiesControls
);

export const totalGraphTimeframeSelector = createSelector(
  totalGraphActivityControl,
  ([control]): tfTypes =>
    totalGraphActivitiesUiControls.find((c) => c.value === control)
      ?.timeframe || 'daily'
);

export const agentsTablePeriodSelector = createSelector(
  uiSelector,
  (ui) => ui.agentsTablePeriodControls
);

export const agentsTableTimeframeSelector = createSelector(
  uiSelector,
  (ui): tfTypes =>
    shortPeriodsUiControls.find((p) => p.value === ui.agentsTablePeriodControls)
      ?.timeframe || 'daily'
);

export const assetSelector = createSelector(uiSelector, (ui) => ui.asset);

export const agentsTableSortTypeSelector = createSelector(
  uiSelector,
  (ui) => ui.agentsTableSortType
);

export const agentsTableLimitSelector = createSelector(
  uiSelector,
  (ui) => ui.agentsTableDataLimit
);

export const agentLayoutsSelector = createSelector(
  uiSelector,
  (ui) => ui.agentLayouts
);

export const agentLayoutsCacheSelector = createSelector(
  uiSelector,
  (ui) => ui.agentLayoutsCache
);

export const agentGraphActivitiesControlsSelector = createSelector(
  uiSelector,
  (ui) => ui.agentGraphActivitiesControls
);

export const agentGraphPeriodControlSelector = createSelector(
  uiSelector,
  (ui) => ui.agentGraphPeriodControl
);

export const agentGraphTimeframeSelector = createSelector(
  agentGraphActivitiesControlsSelector,
  agentGraphPeriodControlSelector,
  ([control], value): tfTypes => {
    if (control === 'usd_balance' || control === 'balance')
      return (
        agentGraphUiControls.find((agc) => agc.value === control)?.timeframe ||
        'hourly'
      );

    return (
      allPeriodsUiControls.find((p) => p.value === value)?.timeframe || 'daily'
    );
  }
);

export const agentGraphTypeSelector = createSelector(
  agentGraphActivitiesControlsSelector,
  ([control]) =>
    agentGraphUiControls.find((agc) => agc.value === control)?.type ||
    'currency'
);

export const assetsSelector = createSelector(uiSelector, (ui) => ui.assets);

export const initialHomeSearchParamsSelector = createSelector(
  uiSelector,
  (ui) => ({
    activity: ui.totalGraphActivitiesControls.map((activity) => activity),
    g_period: ui.totalGraphPeriodControls,
    t_period: ui.agentsTablePeriodControls,
    t_sort: ui.agentsTableSortType,
  })
);

export const initialAgentPageSearchParamsSelector = createSelector(
  uiSelector,
  (ui) => ({
    activity: ui.agentGraphActivitiesControls.map((activity) => activity),
    g_period: ui.agentGraphPeriodControl,
    asset: ui.asset,
    t_period: ui.agentsTablePeriodControls,
    t_sort: ui.agentsTableSortType,
  })
);
