import mergingGlobal from './merging-global';
import mergingGet from './merging-get';

export default function mergingRemove(key: string): void {
  const queue = mergingGet(key);
  
  if (!queue) {
    return;
  }
  
  const o = mergingGlobal();
  
  delete o[key]; // eslint-disable-line @typescript-eslint/no-dynamic-delete
}
