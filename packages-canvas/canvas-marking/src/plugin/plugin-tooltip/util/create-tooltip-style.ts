export default function createTooltipStyle(stage: HTMLDivElement): string {
  const style = document.createElement('style');
  const className = `marking-tooltip-${Date.now()}`;
  
  stage.appendChild(style);
  
  style.innerHTML = `.${className} {
  display: none;
  position: absolute;
  padding: 2px 8px;
  border-radius: 3px;
  background-color: hsl(0 0% 0% / 66%);
  color: hsl(0 0% 100%);
  line-height: 1.6;
  font-size: 11px;
  font-weight: 200;
  white-space: pre-wrap;
  user-select: none;
  z-index: 10;
  opacity: 0;
  transition: opacity 400ms ease-in-out;
}
.${className}.is-visible {
  opacity: 1;
}
.${className}.is-crossing {
  background-color: hsl(0 100% 35% / 75%);
}
.${className} strong {
  color: hsl(210 100% 80%);
}
.${className} em {
  font-style: normal;
  color: hsl(24 100% 50%);
}
.${className} .extra-info {
  margin-bottom: 4px;
  padding-bottom: 2px;
  border-bottom: 1px solid hsl(0 0% 100% / 33%);
}`;
  
  return className;
}
