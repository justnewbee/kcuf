export default function isInstanceofBlob(o: unknown): o is Blob {
  return typeof Blob !== 'undefined' && o instanceof Blob; // 不直接 instanceof，避免运行时报错
}
