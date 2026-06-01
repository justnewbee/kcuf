import downloadBlob from './download-blob';
import getMimeFromFilename from './get-mime-from-filename';

/**
 * 下载 ArrayBuffer
 */
export default function downloadArrayBuffer(arrayBuffer: ArrayBuffer, filename = 'download'): void {
  const mime = getMimeFromFilename(filename);
  const blob = new Blob([arrayBuffer], mime ? {
    type: mime
  } : undefined);
  
  downloadBlob(blob, filename);
}
