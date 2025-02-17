import {
  TPath,
  TBbox
} from '../../types';

/**
 * 获取路径围成的多边形的外接正向矩形，作为最小边界（移动整体的时候可用来作边界碰撞检测）
 */
export default function pathBbox(path: TPath): TBbox {
  if (path.length <= 0) {
    return [
      [0, 0],
      [0, 0]
    ];
  }
  
  if (path.length === 1) {
    return [path[0]!, path[0]!]; // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }
  
  let xMin = Infinity;
  let yMin = Infinity;
  let xMax = -Infinity;
  let yMax = -Infinity;
  
  path.forEach(([x, y]) => {
    if (x < xMin) {
      xMin = x;
    }
    
    if (x > xMax) {
      xMax = x;
    }
    
    if (y < yMin) {
      yMin = y;
    }
    
    if (y > yMax) {
      yMax = y;
    }
  });
  
  return [
    [xMin, yMin],
    [xMax, yMax]
  ];
}
