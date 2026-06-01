import {
  MIME_TO_EXT_MAP
} from '../const';

export default function getMimeFromFilename(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.');
  const ext = lastDotIndex >= 0 ? filename.substring(lastDotIndex + 1).toLowerCase() : '';
  
  if (!ext) {
    return '';
  }
  
  return Object.keys(MIME_TO_EXT_MAP).find(v => MIME_TO_EXT_MAP[v] === ext) || '';
}
