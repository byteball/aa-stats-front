export const round10 = (n: number, hundred?: boolean): number => {
  let abs = 1;
  if (n < 0) abs = -1;
  const l = `${Math.abs(n)}`.length;
  // eslint-disable-next-line no-nested-ternary
  const fixL = hundred ? l - 1 : l < 5 ? 4 : l - 1;
  const arg = +'1'.padEnd(fixL, '0');
  return Math.ceil(Math.abs(n) / arg) * arg * abs;
};
