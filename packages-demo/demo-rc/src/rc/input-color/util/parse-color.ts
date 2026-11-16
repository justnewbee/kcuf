export default function parseColor(hexa: string): [string, number] {
  if (hexa.length === 9) {
    const hex = hexa.substring(0, 7);
    const alpha = parseInt(hexa.substring(7), 16);
    
    return [hex, isNaN(alpha) ? 255 : alpha];
  }
  
  return [hexa, 255];
}
