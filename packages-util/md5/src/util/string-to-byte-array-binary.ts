export default function stringToByteArray(str: string): number[] {
  const bytes: number[] = [];
  
  for (let i = 0; i < str.length; i++) {
    bytes.push(str.charCodeAt(i) & 0xFF);
  }
  
  return bytes;
}
