import {
  polygon,
  featureCollection
} from '@turf/helpers';
import intersect from '@turf/intersect';
import {
  Path,
  roundCoords
} from '@kcuf/geometry-basic';

type TTurfPath = [Path]; // Turf 定义的 Path 极端诡异

interface IIntersectResult {
  geometry: {
    type: 'Polygon';
    coordinates: TTurfPath;
  } | {
    type: 'MultiPolygon';
    coordinates: TTurfPath[];
  };
}

function toTurfPolygonPath(path: Path): Path {
  const [p] = path;
  
  if (p) {
    return [...path, p];
  }
  
  return path;
}

// Turf 的 path 用的是「实体闭合」，最末一个和第一个相等
function fromTurfPolygonPath(path: Path | undefined): Path {
  return path?.reduce((result: Path, v, i) => {
    if (i < path.length - 1) { // 忽略最末一个
      result.push(roundCoords(v, 2));
    }
    
    return result;
  }, []) || [];
}

/**
 * TODO 这里引入了 turf（比较重），最好可以直接写出对应的逻辑
 *
 * 获取两个路径的交集路径（可能没有交集，也可能有多个交集）
 *
 * 注意：
 *
 * - Turf 的 polygon 要求第一个和最末一个点相同（手动闭合），且必须 4 个点以上（其实就是 3 个点）
 * - 结果可能是 null，或多个交集（存在凹多边形时）
 */
export default function getPolygonIntersectionPathList(polygon1: Path, polygon2: Path): Path[] {
  if (polygon1.length <= 2 || polygon2.length <= 2) {
    return [];
  }
  
  const poly1 = polygon([toTurfPolygonPath(polygon1)]);
  const poly2 = polygon([toTurfPolygonPath(polygon2)]);
  const intersection: IIntersectResult | null = intersect(featureCollection([poly1, poly2]));
  
  if (!intersection) {
    return [];
  }
  
  const {
    geometry
  } = intersection;
  
  if (geometry.type === 'MultiPolygon') {
    return geometry.coordinates.map(v => fromTurfPolygonPath(v[0]));
  }
  
  return geometry.coordinates.map(fromTurfPolygonPath);
}
