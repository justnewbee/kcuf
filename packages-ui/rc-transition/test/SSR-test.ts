/**
 * @vitest-environment node
 */

// test that import does not crash
import * as ReactTransitionGroup from '../src'; // eslint-disable-line no-unused-vars

describe('SSR', () => {
  it('should import @kcuf-ui/transition-group in node env', () => {});
});
