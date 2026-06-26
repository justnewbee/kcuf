export default function isInstanceofUrlSearchParams(o: unknown): o is URLSearchParams {
  return typeof URLSearchParams !== 'undefined' && o instanceof URLSearchParams; // 不直接 instanceof，避免运行时报错
}
