import {
  ReactElement
} from 'react';

import {
  H1,
  Button
} from '@kcuf/demo-rc';

import FilePicker from '../src';

export default function StoryDefault(): ReactElement {
  return <>
    <H1>基础用法</H1>
    <FilePicker />
    <FilePicker>
      <Button>Test</Button>
    </FilePicker>
    <FilePicker accept="image/*">
      <Button>图片</Button>
    </FilePicker>
  </>;
}
