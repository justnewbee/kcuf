import {
  EQrStyle
} from './enum';
import Bitmask from './class/bitmask';
import {
  calculateContour
} from './util';

/**
 * This is the main callable method to render a bitmask into an SVG element using a specific render style.
 * The SVG element will be cleared, the viewBox will be adjusted as needed, and four path elements will be
 * created within containing the PDP inner and outer parts, dots, and other shapes.
 * See a few lines below for the list of valid styles.
 */
export default function render(bitmask: Bitmask, renderTarget: SVGElement, style: EQrStyle = EQrStyle.BASIC, margin = 1): void {
  renderTarget.setAttribute('viewBox', `0 0 ${bitmask.width + 2 * margin} ${bitmask.height + 2 * margin}`);
  
  while (renderTarget.firstChild) {
    renderTarget.firstChild.remove();
  }
  
  const contours = calculateContour(bitmask, margin, style);
  
  for (const contourType in contours) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    path.setAttribute('d', contours[contourType].join(''));
    // Add your customizations - e.g. `fill` colors, custom classes... - here.
    renderTarget.appendChild(path);
  }
}
