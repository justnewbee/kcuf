import {
  MIME_TO_EXT_MAP
} from '../const';

export default function getExtFromMime(mimeType: string): string {
  return MIME_TO_EXT_MAP[mimeType] || '';
}
