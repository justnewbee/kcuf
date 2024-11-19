import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  MinimalNormalize
} from '@kcuf/demo-rc';

import CanvasMarking from '../src';

const ScCanvasMarking = styled(CanvasMarking)`
  min-height: 800px;
  resize: vertical;
`;

export default function DemoAll(): ReactElement {
  return <>
    <MinimalNormalize />
    <ScCanvasMarking />
  </>;
}
