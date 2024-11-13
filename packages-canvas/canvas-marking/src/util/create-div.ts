export default function createDiv(className: string, html?: string): HTMLDivElement {
  const div = document.createElement('div');
  
  div.className = className;
  
  if (html) {
    div.innerHTML = html;
  }
  
  return div;
}
