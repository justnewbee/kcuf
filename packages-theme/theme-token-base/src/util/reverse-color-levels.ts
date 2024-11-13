import {
  TColorLevels
} from '../types';

export default function reverseColorLevels(colorLevels: TColorLevels): TColorLevels {
  return [...colorLevels].reverse() as TColorLevels;
}
