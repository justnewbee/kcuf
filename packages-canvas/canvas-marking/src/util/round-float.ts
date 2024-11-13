import _round from 'lodash/round';

/**
 * 用到小数的地方，不要有太长的小数，用以解决 getBoundingClientRect 返回值中带小数的情况
 */
export default function roundFloat(n: number, precision = 3): number {
  return _round(n, precision);
}
