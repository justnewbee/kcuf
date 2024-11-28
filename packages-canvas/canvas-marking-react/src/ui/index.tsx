import {
  ForwardedRef,
  ReactElement,
  forwardRef,
  useImperativeHandle
} from 'react';
import styled from 'styled-components';

import {
  CanvasMarkingImperativeRef,
  useProps,
  useRefDomContainer,
  useImperativeRef
} from '@kcuf/canvas-marking-react-headless';

interface IScMarkingContainer {
  $resizable?: boolean;
}

const ScMarkingContainer = styled.div<IScMarkingContainer>`
  height: 100%;
  min-height: 120px;
`;

function Ui(_props: unknown, ref: ForwardedRef<CanvasMarkingImperativeRef>): ReactElement {
  const {
    className
  } = useProps();
  const refDomContainer = useRefDomContainer();
  const imperativeRef = useImperativeRef();
  
  useImperativeHandle(ref, () => imperativeRef, [imperativeRef]);
  
  return <ScMarkingContainer className={className} ref={refDomContainer} />;
}

export default forwardRef(Ui);
