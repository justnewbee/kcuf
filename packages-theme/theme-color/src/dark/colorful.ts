import {
  reverseColorLevels
} from '../util';
import {
  RED as RED_L,
  ORANGE as ORANGE_L,
  YELLOW as YELLOW_L,
  GREEN as GREEN_L,
  BLUE as BLUE_L,
  INDIGO as INDIGO_L,
  PURPLE as PURPLE_L
} from '../light';

export const RED = reverseColorLevels(RED_L);
export const ORANGE = reverseColorLevels(ORANGE_L);
export const YELLOW = reverseColorLevels(YELLOW_L);
export const GREEN = reverseColorLevels(GREEN_L);
export const BLUE = reverseColorLevels(BLUE_L);
export const INDIGO = reverseColorLevels(INDIGO_L);
export const PURPLE = reverseColorLevels(PURPLE_L);
