import {
  MIME_TO_EXT_MAP
} from '../const';

export default function mimeToExt(mimeType: string): string {
  return MIME_TO_EXT_MAP[mimeType] || '';
}
