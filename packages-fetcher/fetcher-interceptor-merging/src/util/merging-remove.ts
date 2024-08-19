import mergingGlobal from './merging-global';
import mergingGet from './merging-get';

export default function mergingRemove(key: string): void {
  const queue = mergingGet(key);
  
  if (!queue) {
    return;
  }
  
  const o = mergingGlobal();
  
  o[key] = null as any;
  delete o[key];
}
