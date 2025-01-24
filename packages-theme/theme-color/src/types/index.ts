import {
  TupleOf
} from '@kcuf/ts-missing-helpers';

export type THsl = `hsl(${number} ${number}% ${number}%)`;
export type THsla = `hsl(${number} ${number}% ${number}% / ${number}%)`;
export type TColorLevels = TupleOf<THsl, 11> | TupleOf<THsla, 11>; // 11 色阶
