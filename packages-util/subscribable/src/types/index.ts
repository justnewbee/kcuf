export interface IListenerItem {
  token: number;
  fn(...args: unknown[]): void;
}

export type TEventMap = {
  [key: string]: unknown[];
};

export type TListenerMapping<E extends TEventMap> = Partial<Record<keyof E, IListenerItem[]>>;