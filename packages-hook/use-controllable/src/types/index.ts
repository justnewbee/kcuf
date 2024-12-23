// args 允许透传额外参数
export type TOnChange<T, A extends unknown[] = []> = (value: T, ...args: A) => void;

export type THookReturn<T, A extends unknown[] = []> = [T, TOnChange<T, A>];

export type THookReturnUnprotected<T, A extends unknown[] = []> = [T | undefined, TOnChange<T, A>];
