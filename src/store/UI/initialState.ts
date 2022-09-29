import { allPeriodsUiControls } from 'conf/uiControls';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const initialParams = new URLSearchParams(window.location.search);

const getInitialTableSortType = (): combinedTypes => {
  if (initialParams.has('t_sort')) {
    const sortType = initialParams.get('t_sort')!;
    return sortType as combinedTypes;
  }
  return 'usd_amount_in';
};

const getInitialGraphData = <T>(keyParam: string): T[] => {
  if (initialParams.has(keyParam)) {
    return initialParams.get(keyParam)!.split('-') as unknown as T[];
  }

  return ['usd_amount_in'] as unknown as T[];
};

const getInitialAsset = (): string => {
  if (initialParams.has('asset')) {
    return initialParams.get('asset') as string;
  }
  return 'all';
};

const getInitialPeriod = (keyParam: string): number => {
  if (initialParams.has(keyParam)) {
    const period = +initialParams.get(keyParam)!;
    if (allPeriodsUiControls.some((p) => p.value === period)) {
      return period;
    }
    return keyParam === 't_period' ? 1 : 30;
  }
  return keyParam === 't_period' ? 1 : 30;
};

const agentsTableSortType = getInitialTableSortType();

const totalGraphActivitiesControls =
  getInitialGraphData<keyof ITotalWithTvlActivity>('activity');

const agentGraphActivitiesControls =
  getInitialGraphData<keyof IAddressGraphData>('activity');

const asset = getInitialAsset();

const totalGraphPeriodControls = getInitialPeriod('g_period');

const agentsTablePeriodControls = getInitialPeriod('t_period');

const agentGraphPeriodControl = getInitialPeriod('g_period');

const mdSmHomeLt = [
  {
    i: 'widget-1',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    isResizable: false,
    moved: false,
    static: false,
  },
  {
    i: 'widget-2',
    x: 1,
    y: 0,
    w: 1,
    h: 1,
    isResizable: false,
    moved: false,
    static: false,
  },
  {
    i: 'widget-3',
    x: 2,
    y: 0,
    w: 1,
    h: 1,
    isResizable: false,
    moved: false,
    static: false,
  },
  {
    i: 'widget-chart',
    x: 0,
    y: 1,
    w: 3,
    h: 2,
    minW: 2,
    minH: 2,
    maxW: 3,
    moved: false,
    static: false,
  },
];

const mdSmAgentLt = [
  {
    i: 'widget-1',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    isResizable: false,
    moved: false,
    static: false,
  },
  {
    i: 'widget-2',
    x: 0,
    y: 1,
    w: 1,
    h: 1,
    isResizable: false,
    moved: false,
    static: false,
  },
  {
    i: 'widget-chart',
    x: 1,
    y: 0,
    w: 2,
    h: 2,
    minW: 2,
    minH: 2,
    maxW: 3,
    moved: false,
    static: false,
  },
];

export const initialState: UIState = {
  darkMode: true,
  homeLayouts: {
    md: mdSmHomeLt,
    sm: mdSmHomeLt,
    xs: [
      {
        i: 'widget-1',
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        maxW: 2,
        maxH: 1,
        moved: false,
        static: true,
      },
      {
        i: 'widget-2',
        x: 1,
        y: 0,
        w: 1,
        h: 1,
        maxW: 2,
        maxH: 1,
        moved: false,
        static: true,
      },
      {
        i: 'widget-3',
        x: 0,
        y: 1,
        w: 2,
        h: 1,
        maxW: 2,
        maxH: 1,
        moved: false,
        static: true,
      },
      {
        i: 'widget-chart',
        x: 0,
        y: 2,
        w: 2,
        h: 2,
        minW: 2,
        maxW: 2,
        moved: false,
        static: true,
      },
    ],
    xxs: [
      {
        i: 'widget-1',
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        moved: false,
        static: true,
      },
      {
        i: 'widget-2',
        x: 0,
        y: 1,
        w: 1,
        h: 1,
        moved: false,
        static: true,
      },
      {
        i: 'widget-3',
        x: 0,
        y: 2,
        w: 1,
        h: 1,
        moved: false,
        static: true,
      },
      {
        i: 'widget-chart',
        x: 0,
        y: 3,
        w: 1,
        h: 2,
        maxW: 1,
        moved: false,
        static: true,
      },
    ],
  },
  agentLayouts: {
    md: mdSmAgentLt,
    sm: mdSmAgentLt,
    xs: [
      {
        i: 'widget-1',
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        moved: false,
        static: true,
      },
      {
        i: 'widget-2',
        x: 1,
        y: 0,
        w: 1,
        h: 1,
        moved: false,
        static: true,
      },
      {
        i: 'widget-chart',
        x: 0,
        y: 1,
        w: 2,
        h: 2,
        minW: 2,
        maxW: 2,
        moved: false,
        static: true,
      },
    ],
    xxs: [
      {
        i: 'widget-1',
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        moved: false,
        static: true,
      },
      {
        i: 'widget-2',
        x: 0,
        y: 1,
        w: 1,
        h: 1,
        moved: false,
        static: true,
      },
      {
        i: 'widget-chart',
        x: 0,
        y: 2,
        w: 1,
        h: 2,
        maxW: 1,
        moved: false,
        static: true,
      },
    ],
  },
  homeLayoutsCache: {},
  agentLayoutsCache: {},
  totalGraphPeriodControls,
  totalGraphActivitiesControls,
  agentsTablePeriodControls,
  agentsTableDataLimit: 10,
  agentsTableSortType,
  asset,
  assets: [],
  agentGraphActivitiesControls,
  agentGraphPeriodControl,
};
