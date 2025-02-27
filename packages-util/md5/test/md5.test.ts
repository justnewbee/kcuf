import path from 'node:path';
import fs from 'node:fs';

import {
  describe,
  expect,
  test
} from 'vitest';

import md5, {
  md5String,
  md5Buffer,
  md5Blob,
  md5Uint8Array,
  md5Json
} from '../src';

// https://www.md5hashgenerator.com/
// https://checksumchecker.com
describe('md5', () => {
  test('input empty', () => {
    expect(md5(null)).toBe('');
    expect(md5(undefined)).toBe('');
    expect(md5('')).toBe('');
  });
  
  test('input not string', () => {
    expect(md5(0)).toBe('cfcd208495d565ef66e7dff9f98764da');
    expect(md5(1)).toBe('c4ca4238a0b923820dcc509a6f75849b');
    expect(md5(false)).toBe('68934a3e9455fa72420237eb05902327');
  });
  
  test('input simple strings', () => {
    expect(md5('undefined')).toBe('5e543256c480ac577d30f76f9120eb74');
    expect(md5String('undefined')).toBe('5e543256c480ac577d30f76f9120eb74');
    expect(md5('null')).toBe('37a6259cc0c1dae299a7866489dff0bd');
    expect(md5String('null')).toBe('37a6259cc0c1dae299a7866489dff0bd');
    expect(md5(' ')).toBe('7215ee9c7d9dc229d2921a40e899ec5f');
    expect(md5String(' ')).toBe('7215ee9c7d9dc229d2921a40e899ec5f');
    expect(md5('0')).toBe('cfcd208495d565ef66e7dff9f98764da');
    expect(md5String('0')).toBe('cfcd208495d565ef66e7dff9f98764da');
    expect(md5('1')).toBe('c4ca4238a0b923820dcc509a6f75849b');
    expect(md5String('1')).toBe('c4ca4238a0b923820dcc509a6f75849b');
    expect(md5('false')).toBe('68934a3e9455fa72420237eb05902327');
    expect(md5String('false')).toBe('68934a3e9455fa72420237eb05902327');
    expect(md5('1 ')).toBe('9d9dff9320e27082b15b4ed7a086ba83');
    expect(md5String('1 ')).toBe('9d9dff9320e27082b15b4ed7a086ba83');
    expect(md5('11')).toBe('6512bd43d9caa6e02c990b0a82652dca');
    expect(md5String('11')).toBe('6512bd43d9caa6e02c990b0a82652dca');
    expect(md5('123')).toBe('202cb962ac59075b964b07152d234b70');
    expect(md5String('123')).toBe('202cb962ac59075b964b07152d234b70');
    expect(md5('hello md5')).toBe('741fc6b1878e208346359af502dd11c5');
    expect(md5String('hello md5')).toBe('741fc6b1878e208346359af502dd11c5');
    expect(md5('message')).toBe('78e731027d8fd50ed642340b7c9a63b3');
    expect(md5String('message')).toBe('78e731027d8fd50ed642340b7c9a63b3');
  });
  
  test('input string non-ascii', () => {
    expect(md5('中文')).toBe('a7bac2239fcdcb3a067903d8077c4a07');
    expect(md5String('中文')).toBe('a7bac2239fcdcb3a067903d8077c4a07');
    expect(md5('🤪💥')).toBe('b4a4b7b68cf6275c3d026202439b4654');
    expect(md5String('🤪💥')).toBe('b4a4b7b68cf6275c3d026202439b4654');
  });
  
  test('long string', () => {
    expect(md5('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.')).toBe('01aad0e51fcd5582b307613842e4ffe5');
    expect(md5String('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.')).toBe('01aad0e51fcd5582b307613842e4ffe5');
  });
  
  test('input string multi lines', () => {
    expect(md5(`丽丽一声操\r\n一是一口入\r\n也很少不禁\r\n侧翻床有啥`)).toBe('ac90f1dd3cf4af775d857f52233203ea');
    expect(md5String(`丽丽一声操\r\n一是一口入\r\n也很少不禁\r\n侧翻床有啥`)).toBe('ac90f1dd3cf4af775d857f52233203ea');
    expect(md5(`离离原上草\n一岁一枯荣\n野火烧不尽\n春风吹又生`)).toBe('34689eb69cfbe7c369ecfe2eff2d150d');
    expect(md5String(`离离原上草\n一岁一枯荣\n野火烧不尽\n春风吹又生`)).toBe('34689eb69cfbe7c369ecfe2eff2d150d');
  });
  
  test('input Buffer', () => {
    expect(md5(Buffer.from('ascii 1234'))).toBe(md5('ascii 1234'));
    expect(md5Buffer(Buffer.from('ascii 1234'))).toBe(md5('ascii 1234'));
    expect(md5(Buffer.from('unicode áßäöü'))).toBe(md5('unicode áßäöü'));
    expect(md5Buffer(Buffer.from('unicode áßäöü'))).toBe(md5('unicode áßäöü'));
    expect(md5(Buffer.from('unicode 一二三四'))).toBe(md5('unicode 一二三四'));
    expect(md5Buffer(Buffer.from('unicode 一二三四'))).toBe(md5('unicode 一二三四'));
    expect(md5(Buffer.from('unicode 💥🚨'))).toBe(md5('unicode 💥🚨'));
    expect(md5Buffer(Buffer.from('unicode 💥🚨'))).toBe(md5('unicode 💥🚨'));
  });
  
  test('input ArrayBuffer / Uint8Array', () => {
    const arrayBuffer = new ArrayBuffer(5);
    const uint8Array = new Uint8Array(arrayBuffer);
    
    uint8Array[0] = 'H'.charCodeAt(0);
    uint8Array[1] = 'e'.charCodeAt(0);
    uint8Array[2] = 'l'.charCodeAt(0);
    uint8Array[3] = 'l'.charCodeAt(0);
    uint8Array[4] = 'o'.charCodeAt(0);
    
    expect(md5(arrayBuffer)).toBe(md5String('Hello'));
    expect(md5Buffer(arrayBuffer)).toBe(md5String('Hello'));
    expect(md5Uint8Array(uint8Array)).toBe(md5String('Hello'));
  });
  
  test('input Uint8Array', () => {
    const textEncoder = new TextEncoder();
    
    expect(md5(textEncoder.encode('ascii 1234'))).toBe(md5('ascii 1234'));
    expect(md5(textEncoder.encode('unicode áßäöü'))).toBe(md5('unicode áßäöü'));
    expect(md5(textEncoder.encode('unicode 一二三四'))).toBe(md5('unicode 一二三四'));
    expect(md5(textEncoder.encode('unicode 💥🚨'))).toBe(md5('unicode 💥🚨'));
  });
  
  test('input File', () => {
    const buffer = fs.readFileSync(path.resolve(process.cwd(), './.babelrc.js'));
    
    expect(md5(buffer)).toBe('6899acd13b43fe461065e18ca4e42fb9');
    expect(md5Buffer(buffer)).toBe('6899acd13b43fe461065e18ca4e42fb9');
  });
  
  test('input Blob', async () => {
    expect(await md5Blob(new Blob(['Hello, World!'], {
      type: 'text/plain'
    }))).toBe(md5('Hello, World!'));
    expect(await md5Blob(new Blob(['unicode 💥🚨'], {
      type: 'text/plain'
    }))).toBe(md5('unicode 💥🚨'));
  });
  
  test('input Json', async () => {
    expect(md5Json(null)).toBe(md5String('null'));
    expect(md5Json({
      a: 12,
      b: 'bb'
    })).toBe('400db423bcf794e087ac1e743e4a0787');
    expect(md5Json({
      a: 12,
      b: 'bb'
    })).toBe(md5String('{"a":12,"b":"bb"}'));
    expect(md5Json({
      a: 12,
      b: 'bb'
    })).toBe(md5Json({
      a: 12,
      b: 'bb'
    }));
    expect(md5Json([])).toBe(md5String('[]'));
    expect(md5Json([1, 2, 'a', true, []])).toBe(md5String('[1,2,"a",true,[]]'));
  });
});
