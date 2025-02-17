import {
  ReactElement
} from 'react';
import styled, {
  css
} from 'styled-components';

import {
  useRefDomContainer,
  useRefDomCanvasMarking,
  useFullscreen
} from '../model';

import Ops from './ops';

interface IScContainerProps {
  $fullscreen?: boolean;
}

const ScContainer = styled.div<IScContainerProps>`
  display: flex;
  
  ${props => props.$fullscreen ? css`
    background-color: hsl(0 0% 100%);
    resize: none;
  ` : null}
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
  const fullscreen = useFullscreen();
  
  return <ScContainer ref={refDomContainer} $fullscreen={fullscreen}>
    <ScMarking ref={refDomCanvasMarking} />
    <Ops />
  </ScContainer>;
}
