import {
  Segment,
  Angle,
  isNearlyEqual,
  segmentLength,
  segmentVectorNormalized,
  angleDegrees,
  angleBisector,
  translatePoint,
  multiplyVectorByScalar
} from '@kcuf/geometry-basic';

import {
  IDrawPerpendicularMarkOptions
} from '../types';

export default function canvasDrawPerpendicularMark(canvasContext: CanvasRenderingContext2D, angle: Angle, options: IDrawPerpendicularMarkOptions): void {
  if (!isNearlyEqual(angleDegrees(angle, true), 90, 1e-3)) {
    return;
  }
  
  const size = options.size / options.scale;
  const segment1: Segment = [angle[1], angle[0]];
  const segment2: Segment = [angle[1], angle[2]];
  
  if (segmentLength(segment1) <= size || segmentLength(segment2) <= size) {
    return;
  }
  
  const v1 = segmentVectorNormalized(segment1);
  const v2 = segmentVectorNormalized(segment2);
  const v = angleBisector(angle);
  const p1 = translatePoint(angle[1], multiplyVectorByScalar(v1, size));
  const p2 = translatePoint(angle[1], multiplyVectorByScalar(v2, size));
  const p = translatePoint(angle[1], multiplyVectorByScalar(v, size * Math.sqrt(2)));
  
  canvasContext.save();
  canvasContext.lineWidth = 1 / options.scale;
  canvasContext.strokeStyle = options.color;
  
  canvasContext.beginPath();
  canvasContext.moveTo(p1[0], p1[1]);
  canvasContext.lineTo(p[0], p[1]);
  canvasContext.lineTo(p2[0], p2[1]);
  
  canvasContext.stroke();
}
