export default function getFormatNumberOptions(options?: number | Intl.NumberFormatOptions): Intl.NumberFormatOptions | undefined {
  return typeof options === 'number' ? {
    maximumFractionDigits: options
  } : options;
}
