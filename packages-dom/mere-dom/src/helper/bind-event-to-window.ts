/**
 * 全局绑定事件到 window
 */
export default function bindEventToWindow<T extends keyof WindowEventMap>(type: T, listener: (e: WindowEventMap[T]) => void, options?: boolean | AddEventListenerOptions): () => void {
  window.addEventListener(type, listener, options);
  
  return () => window.removeEventListener(type, listener, options);
}
