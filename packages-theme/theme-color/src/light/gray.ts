import {
  THslColorString,
  TColorLevels
} from '../types';

export const GRAY_0: THslColorString = 'hsl(0 0% 100%)'; // white → 1.0
export const GRAY_12: THslColorString = 'hsl(0 0% 0%)'; // black → 21.0

export const GRAY: TColorLevels = [
  'hsl(0 0% 99%)', // 1.03
  'hsl(0 0% 97%)', // 1.07
  'hsl(0 0% 94%)', // 1.14
  'hsl(0 0% 92%)', // 1.19
  'hsl(0 0% 87%)', // 1.35
  'hsl(0 0% 82%)', // 1.53
  'hsl(0 0% 74%)', // 1.88
  'hsl(0 0% 43%)', // 5.1 / AA
  'hsl(0 0% 37%)', // 6.48 / AA
  'hsl(0 0% 26%)', // 10.1 / AAA
  'hsl(0 0% 14%)' // 15.44 / AAA
];

export const SLATE: TColorLevels = [
  'hsl(214 42.9% 99%)', // 1.03
  'hsl(214 40% 97%)', // 1.07
  'hsl(214 32% 94%)', // 1.15
  'hsl(214 27% 92%)', // 1.21
  'hsl(214 25% 88%)', // 1.34
  'hsl(214 22% 83%)', // 1.52
  'hsl(214 20% 75%)', // 1.88
  'hsl(214 14% 44%)', // 5.2 / AA
  'hsl(214 14% 38%)', // 6.52 / AA
  'hsl(214 17% 27%)', // 10 / AAA
  'hsl(214 14% 15%)' // 15.44 / AAA
];

export const ZINC: TColorLevels = [
  'hsl(240 20% 99%)', // 1.03
  'hsl(240 20% 97%)', // 1.08
  'hsl(240 20% 95%)', // 1.14
  'hsl(240 20% 93%)', // 1.2
  'hsl(240 20% 89%)', // 1.35
  'hsl(240 19% 85%)', // 1.51
  'hsl(240 22% 78%)', // 1.88
  'hsl(240 12% 47%)', // 5.3 / AA
  'hsl(240 13% 41%)', // 6.56 / AA
  'hsl(240 16% 29%)', // 10.4 / AAA
  'hsl(240 17% 16%)' // 15.67 / AAA
];

export const STONE: TColorLevels = [
  'hsl(30 20% 99%)', // 1.02
  'hsl(30 20% 97%)', // 1.07
  'hsl(30 20% 94%)', // 1.14
  'hsl(30 20% 92%)', // 1.19
  'hsl(30 22% 87%)', // 1.33
  'hsl(32 20% 82%)', // 1.5
  'hsl(30 20% 73.9%)', // 1.9
  'hsl(33 12% 41%)', // 5.28 / AA
  'hsl(30 13% 36%)', // 6.48 / AA
  'hsl(30 17% 25%)', // 10.1 / AAA
  'hsl(29 21% 14%)' // 15.44 / AAA
];
