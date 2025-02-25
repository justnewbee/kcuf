// Swap big-endian to little-endian and vice versa
import bitRotateLeft from './bit-rotate-left';

function cryptEndian(n: number): number;
function cryptEndian(n: number[]): number[];

function cryptEndian(n: number | number[]): number | number[] {
  // If number given, swap endian
  if (typeof n === 'number') {
    return bitRotateLeft(n, 8) & 0x00FF00FF | bitRotateLeft(n, 24) & 0xFF00FF00;
  }
  
  // Else, assume array and swap all items
  for (let i = 0; i < n.length; i++) {
    n[i] = cryptEndian(n[i]!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }
  
  return n;
}

export default cryptEndian;
