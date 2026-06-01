import mimeFromFilename from './mime-from-filename';

/**
 * 检测文件类型是否符合 accept
 *
 * accept 是以逗号分隔的列表，每一项可以是
 *
 * - 以 `.` 开头的扩展名，如 `.jpg`、`.png`
 * - 具体的 MIME 类型，如 `image/png`、`application/pdf`
 * - 通配 MIME 类型，如 `image/*`、`audio/*`、`video/*`
 *
 * 空 accept（或仅含空白）表示不限制，返回 true。
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file#accept
 */
export default function checkFileType(file: File, accept: string): boolean {
  const acceptList = accept.split(',').map(v => v.trim().toLowerCase()).filter(Boolean);
  
  if (!acceptList.length || acceptList.includes('*')) {
    return true;
  }
  
  const filename = file.name.toLowerCase();
  const mime = file.type || mimeFromFilename(filename);
  
  return acceptList.some(v => {
    if (v.startsWith('.')) {
      return filename.endsWith(v);
    }
    
    if (!mime) {
      return false;
    }
    
    return v.endsWith('/*') ? mime.startsWith(`${v.slice(0, v.indexOf('/'))}/`) : mime === v;
  });
}
