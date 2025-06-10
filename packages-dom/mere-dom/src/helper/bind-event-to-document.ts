/**
 * 全局绑定事件到 document，返回解绑的无参方法
 */
export default function bindEventToDocument<T extends keyof DocumentEventMap>(type: T, listener: (e: DocumentEventMap[T]) => void, options?: boolean | AddEventListenerOptions): () => void {
  document.addEventListener(type, listener, options);
  
  return () => document.removeEventListener(type, listener, options);
}
