import {
  THslColorString,
  TColorLevels
} from '../types';
import {
  reverseColorLevels
} from '../util';
import {
  GRAY_0 as GRAY_0_L,
  GRAY_12 as GRAY_12_L,
  SLATE as SLATE_L,
  ZINC as ZINC_L,
  STONE as STONE_L
} from '../light';

export const GRAY_0: THslColorString = GRAY_12_L;
export const GRAY_12: THslColorString = GRAY_0_L;

// 灰色不适合简单反转
export const GRAY: TColorLevels = [
  'hsl(0 0% 3%)',
  'hsl(0 0% 5%)',
  'hsl(0 0% 8%)',
  'hsl(0 0% 10%)',
  'hsl(0 0% 15%)',
  'hsl(0 0% 20%)',
  'hsl(0 0% 30%)',
  'hsl(0 0% 57%)',
  'hsl(0 0% 64%)',
  'hsl(0 0% 74%)',
  'hsl(0 0% 86%)'
];

export const SLATE = reverseColorLevels(SLATE_L);
export const ZINC = reverseColorLevels(ZINC_L);
export const STONE = reverseColorLevels(STONE_L);
