import {
  v4 as uuidV4
} from 'uuid';

export default function generateUuid(): string {
  try {
    return crypto.randomUUID();
  } catch (_err) {
    return uuidV4();
  }
}
