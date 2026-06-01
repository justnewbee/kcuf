export { default } from './rc';

export type {
  IFilePickerProps as FilePickerProps,
  IFileItem as FileItem
} from './types';

export {
  EFileItemError as FileItemError
} from './enum';

export {
  normalizeFileItems // export for drag or paste
} from './util';
