import {
  TPath,
  TAngle
} from '../../types';

/**
 * 路径上所有角列表，只有 3 个顶点及以上才会有
 */
export default function pathAngleList(path: TPath): TAngle[] {
  const first = path[0];
  const last = path[path.length - 1];
  
  if (!first || !last || path.length < 3) {
    return [];
  }
  
  let prev = last;
  
  return path.reduce((result: TAngle[], v, i) => {
    result.push([prev, v, path[i + 1] || first]);
    
    prev = v;
    
    return result;
  }, []);
}
