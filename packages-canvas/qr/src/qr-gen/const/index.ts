import {
  TupleOf
} from '@kcuf/ts-missing-helpers';

import {
  TInt
} from '../types';

export const MIN_VERSION: TInt = 1;
export const MAX_VERSION: TInt = 40; // The maximum version number supported in the QR Code Model 2 standard

// For use in getPenaltyScore(), when evaluating which mask is best.
export const PENALTY_N1: TInt = 3;
export const PENALTY_N2: TInt = 3;
export const PENALTY_N3: TInt = 40;
export const PENALTY_N4: TInt = 10;

export const ECC_CODEWORDS_PER_BLOCK: TupleOf<TupleOf<TInt, 41>, 4> = [
  // Version: (note that index 0 is for padding, and is set to an illegal value)
  [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], // Low
  [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28], // Medium
  [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], // Quartile
  [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30] // High
];

export const NUM_ERROR_CORRECTION_BLOCKS: TupleOf<TupleOf<TInt, 41>, 4> = [
  // Version: (note that index 0 is for padding, and is set to an illegal value)
  [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25], // Low
  [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49], // Medium
  [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68], // Quartile
  [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81] // High
];

// Describes precisely all strings that are encodable in numeric mode.
export const NUMERIC_REGEX = /^[0-9]*$/;

// Describes precisely all strings that are encodable in alphanumeric mode.
export const ALPHANUMERIC_REGEX = /^[A-Z0-9 $%*+./:-]*$/;

// The set of all legal characters in alphanumeric mode,
// where each character value maps to the index in the string.
export const ALPHANUMERIC_CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';
