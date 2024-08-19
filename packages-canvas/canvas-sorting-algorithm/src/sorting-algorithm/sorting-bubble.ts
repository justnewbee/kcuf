export default function sortingBubble<T>(arr: T[], getCompareValue?: (v: T) => never): T[] {
  const n = arr.length;
  let i: number;
  let j: number;
  
  for (i = n - 1; i >= 0; i--) {
    for (j = 0; j < i; j++) {
      const value = arr[j]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
      const valueNext = arr[j + 1]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
      const compareValue = getCompareValue ? getCompareValue(value) : value;
      const compareValueNext = getCompareValue ? getCompareValue(valueNext) : valueNext;
      
      if (compareValue > compareValueNext) {
        [arr[i], arr[j + 1]] = [valueNext, value];
      }
    }
  }
  
  return arr;
}