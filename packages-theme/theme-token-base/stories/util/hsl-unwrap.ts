export default function hslUnwrap(hslColor: string): string {
  return hslColor.replace('hsl(', '').replace(')', '');
}
