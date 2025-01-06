import _without from 'lodash/without';

import getElementClassNames from './get-element-class-names';

export default function fallbackElementRemoveClassNames(el: Element, classNames: string[]): void {
  el.className = _without(getElementClassNames(el), ...classNames).join(' ');
}
