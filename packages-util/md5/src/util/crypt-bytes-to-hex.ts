/**
 * Convert a byte array to a hex string
 */
export default function cryptBytesToHex(bytes: number[]): string {
  return bytes.reduce((result: string[], v) => {
    result.push((v >>> 4).toString(16));
    result.push((v & 0xF).toString(16));
    
    return result;
  }, []).join('');
}
