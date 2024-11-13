export default function createStatsStyle(stage: HTMLDivElement): string {
  const style = document.createElement('style');
  const className = `marking-stats-${Date.now()}`;
  
  stage.appendChild(style);
  
  style.innerHTML = `.${className} {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 186px;
  background-color: hsl(0 0% 0% / 80%);
  color: hsl(0 0% 100%);
  font-family: Arial, sans-serif;
  font-variant-numeric: slashed-zero;
  font-size: 10px;
  pointer-events: none;
  z-index: 10;
}
.${className} ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.${className} ul li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 17px;
  padding: 0 6px;
  border-bottom: 1px solid hsl(0 0% 100% / 17%);
}
.${className} ul li .label {
  margin-right: 8px;
  opacity: 0.67;
  font-weight: 200;
}`;
  
  return className;
}
