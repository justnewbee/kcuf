import {
  splitClassNames,
  getElementClassNames
} from '../util';

export default function hasClass(el: Element, className: string): boolean {
  const classNames = splitClassNames(className);
  
  if (!classNames) {
    return false;
  }
  
  if (el.classList) {
    return classNames.every(v => el.classList.contains(v));
  }
  
  const elementClassNames = getElementClassNames(el);
  
  return classNames.every(vv => elementClassNames.includes(vv));
}
