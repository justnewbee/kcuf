import {
  EUaBrowser
} from '../enum';

/**
 * Opera、Safari 会用 Version/xx 来表示浏览器的版本
 */
function getVersion(fallback: string, ua: string): string {
  const arr = /Version\/([^ /;()]+)/i.exec(ua);
  
  if (arr) {
    return arr[1] ?? fallback;
  }
  
  return fallback;
}

/**
 * 从 UA 中获取浏览器信息，不需要精确，覆盖 95% 即可
 *
 * 注意顺序不要轻易改
 */
export default function parseUaBrowser(ua: string): [EUaBrowser, string] {
  let execMatchArr: RegExpExecArray | null;
  
  // OperaMini
  // Opera/9.80 (Windows Mobile; Opera Mini/5.1.21594/37.6270; U; en) Presto/2.12.423 Version/12.16
  execMatchArr = /Opera Mini\/([^ /;()]+)/i.exec(ua);
  
  if (execMatchArr) {
    return [EUaBrowser.OPERA_MINI, execMatchArr[1] ?? ''];
  }
  
  // e.g. Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16.2
  // e.g. Mozilla/5.0 (Windows NT 5.1; U; en; rv:1.8.1) Gecko/20061208 Firefox/2.0.0 Opera 9.50
  execMatchArr = /Opera[/ ]([^ /;()]+)/i.exec(ua);
  
  if (execMatchArr) {
    return [EUaBrowser.OPERA, getVersion(execMatchArr[1] ?? '', ua)];
  }
  
  // Opera
  // e.g. Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36 OPR/67.0.3575.79
  execMatchArr = /OPR\/([^ /;()]+)/i.exec(ua);
  
  if (execMatchArr) {
    return [EUaBrowser.OPERA, execMatchArr[1] ?? ''];
  }
  
  // Firefox
  // e.g. Mozilla/5.0 (Macintosh; Intel Mac OS X 10.16; rv:85.0) Gecko/20100101 Firefox/85.0
  execMatchArr = /Firefox\/([^ /;()]+)/i.exec(ua);
  
  if (execMatchArr) {
    return [EUaBrowser.FIREFOX, execMatchArr[1] ?? ''];
  }
  
  // Safari
  // e.g. Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15
  execMatchArr = /Version\/([\w.]+)\s+Safari\//i.exec(ua); // 不要拆开，因为太多浏览器里边有 Safari 了
  
  if (execMatchArr) {
    return [EUaBrowser.SAFARI, execMatchArr[1] ?? ''];
  }
  
  // Yandex
  // e.g. Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 YaBrowser/20.2.0.1145 Yowser/2.5 Safari/537.36
  execMatchArr = /YaBrowser\/([^ /;()]+)/i.exec(ua);
  
  if (execMatchArr) {
    return [EUaBrowser.YANDEX, execMatchArr[1] ?? ''];
  }
  
  // 淘宝
  // e.g. Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.11 TaoBrowser/2.0 Safari/536.11
  execMatchArr = /TaoBrowser\/([^ /;()]+)/i.exec(ua);
  
  if (execMatchArr) {
    return [EUaBrowser.TAO_BAO, execMatchArr[1] ?? ''];
  }
  
  // 猎豹
  // e.g. Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER
  if (/LBBROWSER/i.test(ua)) {
    return [EUaBrowser.LIE_BAO, ''];
  }
  
  // QQ
  // e.g. Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; .... QQBrowser/7.0.3698.400)
  execMatchArr = /QQBrowser\/([^ /;()]+)/i.exec(ua);
  
  if (execMatchArr) {
    return [EUaBrowser.QQ, execMatchArr[1] ?? ''];
  }
  
  // 搜狗
  // e.g. Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.84 Safari/535.11 SE 2.X MetaSr 1.0
  execMatchArr = /\sSE\s([^ /;()]+)/i.exec(ua);
  
  if (execMatchArr) {
    return [EUaBrowser.SOU_GOU, execMatchArr[1] ?? ''];
  }
  
  // 傲游
  // Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Maxthon/4.4.3.4000 Chrome/30.0.1599.101 Safari/537.36
  execMatchArr = /Maxthon\/([^ /;()]+)/i.exec(ua);
  
  if (execMatchArr) {
    return [EUaBrowser.MAXTHON, execMatchArr[1] ?? ''];
  }
  
  // UC
  // e.g. Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 UBrowser/4.0.3214.0 Safari/537.36
  execMatchArr = /UBrowser\/([^ /;()]+)/i.exec(ua);
  
  if (execMatchArr) {
    return [EUaBrowser.UC, execMatchArr[1] ?? ''];
  }
  
  // HeadlessChrome
  // e.g. Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/69.0.3494.0 Safari/537.36
  execMatchArr = /HeadlessChrome\/([^ /;()]+)/i.exec(ua);
  
  if (execMatchArr) {
    return [EUaBrowser.HEADLESS_CHROME, execMatchArr[1] ?? ''];
  }
  
  // Edge
  // e.g. Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18363
  // e.g. Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36 Edg/89.0.774.48
  execMatchArr = /Edge?\/([^ /;()]+)/i.exec(ua);
  
  if (execMatchArr) {
    return [EUaBrowser.EDGE, execMatchArr[1] ?? ''];
  }
  
  // IE11
  // e.g. Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko
  if (/Trident\/7\.0;/i.test(ua)) {
    return [EUaBrowser.IE, '11'];
  }
  
  // e.g. Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko
  execMatchArr = /MSIE\s+([^ /;()]+)/i.exec(ua);
  
  if (execMatchArr) {
    return [EUaBrowser.IE, execMatchArr[1] ?? ''];
  }
  
  // Chrome
  // 几乎所有基于它的都会被判成 Chrome...
  // e.g. Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36
  execMatchArr = /\sChrome\/([^ /;()]+)/i.exec(ua);
  
  if (execMatchArr) {
    return [EUaBrowser.CHROME, execMatchArr[1] ?? ''];
  }
  
  return [EUaBrowser.OTHER, ''];
}
