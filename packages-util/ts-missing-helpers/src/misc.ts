type TTupleOfInner<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : TTupleOfInner<T, N, [T, ...R]>;

export type TImmutable<T> = {
  readonly [K in keyof T]: TImmutable<T[K]>;
};

/**
 * 定义较长的单类型元组
 */
export type TTupleOf<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : TTupleOfInner<T, N, []>
  : never;
