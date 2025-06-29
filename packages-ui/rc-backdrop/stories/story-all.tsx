import {
  ReactElement
} from 'react';

import {
  LongArticle
} from '@kcuf/demo-rc';

import ShowMeBackdrop from './rc/show-me-backdrop';

export default function StoryAll(): ReactElement {
  return <>
    <ShowMeBackdrop />
    <ShowMeBackdrop />
    <ShowMeBackdrop />
    <ShowMeBackdrop />
    <LongArticle />
  </>;
}
