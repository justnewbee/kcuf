import {
  IPathStarOptions
} from '../types';
import {
  createPathFn,
  getDefaultInnerRadiusRatio
} from '../util';

function pathStar(canvasContext: CanvasRenderingContext2D, options: IPathStarOptions): void {
  const {
    center,
    radius: radiusOuter,
    vertices,
    innerRatio = getDefaultInnerRadiusRatio(vertices)
  } = options;
  const radiusInner = radiusOuter * innerRatio;
  const step = Math.PI / vertices;
  
  canvasContext.beginPath();
  canvasContext.moveTo(center[0] + radiusOuter * Math.cos(-Math.PI / 2), center[1] + radiusOuter * Math.sin(-Math.PI / 2));
  
  for (let i = 1; i <= 2 * vertices; i++) {
    const angle = step * i - Math.PI / 2;
    const radius = i % 2 === 0 ? radiusOuter : radiusInner;
    
    canvasContext.lineTo(center[0] + radius * Math.cos(angle), center[1] + radius * Math.sin(angle));
  }
  
  canvasContext.closePath();
}

export default createPathFn(pathStar);
