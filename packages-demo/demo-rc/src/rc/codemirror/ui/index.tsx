import {
  ReactElement
} from 'react';

import {
  useDomRef
} from '@kcuf-ui/codemirror-headless';

export default function Ui(): ReactElement {
  const domRef = useDomRef();
  
  return <div ref={domRef} />;
}
