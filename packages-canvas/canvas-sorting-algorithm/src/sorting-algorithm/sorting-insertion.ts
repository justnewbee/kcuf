export default function sortingInsertion<T>(arr: T[], getCompareValue?: (v: T) => never): T[] {
  const n = arr.length;
  let i: number;
  let j: number;
  
  for (i = 1; i < n; i++) {
    
    
    for (j = i; j >= 0 && arr[j] < arr[j - 1]; j--) {
      _swap(arr, j - 1, j);
    }
  }
  
  console.info(arr);
}