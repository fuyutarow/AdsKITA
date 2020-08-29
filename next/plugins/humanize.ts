
export const humanizeJapanizeInt = (num: number): string => {
  const keta = ['', '万', '億', '兆', '京'];
  const nums = String(Math.floor(num)).replace(/(\d)(?=(\d\d\d\d)+$)/g, '$1,').split(',').reverse();
  let data = '';
  for (let i = 0; i < nums.length; i++) {
    if (!nums[i].match(/^[0]+$/)) {
      data = nums[i].replace(/^[0]+/g, '') + keta[i] + data;
    }
  }
  return data;
};
