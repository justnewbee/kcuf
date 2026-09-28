import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  useDomRef
} from '../model';

import Ops from './ops';

const ScStoryContainer = styled.div`
  display: flex;
`;
const ScMarking = styled.div`
  flex: 1;
  height: 960px;
  min-height: 320px;
  resize: vertical;
`;

export default function StoryDefault(): ReactElement {
  const refDomCanvasMarking = useDomRef();
  
  return <ScStoryContainer>
    <ScMarking ref={refDomCanvasMarking} />
    <Ops />
  </ScStoryContainer>;
}
