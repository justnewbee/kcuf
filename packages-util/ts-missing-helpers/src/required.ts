/**
 * Pick properties defined by `K` in `T` make them required.
 *
 * @example
 *
 * ```
 * interface Original {
 *   a?: string;
 *   b: number;
 *   c: boolean;
 *   d?: Date;
 * }
 *
 * // Alt === {
 * //   a: string;
 * //   b: number;
 * // }
 * type Alt = RequiredPick<Original, 'a' | 'b'>;
 *
 * // OK
 * const o1: Alt = { a: '', b: 1 };
 * // Error
 * const o2: Alt = { a: '' }; // missing b
 * const o3: Alt = { b: 1 }; // missing a
 * const o4: Alt = {}; // missing a, b
 * const o5: Alt = { a: '', b: 1, c: true }; // unknown property c
 * ```
 */
export type RequiredPick<T, K extends keyof T> = {
  [P in K]-?: T[P];
};

/**
 * Make properties defined by `K` in `T` required, the rest untouched.
 *
 * @example
 *
 * ```
 * interface Original {
 *   a?: string;
 *   b: number;
 *   c: boolean;
 *   d?: Date;
 * }
 *
 * // Alt === {
 * //   a: string;
 * //   b: number;
 * //   c: boolean;
 * //   d?: Date;
 * // }
 * type Alt = RequiredSelected<Original, 'a' | 'b'>;
 *
 * // OK
 * const o1: Alt = { a: '', b: 1, c: false };
 * const o2: Alt = { a: '', b: 1, c: true, d: new Date() };
 * // Error
 * const o3: Alt = { b: 1, c: true, d: new Date() }; // missing a
 * const o4: Alt = { a: '', b: 1, d: new Date() }; // missing c
 * const o5: Alt = { a: '', b: 1, c: false, e: null }; // unknown e
 * ```
 */
export type RequiredSelected<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Properties defined by `K` in `T` untouched, the rest made required.
 *
 * @example
 *
 * ```
 * interface Original {
 *   a?: string;
 *   b: number;
 *   c: boolean;
 *   d?: Date;
 * }
 *
 * // Alt === {
 * //   a?: string;
 * //   b: number;
 * //   c: boolean;
 * //   d: Date;
 * // }
 * type Alt = RequiredUnselected<Original, 'a' | 'b'>;
 *
 * // OK
 * const o1: Alt = { a: '', b: 1, c: false, d: new Date() };
 * const o2: Alt = { b: 1, c: false, d: new Date() };
 * // Error
 * const o3: Alt = {}; // missing b, c, d
 * const o4: Alt = { a: '' }; // missing b, c, d
 * const o5: Alt = { a: '', b: 1 }; // missing c, d
 * const o6: Alt = { a: '', b: 1, c: false }; // missing d
 * ```
 */
export type RequiredUnselected<T, K extends keyof T = keyof T> = Pick<T, K> & Required<Pick<T, Exclude<keyof T, K>>>;

/**
 * Properties defined by `K` in `T` optional, the rest made required.
 *
 * @example
 *
 * ```
 * interface Original {
 *   a?: string;
 *   b: number;
 *   c: boolean;
 *   d?: Date;
 * }
 *
 * // Alt === {
 * //   a?: string;
 * //   b?: number;
 * //   c: boolean;
 * //   d: Date;
 * // }
 * type Alt = RequiredBut<Original, 'a' | 'b'>;
 *
 * // OK
 * const o1: Alt = { a: '', b: 1, c: false, d: new Date() };
 * const o2: Alt = { b: 1, c: false, d: new Date() };
 * const o3: Alt = { c: false, d: new Date() };
 * // Error
 * const o4: Alt = { }; // missing c, d
 * const o5: Alt = { a: '' }; // missing c, d
 * const o6: Alt = { a: '', b: 1 }; // missing c, d
 * const o7: Alt = { a: '', b: 1, c: false }; // missing d
 * const o8: Alt = { a: '', b: 1, d: new Date() }; // missing c
 * ```
 */
export type RequiredBut<T, K extends keyof T = keyof T> = Partial<Pick<T, K>> & Required<Pick<T, Exclude<keyof T, K>>>;
