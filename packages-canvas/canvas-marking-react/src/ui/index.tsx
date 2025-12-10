import {
  Ref,
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

export default forwardRef(function Ui(_props: unknown, ref?: Ref<CanvasMarkingImperativeRef>): ReactElement {
  const {
    className
  } = useProps();
  const refDomContainer = useRefDomContainer();
  const imperativeRef = useImperativeRef();
  
  useImperativeHandle(ref, () => imperativeRef, [imperativeRef]);
  
  return <ScMarkingContainer className={className} ref={refDomContainer} />;
});
