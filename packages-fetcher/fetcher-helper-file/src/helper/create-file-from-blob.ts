import getFileExtFromMime from './get-file-ext-from-mime';

function getBlobFilename(blob: Blob, name: string): string {
  if (/\.\w+$/.test(name)) {
    return name;
  }
  
  const ext = getFileExtFromMime(blob.type);
  
  return ext ? `${name}.${ext}` : name;
}

/**
 * 将 Blob 对象转换为 File 对象
 */
export default function createFileFromBlob(blob: Blob, name = 'blob-to-file'): File {
  return new File([blob], getBlobFilename(blob, name), {
    type: blob.type,
    lastModified: Date.now()
  });
}
