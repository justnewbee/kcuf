import {
  ReactElement
} from 'react';

import {
  HEADINGS
} from './const';
import Demo from './demo';

export default function StoryHeadings(): ReactElement {
  return <Demo {...{
    source: HEADINGS
  }} />;
}
