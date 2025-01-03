export default function getDefaultInnerRadiusRatio(vertices: number): number {
  if (vertices <= 3) {
    return 0.2;
  }
  
  if (vertices <= 4) {
    return 0.35;
  }
  
  return Math.cos(Math.PI * 2 / vertices) / Math.cos(Math.PI / vertices);
}
