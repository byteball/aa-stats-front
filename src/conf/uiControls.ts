import { colors } from './colors';

export const longPeriodsUiControls: IUiControls[] = [
  { label: '30 Days', value: 30, timeframe: 'daily', labelMobile: '30d' },
  { label: '90 Days', value: 90, timeframe: 'daily', labelMobile: '90d' },
  { label: '1 Year', value: 365, timeframe: 'daily', labelMobile: '1Y' },
  { label: 'All', value: 0, timeframe: 'daily', labelMobile: 'All' },
];

export const tvlPeriodsUiControls: IUiControls[] = [
  { label: '24h', value: 1, timeframe: 'hourly', labelMobile: '24h' },
  { label: '7 Days', value: 7, timeframe: 'hourly', labelMobile: '7d' },
  { label: '30 Days', value: 30, timeframe: 'hourly', labelMobile: '30d' },
  { label: '90 Days', value: 90, timeframe: 'daily', labelMobile: '90d' },
];

export const tablePeriodsUiControls: IUiControls[] = [
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
      color: colors.coralCanyon,
      timeframe: 'daily',
      group: 'usd',
      type: 'currency',
    },
    {
      label: 'USD out',
      labelMobile: 'Out, $',
      value: 'usd_amount_out',
      color: colors.seaweed,
      timeframe: 'daily',
      group: 'usd',
      type: 'currency',
    },
    {
      label: 'TVL',
      labelMobile: 'TVL',
      value: 'usd_balance',
      color: colors.cosmo,
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
    color: colors.coralCanyon,
    timeframe: 'daily',
    group: 'usd',
    type: 'currency',
  },
  {
    label: 'USD out',
    labelMobile: 'Out, $',
    value: 'usd_amount_out',
    color: colors.seaweed,
    timeframe: 'daily',
    group: 'usd',
    type: 'currency',
  },
  {
    label: 'TVL',
    labelMobile: 'TVL',
    value: 'balance',
    color: colors.carmine,
    timeframe: 'hourly',
    group: 'tvl',
    type: 'amount',
  },
  {
    label: 'TVL, USD',
    labelMobile: 'TVL, $',
    value: 'usd_balance',
    color: colors.cosmo,
    timeframe: 'hourly',
    group: 'tvl',
    type: 'currency',
  },
  {
    label: 'Users',
    labelMobile: 'Users',
    value: 'num_users',
    color: colors.blue,
    timeframe: 'daily',
    group: null,
    type: 'amount',
  },
  {
    label: 'Requests',
    labelMobile: 'Reqs',
    value: 'triggers_count',
    color: colors.teal,
    timeframe: 'daily',
    group: null,
    type: 'amount',
  },
];
