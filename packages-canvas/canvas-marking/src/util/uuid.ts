import {
  v4 as uuidV4
} from 'uuid';

export default function uuid(): string {
  try {
    return crypto.randomUUID();
  } catch (_err) {
    return uuidV4();
  }
}
