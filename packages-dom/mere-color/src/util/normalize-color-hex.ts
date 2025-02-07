/**
 * #ff8866 → #f86
 * #ff886699 → #f869
 */
export default function normalizeColorHex(value: string): string {
  const [, r1, r2, g1, g2, b1, b2, a1, a2] = value.split('');
  
  if (value.length < 7 || r1 !== r2 || g1 !== g2 || b1 !== b2 || a1 !== a2) {
    return value;
  }
  
  return value.length === 7 ? `#${r1}${g1}${b1}` : `#${r1}${g1}${b1}${a1}`;
}
