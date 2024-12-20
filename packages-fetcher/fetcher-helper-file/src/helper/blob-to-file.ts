import getBlobFilename from './get-blob-filename';

/**
 * 将 Blob 对象转换为 File 对象
 */
export default function blobToFile(blob: Blob, filename = 'blob-to-file'): File {
  return new File([blob], getBlobFilename(blob, filename), {
    type: blob.type,
    lastModified: Date.now()
  });
}
