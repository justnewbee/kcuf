import {
  md5String,
  md5Blob
} from '@kcuf/md5';

import {
  TFileLike
} from '../types';

export default function getFileMd5(file: TFileLike): string | Promise<string> {
  if (typeof file === 'string') {
    return md5String(file);
  }
  
  return md5Blob(file);
}
