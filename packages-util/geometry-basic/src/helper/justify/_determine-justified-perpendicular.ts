import {
  IJustifyPerpendicularResult
} from '../../types';

export default function determineJustifiedPerpendicular(possibleResults: (IJustifyPerpendicularResult | null)[]): IJustifyPerpendicularResult | null {
  let result: IJustifyPerpendicularResult | null = null;
  
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