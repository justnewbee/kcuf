/**
 * Pick properties defined by `K` in `T` make them optional.
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
 * // }
 * type Alt = PartialPick<Original, 'a' | 'b'>;
 *
 * // OK
 * const o1: Alt = { a: '', b: 1 };
 * const o2: Alt = { a: '' };
 * const o3: Alt = { b: 1 };
 * const o4: Alt = {};
 * // Error: Object literal may only specify known properties...
 * const o5: Alt = { c: true };
 * const o6: Alt = { d: new Date };
 * ```
 */
export type PartialPick<T, K extends keyof T> = {
  [P in K]?: T[P];
};

/**
 * Make properties defined by `K` in `T` optional, the rest untouched.
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
 * //   d?: Date;
 * // }
 * type Alt = PartialSelected<Original, 'a' | 'b'>;
 *
 * // OK
 * const o1: Alt = { c: true, d: new Date() };
 * const o2: Alt = { b: 1, c: true, d: new Date() };
 * const o3: Alt = { a: '', b: 1, c: true, d: new Date() };
 * const o4: Alt = { c: true };
 * // Error
 * const o5: Alt = { b: 1, d: new Date() }; // missing c
 * const o6: Alt = { a: '', b: 1 }; // missing c
 * const o7: Alt = { a: '', b: 1, c: true, d: new Date(), e: null }; // unknown e
 * ```
 */
export type PartialSelected<T, K extends keyof T> = Omit<T, K> & Partial<T>;

/**
 * Properties defined by `K` in `T` untouched, the rest made optional.
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
 * //   c?: boolean;
 * //   d?: Date;
 * // }
 * type Alt = PartialUnselected<Original, 'a' | 'b'>;
 *
 * // OK
 * const o1: Alt = { b: 1 };
 * const o2: Alt = { a: '', b: 1, c: false };
 * // Error
 * const o3: Alt = { a: '', c: false }; // missing b
 * ```
 */
export type PartialUnselected<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * Properties defined by `K` in `T` required, the rest made optional.
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
 * //   c?: boolean;
 * //   d?: Date;
 * // }
 * type Alt = PartialBut<Original, 'a' | 'b'>;
 *
 * // OK
 * const o1: Alt = { a: '', b: 1 }; // missing c, d
 * const o2: Alt = { a: '', b: 1, c: false }; // missing d
 * const o3: Alt = { a: '', b: 1, d: new Date() }; // missing c
 * const o4: Alt = { a: '', b: 1, c: false, d: new Date() };
 * // Error
 * const o5: Alt = { b: 1, c: false, d: new Date() }; // missing a
 * const o6: Alt = { c: false, d: new Date() }; // missing a, b
 * const o7: Alt = { a: '' }; // missing b
 * const o8: Alt = { }; // missing a, b
 * ```
 */
export type PartialBut<T, K extends keyof T = keyof T> = Partial<Pick<T, Exclude<keyof T, K>>> & Required<Pick<T, K>>;