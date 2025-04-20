export interface IFetchSseOptions extends Omit<RequestInit, 'signal'> {
  onOpen?(): void;
  onChunk?(chunk: Uint8Array): void;
  onCancel?(): void;
  onComplete?(error?: Error): void;
}

export interface IFetchSseErrorResponseStatus extends Error {
  status: number;
  statusText: string;
}

export interface IFetchSseResult {
  promise: Promise<void>;
  cancel(): void;
}
