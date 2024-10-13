import {
  TPoint,
  TPath,
  IJustifyPerpendicularThreshold,
  IJustifyPerpendicularResult
} from '../../types';
import {
  parseJustifyPointPerpendicularThreshold
} from '../../util';
import {
  pathSegmentList
} from '../base';

import determineJustifiedPerpendicular from './_determine-justified-perpendicular';
import justifyPerpendicular4 from './justify-perpendicular-4';

export default function justifyPerpendicularExternal(point: TPoint, pivot: TPoint, paths: TPath[], threshold?: IJustifyPerpendicularThreshold | number): IJustifyPerpendicularResult | null {
  const {
    radius: thresholdRadius,
    angle: thresholdDegrees
  } = parseJustifyPointPerpendicularThreshold(threshold);
  
  return determineJustifiedPerpendicular(paths.reduce((result: (IJustifyPerpendicularResult | null)[], path) => {
    pathSegmentList(path).forEach(v => {
      result.push(justifyPerpendicular4(point, pivot, v, thresholdRadius, thresholdDegrees));
    });
    
    return result;
  }, []));
}
