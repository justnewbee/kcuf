import {
  ReactElement
} from 'react';

import {
  MinimalNormalize
} from '@kcuf/demo-rc';

import ShowMeBackdrop from './rc/show-me-backdrop';

export default function StoryAll(): ReactElement {
  return <>
    <MinimalNormalize />
    <ShowMeBackdrop />
    <ShowMeBackdrop />
    <ShowMeBackdrop />
    <ShowMeBackdrop />
  </>;
}