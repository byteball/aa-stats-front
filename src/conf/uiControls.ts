export const longPeriodsUiControls: IUiControls[] = [
  { label: '30 Days', value: 30, timeframe: 'daily', labelMobile: '30d' },
  { label: '90 Days', value: 90, timeframe: 'daily', labelMobile: '90d' },
  { label: '1 Year', value: 365, timeframe: 'daily', labelMobile: '1Y' },
  { label: 'All', value: 0, timeframe: 'daily', labelMobile: 'All' },
];

export const shortPeriodsUiControls: IUiControls[] = [
  { label: '24h', value: 1, timeframe: 'hourly', labelMobile: '24h' },
  { label: '7 Days', value: 7, timeframe: 'daily', labelMobile: '7d' },
  { label: '30 Days', value: 30, timeframe: 'daily', labelMobile: '30d' },
];

export const allPeriodsUiControls: IUiControls[] = [
  { label: '24h', value: 1, timeframe: 'hourly', labelMobile: '24h' },
  { label: '7 Days', value: 7, timeframe: 'hourly', labelMobile: '7d' },
  { label: '30 Days', value: 30, timeframe: 'daily', labelMobile: '30d' },
  { label: '90 Days', value: 90, timeframe: 'daily', labelMobile: '90d' },
  { label: '1 Year', value: 365, timeframe: 'daily', labelMobile: '1Y' },
  { label: 'All', value: 0, timeframe: 'daily', labelMobile: 'All' },
];

export const totalGraphActivitiesUiControls: IUiSelects<ITotalWithTvlActivity>[] =
  [
    {
      label: 'USD in',
      labelMobile: 'In, $',
      value: 'usd_amount_in',
      color: '#ffa16f',
      timeframe: 'daily',
      group: 'usd',
      type: 'currency',
    },
    {
      label: 'USD out',
      labelMobile: 'Out, $',
      value: 'usd_amount_out',
      color: '#03809c',
      timeframe: 'daily',
      group: 'usd',
      type: 'currency',
    },
    {
      label: 'TVL',
      labelMobile: 'TVL',
      value: 'usd_balance',
      color: '#d5265b',
      timeframe: 'hourly',
      group: null,
      type: 'currency',
    },
  ];

export const agentGraphUiControls: IUiSelects<IAddressGraphData>[] = [
  {
    label: 'USD in',
    labelMobile: 'In, $',
    value: 'usd_amount_in',
    color: '#ffa16f',
    timeframe: 'daily',
    group: 'usd',
    type: 'currency',
  },
  {
    label: 'USD out',
    labelMobile: 'Out, $',
    value: 'usd_amount_out',
    color: '#03809c',
    timeframe: 'daily',
    group: 'usd',
    type: 'currency',
  },
  {
    label: 'TVL',
    labelMobile: 'TVL',
    value: 'balance',
    color: '#a9203e',
    timeframe: 'hourly',
    group: 'tvl',
    type: 'amount',
  },
  {
    label: 'TVL, USD',
    labelMobile: 'TVL, $',
    value: 'usd_balance',
    color: '#d5265b',
    timeframe: 'hourly',
    group: 'tvl',
    type: 'currency',
  },
  {
    label: 'Users',
    labelMobile: 'Users',
    value: 'num_users',
    color: 'blue',
    timeframe: 'daily',
    group: null,
    type: 'amount',
  },
  {
    label: 'Requests',
    labelMobile: 'Reqs',
    value: 'triggers_count',
    color: 'teal',
    timeframe: 'daily',
    group: null,
    type: 'amount',
  },
];

export const assetsIconsConf: IAssetsIconsConf[] = [
  {
    icon: 'OETH.svg',
    assets: [
      'O-GBYTE-ETH',
      'O-OETH-ETH',
      'OETH',
      'OETHV1',
      'O2-OETH-ETH',
      'O2-GBYTE-ETH',
      'OPT-GBYTE-ETH',
      'OPT-GBYTE-OETH',
      'OPT-ETH-OETH',
    ],
  },
  {
    icon: 'OBIT.svg',
    assets: [
      'O-GBYTE-WBTC',
      'OBIT',
      'OBITV1',
      'O2-GBYTE-WBTC',
      'O2-OBIT-WBTC',
      'OPT-GBYTE-WBTC',
    ],
  },
  { icon: 'GRD.svg', assets: ['GRDV2', 'GRD'] },
  {
    icon: 'OUSD.svg',
    assets: [
      'O-GBYTE-USDC',
      'O-OUSD-USDC',
      'OUSD',
      'OUSDV1',
      'OPT-GBYTE-OUSD',
      'OPT-GBYTE-USDC',
      'O2-GBYTE-USDC',
    ],
  },
  { icon: 'GRB.svg', assets: ['GRGBV2', 'GRBV2', 'GRGB', 'GRB'] },
  { icon: 'ETH.svg', assets: ['ETH'] },
  { icon: 'USDC.svg', assets: ['USDC', 'SFUSD'] },
  { icon: 'SFETH.svg', assets: ['GRETHV2'] },
  { icon: 'WBTC.svg', assets: ['WBTC'] },
  { icon: 'ITH.svg', assets: ['ITH'] },
  { icon: 'IUSD.svg', assets: ['IUSD'] },
  { icon: 'IBIT.svg', assets: ['IBIT'] },
  { icon: 'GBYTE.svg', assets: ['GBYTE'] },
];
