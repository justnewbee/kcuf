import {
  ReactElement
} from 'react';

import CodemirrorProvider, {
  CodemirrorProps
} from '@kcuf-ui/codemirror-headless';

import CodemirrorUi from './ui';

export default function Codemirror(props: CodemirrorProps): ReactElement {
  return <CodemirrorProvider {...props}>
    <CodemirrorUi />
  </CodemirrorProvider>;
}

export type {
  CodemirrorProps
} from '@kcuf-ui/codemirror-headless';
