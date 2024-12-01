import {
  THsl,
  TColorLevels
} from './types';
import {
  WHITE_A as L_WHITE_A,
  BLACK_A as L_BLACK_A,
  GRAY_0 as L_GRAY_0,
  GRAY_12 as L_GRAY_12,
  RED as L_RED,
  GREEN as L_GREEN,
  BLUE as L_BLUE,
  YELLOW as L_YELLOW,
  ORANGE as L_ORANGE,
  PURPLE as L_PURPLE,
  GRAY_SLATE as L_GRAY_SLATE,
  GRAY_ZINC as L_GRAY_ZINC,
  GRAY_OLIVE as L_GRAY_OLIVE,
  GRAY_STONE as L_GRAY_STONE
} from './color';
import {
  reverseColorLevels
} from './util';

export const GRAY_0: THsl = L_GRAY_12;
export const GRAY_12: THsl = L_GRAY_0;

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
export const GRAY_SLATE = reverseColorLevels(L_GRAY_SLATE);
export const GRAY_ZINC = reverseColorLevels(L_GRAY_ZINC);
export const GRAY_OLIVE = reverseColorLevels(L_GRAY_OLIVE);
export const GRAY_STONE = reverseColorLevels(L_GRAY_STONE);

export const RED = reverseColorLevels(L_RED);
export const GREEN = reverseColorLevels(L_GREEN);
export const BLUE = reverseColorLevels(L_BLUE);
export const YELLOW = reverseColorLevels(L_YELLOW);
export const ORANGE = reverseColorLevels(L_ORANGE);
export const PURPLE = reverseColorLevels(L_PURPLE);
export const WHITE_A = reverseColorLevels(L_WHITE_A);
export const BLACK_A = reverseColorLevels(L_BLACK_A);
