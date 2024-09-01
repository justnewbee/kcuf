import {
  ReactElement
} from 'react';
import styled, {
  css
} from 'styled-components';

import {
  useRefDomContainer,
  useRefDomMarkingStage,
  useFullscreen
} from '../demo-model';

import Ops from './ops';

interface IScStoryDefaultProps {
  $fullscreen?: boolean;
}

const ScStoryDefault = styled.div<IScStoryDefaultProps>`
  display: flex;
  flex-direction: column;
  height: 960px;
  min-height: 320px;
  padding: 16px;
  border: 1px double hsl(203 98% 55%);
  resize: vertical;
  overflow: auto;
  
  ${props => (props.$fullscreen ? css`
    background-color: hsl(0 0% 100%);
    resize: none;
  ` : null)}
`;
const ScMarking = styled.div`
  flex: 1;
`;

export default function StoryDefault(): ReactElement {
  const refDomContainer = useRefDomContainer();
  const refDomMarkingStage = useRefDomMarkingStage();
  const fullscreen = useFullscreen();
  
  return <ScStoryDefault ref={refDomContainer} $fullscreen={fullscreen}>
    <ScMarking ref={refDomMarkingStage} />
    <Ops />
  </ScStoryDefault>;
}