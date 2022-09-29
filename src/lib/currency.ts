import { shortenNumber } from './shortenNumber';

export const usd = (
  value: number,
  fraction?: number,
  shorten?: boolean
): string => {
  if (shorten) {
    if (value >= 0) {
      return `$${shortenNumber(value, fraction != null ? fraction : 2)}`;
    }
    if (value < 0) {
      return `-$${shortenNumber(
        Math.abs(value),
        fraction != null ? fraction : 2
      )}`;
    }
  }
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fraction || 0,
    maximumFractionDigits: fraction || 0,
  });
};
