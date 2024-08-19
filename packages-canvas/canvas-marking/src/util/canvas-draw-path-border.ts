import {
  Path
} from '@kcuf/geometry-basic';

import {
  TLineJoin
} from '../types';

import canvasPathThroughPoints from './canvas-path-through-points';

interface ICanvasDrawLineOptions {
  width: number;
  color: string;
  lineJoin: TLineJoin;
  scale: number; // 需将 scale 反转过来，保证线在视觉上永远是绝对粗细
  close?: boolean;
}

/**
 * 根据路径画出边框，若 options.close 为 false，则最末一条将是虚线
 */
export default function canvasDrawPathBorder(canvasContext: CanvasRenderingContext2D, path: Path, options: ICanvasDrawLineOptions): void {
  if (path.length <= 1) {
    return;
  }
  
  const firstCoords = path[0];
  const lastCoords = path[path.length - 1];
  
  const {
    width,
    color,
    lineJoin,
    scale,
    close
  } = options;
  
  canvasContext.save();
  canvasContext.lineWidth = width / scale;
  canvasContext.strokeStyle = color;
  canvasContext.lineJoin = lineJoin;
  
  canvasPathThroughPoints(canvasContext, path, close);
  
  canvasContext.stroke();
  
  if (path.length > 2 && !close && firstCoords && lastCoords) { // 最末一条稍细虚线
    canvasContext.beginPath();
    canvasContext.lineWidth = width * 0.77 / scale;
    canvasContext.setLineDash([7 / scale, 5 / scale]);
    canvasContext.moveTo(lastCoords[0], lastCoords[1]);
    canvasContext.lineTo(firstCoords[0], firstCoords[1]);
    canvasContext.stroke();
  }
  
  canvasContext.restore();
}