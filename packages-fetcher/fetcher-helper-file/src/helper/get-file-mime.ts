import getFileMimeFromFilename from './get-file-mime-from-filename';

export default function getFileMime(file: File): string {
  return file.type || getFileMimeFromFilename(file.name);
}
