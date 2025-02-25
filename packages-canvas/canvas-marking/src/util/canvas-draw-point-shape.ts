import {
  Point
} from '@kcuf/geometry-basic';

import {
  TPointShape
} from '../types';

import canvasPathPointShape from './canvas-path-point-shape';

interface IDrawShapeOptions {
  shape: TPointShape;
  radius: number;
  lineWidth: number;
  lineColor: string;
  fillColor: string;
}

export default function canvasDrawPointShape(canvasContext: CanvasRenderingContext2D, center: Point, options: IDrawShapeOptions): void {
  const {
    shape,
    radius,
    lineWidth,
    lineColor,
    fillColor
  } = options;
  
  if (canvasPathPointShape(canvasContext, center, radius, shape)) {
    canvasContext.save();
    
    canvasContext.lineWidth = lineWidth;
    canvasContext.strokeStyle = lineColor;
    canvasContext.fillStyle = fillColor;
    
    canvasContext.fill();
    canvasContext.stroke();
    canvasContext.restore();
  }
}
