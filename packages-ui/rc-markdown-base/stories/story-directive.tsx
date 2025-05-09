import {
  ReactElement
} from 'react';

import {
  MD_DIRECTIVE
} from './const';
import Demo from './demo';

export default function StoryDirective(): ReactElement {
  return <Demo {...{
    source: MD_DIRECTIVE
  }} />;
}
