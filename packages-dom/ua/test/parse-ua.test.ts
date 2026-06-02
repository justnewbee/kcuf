import {
  describe,
  expect,
  test
} from 'vitest';

import {
  parseUa,
  UaOs,
  UaBrowser
} from '../src';

describe('parseUa - OS detection', () => {
  describe('Windows', () => {
    test('Windows 10 (NT 10.0)', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('10');
    });
    
    test('Windows 8.1 (NT 6.3)', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('8.1');
    });
    
    test('Windows 8 (NT 6.2)', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('8');
    });
    
    test('Windows 7 (NT 6.1)', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.76 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('7');
    });
    
    test('Windows Vista (NT 6.0)', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 6.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.0.0 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('Vista');
    });
    
    test('Windows XP (NT 5.1)', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 5.1; rv:52.0) Gecko/20100101 Firefox/52.0');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('XP');
    });
    
    test('Windows XP (NT 5.2)', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 5.2; Win64; x64) AppleWebKit/537.36');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('XP');
    });
    
    test('Windows 2000 (NT 5.0)', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 5.0; rv:30.0) Gecko/20100101 Firefox/30.0');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('2000');
    });
    
    test('Windows NT unknown version', () => {
      const result = parseUa('Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36');
      
      expect(result.OS).toBe(UaOs.WINDOWS);
      expect(result.OS_VERSION).toBe('NT 11.0');
    });
    
    test('Windows Phone', () => {
      const result = parseUa('Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 1520)');
      
      expect(result.OS).toBe(UaOs.WINDOWS_PHONE);
      expect(result.OS_VERSION).toBe('8.0');
    });
    
    test('Windows Mobile', () => {
      const result = parseUa('Opera/9.80 (Windows Mobile; Opera Mini/5.1.21594/37.6270; U; en) Presto/2.12.423 Version/12.16');
      
      expect(result.OS).toBe(UaOs.WINDOWS_MOBILE);
    });
  });
  
  describe('macOS', () => {
    test('macOS (dot-separated version)', () => {
      const result = parseUa('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:78.0) Gecko/20100101 Firefox/78.0');
      
      expect(result.OS).toBe(UaOs.MAC_OS);
      expect(result.OS_VERSION).toBe('10.15');
    });
    
    test('macOS (underscore-separated version)', () => {
      const result = parseUa('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15');
      
      expect(result.OS).toBe(UaOs.MAC_OS);
      expect(result.OS_VERSION).toBe('10.15.5');
    });
    
    test('macOS 12 Monterey', () => {
      const result = parseUa('Mozilla/5.0 (Macintosh; Intel Mac OS X 12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15');
      
      expect(result.OS).toBe(UaOs.MAC_OS);
      expect(result.OS_VERSION).toBe('12.6');
    });
    
    test('macOS 13 Ventura', () => {
      const result = parseUa('Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15');
      
      expect(result.OS).toBe(UaOs.MAC_OS);
      expect(result.OS_VERSION).toBe('13.0');
    });
  });
  
  describe('iOS', () => {
    test('iPhone iOS 11', () => {
      const result = parseUa('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
      
      expect(result.OS).toBe(UaOs.IOS);
      expect(result.OS_VERSION).toBe('11.0');
    });
    
    test('iPad iOS 14', () => {
      const result = parseUa('Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1');
      
      expect(result.OS).toBe(UaOs.IOS);
      expect(result.OS_VERSION).toBe('14.0');
    });
    
    test('iPhone iOS 16', () => {
      const result = parseUa('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1');
      
      expect(result.OS).toBe(UaOs.IOS);
      expect(result.OS_VERSION).toBe('16.0');
    });
    
    test('iPod touch', () => {
      const result = parseUa('Mozilla/5.0 (iPod touch; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/16A366 Safari/604.1');
      
      expect(result.OS).toBe(UaOs.IOS);
      expect(result.OS_VERSION).toBe('12.0');
    });
  });
  
  describe('Android', () => {
    test('Android 9', () => {
      const result = parseUa('Mozilla/5.0 (Linux; Android 9; SM-G960F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Mobile Safari/537.36');
      
      expect(result.OS).toBe(UaOs.ANDROID);
      expect(result.OS_VERSION).toBe('9');
    });
    
    test('Android 10', () => {
      const result = parseUa('Mozilla/5.0 (Linux; Android 10; SM-A505F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.127 Mobile Safari/537.36');
      
      expect(result.OS).toBe(UaOs.ANDROID);
      expect(result.OS_VERSION).toBe('10');
    });
    
    test('Android 12 tablet', () => {
      const result = parseUa('Mozilla/5.0 (Linux; Android 12; SM-T870) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.ANDROID);
      expect(result.OS_VERSION).toBe('12');
    });
  });
  
  describe('Linux distros', () => {
    test('Ubuntu', () => {
      const result = parseUa('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0');
      
      expect(result.OS).toBe(UaOs.UBUNTU);
    });
    
    test('Fedora', () => {
      const result = parseUa('Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:75.0) Gecko/20100101 Firefox/75.0');
      
      expect(result.OS).toBe(UaOs.FEDORA);
    });
    
    test('Generic Linux', () => {
      const result = parseUa('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.LINUX);
    });
  });
  
  describe('Chrome OS', () => {
    test('Chromebook', () => {
      const result = parseUa('Mozilla/5.0 (X11; CrOS x86_64 14268.67.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.111 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.CHROME_OS);
    });
  });
  
  describe('FreeBSD', () => {
    test('FreeBSD', () => {
      const result = parseUa('Mozilla/5.0 (X11; FreeBSD amd64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36');
      
      expect(result.OS).toBe(UaOs.FREE_BSD);
    });
  });
  
  describe('Other OS', () => {
    test('unknown OS', () => {
      const result = parseUa('SomeRobot/1.0 (compatible; SpecialDevice)');
      
      expect(result.OS).toBe(UaOs.OTHER);
      expect(result.OS_VERSION).toBe('');
    });
  });
});

describe('parseUa - Browser detection', () => {
  describe('Opera Mini', () => {
    test('Opera Mini on Windows Mobile', () => {
      const result = parseUa('Opera/9.80 (Windows Mobile; Opera Mini/5.1.21594/37.6270; U; en) Presto/2.12.423 Version/12.16');
      
      expect(result.BROWSER).toBe(UaBrowser.OPERA_MINI);
      expect(result.BROWSER_VERSION).toBe('5.1.21594/37.6270');
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
      expect(result.BROWSER_VERSION).toBe('11.0');
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
      
      // UC token appears first, so it should be UC
      expect(result.BROWSER).toBe(UaBrowser.UC);
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
