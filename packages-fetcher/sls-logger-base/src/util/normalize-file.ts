interface IPlainFile {
  name: string;
  size: number;
  type: string;
}

/**
 * 文件不可能直接记录
 */
export default function normalizeFile(file: File): IPlainFile {
  return {
    name: file.name,
    size: file.size,
    type: file.type
  };
}
