import {
  Path
} from '@kcuf/geometry-basic';

import {
  TBorderLineJoin
} from '../types';

import canvasPathThroughPoints from './canvas-path-through-points';

interface IDrawPathBorderOptions {
  scale: number; // 需将 scale 反转过来，保证线在视觉上永远是绝对粗细
  width: number;
  color: string;
  lineJoin: TBorderLineJoin;
  lineDash?: number[];
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  close?: boolean;
}

/**
 * 根据路径画出边框，若 `options.close` 为 `false`，则最末一条将是虚线
 */
export default function canvasDrawPathBorder(canvasContext: CanvasRenderingContext2D, path: Path, options: IDrawPathBorderOptions): void {
  if (path.length <= 1) {
    return;
  }
  
  const point1st = path[0];
  const pointLast = path[path.length - 1];
  const lineWidth = options.width / options.scale;
  
  canvasContext.save();
  canvasContext.lineWidth = lineWidth;
  canvasContext.strokeStyle = options.color;
  canvasContext.lineJoin = options.lineJoin;
  
  if (options.lineDash?.length) {
    canvasContext.setLineDash(options.lineDash.map(v => v / options.scale));
  }
  
  if (options.shadowColor) {
    canvasContext.shadowColor = options.shadowColor;
    canvasContext.shadowBlur = (options.shadowBlur ?? 0) * options.scale;
    canvasContext.shadowOffsetX = (options.shadowOffsetX ?? 0) * options.scale;
    canvasContext.shadowOffsetY = (options.shadowOffsetY ?? 0) * options.scale;
  }
  
  canvasPathThroughPoints(canvasContext, path, options.close);
  
  canvasContext.stroke();
  
  if (path.length > 2 && !options.close && point1st && pointLast) { // 最末一条稍细虚线
    canvasContext.lineWidth = lineWidth * 0.66;
    canvasContext.setLineDash([7 / options.scale, 5 / options.scale]);
    
    canvasContext.beginPath();
    canvasContext.moveTo(pointLast[0], pointLast[1]);
    canvasContext.lineTo(point1st[0], point1st[1]);
    canvasContext.stroke();
  }
  
  canvasContext.restore();
}
