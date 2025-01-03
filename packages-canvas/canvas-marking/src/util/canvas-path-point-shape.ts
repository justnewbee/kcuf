import {
  Point
} from '@kcuf/geometry-basic';
import {
  pathCircle,
  pathSquare
} from '@kcuf/canvas-helper';

import {
  TPointType
} from '../types';

export default function canvasPathPointShape(canvasContext: CanvasRenderingContext2D, center: Point, radius: number, type: TPointType): boolean {
  switch (type) {
  case 'circle':
    pathCircle(canvasContext, {
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
  default:
    return false;
  }
}
