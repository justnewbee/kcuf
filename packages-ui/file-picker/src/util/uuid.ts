import {
  v4
} from 'uuid';

export default function uuid(): string {
  try {
    // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
    return crypto.randomUUID(); // randomUUID is undefined when not https or local
  } catch (_err) {
    return v4(); // it has a fallback
  }
}
