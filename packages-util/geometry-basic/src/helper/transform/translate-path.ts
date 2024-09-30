import {
  TPath
} from '../../types';

import translatePoint from './translate-point';

export default function translatePath(path: TPath, dxy: [number, number]): TPath {
  return path.map(v => translatePoint(v, dxy));
}