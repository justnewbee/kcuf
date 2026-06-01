import getMime from './get-mime';
import getExtFromFilename from './get-ext-from-filename';
import getExtFromMime from './get-ext-from-mime';

/**
 * 提取文件后缀
 */
export default function getExt(file: File): string {
  return getExtFromFilename(file.name) || getExtFromMime(getMime(file));
}
