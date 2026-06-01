import downloadBlob from './download-blob';
import getFileMimeFromFilename from './get-file-mime-from-filename';

/**
 * 下载 ArrayBuffer
 */
export default function downloadArrayBuffer(arrayBuffer: ArrayBuffer, filename = 'download'): void {
  const mime = getFileMimeFromFilename(filename);
  const blob = new Blob([arrayBuffer], mime ? {
    type: mime
  } : undefined);
  
  downloadBlob(blob, filename);
}
