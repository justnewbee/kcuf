export default function defaultBizGetMessage(o: Record<string, unknown>): string {
  const message = o.msg ?? o.message;
  
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return message ? String(message) : '';
}
