import {
  Point
} from '@kcuf/geometry-basic';

import {
  ERelativePosition
} from '../enum';
import {
  ISimpleRect
} from '../types';

import getRelativePositionOfPoint from './get-relative-position-of-point';

export default function getRelativePositionOfArea(simpleRect: ISimpleRect, simpleRect2: ISimpleRect): ERelativePosition[] {
  const pointsOfRect2: Point[] = [
    simpleRect2.coords,
    [simpleRect2.coords[0] + simpleRect2.size[0], simpleRect2.coords[1]],
    [simpleRect2.coords[0] + simpleRect2.size[0], simpleRect2.coords[1] + simpleRect2.size[1]],
    [simpleRect2.coords[0], simpleRect2.coords[1] + simpleRect2.size[1]]
  ];
  const positions = pointsOfRect2.reduce((result: ERelativePosition[], v) => {
    const position = getRelativePositionOfPoint(simpleRect, v);
    
    if (!result.includes(position)) {
      result.push(position);
    }
    
    return result;
  }, []);
  
  if (positions.includes(ERelativePosition.TL) && positions.includes(ERelativePosition.BL)) {
    positions.push(ERelativePosition.L);
  }
  
  if (positions.includes(ERelativePosition.TL) && positions.includes(ERelativePosition.TR)) {
    positions.push(ERelativePosition.T);
  }
  
  if (positions.includes(ERelativePosition.TR) && positions.includes(ERelativePosition.BR)) {
    positions.push(ERelativePosition.R);
  }
  
  if (positions.includes(ERelativePosition.BL) && positions.includes(ERelativePosition.BR)) {
    positions.push(ERelativePosition.B);
  }
  
  return positions.sort();
}
