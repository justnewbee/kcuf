import {
  TPoint,
  TLine,
  TLineNormalized
} from '../../types';
import {
  normalizeLine
} from '../base';

export default function parallelLineThroughPointToLine(point: TPoint, line: TLine): TLineNormalized {
  const [A, B] = line;
  const cPrime = -A * point[0] - B * point[1]; // C' = -(Ax + By);
  
  return normalizeLine([A, B, cPrime]);
}