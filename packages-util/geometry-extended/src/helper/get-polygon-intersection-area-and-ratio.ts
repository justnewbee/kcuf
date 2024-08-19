import {
  Path,
  getPathArea
} from '@kcuf/geometry-basic';

import getPolygonIntersectionArea from './get-polygon-intersection-area';

/**
 * 获取两个路径的交集路径的总面积，以及跟两个的分别占比
 */
export default function getPolygonIntersectionAreaAndRatio(polygon1: Path, polygon2: Path): [number, number, number] {
  const intersectionArea = getPolygonIntersectionArea(polygon1, polygon2);
  
  return [
    intersectionArea,
    intersectionArea > 0 ? intersectionArea / getPathArea(polygon1) : 0,
    intersectionArea > 0 ? intersectionArea / getPathArea(polygon2) : 0
  ];
}
