export default function walkBetweenArray<T>(arr: T[], walker: (o1: T, o2: T) => void): void {
  const len = arr.length;
  
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      walker(arr[i]!, arr[j]!);
    }
  }
}
