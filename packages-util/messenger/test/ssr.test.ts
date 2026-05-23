/**
 * @vitest-environment node
 */
import {
  describe,
  test,
  expect
} from 'vitest';

describe('SSR (no window)', () => {
  test('importing the package and using the default messenger does not throw', async () => {
    expect(typeof globalThis.window).toBe('undefined');

    const messenger = (await import('../src')).default;

    expect(() => messenger.emit('ssr-event')).not.toThrow();
    expect(() => messenger.emit('ssr-event', {
      foo: 1
    })).not.toThrow();
    expect(() => messenger.on('ssr-event', () => {
      // noop
    })()).not.toThrow();
  });

  test('Messenger class can be constructed and used without window', async () => {
    expect(typeof globalThis.window).toBe('undefined');

    const Messenger = (await import('../src/messenger')).default;
    const m = new Messenger();

    expect(() => m.emit('x')).not.toThrow();

    const off = m.on('x', () => {
      // noop
    });

    expect(typeof off).toBe('function');
    off();
  });
});
