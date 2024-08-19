import {
  Point
} from '@kcuf/geometry-basic';

import {
  TMarkingPointStyleResolved
} from '../types';

import canvasDrawShape from './canvas-draw-shape';

export default function markingDrawInsertionPoint(canvasContext: CanvasRenderingContext2D, point: Point, pointStyle: TMarkingPointStyleResolved, scale: number): void {
  canvasDrawShape(canvasContext, point, {
    type: pointStyle.typeMiddle,
    radius: pointStyle.radius,
    lineWidth: pointStyle.lineWidth * 0.75,
    // 注意这里会调换顺序
    lineColor: pointStyle.fillColor,
    fillColor: pointStyle.lineColor,
    scale
  });
}