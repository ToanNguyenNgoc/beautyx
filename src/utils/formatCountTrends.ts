
export const formatCountTrends = (number: number | string) => {
  let strToNum = typeof (number) !== 'number' ? +number : number
  if (!number) {
    return 0;
  } else if (strToNum >= 1000000000) {
    return (strToNum / 1000000000).toFixed(1) + "B";
  } else if (strToNum >= 1000000) {
    return (strToNum / 1000000).toFixed(1) + "M";
  } else if (strToNum >= 1000) {
    return (strToNum / 1000).toFixed(0) + "K";
  } else if (strToNum < 10) {
    return strToNum;
  } else {
    return strToNum;
  }
}