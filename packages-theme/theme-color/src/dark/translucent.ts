import {
  reverseColorLevels
} from '../util';
import {
  WHITE_A as WHITE_A_L,
  BLACK_A as BLACK_A_L
} from '../light';

export const WHITE_A = reverseColorLevels(WHITE_A_L);
export const BLACK_A = reverseColorLevels(BLACK_A_L);
