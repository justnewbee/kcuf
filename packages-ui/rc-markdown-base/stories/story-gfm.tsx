import {
  ReactElement
} from 'react';

import {
  GFM
} from './const';
import Demo from './demo';

export default function StoryGfm(): ReactElement {
  return <Demo {...{
    source: GFM
  }} />;
}
