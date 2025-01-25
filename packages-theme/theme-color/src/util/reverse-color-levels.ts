import {
  TColorLevels
} from '../types';

/**
 * 功能色为 11 阶对称，简单翻转，能够适配多数暗色场景
 */
export default function reverseColorLevels(colorLevels: TColorLevels): TColorLevels {
  return [...colorLevels].reverse() as TColorLevels;
}
