import createDomDiv from './create-dom-div';

const CLASS = 'marking-bg-image';
const CSS = `position: absolute;
background-size: contain;
background-repeat: no-repeat;
pointer-events: none;`;

export default function createDomImageBg(imageBgc?: string): HTMLDivElement {
  const divImageBg = createDomDiv(CLASS);
  
  divImageBg.style.cssText = CSS;
  divImageBg.style.backgroundColor = imageBgc || 'transparent';
  
  return divImageBg;
}
