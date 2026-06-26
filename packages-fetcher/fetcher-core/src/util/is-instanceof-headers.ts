export default function isInstanceofHeaders(o: unknown): o is Headers {
  return typeof Headers !== 'undefined' && o instanceof Headers; // 不直接 instanceof，避免运行时报错
}
