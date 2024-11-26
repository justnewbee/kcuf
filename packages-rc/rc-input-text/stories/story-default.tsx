import {
  ReactElement
} from 'react';

import {
  MinimalNormalize
} from '@kcuf/demo-rc';

import InputText from '../src';

export default function StoryDefault(): ReactElement {
  return <>
    <MinimalNormalize />
    <InputText />
  </>;
}
