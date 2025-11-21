/**
 * 加载 CSS 文件
 */
export default function loadCss(url: string): void {
  const el = document.createElement('link');
  
  el.rel = 'stylesheet';
  el.href = url;
  
  document.head.appendChild(el);
}
