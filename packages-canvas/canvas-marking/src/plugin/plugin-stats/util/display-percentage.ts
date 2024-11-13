export default function displayPercentage(n: number): string {
  const [i, f0] = (n * 100).toFixed(2).split('.') as [string, string];
  const f = f0.replace(/0+$/, '');
  
  return f ? `${i}.${f}%` : `${i}%`;
}
