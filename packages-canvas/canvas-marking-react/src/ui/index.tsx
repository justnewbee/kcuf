import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  useProps,
  useRefDomContainer
} from '../model';

interface IScMarkingContainer {
  $resizable?: boolean;
}

const ScMarkingContainer = styled.div<IScMarkingContainer>`
  min-height: 480px;
`;

export default function Ui(): ReactElement {
  const {
    className
  } = useProps();
  const refDomContainer = useRefDomContainer();
  
  return <ScMarkingContainer className={className} ref={refDomContainer} />;
}
