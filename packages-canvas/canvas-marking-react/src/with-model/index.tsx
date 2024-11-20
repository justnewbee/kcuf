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

function WithModel(props: CanvasMarkingProps, ref: ForwardedRef<CanvasMarkingImperativeRef>): ReactElement {
  return <Model {...props}>
    <Ui ref={ref} />
  </Model>;
}

export default forwardRef(WithModel);
