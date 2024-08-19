export default function compareValues<T>(v1: T, v2: T, getCompareValue?: (v: T) => never): -1 | 0 | 1 {
  const compareValue1 = getCompareValue ? getCompareValue(v1) : v1;
  const compareValue2 = getCompareValue ? getCompareValue(v2) : v2;
  
  if (compareValue1 > compareValue2) {
    return 1;
  }
  
  if (compareValue1 < compareValue2) {
    return -1;
  }
  
  return 0;
}