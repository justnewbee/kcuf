import loadJs from './load-js';
import loadCss from './load-css';

/**
 * 加载 JS/CSS 文件
 */
export default function loadAssets(urls: string[]): void {
  urls.forEach(url => {
    if (url.endsWith('.css')) {
      loadCss(url);
    } else {
      loadJs(url);
    }
  });
}
