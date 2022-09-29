export const isProd = process.env.REACT_APP_PRODUCTION === 'true';
export const baseUrl = process.env.REACT_APP_BASE_URL || '';
export const apiKey = process.env.REACT_APP_API_KEY || '';
export const coinIcon = process.env.REACT_APP_CDN_ICONS_KEY || '';
export const GA_MEASUREMENT_ID = process.env.REACT_APP_GA4_ID || '';

export const crutchCors = [
  '/liquidity-providers-distribution.json',
  '/odex.json',
  '/pool-v2.json',
  '/pool.json',
  '/v1-v2-arb.json',
  '/factory.json',
  '/desc.json',
];
