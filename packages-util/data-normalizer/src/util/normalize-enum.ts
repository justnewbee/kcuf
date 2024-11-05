/**
 * 转枚举
 */
export default function normalizeEnum<E>(value: unknown, fallback: E): E {
  return value as E | undefined ?? fallback;
}