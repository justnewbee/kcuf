import {
  ReactElement
} from 'react';

import {
  useRefDom
} from '@kcuf-ui/codemirror-headless';

export default function CodemirrorUi(): ReactElement {
  const refDom = useRefDom();
  
  return <div ref={refDom} />;
}
