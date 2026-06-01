import {
  TFileLike
} from '../types';

import createFileFromBase64 from './create-file-from-base64';
import createFileFromBlob from './create-file-from-blob';
import getFileMd5 from './get-file-md5';

export default async function makeSureFile(file: TFileLike): Promise<File> {
  if (typeof file === 'string') {
    return createFileFromBase64(file, await getFileMd5(file));
  }
  
  if (file instanceof File) {
    return file;
  }
  
  if (file instanceof Blob) {
    return createFileFromBlob(file, await getFileMd5(file));
  }
  
  return file;
}
