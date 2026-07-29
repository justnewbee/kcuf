import {
  describe,
  test,
  expect
} from 'vitest';

import {
  normalizeChEn
} from '../src';

describe('normalizeChEn', () => {
  test('returns empty string for empty string', () => {
    expect(normalizeChEn('')).toBe('');
  });
  
  test('passes through pure Chinese', () => {
    expect(normalizeChEn('你好世界')).toBe('你好世界');
  });
  
  test('passes through pure English', () => {
    expect(normalizeChEn('hello world')).toBe('hello world');
  });
  
  test('adds space between Chinese and English letter', () => {
    expect(normalizeChEn('你好world')).toBe('你好 world');
  });
  
  test('adds space between English letter and Chinese', () => {
    expect(normalizeChEn('hello世界')).toBe('hello 世界');
  });
  
  test('adds space between Chinese and number', () => {
    expect(normalizeChEn('版本1')).toBe('版本 1');
  });
  
  test('adds space between number and Chinese', () => {
    expect(normalizeChEn('1版本')).toBe('1 版本');
  });
  
  test('adds space around a single English word between Chinese', () => {
    expect(normalizeChEn('这是test文本')).toBe('这是 test 文本');
  });
  
  test('does not add space around Chinese punctuation', () => {
    expect(normalizeChEn('你好，world')).toBe('你好，world');
  });
  
  test('add space after English punctuation', () => {
    expect(normalizeChEn('hello,世界')).toBe('hello, 世界');
  });
  
  test('doest not add space before English punctuation', () => {
    expect(normalizeChEn('世界,如此之大')).toBe('世界, 如此之大');
  });
  
  test('collapses consecutive spaces into one', () => {
    expect(normalizeChEn('hello   world')).toBe('hello world');
  });
  
  test('handles complex mixed Chinese and English', () => {
    expect(normalizeChEn('这是一段包含English和Number123的文本')).toBe('这是一段包含 English 和 Number123 的文本');
  });
});
