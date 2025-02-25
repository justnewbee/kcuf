export default function isBuffer(obj: unknown): obj is Buffer {
  return obj && obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
}
