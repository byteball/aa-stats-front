import {
  allPeriodsUiControls,
  totalGraphActivitiesUiControls,
  agentGraphUiControls,
  tablePeriodsUiControls,
} from 'conf/uiControls';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const initialParams = new URLSearchParams(window.location.search);

export const getInitialTableSortType = (
  params: URLSearchParams
): combinedTypes => {
  if (params.has('t_sort')) {
    const availableSortTypes = [
      'usd_balance',
      'usd_amount_in',
      'usd_amount_out',
    ];
    const sortType = params.get('t_sort')!;
    if (availableSortTypes.some((type) => type === sortType)) {
      return sortType as combinedTypes;
    }

    return 'usd_amount_in';
  }
  return 'usd_amount_in';
};

export const getInitialGraphData = <T>(
  params: URLSearchParams,
  conf: IUiSelects<T>[],
  keyParam: string
): (keyof T)[] => {
  if (params.has(keyParam)) {
    const res = params.get(keyParam)!.split('-') as unknown as (keyof T)[];
    if (res.every((val) => conf.some((c) => c.value === val))) {
      return res;
    }

    return ['usd_amount_in'] as unknown as (keyof T)[];
  }

  return ['usd_amount_in'] as unknown as (keyof T)[];
};

export const getInitialAsset = (params: URLSearchParams): string => {
  if (params.has('asset')) {
    return params.get('asset') as string;
  }
  return 'all';
};

export const getInitialPeriod = (
  params: URLSearchParams,
  conf: IUiControls[],
  keyParam: string
): number => {
  if (params.has(keyParam)) {
    const period = +params.get(keyParam)!;
    if (conf.some((p) => p.value === period)) {
      return period;
    }

    return keyParam === 't_period' ? 1 : 30;
  }
  return keyParam === 't_period' ? 1 : 30;
};

const agentsTableSortType = getInitialTableSortType(initialParams);

const totalGraphActivitiesControls = getInitialGraphData<ITotalWithTvlActivity>(
  initialParams,
  totalGraphActivitiesUiControls,
  'activity'
);

const agentGraphActivitiesControls = getInitialGraphData<IAddressGraphData>(
  initialParams,
  agentGraphUiControls,
  'activity'
);

const asset = getInitialAsset(initialParams);

const totalGraphPeriodControls = getInitialPeriod(
  initialParams,
  allPeriodsUiControls,
  'g_period'
);

const agentsTablePeriodControls = getInitialPeriod(
  initialParams,
  tablePeriodsUiControls,
  't_period'
);

const agentGraphPeriodControl = getInitialPeriod(
  initialParams,
  allPeriodsUiControls,
  'g_period'
);

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
