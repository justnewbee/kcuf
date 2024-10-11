import {
  IJustifyPointPerpendicularDetailed
} from '../../types';

export default function determineJustifiedPerpendicular(
    justified1: IJustifyPointPerpendicularDetailed | null,
    justified2: IJustifyPointPerpendicularDetailed | null
): IJustifyPointPerpendicularDetailed | null {
  if (!justified1 || !justified2) {
    return justified1 || justified2;
  }
  
  if (justified1.distance === justified2.distance) {
    return justified1.theta <= justified2.theta ? justified1 : justified2;
  }
  
  return justified1.distance < justified2.distance ? justified1 : justified2;
}