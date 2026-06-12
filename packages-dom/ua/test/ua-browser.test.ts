import {
  describe,
  test,
  expect
} from 'vitest';

import {
  UaBrowser,
  parseUa
} from '../src';

describe('parseUa - Browser detection', () => {
  describe('Opera Mini', () => {
    test('Opera Mini on Windows Mobile', () => {
      const result = parseUa('Opera/9.80 (Windows Mobile; Opera Mini/5.1.21594/37.6270; U; en) Presto/2.12.423 Version/12.16');
      
      expect(result.BROWSER).toBe(UaBrowser.OPERA_MINI);
      expect(result.BROWSER_VERSION).toBe('5.1.21594');
    });
  });
  
  describe('Opera', () => {
    test('Opera legacy', () => {
      const result = parseUa('Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16.2');
      
      expect(result.BROWSER).toBe(UaBrowser.OPERA);
      expect(result.BROWSER_VERSION).toBe('12.16.2');
    });
    
    test('Opera embedded in Firefox UA', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 5.1; U; en; rv:1.8.1) Gecko/20061208 Firefox/2.0.0 Opera 9.50');
      
      expect(result.BROWSER).toBe(UaBrowser.OPERA);
    });
    
    test('Opera OPR (modern)', () => {
      const result = parseUa('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36 OPR/67.0.3575.79');
      
      expect(result.BROWSER).toBe(UaBrowser.OPERA);
      expect(result.BROWSER_VERSION).toBe('67.0.3575.79');
    });
    
    test('Opera on Windows 10', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 OPR/95.0.0.0');
      
      expect(result.BROWSER).toBe(UaBrowser.OPERA);
      expect(result.BROWSER_VERSION).toBe('95.0.0.0');
    });
  });
  
  describe('Firefox', () => {
    test('Firefox on macOS', () => {
      const result = parseUa('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.16; rv:85.0) Gecko/20100101 Firefox/85.0');
      
      expect(result.BROWSER).toBe(UaBrowser.FIREFOX);
      expect(result.BROWSER_VERSION).toBe('85.0');
    });
    
    test('Firefox on Windows', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0');
      
      expect(result.BROWSER).toBe(UaBrowser.FIREFOX);
      expect(result.BROWSER_VERSION).toBe('115.0');
    });
    
    test('Firefox on Linux', () => {
      const result = parseUa('Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0');
      
      expect(result.BROWSER).toBe(UaBrowser.FIREFOX);
      expect(result.BROWSER_VERSION).toBe('78.0');
    });
    
    test('Firefox on Android', () => {
      const result = parseUa('Mozilla/5.0 (Android 12; Mobile; rv:109.0) Gecko/113.0 Firefox/113.0');
      
      expect(result.BROWSER).toBe(UaBrowser.FIREFOX);
      expect(result.BROWSER_VERSION).toBe('113.0');
    });
    
    test('Firefox on iOS', () => {
      const result = parseUa('Mozilla/5.0 (iPhone; CPU iPhone OS 16_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/111.0 Mobile/15E148 Safari/604.1');
      
      expect(result.BROWSER).toBe(UaBrowser.FIREFOX);
      expect(result.BROWSER_VERSION).toBe('111.0');
    });
  });
  
  describe('Safari', () => {
    test('Safari on macOS', () => {
      const result = parseUa('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15');
      
      expect(result.BROWSER).toBe(UaBrowser.SAFARI);
      expect(result.BROWSER_VERSION).toBe('13.1.1');
    });
    
    test('Safari on iOS (iPhone)', () => {
      const result = parseUa('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1');
      
      expect(result.BROWSER).toBe(UaBrowser.SAFARI);
      expect(result.BROWSER_VERSION).toBe('14.0');
    });
    
    test('Safari on iOS (iPad)', () => {
      const result = parseUa('Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1');
      
      expect(result.BROWSER).toBe(UaBrowser.SAFARI);
      expect(result.BROWSER_VERSION).toBe('15.0');
    });
    
    test('Safari 16 on macOS Ventura', () => {
      const result = parseUa('Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15');
      
      expect(result.BROWSER).toBe(UaBrowser.SAFARI);
      expect(result.BROWSER_VERSION).toBe('16.1');
    });
  });
  
  describe('Edge', () => {
    test('Edge (Chromium) on Windows 10', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0');
      
      expect(result.BROWSER).toBe(UaBrowser.EDGE);
      expect(result.BROWSER_VERSION).toBe('120.0.0.0');
    });
    
    test('Edge (Chromium) on macOS', () => {
      const result = parseUa('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0');
      
      expect(result.BROWSER).toBe(UaBrowser.EDGE);
      expect(result.BROWSER_VERSION).toBe('120.0.0.0');
    });
    
    test('Edge legacy (EdgeHTML)', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.17763');
      
      expect(result.BROWSER).toBe(UaBrowser.EDGE);
      expect(result.BROWSER_VERSION).toBe('18.17763');
    });
    
    test('Edge on Android', () => {
      const result = parseUa('Mozilla/5.0 (Linux; Android 10; HD1913) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.86 Mobile Safari/537.36 EdgA/109.0.1518.70');
      
      expect(result.BROWSER).toBe(UaBrowser.EDGE);
      expect(result.BROWSER_VERSION).toBe('109.0.1518.70');
    });
    
    test('Edge on iOS', () => {
      const result = parseUa('Mozilla/5.0 (iPhone; CPU iPhone OS 16_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 EdgiOS/109.0.1518.70 Mobile/15E148 Safari/604.1');
      
      expect(result.BROWSER).toBe(UaBrowser.EDGE);
      expect(result.BROWSER_VERSION).toBe('109.0.1518.70');
    });
  });
  
  describe('IE', () => {
    test('IE 11', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko');
      
      expect(result.BROWSER).toBe(UaBrowser.IE);
      expect(result.BROWSER_VERSION).toBe('11');
    });
    
    test('IE 10', () => {
      const result = parseUa('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)');
      
      expect(result.BROWSER).toBe(UaBrowser.IE);
      expect(result.BROWSER_VERSION).toBe('10.0');
    });
    
    test('IE 9', () => {
      const result = parseUa('Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 7.1; Trident/5.0)');
      
      expect(result.BROWSER).toBe(UaBrowser.IE);
      expect(result.BROWSER_VERSION).toBe('9.0');
    });
    
    test('IE 8', () => {
      const result = parseUa('Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)');
      
      expect(result.BROWSER).toBe(UaBrowser.IE);
      expect(result.BROWSER_VERSION).toBe('8.0');
    });
  });
  
  describe('Chrome', () => {
    test('Chrome on Windows', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      
      expect(result.BROWSER).toBe(UaBrowser.CHROME);
      expect(result.BROWSER_VERSION).toBe('120.0.0.0');
    });
    
    test('Chrome on macOS', () => {
      const result = parseUa('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      
      expect(result.BROWSER).toBe(UaBrowser.CHROME);
      expect(result.BROWSER_VERSION).toBe('120.0.0.0');
    });
    
    test('Chrome on Linux', () => {
      const result = parseUa('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36');
      
      expect(result.BROWSER).toBe(UaBrowser.CHROME);
      expect(result.BROWSER_VERSION).toBe('88.0.4324.96');
    });
    
    test('Chrome on Android', () => {
      const result = parseUa('Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.127 Mobile Safari/537.36');
      
      expect(result.BROWSER).toBe(UaBrowser.CHROME);
      expect(result.BROWSER_VERSION).toBe('85.0.4183.127');
    });
    
    test('Chrome on iOS', () => {
      const result = parseUa('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/109.0.5414.83 Mobile/15E148 Safari/604.1');
      
      expect(result.BROWSER).toBe(UaBrowser.CHROME);
      expect(result.BROWSER_VERSION).toBe('109.0.5414.83');
    });
  });
  
  describe('Headless Chrome', () => {
    test('HeadlessChrome', () => {
      const result = parseUa('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/96.0.4664.45 Safari/537.36');
      
      expect(result.BROWSER).toBe(UaBrowser.HEADLESS_CHROME);
      expect(result.BROWSER_VERSION).toBe('96.0.4664.45');
    });
  });
  
  describe('Yandex Browser', () => {
    test('YaBrowser on macOS', () => {
      const result = parseUa('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 YaBrowser/20.2.0.1145 Yowser/2.5 Safari/537.36');
      
      expect(result.BROWSER).toBe(UaBrowser.YANDEX);
      expect(result.BROWSER_VERSION).toBe('20.2.0.1145');
    });
    
    test('YaBrowser on Windows', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 YaBrowser/19.9.2.195 Yowser/2.5 Safari/537.36');
      
      expect(result.BROWSER).toBe(UaBrowser.YANDEX);
      expect(result.BROWSER_VERSION).toBe('19.9.2.195');
    });
  });
  
  describe('UC Browser', () => {
    test('UC Browser on Android', () => {
      const result = parseUa('Mozilla/5.0 (Linux; U; Android 9; en-US; Redmi Note 8 Build/PKQ1.190616.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 UCBrowser/13.0.0.1288 Mobile Safari/537.36');
      
      expect(result.BROWSER).toBe(UaBrowser.UC);
      expect(result.BROWSER_VERSION).toBe('13.0.0.1288');
    });
  });
  
  describe('QQ Browser', () => {
    test('QQ Browser on Windows', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 QQBrowser/9.6.11930.400');
      
      expect(result.BROWSER).toBe(UaBrowser.QQ);
      expect(result.BROWSER_VERSION).toBe('9.6.11930.400');
    });
    
    test('QQ Browser on Android', () => {
      const result = parseUa('Mozilla/5.0 (Linux; U; Android 8.1.0; zh-CN; EML-AL00 Build/HUAWEIEML-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/11.9.4.974 UWS/2.13.1.48 Mobile Safari/537.36 UCBS/2.13.1.48_190516105248 ChannelId(?) COVC/045 MQQBrowser/6.2 Mobile');
      
      expect(result.BROWSER).toBe(UaBrowser.QQ);
    });
  });
  
  describe('Maxthon', () => {
    test('Maxthon on Windows', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Maxthon/5.3.8.2000 Chrome/55.0.2883.87 Safari/537.36');
      
      expect(result.BROWSER).toBe(UaBrowser.MAXTHON);
      expect(result.BROWSER_VERSION).toBe('5.3.8.2000');
    });
  });
  
  describe('Other browser', () => {
    test('unknown browser', () => {
      const result = parseUa('SomeRobot/1.0 (compatible; SpecialDevice)');
      
      expect(result.BROWSER).toBe(UaBrowser.OTHER);
      expect(result.BROWSER_VERSION).toBe('');
    });
  });
});
