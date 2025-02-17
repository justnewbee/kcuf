/**
 * 笛卡尔积
 */
export default function cartesianProduct<X, Y>(arrX: X[], arrY: Y[]): [X, Y][] {
  const pairedArray: [X, Y][] = [];
  
  for (const x of arrX) {
    for (const y of arrY) {
      pairedArray.push([x, y]);
    }
  }
  
  return pairedArray;
}
