import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import CanvasMarking from '../../../../src';
import {
  useRefImperative,
  useDestroyed,
  useCanvasMarkingProps
} from '../../model';

const ScCanvasMarking = styled(CanvasMarking)`
  min-height: 800px;
  resize: vertical;
`;

export default function TheCanvas(): ReactElement | null {
  const ref = useRefImperative();
  const destroyed = useDestroyed();
  const canvasMarkingProps = useCanvasMarkingProps();
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return destroyed ? null : <ScCanvasMarking ref={ref} {...canvasMarkingProps} />;
}
