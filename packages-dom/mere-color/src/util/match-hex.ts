const REG_HEX_MATCHER = /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i;

export default function matchHex(input: string): string | null {
  const arr = REG_HEX_MATCHER.exec(input.trim()) as [string, string] | null;
  
  return arr?.[1] ?? null;
}
