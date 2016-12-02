/**
 * Round value with a specific number of decimals
 */
export const round = (value, decimals = 2) => {
  const shifter = Math.pow(10, decimals);
  return Math.round(value * shifter) / shifter;
};