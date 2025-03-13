export type TBaseCallback = (...args: any[]) => void; // eslint-disable-line @typescript-eslint/no-explicit-any

export interface IDebouncedOptions {
  /**
   * The delay time for debounce.
   */
  delay?: number;
  /**
   * The maximum delay before the function is invoked.
   */
  delayMax?: number;
  /**
   * Invoke immediately when there is no timer exists.
   */
  immediate?: boolean;
}
