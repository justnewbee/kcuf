import {
  TupleOf
} from '@kcuf/ts-missing-helpers';

export type TSize = `${number}px`;
export type THsl = `hsl(${number} ${number}% ${number}%)`;
export type THsla = `hsl(${number} ${number}% ${number}% / ${number}%)`;

export type TColorLevels = TupleOf<THsl, 11> | TupleOf<THsla, 11>; // 11 色阶

export type TSizeLevels = TupleOf<TSize, 9>; // 9 阶大小（字号、大小等）