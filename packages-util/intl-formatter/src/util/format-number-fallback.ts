/**
 * 数值展示组件，对数值进行格式化展示 1234 -> 1,234
 */
export default function formatNumberFallback(n: number, precision = -1): string {
  const nInString = precision >= 0 ? n.toFixed(precision) : String(n);
  const [wholePart, fractionPart = ''] = nInString.split('.') as [string, string | undefined];
  const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 整数部分加逗号
  
  return fractionPart ? `${formattedWholePart}.${fractionPart}` : formattedWholePart;
}
