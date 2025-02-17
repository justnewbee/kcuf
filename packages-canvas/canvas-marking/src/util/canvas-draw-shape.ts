import {
  Point
} from '@kcuf/geometry-basic';

import {
  TPointType
} from '../types';

import canvasPathPointShape from './canvas-path-point-shape';

interface IDrawShapeOptions {
  type: TPointType;
  radius: number;
  lineWidth: number;
  lineColor: string;
  fillColor: string;
  scale: number;
}

export default function canvasDrawShape(canvasContext: CanvasRenderingContext2D, center: Point, options: IDrawShapeOptions): void {
  const {
    type,
    radius,
    lineWidth,
    lineColor,
    fillColor,
    scale
  } = options;
  
  if (canvasPathPointShape(canvasContext, center, radius / scale, type)) {
    canvasContext.save();
    
    canvasContext.lineWidth = lineWidth / scale;
    canvasContext.strokeStyle = lineColor;
    canvasContext.fillStyle = fillColor;
    
    canvasContext.fill();
    canvasContext.stroke();
    canvasContext.restore();
  }
}
