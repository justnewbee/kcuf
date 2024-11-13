import {
  TCoords
} from '../types';

import calculateDistances from './calculate-distances';

export default function calculateDistance(coords1: TCoords, coords2: TCoords): number {
  return calculateDistances(coords1, coords2)[0];
}
