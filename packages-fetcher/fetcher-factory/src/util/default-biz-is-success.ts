export default function defaultBizIsSuccess(o: Record<string, unknown>): boolean {
  return String(o.code) === '0';
}
