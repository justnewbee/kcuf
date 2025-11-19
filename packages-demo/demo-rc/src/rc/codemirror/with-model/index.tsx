import {
  ReactElement
} from 'react';

import CodemirrorHeadless, {
  CodemirrorProps
} from '@kcuf-ui/codemirror-headless';

import Ui from '../ui';

export default function Codemirror(props: CodemirrorProps): ReactElement {
  return <CodemirrorHeadless {...props}>
    <Ui />
  </CodemirrorHeadless>;
}
