import {
  ReactElement
} from 'react';

import {
  MinimalNormalize
} from '@kcuf/demo-rc';

import CanvasMarking from '../src';

import PkgInfo from './rc/pkg-info';

export default function DemoAll(): ReactElement {
  return <>
    <MinimalNormalize />
    <PkgInfo />
    <CanvasMarking />
  </>;
}
