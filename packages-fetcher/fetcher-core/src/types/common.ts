export interface IPromiseWithAbort<T> extends Promise<T> {
  abort(): void;
}
