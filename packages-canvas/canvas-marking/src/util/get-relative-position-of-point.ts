import {
  Point
} from '@kcuf/geometry-basic';

import {
  ERelativePosition
} from '../enum';
import {
  ISimpleRect
} from '../types';

/**
 * 检测点相对于面的位置
 *
 *    TL │          T          │ TR
 *   ────┼───────────────────┼───
 *     L │          C          │ R
 *    ───┼───────────────────┼───
 *    BL │          B          │ BR
 */
export default function getRelativePositionOfPoint(simpleRect: ISimpleRect, p: Point): ERelativePosition {
  const [x, y] = p;
  
  if (x < simpleRect.coords[0]) {
    if (y < simpleRect.coords[1]) {
      return ERelativePosition.TL;
    }
    
    if (y > simpleRect.coords[1] + simpleRect.size[1]) {
      return ERelativePosition.BL;
    }
    
    return ERelativePosition.L;
  }
  
  if (x > simpleRect.coords[0] + simpleRect.size[0]) {
    if (y < simpleRect.coords[1]) {
      return ERelativePosition.TR;
    }
    
    if (y > simpleRect.coords[1] + simpleRect.size[1]) {
      return ERelativePosition.BR;
    }
    
    return ERelativePosition.R;
  }
  
  if (y < simpleRect.coords[1]) {
    return ERelativePosition.T;
  }
  
  if (y > simpleRect.coords[1] + simpleRect.size[1]) {
    return ERelativePosition.B;
  }
  
  return ERelativePosition.C;
}
