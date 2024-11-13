import {
  IJustifyResultBase
} from '../../types';

export default function determineJustifiedResult<T extends IJustifyResultBase>(possibleResults: (T | null)[]): T | null {
  let result: T | null = null;
  
  possibleResults.forEach(v => {
    if (!v) {
      return;
    }
    
    if (!result || v.distance < result.distance || (v.distance === result.distance && v.theta < result.theta)) {
      result = v;
    }
  });
  
  return result;
}
