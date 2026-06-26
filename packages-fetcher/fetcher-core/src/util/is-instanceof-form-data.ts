export default function isInstanceofFormData(o: unknown): o is FormData {
  return typeof FormData !== 'undefined' && o instanceof FormData; // 不直接 instanceof，避免运行时报错
}
