import {
  TDateFormat
} from './types';
import {
  formatDateFallback,
  getFormatDateOptions,
  getFormatDateFallbackPattern
} from './util';

/**
 * 格式化日期时间
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 */
export default function formatDate(date: Date, format?: TDateFormat, locale = 'en-US'): string {
  try {
    return new Intl.DateTimeFormat(locale, getFormatDateOptions(format)).format(date);
  } catch (_err) {
    return formatDateFallback(date, getFormatDateFallbackPattern(format));
  }
}
