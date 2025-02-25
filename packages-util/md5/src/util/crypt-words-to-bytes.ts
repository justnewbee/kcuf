// Convert big-endian 32-bit words to a byte array
export default function cryptWordsToBytes(words: number[]): number[] {
  const bytes: number[] = [];
  
  for (let b = 0; b < words.length * 32; b += 8) {
    bytes.push((words[b >>> 5]! >>> (24 - b % 32)) & 0xFF); // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }
  
  return bytes;
}
