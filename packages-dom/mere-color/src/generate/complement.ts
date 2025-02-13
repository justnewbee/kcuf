import rotate from './rotate';

/**
 * Returns the complement of the provided color. This is identical to `rotate(<color>, 180)`.
 */
export default function complement(color: string): string {
  return rotate(color, 180);
}
