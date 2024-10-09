import {
  IJustifyPointPerpendicularThreshold,
  TPoint,
  TSegment
} from '../../types';
import {
  fromRadiansToDegrees,
  parseJustifyPointPerpendicularThreshold
} from '../../util';
import {
  pointDistance
} from '../base';
import {
  angleFromSegmentToSegment
} from '../relation';
import {
  rotatePoint
} from '../transform';

/**
 * 线段 A→B，点 C，当 A→B A→C 之间的夹角 θ 接近 90° 时（≤ threshold），返回点 C'，使 A→B A→C' 为直角
 *
 * A ⦿→-------◉ B
 *   | \  ↙
 *   |   \
 *   |  ↙ ◉ C
 *   ◉ C'
 */
export default function justifyPointPerpendicularToSegment(point: TPoint, segment: TSegment, threshold?: IJustifyPointPerpendicularThreshold | number): TPoint | null {
  const pivot = segment[0];
  const theta = angleFromSegmentToSegment(segment, [pivot, point]);
  const {
    angle,
    distance
  } = parseJustifyPointPerpendicularThreshold(threshold);
  
  for (const v of [
    Math.PI / 2,
    Math.PI / 2 * 3
  ]) {
    const deltaTheta = v - theta;
    const deltaThetaDegreesAbs = Math.abs(fromRadiansToDegrees(deltaTheta));
    
    if (deltaThetaDegreesAbs > 0 && deltaThetaDegreesAbs <= angle) {
      const justifiedPoint = rotatePoint(point, pivot, deltaTheta);
      
      if (distance <= 0 || pointDistance(justifiedPoint, point) <= distance) {
        return justifiedPoint;
      }
    }
  }
  
  return null;
}