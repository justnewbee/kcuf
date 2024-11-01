import {
  TCoords
} from '../types';

/**
 * 多边形
 */
export default function pathPolygon(canvasContext: CanvasRenderingContext2D, sides: number, center: TCoords, radius: number, rotation = 0): void {
  canvasContext.beginPath();
  
  const radianStep = 2 * Math.PI / sides; // 每个角的弧度
  let angle = -Math.PI / 2 + rotation; // 起始角度，默认从正上方的顶点开始绘制
  
  function getX(): number {
    return center[0] + radius * Math.cos(angle);
  }
  
  function getY(): number {
    return center[1] + radius * Math.sin(angle);
  }
  
  canvasContext.moveTo(getX(), getY());
  
  for (let i = 1; i <= sides; i++) {
    angle += radianStep;
    
    canvasContext.lineTo(getX(), getY());
  }
  
  canvasContext.closePath();
}