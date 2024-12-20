import downloadBlob from './download-blob';
import mimeFromFilename from './mime-from-filename';

/**
 * 下载 ArrayBuffer
 */
export default function downloadArrayBuffer(arrayBuffer: ArrayBuffer, filename = 'download'): void {
  const mime = mimeFromFilename(filename);
  const blob = new Blob([arrayBuffer], mime ? {
    type: mime
  } : undefined);
  
  downloadBlob(blob, filename);
}
