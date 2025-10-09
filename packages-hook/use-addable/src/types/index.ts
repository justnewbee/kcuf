export interface IUseAddableReturn<T extends object> {
  items: T[];
  add(): void;
  update(o: T): void;
  remove(o: T): void;
}

export type TFinder<T extends object> = (v1: T, v2: T) => boolean;
