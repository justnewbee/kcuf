import {
  formatNumberFallback,
  getFormatNumberOptions
} from './util';

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 */
export default function formatNumber(n: number, options?: number | Intl.NumberFormatOptions, locale = 'en-US'): string {
  const numberFormatOptions = getFormatNumberOptions(options);
  
  try {
    return new Intl.NumberFormat(locale, numberFormatOptions).format(n);
  } catch (_err) {
    return formatNumberFallback(n, numberFormatOptions?.maximumFractionDigits);
  }
}
