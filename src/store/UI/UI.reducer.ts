import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { allPeriodsUiControls } from 'conf/uiControls';

import { initialState } from './initialState';

const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    toggleDarkMode: (state: UIState) => {
      state.darkMode = !state.darkMode;
    },
    cacheHomeLayout: (
      state: UIState,
      action: PayloadAction<ReactGridLayout.Layouts>
    ) => {
      state.homeLayoutsCache = action.payload;
    },
    clearCacheHomeLayout: (state: UIState) => {
      state.homeLayoutsCache = {};
    },
    saveHomeLayout: (state: UIState) => {
      if ('sm' in state.homeLayoutsCache) {
        state.homeLayouts = state.homeLayoutsCache;
        state.homeLayoutsCache = {};
      }
    },
    cacheAgentLayout: (
      state: UIState,
      action: PayloadAction<ReactGridLayout.Layouts>
    ) => {
      state.agentLayoutsCache = action.payload;
    },
    clearCacheAgentLayout: (state: UIState) => {
      state.agentLayoutsCache = {};
    },
    saveAgentLayout: (state: UIState) => {
      if ('sm' in state.agentLayoutsCache) {
        state.agentLayouts = state.agentLayoutsCache;
        state.agentLayoutsCache = {};
      }
    },
    handleTotalGraphPeriodControl: (
      state: UIState,
      action: PayloadAction<number>
    ) => {
      state.totalGraphPeriodControls =
        allPeriodsUiControls.find((ctrl) => ctrl.value === action.payload)
          ?.value ?? initialState.totalGraphPeriodControls;
    },
    handleTotalGraphActivitiesControls: (
      state: UIState,
      action: PayloadAction<(keyof ITotalWithTvlActivity)[]>
    ) => {
      state.totalGraphActivitiesControls = action.payload;
    },
    handleAgentsTablePeriodControl: (
      state: UIState,
      action: PayloadAction<number>
    ) => {
      state.agentsTablePeriodControls =
        allPeriodsUiControls.find((ctrl) => ctrl.value === action.payload)
          ?.value ?? initialState.agentsTablePeriodControls;
    },
    handleAgentsTableSortType: (
      state: UIState,
      action: PayloadAction<combinedTypes>
    ) => {
      state.agentsTableSortType = action.payload;
    },
    increaseAgentsTableDataLimit: (
      state: UIState,
      action: PayloadAction<number>
    ) => {
      state.agentsTableDataLimit += action.payload;
    },
    handleAsset: (state: UIState, action: PayloadAction<string>) => {
      state.asset = action.payload;
    },
    handleAssets: (state: UIState, action: PayloadAction<IAssetData[]>) => {
      state.assets = action.payload;
    },
    handleAgentGraphActivitiesControls: (
      state: UIState,
      action: PayloadAction<(keyof IAddressGraphData)[]>
    ) => {
      state.agentGraphActivitiesControls = action.payload;
    },
    handleAgentGraphPeriodControl: (
      state: UIState,
      action: PayloadAction<number>
    ) => {
      state.agentGraphPeriodControl =
        allPeriodsUiControls.find((ctrl) => ctrl.value === action.payload)
          ?.value ?? initialState.agentGraphPeriodControl;
    },
  },
});

export const {
  toggleDarkMode,
  cacheHomeLayout,
  saveHomeLayout,
  clearCacheHomeLayout,
  cacheAgentLayout,
  saveAgentLayout,
  clearCacheAgentLayout,
  handleTotalGraphPeriodControl,
  handleTotalGraphActivitiesControls,
  handleAgentsTablePeriodControl,
  handleAgentsTableSortType,
  increaseAgentsTableDataLimit,
  handleAsset,
  handleAssets,
  handleAgentGraphActivitiesControls,
  handleAgentGraphPeriodControl,
} = UISlice.actions;
export const { reducer: UIReducer } = UISlice;
