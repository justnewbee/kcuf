import {
  ForwardedRef,
  ReactElement,
  forwardRef
} from 'react';

import Model, {
  CanvasMarkingProps,
  CanvasMarkingImperativeRef
} from '@kcuf/canvas-marking-react-headless';

import Ui from '../ui';

function WithModel<T = unknown>(props: CanvasMarkingProps<T>, ref: ForwardedRef<CanvasMarkingImperativeRef<T>>): ReactElement {
  return <Model {...props as CanvasMarkingProps}>
    <Ui ref={ref as ForwardedRef<CanvasMarkingImperativeRef>} />
  </Model>;
}

export default forwardRef(WithModel) as typeof WithModel;
