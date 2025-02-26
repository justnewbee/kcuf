import path from 'node:path';
import fs from 'node:fs';

import {
  describe,
  expect,
  test
} from 'vitest';

import md5 from '../src';

// https://www.md5hashgenerator.com/
// https://checksumchecker.com
describe('md5', () => {
  test('input simple strings', () => {
    expect(md5('undefined')).toBe('5e543256c480ac577d30f76f9120eb74');
    expect(md5('null')).toBe('37a6259cc0c1dae299a7866489dff0bd');
    expect(md5(' ')).toBe('7215ee9c7d9dc229d2921a40e899ec5f');
    expect(md5('1')).toBe('c4ca4238a0b923820dcc509a6f75849b');
    expect(md5('1 ')).toBe('9d9dff9320e27082b15b4ed7a086ba83');
    expect(md5('11')).toBe('6512bd43d9caa6e02c990b0a82652dca');
    expect(md5('123')).toBe('202cb962ac59075b964b07152d234b70');
    expect(md5('hello md5')).toBe('741fc6b1878e208346359af502dd11c5');
    expect(md5('message')).toBe('78e731027d8fd50ed642340b7c9a63b3');
  });
  
  test('input string non-ascii', () => {
    expect(md5('中文')).toBe('a7bac2239fcdcb3a067903d8077c4a07');
    expect(md5('🤪💥')).toBe('b4a4b7b68cf6275c3d026202439b4654');
  });
  
  test('long string', () => {
    expect(md5('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.')).toBe('01aad0e51fcd5582b307613842e4ffe5');
  });
  
  test('input string multi lines', () => {
    expect(md5(`丽丽一声操\r\n一是一口入\r\n也很少不禁\r\n侧翻床有啥`)).toBe('ac90f1dd3cf4af775d857f52233203ea');
    expect(md5(`离离原上草\n一岁一枯荣\n野火烧不尽\n春风吹又生`)).toBe('34689eb69cfbe7c369ecfe2eff2d150d');
  });
  
  test('input Buffer', () => {
    expect(md5(Buffer.from('ascii 1234'))).toBe(md5('ascii 1234'));
    expect(md5(Buffer.from('unicode áßäöü'))).toBe(md5('unicode áßäöü'));
    expect(md5(Buffer.from('unicode 一二三四'))).toBe(md5('unicode 一二三四'));
    expect(md5(Buffer.from('unicode 💥🚨'))).toBe(md5('unicode 💥🚨'));
  });
  
  test('input ArrayBuffer', () => {
    const buffer = Buffer.from('message áßäöü', 'utf8');

    expect(md5(buffer)).toBe(md5('message áßäöü'));
  });
  
  test('input Uint8Array', () => {
    const textEncoder = new TextEncoder();
    
    expect(md5(textEncoder.encode('ascii 1234'))).toBe(md5('ascii 1234'));
    expect(md5(textEncoder.encode('unicode áßäöü'))).toBe(md5('unicode áßäöü'));
    expect(md5(textEncoder.encode('unicode 一二三四'))).toBe(md5('unicode 一二三四'));
    expect(md5(textEncoder.encode('unicode 💥🚨'))).toBe(md5('unicode 💥🚨'));
  });
  
  test('input File', () => {
    expect(md5(fs.readFileSync(path.resolve(process.cwd(), './.babelrc.js')))).toBe('6899acd13b43fe461065e18ca4e42fb9');
  });
  
  // test('input Blob', () => {
  //   expect(md5(new Blob(['Hello, World!'], {
  //     type: 'text/plain'
  //   }))).toBe('0b867e53c1d233ce9fe49d54549a2323');
  //   expect(md5('[object Blob]')).toBe('0b867e53c1d233ce9fe49d54549a2323');
  // });
});
