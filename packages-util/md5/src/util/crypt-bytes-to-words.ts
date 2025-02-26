// Convert a byte array to big-endian 32-bit words
export default function cryptBytesToWords(bytes: Uint8Array): number[] {
  const words: number[] = [];
  
  for (let i = 0, b = 0; i < bytes.length; i++, b += 8) {
    words[b >>> 5]! |= bytes[i]! << (24 - b % 32); // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }
  
  return words;
}
