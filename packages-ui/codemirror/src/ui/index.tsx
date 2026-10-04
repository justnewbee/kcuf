import {
  ReactElement
} from 'react';

import {
  useDomRef
} from '@kcuf-ui/codemirror-headless';

export default function CodemirrorUi(): ReactElement {
  const domRef = useDomRef();
  
  return <div ref={domRef} />;
}
