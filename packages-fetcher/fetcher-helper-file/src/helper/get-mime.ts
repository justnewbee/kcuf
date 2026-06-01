import getMimeFromFilename from './get-mime-from-filename';

export default function getMime(file: File): string {
  return file.type || getMimeFromFilename(file.name);
}
