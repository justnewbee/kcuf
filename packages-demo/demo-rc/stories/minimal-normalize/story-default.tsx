import {
  ReactElement
} from 'react';

import {
  MinimalNormalize
} from '../../src';

export default function StoryDefault(): ReactElement {
  return <>
    <MinimalNormalize />
    <p>
      MinimalNormalize normalizes the body typography, list styles and <a href="#">link</a> colors.
    </p>
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
    </ul>
  </>;
}
