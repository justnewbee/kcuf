/**
 * 将数组中的元素进行不重复的两两配对
 */
export default function pairwise<T>(arr: T[]): [T, T][] {
  const pairs: [T, T][] = [];
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      pairs.push([arr[i]!, arr[j]!]); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    }
  }
  
  return pairs;
}
