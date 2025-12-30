import {
  TFindPredicate
} from '../types';

export default function findIndex<T>(list: T[], o: T, predicate?: TFindPredicate<T>): number {
  return list.findIndex(v => {
    if (!predicate) {
      return v === o;
    }
    
    if (typeof predicate === 'function') {
      return predicate(v);
    }
    
    return v[predicate] === o[predicate];
  });
}
