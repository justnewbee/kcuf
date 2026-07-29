/**
 * 中文英文混杂的情况下，中文和英文之间应该空格，中英文标点和周边不加空格
 */
export default function normalizeChEn(str: string): string {
  return str
    .replace(/([\u4e00-\u9fa5])([a-zA-Z0-9])/g, '$1 $2') // 汉字 后跟 字母/数字 → 加空格
    .replace(/([a-zA-Z0-9,;.!?])([\u4e00-\u9fa5])/g, '$1 $2') // 字母/数字/英文标点 后跟 汉字 → 加空格
    .replace(/\s+/g, ' '); // 压缩连续空格
}
