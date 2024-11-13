export default function randomArrayItem<T>(arr: T[]): T | undefined {
  return arr[Math.floor(Math.random() * arr.length)];
}
