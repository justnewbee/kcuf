// args 允许透传额外参数
export type IOnChange<T, A extends unknown[] = []> = (value: T, ...args: A) => void;

export type THookReturn<T, A extends unknown[] = []> = [T, IOnChange<T, A>];
