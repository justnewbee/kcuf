import createBlobFromBase64 from './create-blob-from-base64';
import createFileFromBlob from './create-file-from-blob';

/**
 * 将 `data:image/jpeg;base64,/...` 转成 File
 */
export default function createFileFromBase64(dataUrl: string, name = 'base64-to-file'): File {
  const blob = createBlobFromBase64(dataUrl);
  
  return createFileFromBlob(blob, name);
}
