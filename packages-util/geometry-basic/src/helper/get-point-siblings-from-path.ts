import {
  TPath,
  TPoint
} from '../types';

export default function getPointSiblingsFromPath(path: TPath, index: number): [] | [TPoint] | [TPoint, TPoint] {
  const first = path[0];
  const last = path[path.length - 1];
  
  // index 超出路径范围，或路径长度小于等于 1，返回空
  if (index < 0 || path.length <= index || !(first && last) || first === last) {
    return [];
  }
  
  // 只有两个点，返回一个
  if (path.length === 2) {
    return [index === 1 ? first : last];
  }
  
  return [path[index - 1] || last, path[index + 1] || first];
}