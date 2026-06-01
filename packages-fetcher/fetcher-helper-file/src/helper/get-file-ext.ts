import getFileMime from './get-file-mime';
import getFileExtFromFilename from './get-file-ext-from-filename';
import getFileExtFromMime from './get-file-ext-from-mime';

/**
 * 提取文件后缀
 */
export default function getFileExt(file: File): string {
  return getFileExtFromFilename(file.name) || getFileExtFromMime(getFileMime(file));
}
