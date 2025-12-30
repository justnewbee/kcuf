import {
  TFindPredicate
} from '../types';

import findIndex from './find-index';

export default function afterListUpdate<T>(list: T[], o: T, predicate?: TFindPredicate<T>): void {
  const index = findIndex(list, o, predicate);
  
  if (index >= 0) {
    list.splice(index, 1, o);
  }
}
