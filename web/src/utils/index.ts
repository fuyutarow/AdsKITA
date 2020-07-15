
export const head7 = (shouldbeString: any) => (shouldbeString as string).slice(0, 7);

export const formatNumber = (num: number): string => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
