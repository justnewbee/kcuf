export interface IListenerItem {
  token: number;
  fn(...args: unknown[]): void;
}

export type IFnOff = () => void;

export type TNamedListeners = Record<string, (...args: never[]) => unknown>;

export type TSubscribedListeners<E extends TNamedListeners> = Partial<Record<keyof E, IListenerItem[]>>;
