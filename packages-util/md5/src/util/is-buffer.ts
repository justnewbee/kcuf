export default function isBuffer(o: unknown): o is Buffer {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return typeof o.constructor?.isBuffer === 'function' && o.constructor.isBuffer(o); // Buffer is only for node
}
