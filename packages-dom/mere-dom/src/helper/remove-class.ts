import {
  splitClassNames,
  fallbackElementRemoveClassNames
} from '../util';

/**
 * 删除 className
 */
export default function removeClass(el: Element, className: string): void {
  const classNames = splitClassNames(className);
  
  if (!classNames.length) {
    return;
  }
  
  if (el.classList) {
    classNames.forEach(v => el.classList.remove(v));
  } else {
    fallbackElementRemoveClassNames(el, classNames);
  }
}
