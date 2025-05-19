import {
  md5String,
  md5Blob
} from '@kcuf/md5';

import base64ToFile from './base64-to-file';
import blobToFile from './blob-to-file';

export default async function makeSureFile(file: File | Blob | string): Promise<File> {
  if (typeof file === 'string') {
    return base64ToFile(file, md5String(file));
  }
  
  if (file instanceof File) {
    return file;
  }
  
  if (file instanceof Blob) {
    return blobToFile(file, await md5Blob(file));
  }
  
  return file;
}
