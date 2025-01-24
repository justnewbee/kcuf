export default function limitIndex(index: number, max: number): number {
  if (index > max) {
    return max;
  }
  
  if (index < 0) {
    return 0;
  }
  
  return index;
}
