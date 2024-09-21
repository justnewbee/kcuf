import type {
  IShouldIgnore
} from '../types';

export default function mergeShouldIgnore(factoryShouldIgnore?: IShouldIgnore, shouldIgnore?: IShouldIgnore): IShouldIgnore | undefined {
  if (!factoryShouldIgnore || !shouldIgnore) {
    return shouldIgnore || factoryShouldIgnore;
  }
  
  return (): boolean | void => factoryShouldIgnore() || shouldIgnore();
}