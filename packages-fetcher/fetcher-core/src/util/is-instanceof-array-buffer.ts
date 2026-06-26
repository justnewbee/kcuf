export default function isInstanceofArrayBuffer(o: unknown): o is ArrayBuffer {
  return typeof ArrayBuffer !== 'undefined' && o instanceof ArrayBuffer; // 不直接 instanceof，避免运行时报错
}
