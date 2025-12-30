export type TListChangeReason = 'c' | 'u' | 'd';

export type TFindPredicate<T> = keyof T | ((v: T) => unknown);
