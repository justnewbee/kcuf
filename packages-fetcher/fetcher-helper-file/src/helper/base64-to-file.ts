import base64ToBlob from './base64-to-blob';
import blobToFile from './blob-to-file';

/**
 * 将 `data:image/jpeg;base64,/...` 转成 File
 */
export default function base64ToFile(dataUrl: string, filename = 'base64-to-file'): File {
  const blob = base64ToBlob(dataUrl);
  
  return blobToFile(blob, filename);
}
