export { default } from './provider';

export * from './hook';

export {
  EDialogMode as DialogMode,
  EDialogSize as DialogSize,
  EDialogLockState as DialogLockState
} from './enum';

export {
  handleBackdropClick
} from './util';

export type {
  IDialogProps as DialogProps,
  IDialogButtonProps as DialogButtonProps,
  IContextForContent as DialogContext
} from './types';
