import {
  TupleOf
} from '@kcuf/ts-missing-helpers';

export type THslColorString = `hsl(${number} ${number}% ${number}%)`;
export type THslaColorString = `hsl(${number} ${number}% ${number}% / ${number}%)`;
export type TColorLevels = TupleOf<THslColorString | THslaColorString, 11>; // 11 色阶
