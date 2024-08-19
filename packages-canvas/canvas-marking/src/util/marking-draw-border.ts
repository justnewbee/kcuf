import {
  Path
} from '@kcuf/geometry-basic';

import {
  TMarkingBorderStyleResolved
} from '../types';

import canvasDrawPathBorder from './canvas-draw-path-border';

export default function markingDrawBorder(canvasContext: CanvasRenderingContext2D, path: Path, borderStyle: TMarkingBorderStyleResolved, scale: number, close?: boolean): void {
  // 如果有外线宽度差，则先渲染外线，这样会形成一条带边框的线
  if (borderStyle.outerWidth > 0) {
    canvasDrawPathBorder(canvasContext, path, {
      width: borderStyle.width + borderStyle.outerWidth * 2,
      color: borderStyle.outerColor,
      lineJoin: borderStyle.lineJoin,
      scale,
      close
    });
  }
  
  canvasDrawPathBorder(canvasContext, path, {
    width: borderStyle.width,
    color: borderStyle.color,
    lineJoin: borderStyle.lineJoin,
    scale,
    close
  });
}