import {
  ReactElement
} from 'react';

import {
  MD_HEADINGS
} from './const';
import Demo from './demo';

export default function StoryHeadings(): ReactElement {
  return <Demo {...{
    source: MD_HEADINGS
  }} />;
}
