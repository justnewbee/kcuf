import {
  IPathPolygonOptions
} from '../types';
import {
  createPathFn
} from '../util';

/**
 * 凸多边形
 */
function pathPolygon(canvasContext: CanvasRenderingContext2D, options: IPathPolygonOptions): void {
  const {
    center,
    radius,
    vertices
  } = options;
  
  canvasContext.beginPath();
  
  const radianStep = 2 * Math.PI / vertices; // 每个角的弧度
  let angle = -Math.PI / 2 + (vertices > 4 && vertices % 2 === 0 ? radianStep / 2 : 0); // 除菱形外，保证底部水平
  
  function getX(): number {
    return center[0] + radius * Math.cos(angle);
  }
  
  function getY(): number {
    return center[1] + radius * Math.sin(angle);
  }
  
  canvasContext.moveTo(getX(), getY());
  
  for (let i = 1; i <= vertices; i++) {
    angle += radianStep;
    
    canvasContext.lineTo(getX(), getY());
  }
  
  canvasContext.closePath();
}

export default createPathFn(pathPolygon);
