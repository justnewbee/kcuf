import {
  TLine
} from '../../types';

/**
 * 直线夹角，[0, π/2]
 */
export default function angleBetweenLines(line1: TLine, line2: TLine): number {
  const [A1, B1] = line1;
  const [A2, B2] = line2;
  const cosTheta = (A1 * A2 + B1 * B2) / Math.sqrt((A1 * A1 + B1 * B1) * (A2 * A2 + B2 * B2));
  
  return Math.acos(cosTheta); // 0-π/2
}
