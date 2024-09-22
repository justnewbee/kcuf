import type {
  ISlsFlattenOptions
} from '../types';

export default function flattenShouldIgnore(ignore: ISlsFlattenOptions['ignore'], path: string, key: string, value: unknown): boolean {
  if (/^_/.test(key)) { // 默认不记录 _ 打头的所有数据
    return true;
  }
  
  if (!ignore) {
    return false;
  }
  
  if (typeof ignore === 'function') {
    return ignore(path, key, value);
  }
  
  if (Array.isArray(ignore)) {
    return ignore.includes(key);
  }
  
  return key === ignore;
}