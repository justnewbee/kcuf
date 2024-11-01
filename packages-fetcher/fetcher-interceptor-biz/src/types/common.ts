export type TResponseResult = Record<string, unknown>;

export type TIsSuccess = ((o: TResponseResult) => boolean) | boolean;

export type TGetString = ((o: TResponseResult) => string) | string;

export type TGetData<T = unknown> = ((o: TResponseResult) => T) | string;
