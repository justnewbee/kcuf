import _uniq from 'lodash/uniq';

import splitClassNames from './split-class-names';

export default function getElementClassNames(el: Element): string[] {
  return _uniq(splitClassNames(el.className));
}
