export default function stringToByteArray(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}
