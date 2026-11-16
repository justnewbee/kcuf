export default function composeHexa(hex: string, alpha: number): string {
  return `${hex}${alpha >= 255 ? '' : alpha.toString(16).padStart(2, '0')}`;
}
