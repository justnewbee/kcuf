import {
  describe,
  test,
  expect
} from 'vitest';

import {
  UaOs,
  UaBrowser,
  parseUa
} from '../src';

describe('parseUa - OS + Browser combined', () => {
  test('Chrome on Windows 10', () => {
    const result = parseUa('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    expect(result.OS).toBe(UaOs.WINDOWS);
    expect(result.OS_VERSION).toBe('10');
    expect(result.BROWSER).toBe(UaBrowser.CHROME);
    expect(result.BROWSER_VERSION).toBe('120.0.0.0');
  });
  
  test('Safari on macOS', () => {
    const result = parseUa('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15');
    
    expect(result.OS).toBe(UaOs.MAC_OS);
    expect(result.OS_VERSION).toBe('10.15.5');
    expect(result.BROWSER).toBe(UaBrowser.SAFARI);
    expect(result.BROWSER_VERSION).toBe('13.1.1');
  });
  
  test('Firefox on Ubuntu Linux', () => {
    const result = parseUa('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0');
    
    expect(result.OS).toBe(UaOs.UBUNTU);
    expect(result.BROWSER).toBe(UaBrowser.FIREFOX);
    expect(result.BROWSER_VERSION).toBe('88.0');
  });
  
  test('Chrome on Android', () => {
    const result = parseUa('Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.127 Mobile Safari/537.36');
    
    expect(result.OS).toBe(UaOs.ANDROID);
    expect(result.OS_VERSION).toBe('10');
    expect(result.BROWSER).toBe(UaBrowser.CHROME);
    expect(result.BROWSER_VERSION).toBe('85.0.4183.127');
  });
  
  test('Safari on iPhone iOS', () => {
    const result = parseUa('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1');
    
    expect(result.OS).toBe(UaOs.IOS);
    expect(result.OS_VERSION).toBe('14.0');
    expect(result.BROWSER).toBe(UaBrowser.SAFARI);
    expect(result.BROWSER_VERSION).toBe('14.0');
  });
  
  test('Edge on Windows 10', () => {
    const result = parseUa('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0');
    
    expect(result.OS).toBe(UaOs.WINDOWS);
    expect(result.OS_VERSION).toBe('10');
    expect(result.BROWSER).toBe(UaBrowser.EDGE);
    expect(result.BROWSER_VERSION).toBe('120.0.0.0');
  });
  
  test('IE 11 on Windows 7', () => {
    const result = parseUa('Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko');
    
    expect(result.OS).toBe(UaOs.WINDOWS);
    expect(result.OS_VERSION).toBe('7');
    expect(result.BROWSER).toBe(UaBrowser.IE);
    expect(result.BROWSER_VERSION).toBe('11');
  });
  
  test('Opera on ChromeOS', () => {
    const result = parseUa('Mozilla/5.0 (X11; CrOS x86_64 14268.67.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.111 Safari/537.36 OPR/82.0.4227.43');
    
    expect(result.OS).toBe(UaOs.CHROME_OS);
    expect(result.BROWSER).toBe(UaBrowser.OPERA);
    expect(result.BROWSER_VERSION).toBe('82.0.4227.43');
  });
});
