/**
 * @vitest-environment jsdom
 */
import {
  describe,
  test,
  expect
} from 'vitest';

import {
  prepareFormData
} from '../src';

describe('prepareFormData', () => {
  test('appends an existing File under the default `file` field', async () => {
    const file = new File(['payload'], 'a.txt', {
      type: 'text/plain'
    });
    const formData = await prepareFormData(file);
    const entry = formData.get('file');
    
    expect(entry).toBeInstanceOf(File);
    expect((entry as File).name).toBe('a.txt');
  });
  
  test('uses the supplied form field name', async () => {
    const file = new File(['x'], 'a.txt');
    const formData = await prepareFormData(file, 'attachment');
    
    expect(formData.get('attachment')).toBeInstanceOf(File);
    expect(formData.get('file')).toBeNull();
  });
  
  test('converts Blob input into a File before appending', async () => {
    const formData = await prepareFormData(new Blob(['x'], {
      type: 'text/plain'
    }));
    const entry = formData.get('file');
    
    expect(entry).toBeInstanceOf(File);
    expect((entry as File).type).toBe('text/plain');
  });
  
  test('converts base64 data url input into a File before appending', async () => {
    const formData = await prepareFormData('data:text/plain;base64,SGVsbG8=');
    const entry = formData.get('file');
    
    expect(entry).toBeInstanceOf(File);
    expect((entry as File).type).toBe('text/plain');
    
    const bytes = new Uint8Array(await (entry as File).arrayBuffer());
    
    expect(Array.from(bytes).map(v => String.fromCharCode(v)).join('')).toBe('Hello');
  });
});
