import mergingGlobal from './merging-global';

export default function mergingAdd(key: string): void {
  const o = mergingGlobal();
  
  o[key] = [];
}
