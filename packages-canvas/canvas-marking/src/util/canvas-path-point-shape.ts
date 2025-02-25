import {
  Point
} from '@kcuf/geometry-basic';
import {
  pathCross,
  pathCircle,
  pathTriangle,
  pathSquare,
  pathPentagon,
  pathHexagon,
  pathDiamond,
  pathStar
} from '@kcuf/canvas-helper';

import {
  TPointShape
} from '../types';

export default function canvasPathPointShape(canvasContext: CanvasRenderingContext2D, center: Point, radius: number, type: TPointShape): boolean {
  switch (type) {
  case 'cross':
    pathCross(canvasContext, {
      center,
      radius
    });
    
    return true;
  case 'circle':
    pathCircle(canvasContext, {
      center,
      radius
    });
    
    return true;
  case 'triangle':
    pathTriangle(canvasContext, {
      center,
      radius
    });
    
    return true;
  case 'square':
    pathSquare(canvasContext, {
      center,
      radius
    });
    
    return true;
  case 'pentagon':
    pathPentagon(canvasContext, {
      center,
      radius
    });
    
    return true;
  case 'hexagon':
    pathHexagon(canvasContext, {
      center,
      radius
    });
    
    return true;
  case 'diamond':
    pathDiamond(canvasContext, {
      center,
      radius
    });
    
    return true;
  case 'star':
    pathStar(canvasContext, {
      center,
      radius,
      vertices: 5
    });
    
    return true;
  default:
    return false;
  }
}
