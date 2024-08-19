import {
  Path,
  getPathArea
} from '@kcuf/geometry-basic';

import getPolygonIntersectionPathList from './get-polygon-intersection-path-list';

/**
 * 获取两个路径的交集路径的总面积
 */
export default function getPolygonIntersectionArea(polygon1: Path, polygon2: Path): number {
  const intersectionPathList = getPolygonIntersectionPathList(polygon1, polygon2);
  
  return intersectionPathList.reduce((result, v) => result + getPathArea(v), 0);
}
