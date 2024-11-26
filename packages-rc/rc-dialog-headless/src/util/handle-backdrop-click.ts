import stackFindTopmost from './stack-find-topmost';

/**
 * Backdrop 上的点击，将顶层允许 externalClose 的 Dialog 关掉
 */
export default function handleBackdropClick(): void {
  stackFindTopmost()?.closeOnExternal();
}
