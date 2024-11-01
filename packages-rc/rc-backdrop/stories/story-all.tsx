import {
  ReactElement
} from 'react';

import {
  MinimalNormalize,
  LongArticle
} from '@kcuf/demo-rc';

import PkgInfo from './rc/pkg-info';
import ShowMeBackdrop from './rc/show-me-backdrop';

export default function StoryAll(): ReactElement {
  return <>
    <MinimalNormalize />
    <PkgInfo />
    <ShowMeBackdrop />
    <ShowMeBackdrop />
    <ShowMeBackdrop />
    <ShowMeBackdrop />
    <LongArticle />
  </>;
}