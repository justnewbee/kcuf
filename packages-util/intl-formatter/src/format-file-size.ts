import formatNumber from './format-number';

const KB = 1024;
const MB = KB * KB;
const GB = KB * KB * KB;
const TB = KB * KB * KB * KB;

export default function formatFileSize(size: number, precision = 2): string {
  if (size < KB) {
    return `${formatNumber(size, precision)}B`;
  }
  
  if (size < MB) {
    return `${formatNumber(size / KB, precision)}KB`;
  }
  
  if (size < GB) {
    return `${formatNumber(size / MB, precision)}MB`;
  }
  
  if (size < TB) {
    return `${formatNumber(size / GB, precision)}GB`;
  }
  
  return `${formatNumber(size / TB, precision)}TB`;
}
