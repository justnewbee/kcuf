// Convert a byte array to a hex string
export default function cryptBytesToHex(bytes: number[]): string {
  const hex: number[] = [];
  
  for (let i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xF).toString(16));
  }
  
  return hex.join('');
}
