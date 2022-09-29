interface UIState {
  darkMode: boolean;
  homeLayouts: ReactGridLayout.Layouts;
  homeLayoutsCache: ReactGridLayout.Layouts;
  agentLayouts: ReactGridLayout.Layouts;
  agentLayoutsCache: ReactGridLayout.Layouts;
  totalGraphPeriodControls: number;
  totalGraphActivitiesControls: (keyof ITotalWithTvlActivity)[];
  agentsTablePeriodControls: number;
  agentsTableDataLimit: number;
  agentsTableSortType: combinedTypes;
  asset: string;
  assets: IAssetData[];
  agentGraphActivitiesControls: (keyof IAddressGraphData)[];
  agentGraphPeriodControl: number;
}

interface IAssetData {
  assetSymbol: string;
  assetId: string | null;
}

interface IUiControls {
  label: string;
  labelMobile: string;
  value: number;
  timeframe?: tfTypes;
}

interface IUiSelects<V> {
  label: string;
  labelMobile: string;
  value: keyof V;
  color: string;
  timeframe?: tfTypes;
  group: string | null;
  type: graphYTypes;
}

type graphYTypes = 'currency' | 'amount';
