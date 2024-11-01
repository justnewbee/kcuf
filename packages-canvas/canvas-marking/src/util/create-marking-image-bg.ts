import createDiv from './create-div';

const CLASS = 'marking-bg-image';
const CSS = `position: absolute;
background-size: contain;
background-repeat: no-repeat;
pointer-events: none;`;

export default function createMarkingImageBg(imageBgc?: string): HTMLDivElement {
  const divImageBg = createDiv(CLASS);
  
  divImageBg.style.cssText = CSS;
  divImageBg.style.backgroundColor = imageBgc || 'transparent';
  
  return divImageBg;
}