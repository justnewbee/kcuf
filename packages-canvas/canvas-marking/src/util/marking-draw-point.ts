import {
  Point
} from '@kcuf/geometry-basic';

import {
  TMarkingPointStyleResolved
} from '../types';

import canvasDrawShape from './canvas-draw-shape';

export default function markingDrawPoint(canvasContext: CanvasRenderingContext2D, point: Point, pointStyle: TMarkingPointStyleResolved, scale: number): void {
  canvasDrawShape(canvasContext, point, {
    type: pointStyle.type,
    radius: pointStyle.radius,
    lineWidth: pointStyle.lineWidth,
    lineColor: pointStyle.lineColor,
    fillColor: pointStyle.fillColor,
    scale
  });
}