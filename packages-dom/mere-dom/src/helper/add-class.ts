import {
  fallbackElementAddClassNames,
  splitClassNames
} from '../util';

export default function addClass(el: Element, className: string): void {
  const classNames = splitClassNames(className);
  
  if (!classNames.length) {
    return;
  }
  
  if (el.classList) {
    classNames.forEach(v => el.classList.add(v)); // classList.add 不允许加带空格的 className
  } else {
    fallbackElementAddClassNames(el, classNames);
  }
}
