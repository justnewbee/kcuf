import {
  MIME_TO_EXT_MAP
} from '../const';

export default function mimeFromFilename(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.');
  const ext = lastDotIndex >= 0 ? filename.substring(lastDotIndex + 1) : '';
  
  if (!ext) {
    return '';
  }
  
  const mimeType = Object.keys(MIME_TO_EXT_MAP).find(v => MIME_TO_EXT_MAP[v] === ext);
  
  return mimeType ? MIME_TO_EXT_MAP[mimeType] || '' : '';
}
