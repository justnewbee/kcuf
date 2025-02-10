export default function protect<T>(fn: () => T): T | null {
  try {
    return fn();
  } catch (_err) {
    return null;
  }
}
