import {
  formatNumberFallback
} from './util';

/**
 * 格式化百分比，percentage 为 % 前的值
 */
export default function formatPercentage(percentage: number, precision = 0): string {
  return `${formatNumberFallback(percentage, precision)}%`;
}
