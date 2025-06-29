/**
 * Throws an exception if the given condition is false
 */
export default function assert(cond: boolean): void {
  if (!cond) {
    throw new Error('Assertion error');
  }
}
