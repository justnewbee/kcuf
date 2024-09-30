import {
  TPoint,
  TSegment
} from '../../types';
import {
  fromRadiansToDegrees
} from '../../util';
import {
  angleFromSegmentToSegment
} from '../relation';
import {
  rotatePoint
} from '../transform';

interface IOptions {
  threshold?: number;
  equidistant?: boolean; // 默认等距旋转
}

function resolveOptions(arg?: number | boolean | IOptions): Required<IOptions> {
  const options: Required<IOptions> = {
    threshold: 5,
    equidistant: true
  };
  
  if (typeof arg === 'number') {
    options.threshold = arg;
  } else if (typeof arg === 'boolean') {
    options.equidistant = arg;
  } else if (arg) {
    options.threshold = arg.threshold ?? options.threshold;
    options.equidistant = arg.equidistant ?? options.equidistant;
  }
  
  return options;
}

function needRotate(deltaTheta: number, threshold: number): boolean {
  const deltaThetaDegreesAbs = Math.abs(fromRadiansToDegrees(deltaTheta));
  
  return deltaThetaDegreesAbs > 0 && deltaThetaDegreesAbs <= threshold;
}

/**
 * 线段 A→B，点 C，当 A→B A→C 之间的夹角 θ 接近 90° 时（≤ threshold），返回点 C'，使 A→B A→C' 为直角
 *
 * 1. `equidistant: true`，则等距旋转，模 |AC| === |AC'|
 *
 * A ⦿→-------◉ B
 *   | \  ↙ 0 < | 90° - θ | ≤ threshold
 *   |   \
 *   |    ◉ C
 *   ◉ C'
 *
 * 2. `equidistant: false`，则返回垂足，模 |AC| > |AC'|
 *
 * A ⦿→-------◉ B
 *   | \  ↙ 0 < | 90° - θ | ≤ threshold
 *   |   \
 *   ◉ C' ◉ C
 */
export default function pointJustifyRightAngle(point: TPoint, segment: TSegment, optionsArg = 5): TPoint | null {
  const {
    threshold
    // equidistant
  } = resolveOptions(optionsArg);
  const sharedPoint = segment[0];
  
  const theta = angleFromSegmentToSegment(segment, [sharedPoint, point]);
  let deltaTheta = Math.PI / 2 - theta;
  
  if (needRotate(deltaTheta, threshold)) {
    return rotatePoint(point, sharedPoint, deltaTheta);
  }
  
  deltaTheta = 3 * Math.PI / 2 - theta;
  
  if (needRotate(deltaTheta, threshold)) {
    return rotatePoint(point, sharedPoint, deltaTheta);
  }
  
  return null;
}