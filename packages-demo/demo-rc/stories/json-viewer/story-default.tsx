import {
  ReactElement
} from 'react';

import {
  JsonViewer
} from '../../src';

export default function StoryDefault(): ReactElement {
  return <>
    <JsonViewer o="hello string" />
  </>;
}