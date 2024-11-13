import {
  TCoords
} from '../types';

function getRadiusInner(points: number, radiusOuter: number): number {
  switch (points) {
  case 4:
    return radiusOuter * 0.35;
  case 5:
    return radiusOuter * 0.382;
  case 6:
    return radiusOuter * 0.577;
  default:
    return radiusOuter * 0.68;
  }
}

export default function pathStar(canvasContext: CanvasRenderingContext2D, points: number, center: TCoords, radiusOuter: number, radiusInner = getRadiusInner(points, radiusOuter)): void {
  const step = Math.PI / points;
  
  canvasContext.beginPath();
  
  canvasContext.moveTo(center[0] + radiusOuter * Math.cos(-Math.PI / 2), center[1] + radiusOuter * Math.sin(-Math.PI / 2));
  
  for (let i = 1; i <= 2 * points; i++) {
    const angle = step * i - Math.PI / 2;
    const radius = i % 2 === 0 ? radiusOuter : radiusInner;
    
    canvasContext.lineTo(center[0] + radius * Math.cos(angle), center[1] + radius * Math.sin(angle));
  }
  
  canvasContext.closePath();
}
