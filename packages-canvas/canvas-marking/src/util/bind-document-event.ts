export default function bindDocumentEvent<T extends keyof DocumentEventMap>(type: T, listener: (e: DocumentEventMap[T]) => void, options?: boolean | AddEventListenerOptions): () => void {
  document.addEventListener(type, listener, options);
  
  return () => document.removeEventListener(type, listener, options);
}
