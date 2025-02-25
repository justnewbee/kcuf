// Convert a byte array to big-endian 32-bit words
export default function cryptBytesToWords(bytes: number[]): number[] {
  const words: number[] = [];
  
  for (let i = 0, b = 0; i < bytes.length; i++, b += 8) {
    words[b >>> 5] |= bytes[i] << (24 - b % 32);
  }
  
  return words;
}
