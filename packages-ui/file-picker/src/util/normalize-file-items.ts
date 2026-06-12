import {
  uuid
} from '@kcuf/helper-data';
import {
  checkFileType
} from '@kcuf/fetcher-helper-file';

import {
  EFileItemInvalid
} from '../enum';
import {
  IFileItem
} from '../types';

/**
 * 转换文件列表或数组为 FileItem 对象数组
 */
export default function normalizeFileItems(fileList: FileList | File[], accept: string, maxSize: number, limit: number): IFileItem[] {
  let count = 0;
  
  return Array.from(fileList).map((file: File): IFileItem => {
    let invalid: EFileItemInvalid | undefined;
    
    if (!checkFileType(file, accept)) {
      invalid = EFileItemInvalid.MISMATCH_ACCEPT;
    } else if (maxSize > 0 && file.size > maxSize) {
      invalid = EFileItemInvalid.EXCEED_FILE_SIZE;
    } else if (limit >= 1 && count >= limit) {
      invalid = EFileItemInvalid.EXCEED_LIMIT;
    }
    
    if (!invalid) {
      count += 1;
    }
    
    return {
      id: uuid(),
      file,
      invalid
    };
  });
}
