import {
  uuid
} from '@kcuf/helper-data';
import {
  checkFileType
} from '@kcuf/fetcher-helper-file';

import {
  EFileItemError
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
    let error: EFileItemError | undefined;
    
    if (!checkFileType(file, accept)) {
      error = EFileItemError.ACCEPT_MISMATCH;
    } else if (maxSize > 0 && file.size > maxSize) {
      error = EFileItemError.EXCEED_MAX_SIZE;
    } else if (limit >= 1 && count >= limit) {
      error = EFileItemError.EXCEED_LIMIT;
    }
    
    if (!error) {
      count += 1;
    }
    
    return {
      id: uuid(),
      file,
      error
    };
  });
}
