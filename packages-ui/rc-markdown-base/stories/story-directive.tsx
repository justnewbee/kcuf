import {
  ReactElement
} from 'react';

import {
  DIRECTIVE
} from './const';
import Demo from './demo';

export default function StoryDirective(): ReactElement {
  return <Demo {...{
    source: DIRECTIVE
  }} />;
}
