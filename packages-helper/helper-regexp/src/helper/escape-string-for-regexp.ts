/**
 * Escape special chars before using the string in `new RegExp()`
 */
export default function escapeStringForRegexp(str: string): string {
  return str
    .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
    .replace(/-/g, '\\x2d');
}
