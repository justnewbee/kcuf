export default function bytesToStringBinary(bytes: number[]): string {
  return bytes.map(v => String.fromCharCode(v)).join('');
}
