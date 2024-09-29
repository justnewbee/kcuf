import {
  TPath
} from '../../types';
import {
  pathBbox,
  pathCentroid
} from '../base';

import comparePoints from './compare-points';

function compareByBox(path1: TPath, path2: TPath): number {
  const [[xMin1, yMin1], [xMax1, yMax1]] = pathBbox(path1);
  const [[xMin2, yMin2], [xMax2, yMax2]] = pathBbox(path2);
  const cx1 = (xMin1 + xMax1) * 0.5;
  const cy1 = (yMin1 + yMax1) * 0.5;
  const cx2 = (xMin2 + xMax2) * 0.5;
  const cy2 = (yMin2 + yMax2) * 0.5;
  
  if (cx1 !== cx2) {
    return cx1 - cx2;
  }
  
  if (cy1 !== cy2) {
    return cy1 - cy2;
  }
  
  return xMin1 !== xMin2 ? xMin1 - xMin2 : yMin1 - yMin2;
}

export default function comparePaths(path1: TPath, path2: TPath): number {
  const centroid1 = pathCentroid(path1);
  const centroid2 = pathCentroid(path2);
  
  if (centroid1 && centroid2) {
    const result = comparePoints(centroid1, centroid2);
    
    if (result !== 0) {
      return result;
    }
  }
  
  if (centroid1) {
    return -1;
  }
  
  if (centroid2) {
    return 1;
  }
  
  return compareByBox(path1, path2);
}