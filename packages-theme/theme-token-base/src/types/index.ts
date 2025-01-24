import {
  TupleOf
} from '@kcuf/ts-missing-helpers';

export type TSize = `${number}px`;

export type TSizeLevels = TupleOf<TSize, 9>; // 9 阶大小（字号、大小等）
