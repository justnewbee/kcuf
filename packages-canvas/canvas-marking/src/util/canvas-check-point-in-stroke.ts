import {
  Point,
  Path
} from '@kcuf/geometry-basic';

import canvasPathThroughPoints from './canvas-path-through-points';

/**
 * 点是否在线上
 *
 * 由于「线」在数学上是没有宽度的，用数学的方式很难在实际上生效（需要非常精确），但实际上，canvas 中线是有宽度的，
 * 所以用 `isPointInStroke` 比较适合
 */
export default function canvasCheckPointInStroke(canvasContext: CanvasRenderingContext2D, point: Point, path: Path, lineWidth = 1): boolean {
  const [x, y] = point;
  
  canvasContext.save();
  canvasContext.lineWidth = lineWidth;
  
  canvasPathThroughPoints(canvasContext, path, true);
  
  // 开发的时候经常由于代码热加载导致 `isPointInStroke` 报错「Argument 1 is not a finite floating-point value.」
  const inStroke = isFinite(x) && isFinite(y) ? canvasContext.isPointInStroke(x, y) : false;
  
  canvasContext.restore();
  
  return inStroke;
}
