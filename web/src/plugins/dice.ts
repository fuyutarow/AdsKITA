export const pickFromArray = <T, Rate extends keyof T>(arr: Array<T>, rateKey: Rate): T | null => {
  const breakpoint = Math.random();

  let sum = 0;
  for (const element of arr) {
    const rate = element[rateKey] as any as number;
    sum += rate;
    if (sum > breakpoint) {
      return element;
    }
  }
  return null;
};
