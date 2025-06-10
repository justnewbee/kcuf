/**
 * 全局绑定事件到 window，返回解绑的无参方法
 */
export default function bindEventToWindow<T extends keyof WindowEventMap>(type: T, listener: (e: WindowEventMap[T]) => void, options?: boolean | AddEventListenerOptions): () => void {
  window.addEventListener(type, listener, options);
  
  return () => window.removeEventListener(type, listener, options);
}
