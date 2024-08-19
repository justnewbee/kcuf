const REG_HEX_FULL = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
const REG_HEX_SHORTHAND = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

export default function hexToRgb(hex: string): [number, number, number] {
  const hexFull = hex.replace(REG_HEX_SHORTHAND, (_m, r, g, b) => {
    return r + r + g + g + b + b;
  });
  const result = REG_HEX_FULL.exec(hexFull) as [string, string, string, string] | null;
  
  return [
    result ? parseInt(result[1], 16) : 0,
    result ? parseInt(result[2], 16) : 0,
    result ? parseInt(result[3], 16) : 0
  ];
}