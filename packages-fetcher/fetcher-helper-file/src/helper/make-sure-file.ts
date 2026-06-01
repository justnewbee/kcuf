import {
  md5String,
  md5Blob
} from '@kcuf/md5';

import {
  TFileType
} from '../types';

import createFileFromBase64 from './create-file-from-base64';
import createFileFromBlob from './create-file-from-blob';

export default async function makeSureFile(file: TFileType): Promise<File> {
  if (typeof file === 'string') {
    return createFileFromBase64(file, md5String(file));
  }
  
  if (file instanceof File) {
    return file;
  }
  
  if (file instanceof Blob) {
    return createFileFromBlob(file, await md5Blob(file));
  }
  
  return file;
}
