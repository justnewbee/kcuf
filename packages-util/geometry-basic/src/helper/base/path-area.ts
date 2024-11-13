import {
  TPath
} from '../../types';

/**
 * 获取路径围成的多边形面积，使用高斯面积公式（鞋带 Shoelace 公式）
 */
export default function pathArea(path: TPath): number {
  return path.length > 2 ? Math.abs(path.reduce((result, v, i) => {
    const p = i === 0 ? path[path.length - 1]! : path[i - 1]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    
    return result + (p[0] - v[0]) * (v[1] + p[1]);
  }, 0) / 2) : 0;
}
