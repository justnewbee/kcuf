import {
  Path
} from '@kcuf/geometry-basic';

import {
  IDrawBorderOptions
} from '../types';

import canvasPathThroughPoints from './canvas-path-through-points';

/**
 * 根据路径画出边框，若 options.close 为 false，则最末一条将是虚线
 */
export default function canvasDrawPathBorder(canvasContext: CanvasRenderingContext2D, path: Path, options: IDrawBorderOptions): void {
  if (path.length <= 1) {
    return;
  }
  
  const {
    width,
    color,
    lineJoin,
    scale,
    close
  } = options;
  const point1st = path[0];
  const pointLast = path[path.length - 1];
  
  canvasContext.save();
  canvasContext.lineWidth = width / scale;
  canvasContext.strokeStyle = color;
  canvasContext.lineJoin = lineJoin;
  
  canvasPathThroughPoints(canvasContext, path, close);
  
  canvasContext.stroke();
  
  if (path.length > 2 && !close && point1st && pointLast) { // 最末一条稍细虚线
    canvasContext.beginPath();
    canvasContext.lineWidth = width * 0.77 / scale;
    canvasContext.setLineDash([7 / scale, 5 / scale]);
    canvasContext.moveTo(pointLast[0], pointLast[1]);
    canvasContext.lineTo(point1st[0], point1st[1]);
    canvasContext.stroke();
  }
  
  canvasContext.restore();
}
