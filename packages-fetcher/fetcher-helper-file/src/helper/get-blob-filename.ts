import mimeToExt from './mime-to-ext';

export default function getBlobFilename(blob: Blob, filename: string): string {
  if (/\.\w+$/.test(filename)) {
    return filename;
  }
  
  const ext = mimeToExt(blob.type);
  
  return ext ? `${filename}.${ext}` : filename;
}
