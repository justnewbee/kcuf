import _uniq from 'lodash/uniq';

import getElementClassNames from './get-element-class-names';

export default function fallbackElementAddClassNames(el: Element, classNames: string[]): void {
  const elementClassNames = getElementClassNames(el);
  
  el.className = _uniq([...elementClassNames, ...classNames]).join(' ');
}
