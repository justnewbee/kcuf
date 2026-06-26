/**
 * 绝对 URL 正则，提取 origin
 *
 * 「A URL is considered absolute if it begins with "<protocol>://" or "//" (protocol-relative URL).
 * RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
 * by any combination of letters, digits, plus, period, or hyphen.」
 */
const REG_ORIGIN = /^https?:?\/\/[^/]+/;

/**
 * 提取 protocol 和 host，如果能够提取到则说明 url 是绝对地址
 */
export default function getUrlOrigin(url?: string): string {
  return url ? REG_ORIGIN.exec(url)?.[0] ?? '' : '';
}
