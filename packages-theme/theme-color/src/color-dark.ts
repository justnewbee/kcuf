import {
  THsl,
  TColorLevels
} from './types';
import {
  GRAY_0 as GRAY_0_L,
  GRAY_12 as GRAY_12_L,
  SLATE as SLATE_L,
  ZINC as ZINC_L,
  STONE as STONE_L,
  RED as RED_L,
  ORANGE as ORANGE_L,
  YELLOW as YELLOW_L,
  GREEN as GREEN_L,
  BLUE as BLUE_L,
  INDIGO as INDIGO_L,
  VIOLET as VIOLET_L,
  PURPLE as PURPLE_L,
  WHITE_A as WHITE_A_L,
  BLACK_A as BLACK_A_L
} from './color';
import {
  reverseColorLevels
} from './util';

export const GRAY_0: THsl = GRAY_12_L;
export const GRAY_12: THsl = GRAY_0_L;

// 灰色不适合简单反转
export const GRAY: TColorLevels = [
  'hsl(0 0% 10%)',
  'hsl(0 0% 13%)',
  'hsl(0 0% 16%)',
  'hsl(0 0% 19%)',
  'hsl(0 0% 23%)',
  'hsl(0 0% 28%)',
  'hsl(0 0% 38%)',
  'hsl(0 0% 43%)',
  'hsl(0 0% 48%)',
  'hsl(0 0% 71%)',
  'hsl(0 0% 93%)'
];

export const SLATE = reverseColorLevels(SLATE_L);
export const ZINC = reverseColorLevels(ZINC_L);
export const STONE = reverseColorLevels(STONE_L);
export const RED = reverseColorLevels(RED_L);
export const ORANGE = reverseColorLevels(ORANGE_L);
export const YELLOW = reverseColorLevels(YELLOW_L);
export const GREEN = reverseColorLevels(GREEN_L);
export const BLUE = reverseColorLevels(BLUE_L);
export const INDIGO = reverseColorLevels(INDIGO_L);
export const VIOLET = reverseColorLevels(VIOLET_L);
export const PURPLE = reverseColorLevels(PURPLE_L);

export const WHITE_A = reverseColorLevels(WHITE_A_L);
export const BLACK_A = reverseColorLevels(BLACK_A_L);
