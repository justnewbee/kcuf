import {
  Ref,
  ReactElement,
  forwardRef
} from 'react';

import Model, {
  CanvasMarkingProps,
  CanvasMarkingImperativeRef
} from '@kcuf/canvas-marking-react-headless';

import Ui from '../ui';

function CanvasMarking<T = unknown>(props: CanvasMarkingProps<T>, ref?: Ref<CanvasMarkingImperativeRef<T>>): ReactElement {
  return <Model {...props as CanvasMarkingProps}>
    <Ui ref={ref as Ref<CanvasMarkingImperativeRef>} />
  </Model>;
}

export default forwardRef(CanvasMarking) as typeof CanvasMarking;
