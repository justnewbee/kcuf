export interface IFetchSseOptions extends Omit<RequestInit, 'signal'> {
  onOpen?(): void;
  onChunk?(arr: Uint8Array): void;
}

export interface IFetchSseErrorResponseStatus extends Error {
  status: number;
  statusText: string;
}

export interface IFetchSseResult {
  promise: Promise<void>;
  cancel(): void;
}
