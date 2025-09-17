import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  useRefDomContainer,
  useRefDomCanvasMarking
} from '../model';

import Ops from './ops';

const ScContainer = styled.div`
  display: flex;
`;
const ScMarking = styled.div`
  flex: 1;
  height: 960px;
  min-height: 320px;
  resize: vertical;
`;

export default function StoryDefault(): ReactElement {
  const refDomContainer = useRefDomContainer();
  const refDomCanvasMarking = useRefDomCanvasMarking();
  
  return <ScContainer ref={refDomContainer}>
    <ScMarking ref={refDomCanvasMarking} />
    <Ops />
  </ScContainer>;
}
